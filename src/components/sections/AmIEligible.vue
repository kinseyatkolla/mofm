<template>
  <section id="am-i-eligible" class="content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Am I Eligible?</h2>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      </div>
      <div class="section-content">
        <div class="address-search-container">
          <p class="input-instruction">
            Enter your address to check eligibility...
          </p>
          <div class="input-wrapper">
            <input
              v-model="addressInput"
              type="text"
              class="address-input"
              :class="{ 'has-error': hasError }"
              placeholder="123 Main St"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
              @keydown.enter="handleEnter"
            />
            <div v-if="isLoading" class="loading-indicator">
              <span class="spinner"></span>
            </div>
            <button
              v-if="!isLoading && addressInput.trim().length > 0"
              type="button"
              class="clear-button"
              @click="clearInput"
              aria-label="Clear address"
            >
              <span class="clear-icon">×</span>
            </button>
            <div
              v-if="showSuggestions && filteredAddresses.length > 0"
              class="address-suggestions"
              @mousedown.prevent
              @mouseenter="isMouseInSuggestions = true"
              @mouseleave="isMouseInSuggestions = false"
            >
              <div
                v-for="(address, index) in filteredAddresses"
                :key="index"
                class="suggestion-item"
                @mousedown="selectAddress(address)"
              >
                {{ address }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="search-button"
            :disabled="
              isLoading ||
              !addressInput.trim() ||
              addressInput.trim().length < 2
            "
            @click="performSearch"
            aria-label="Search address"
          >
            <span v-if="!isLoading">Search</span>
            <span v-else class="search-button-loading">Searching...</span>
          </button>
          <p class="election-department-info">
            You can call the election department to check at
            <a href="tel:7195758683">(719) 575-8683</a>
          </p>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div
            v-if="showEligibleMessage && isEligible"
            class="eligible-message"
          >
            <strong>You are Eligible to Vote!</strong>
          </div>
          <div
            v-if="showEligibleMessage && !isEligible && !isLoading"
            class="not-eligible-message"
          >
            <strong>Not Eligible</strong>
            <p>This address is not in an eligible voting district.</p>
          </div>
        </div>
        <div class="boundary-map-container">
          <img
            :src="boundaryMapImage"
            alt="Boundary Map"
            class="boundary-map-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import boundaryMapImage from "../../assets/BounderyMap.png";

const subtitle = null;

// Track mouse interaction to prevent blur from closing suggestions prematurely
const isMouseInSuggestions = ref(false);

// Loading and error states
const isLoading = ref(false);
const errorMessage = ref("");
const hasError = computed(() => !!errorMessage.value);

// Function to strip unit designations and numbers for anonymity
const stripUnitInfo = (address) => {
  return (
    address
      .trim()
      .toUpperCase()
      // Remove everything after unit designators (#, APT, UNIT, STE, SUITE)
      .replace(/\s*#.*$/i, "") // Remove # and everything after
      .replace(/\s+(APT|APARTMENT|UNIT|STE|SUITE).*$/i, "") // Remove APT/UNIT/STE/SUITE and everything after
      .replace(/\s+REAR\s+NULL.*$/i, "") // Remove "REAR NULL"
      .replace(/\s+FRNT.*$/i, "") // Remove "FRNT" (front)
      .trim()
  );
};

// Extract street address from LocationIQ response
const extractStreetAddress = (locationIQItem) => {
  // LocationIQ returns address components in the address object
  if (locationIQItem.address) {
    const addr = locationIQItem.address;
    const parts = [];

    // Build street address from components
    if (addr.house_number) parts.push(addr.house_number);
    if (addr.road) parts.push(addr.road);
    if (addr.house_name) parts.push(addr.house_name);

    // If we have components, use them
    if (parts.length > 0) {
      return parts.join(" ");
    }
  }

  // Fallback: extract from display_name
  // Format is typically: "123 Main St, Manitou Springs, CO 80829, USA"
  const displayName = locationIQItem.display_name || "";
  // Extract everything before the first comma (street address)
  const match = displayName.match(/^([^,]+)/);
  return match ? match[1].trim() : displayName;
};

// List of eligible residential addresses
// Addresses are normalized without unit numbers for anonymity
const eligibleAddresses = [
  "1 LILLIANS WAY",
  "10 1/2 RUXTON AVE",
  "10 CANON AVE",
  "10 RUXTON AVE",
  "1013 1/2 MANITOU AVE",
  "1013 MANITOU AVE",
  "1017 MANITOU AVE",
  "1019 MANITOU AVE",
  "1021 MANITOU AVE",
  "1025 MANITOU AVE",
  "1031 MANITOU AVE",
  "104 CANON AVE",
  "106 RUXTON AVE",
  "107 TWIN PINES LN",
  "108 CANON AVE",
  "109 CAVE AVE",
  "109 RUXTON AVE",
  "11 OTOE PL",
  "110 CANON AVE",
  "110 RUXTON AVE",
  "1106 MANITOU AVE",
  "1109 MANITOU AVE",
  "114 CANON AVE",
  "114 RUXTON AVE",
  "115 CANON AVE",
  "124 LOVERS LN",
  "126 PALISADE CIR",
  "14 1/2 RUXTON AVE",
  "14 RUE DU PLATEAU DE NOES",
  "15 OTOE PL",
  "16 RUXTON AVE",
  "19723 LINDENMERE DR",
  "2 NAVAJO AVE",
  "2 RUXTON AVE",
  "202 CANON AVE",
  "205 TRESTLE TRL",
  "2110 PASEO DEL ORO",
  "2909 WELLSHIRE BLVD",
  "3107 W COLORADO AVE",
  "417 S HANCOCK AVE",
  "5589 WILLOW SPRINGS DR",
  "5634 SWISS AVE",
  "584 OLD STONE DR",
  "5A AVE SYR",
  "6 NAVAJO AVE",
  "601 CRYSTAL HILLS BLVD",
  "631 MANITOU AVE",
  "715 MANITOU AVE",
  "716 POINT OF THE PINES DR",
  "717 MANITOU AVE",
  "719 MANITOU AVE",
  "720 MANITOU AVE",
  "721 MANITOU AVE",
  "723 MANITOU AVE",
  "724 1/2 MANITOU AVE",
  "728 1/2 MANITOU AVE",
  "730 1/2 MANITOU AVE",
  "732 1/2 MANITOU AVE",
  "732 MANITOU AVE",
  "733 MANITOU AVE",
  "734 1/2 MANITOU AVE",
  "737 MANITOU AVE",
  "739 MANITOU AVE",
  "742 1/2 MANITOU AVE",
  "744 MANITOU AVE",
  "8 NAVAJO AVE",
  "80 WALTHAM AVE",
  "800 OCEAN DRIVE",
  "801 MANITOU AVE",
  "819 MANITOU AVE",
  "8215 EMPORIA AVE",
  "852 9TH ST",
  "903 MANITOU AVE",
  "906 MANITOU AVE",
  "906 OSAGE AVE",
  "915 MANITOU AVE",
  "921 MANITOU AVE",
  "925 MANITOU AVE",
  "934 GLENROSE CT",
  "934 MANITOU AVE",
  "943 MANITOU AVE",
  "951 1/2 MANITOU AVE",
  "951 MANITOU AVE",
  "9644 ASHFIELD DR",
  "965 MANITOU AVE",
  "VIA COL DI LANA 15",
].map((addr) => addr.trim().toUpperCase());

const addressInput = ref("");
const showSuggestions = ref(false);
const selectedAddress = ref("");
const locationIQSuggestions = ref([]); // Stores LocationIQ API suggestions
const hasSelectedAddress = ref(false); // Track if user has selected an address or finished entering

// Get LocationIQ API key from environment variable (free tier: 10,000 requests/day)
// Sign up at https://locationiq.com/ - it's free!
const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY || "";

// Normalize address for comparison - strips unit info and normalizes street suffixes
const normalizeAddress = (address) => {
  if (!address) return "";

  let normalized = stripUnitInfo(address);

  // Remove common city/state/zip suffixes that might be in LocationIQ responses
  // Remove everything after patterns like ", MANITOU SPRINGS" or ", CO" or ", 80829"
  normalized = normalized
    .replace(/,\s*MANITOU\s+SPRINGS.*$/i, "")
    .replace(/,\s*CO.*$/i, "")
    .replace(/,\s*\d{5}.*$/i, "")
    .replace(/,\s*USA.*$/i, "")
    .trim();

  // Normalize directional prefixes (N, S, E, W, NORTH, SOUTH, etc.)
  normalized = normalized
    .replace(/^\s*(N|NORTH)\s+/i, "")
    .replace(/^\s*(S|SOUTH)\s+/i, "")
    .replace(/^\s*(E|EAST)\s+/i, "")
    .replace(/^\s*(W|WEST)\s+/i, "");

  // Normalize street suffixes
  normalized = normalized
    .replace(/\b(AVE|AVENUE)\b/gi, "AVE")
    .replace(/\b(ST|STREET)\b/gi, "ST")
    .replace(/\b(DR|DRIVE)\b/gi, "DR")
    .replace(/\b(PL|PLACE)\b/gi, "PL")
    .replace(/\b(BLVD|BOULEVARD)\b/gi, "BLVD")
    .replace(/\b(CIR|CIRCLE)\b/gi, "CIR")
    .replace(/\b(CT|COURT)\b/gi, "CT")
    .replace(/\b(LN|LANE)\b/gi, "LN")
    .replace(/\b(TRL|TRAIL)\b/gi, "TRL")
    .replace(/\b(WAY)\b/gi, "WAY")
    // Normalize multiple spaces to single space
    .replace(/\s+/g, " ")
    .trim();

  return normalized;
};

// Load address suggestions from LocationIQ (free API)
const loadLocationIQSuggestions = async (input) => {
  if (!input || input.length < 2) {
    locationIQSuggestions.value = [];
    showSuggestions.value = false;
    isLoading.value = false;
    errorMessage.value = "";
    return;
  }

  if (!LOCATIONIQ_API_KEY) {
    locationIQSuggestions.value = [];
    showSuggestions.value = false;
    isLoading.value = false;
    errorMessage.value = "";
    // No error message for missing API key - suggestions are optional
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // LocationIQ Search API (used for autocomplete-like functionality)
    // Note: LocationIQ doesn't have a dedicated autocomplete endpoint, so we use search
    // Filter to Manitou Springs, CO (80829) using viewbox and bounded parameters
    // Manitou Springs bounding box coordinates (expanded ~3-4 miles in each direction)
    const manitouSpringsViewbox = "-104.9600,38.7500,-104.8000,38.9100"; // Expanded Manitou Springs, CO bounding box
    // Include "Manitou Springs" in query to prioritize local results
    const queryWithCity = `${input} Manitou Springs CO`;
    const url = `https://api.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
      queryWithCity
    )}&format=json&limit=5&addressdetails=1&countrycodes=us&statecode=CO&viewbox=${manitouSpringsViewbox}&bounded=1`;

    const response = await fetch(url);

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        errorMessage.value =
          "API authentication error. Please check your API key.";
      } else if (response.status === 429) {
        errorMessage.value = "Too many requests. Please try again in a moment.";
      } else if (response.status === 404) {
        // 404 is not really an error for search - just no results
        locationIQSuggestions.value = [];
        showSuggestions.value = false;
        isLoading.value = false;
        return;
      } else {
        errorMessage.value =
          "Unable to fetch address suggestions. Please try again.";
      }
      locationIQSuggestions.value = [];
      showSuggestions.value = false;
      isLoading.value = false;
      return;
    }

    const data = await response.json();

    // Handle error responses from LocationIQ (they return error objects, not arrays)
    if (data.error) {
      errorMessage.value = data.error || "Error fetching address suggestions.";
      locationIQSuggestions.value = [];
      showSuggestions.value = false;
      isLoading.value = false;
      return;
    }

    if (Array.isArray(data) && data.length > 0) {
      // Extract and format addresses from LocationIQ suggestions
      locationIQSuggestions.value = data
        .map((item) => {
          // Extract street address from LocationIQ response
          const streetAddress = extractStreetAddress(item);
          return normalizeAddress(streetAddress);
        })
        .filter((addr) => addr.length > 0)
        .slice(0, 5);

      // Show suggestions when we have results
      if (locationIQSuggestions.value.length > 0) {
        showSuggestions.value = true;
        errorMessage.value = ""; // Clear any previous errors
      } else {
        showSuggestions.value = false;
      }
    } else {
      locationIQSuggestions.value = [];
      showSuggestions.value = false;
    }
  } catch (error) {
    // Handle network errors and other exceptions
    errorMessage.value =
      "Network error. Please check your connection and try again.";
    if (import.meta.env.DEV) {
      console.warn("LocationIQ API error:", error.message);
    }
    locationIQSuggestions.value = [];
    showSuggestions.value = false;
  } finally {
    isLoading.value = false;
  }
};

const filteredAddresses = computed(() => {
  if (!addressInput.value.trim()) {
    return [];
  }

  // Only show LocationIQ API suggestions - hide eligible addresses for anonymity
  // Eligible addresses are still used for eligibility checking, just not shown in suggestions
  return locationIQSuggestions.value.slice(0, 10);
});

const isEligible = computed(() => {
  if (!addressInput.value.trim()) {
    return false;
  }

  // Normalize user input (strip unit info) and check against normalized eligible addresses
  const normalizedInput = normalizeAddress(addressInput.value);
  return eligibleAddresses.includes(normalizedInput);
});

// Show eligibility message only when user has selected an address or finished entering (blurred)
const showEligibleMessage = computed(() => {
  return (
    addressInput.value.trim().length > 0 &&
    hasSelectedAddress.value &&
    !showSuggestions.value
  );
});

let debounceTimer = null;

const handleInput = () => {
  const input = addressInput.value.trim();

  // Clear any previous errors
  errorMessage.value = "";

  // Reset selection flag when user starts typing again
  hasSelectedAddress.value = false;

  // Clear any existing suggestions when user types
  showSuggestions.value = false;
  locationIQSuggestions.value = [];

  // Clear debounce timer if it exists (no longer needed but keeping for cleanup)
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
};

const handleFocus = () => {
  // Show suggestions if we have LocationIQ results already from a previous search
  const input = addressInput.value.trim();
  if (
    LOCATIONIQ_API_KEY &&
    input.length >= 2 &&
    locationIQSuggestions.value.length > 0
  ) {
    showSuggestions.value = true;
  } else {
    showSuggestions.value = false;
  }
};

const handleBlur = () => {
  // Use a small delay to allow mousedown events on suggestions to fire first
  // The @mousedown.prevent on the suggestions container helps prevent blur
  setTimeout(() => {
    // Only close if mouse is not in suggestions area
    if (!isMouseInSuggestions.value) {
      showSuggestions.value = false;
      // Mark as selected when user blurs (finished entering address)
      if (addressInput.value.trim().length > 0) {
        hasSelectedAddress.value = true;
      }
    }
  }, 150);
};

const handleEnter = () => {
  // If there's exactly one suggestion, select it
  if (filteredAddresses.value.length === 1) {
    selectAddress(filteredAddresses.value[0]);
  } else if (addressInput.value.trim().length > 0) {
    // Otherwise, just check eligibility directly without searching
    showSuggestions.value = false;
    hasSelectedAddress.value = true;
  }
};

const performSearch = () => {
  const input = addressInput.value.trim();

  if (!input || input.length < 2) {
    return;
  }

  // Clear any previous errors
  errorMessage.value = "";

  // Reset selection flag
  hasSelectedAddress.value = false;

  // Clear any existing suggestions
  showSuggestions.value = false;
  locationIQSuggestions.value = [];

  // Perform search if we have API key
  if (LOCATIONIQ_API_KEY) {
    loadLocationIQSuggestions(input);
  } else {
    // If no API key, just check eligibility directly
    hasSelectedAddress.value = true;
    showSuggestions.value = false;
  }
};

const selectAddress = (address) => {
  // Replace the input text with the selected address
  addressInput.value = address;
  selectedAddress.value = address;
  showSuggestions.value = false;
  hasSelectedAddress.value = true; // Mark as selected
  locationIQSuggestions.value = []; // Clear LocationIQ suggestions when selected
  errorMessage.value = ""; // Clear any errors
  isMouseInSuggestions.value = false;

  // Blur the input to trigger eligibility check
  setTimeout(() => {
    const input = document.querySelector(".address-input");
    if (input) {
      input.blur();
    }
  }, 0);
};

const clearInput = () => {
  addressInput.value = "";
  selectedAddress.value = "";
  showSuggestions.value = false;
  hasSelectedAddress.value = false;
  locationIQSuggestions.value = [];
  errorMessage.value = "";
  isLoading.value = false;
  isMouseInSuggestions.value = false;

  // Clear any pending debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }

  // Focus the input after clearing
  // Use nextTick to ensure DOM is updated
  setTimeout(() => {
    const input = document.querySelector(".address-input");
    if (input) {
      input.focus();
    }
  }, 0);
};

// Close suggestions when clicking outside
watch(addressInput, (newVal) => {
  if (!newVal.trim()) {
    showSuggestions.value = false;
    locationIQSuggestions.value = [];
    hasSelectedAddress.value = false; // Reset when input is cleared
    errorMessage.value = ""; // Clear errors when input is cleared
    isLoading.value = false;
    // Clear any pending debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  }
});

// No special setup needed for LocationIQ - it's a simple REST API
onMounted(() => {
  // LocationIQ doesn't require any special initialization
  // Just make sure the API key is set in .env if you want external suggestions
});

onUnmounted(() => {
  // Clean up debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
});
</script>

<style scoped>
/* Component-specific styles only - common styles are in style.css */

.address-search-container {
  position: relative;
  max-width: 800px;
}

.boundary-map-container {
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boundary-map-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.input-instruction {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.election-department-info {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--text-secondary, #666);
  line-height: 1.6;
}

.election-department-info a {
  color: var(--brand-primary, #4f357f);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.election-department-info a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.address-input {
  width: 100%;
  padding: 1.25rem;
  padding-right: 3.5rem;
  font-size: 1.125rem;
  border: 2px solid var(--border-color, #ddd);
  border-radius: 8px;
  background-color: #fff;
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.search-button {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  background-color: var(--brand-primary, #4f357f);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
  box-sizing: border-box;
}

.search-button:hover:not(:disabled) {
  background-color: #3d2a63;
  transform: translateY(-1px);
}

.search-button:active:not(:disabled) {
  transform: translateY(0);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--border-color, #ddd);
  color: var(--text-secondary, #999);
}

.search-button-loading {
  display: inline-block;
}

.address-input:focus {
  outline: none;
  border-color: var(--brand-primary, #4f357f);
}

.address-input.has-error {
  border-color: #dc3545;
}

.address-input::placeholder {
  color: var(--text-secondary, #999);
}

.loading-indicator {
  position: absolute;
  right: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color, #ddd);
  border-top-color: var(--brand-primary, #4f357f);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.clear-button {
  position: absolute;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  padding: 0;
  color: var(--text-secondary, #999);
}

.clear-button:hover {
  background-color: #f0f0f0;
  color: var(--text-primary, #1a1a1a);
}

.clear-button:active {
  transform: scale(0.95);
  background-color: #e0e0e0;
}

.clear-icon {
  font-size: 24px;
  line-height: 1;
  font-weight: 300;
  display: block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  color: #856404;
  font-size: 0.9rem;
  line-height: 1.4;
}

.address-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 2px solid var(--border-color, #ddd);
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: -2px;
  margin-bottom: 0;
}

.suggestion-item {
  padding: 1rem 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color, #eee);
  transition: background-color 0.2s ease;
  color: var(--text-primary);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.suggestion-item:active {
  background-color: #e8e8e8;
}

.eligible-message {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #d4edda;
  border: 2px solid #28a745;
  border-radius: 8px;
  color: #155724;
  font-size: 1.25rem;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.eligible-message strong {
  font-weight: 700;
  font-size: 1.5rem;
}

.not-eligible-message {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #f8d7da;
  border: 2px solid #dc3545;
  border-radius: 8px;
  color: #721c24;
  font-size: 1.25rem;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.not-eligible-message strong {
  font-weight: 700;
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.not-eligible-message p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .input-instruction {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .election-department-info {
    font-size: 1rem;
    margin-top: 1.25rem;
  }

  .input-wrapper {
    margin-bottom: 1.25rem;
  }

  .address-input {
    font-size: 1.25rem;
    padding: 1.5rem;
    padding-right: 4rem;
  }

  .search-button {
    font-size: 1.25rem;
    padding: 1.25rem 2.5rem;
  }

  .loading-indicator {
    right: 1.5rem;
  }

  .clear-button {
    right: 1.5rem;
    width: 32px;
    height: 32px;
  }

  .clear-icon {
    font-size: 28px;
  }

  .error-message {
    font-size: 1rem;
    padding: 1rem 1.25rem;
  }

  .eligible-message,
  .not-eligible-message {
    font-size: 1.5rem;
    padding: 2rem;
  }

  .eligible-message strong,
  .not-eligible-message strong {
    font-size: 1.75rem;
  }

  .not-eligible-message p {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .input-instruction {
    font-size: 1.375rem;
  }

  .election-department-info {
    font-size: 1.125rem;
  }

  .address-input {
    font-size: 1.375rem;
    padding: 1.75rem;
    padding-right: 4.5rem;
  }

  .search-button {
    font-size: 1.375rem;
    padding: 1.5rem 3rem;
  }

  .loading-indicator {
    right: 1.75rem;
  }

  .clear-button {
    right: 1.75rem;
  }
}
</style>
