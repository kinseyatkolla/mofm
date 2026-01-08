<template>
  <section id="am-i-eligible" class="content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Am I Eligible?</h2>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      </div>
      <div class="section-content">
        <!-- No external API loader needed - using free LocationIQ API -->

        <div class="address-search-container">
          <input
            v-model="addressInput"
            type="text"
            class="address-input"
            placeholder="Enter your address to check eligibility..."
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <div
            v-if="showSuggestions && filteredAddresses.length > 0"
            class="address-suggestions"
          >
            <div
              v-for="(address, index) in filteredAddresses"
              :key="index"
              class="suggestion-item"
              @click="selectAddress(address)"
            >
              {{ address }}
            </div>
          </div>

          <div
            v-if="showEligibleMessage && isEligible"
            class="eligible-message"
          >
            <strong>You are Eligible to Vote!</strong>
          </div>
          <div
            v-if="showEligibleMessage && !isEligible"
            class="not-eligible-message"
          >
            <strong>Not Eligible</strong>
            <p>This address is not in an eligible voting district.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const subtitle = null;

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
const locationIQSuggestions = ref([]); // Stores filtered suggestions from cached address list
const hasSelectedAddress = ref(false); // Track if user has selected an address or finished entering
const cachedAddressList = ref([]); // Full list of addresses loaded from LocationIQ on page load
const isLoadingAddresses = ref(false); // Track if we're loading the address list

// Get LocationIQ API key from environment variable (free tier: 10,000 requests/day)
// Sign up at https://locationiq.com/ - it's free!
const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY || "";

// Calculate relevance score for address matching
const calculateRelevanceScore = (address, query) => {
  const addressUpper = address.toUpperCase();
  const queryUpper = query.toUpperCase();
  let score = 0;

  // Exact match gets highest score
  if (addressUpper === queryUpper) return 1000;

  // Starts with query gets high score
  if (addressUpper.startsWith(queryUpper)) score += 500;

  // Contains query gets medium score
  if (addressUpper.includes(queryUpper)) score += 200;

  // Word boundary matches get bonus
  const queryWords = queryUpper.split(/\s+/);
  queryWords.forEach((word) => {
    if (word.length > 2) {
      const regex = new RegExp(`\\b${word}`, "i");
      if (regex.test(addressUpper)) score += 50;
    }
  });

  // Shorter addresses (more specific) get slight bonus
  if (addressUpper.length < 50) score += 10;

  return score;
};

// Normalize address for comparison - strips unit info and normalizes street suffixes
const normalizeAddress = (address) => {
  let normalized = stripUnitInfo(address);

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
    // Normalize multiple spaces to single space
    .replace(/\s+/g, " ")
    .trim();

  return normalized;
};

// Load full address list from LocationIQ on page load (one-time API call)
const loadAddressList = async () => {
  if (!LOCATIONIQ_API_KEY || cachedAddressList.value.length > 0) {
    return; // Already loaded or no API key
  }

  isLoadingAddresses.value = true;

  try {
    // Manitou Springs bounding box coordinates (expanded ~3-4 miles in each direction)
    const manitouSpringsViewbox = "-104.9600,38.7500,-104.8000,38.9100";

    // Use generic search queries to get as many addresses as possible
    // Search for just "Manitou Springs" to get a broad set of addresses
    // Also try numeric searches to catch numbered addresses
    const searchQueries = [
      "Manitou Springs CO", // Broad search for the city
      "1 Manitou Springs", // Get addresses starting with numbers
      "10 Manitou Springs", // Get more numbered addresses
      "100 Manitou Springs", // Get higher numbered addresses
    ];

    const baseUrls = [
      `https://us1.locationiq.com/v1/search`,
      `https://api.locationiq.com/v1/search`,
    ];

    const allAddresses = new Set();

    // Try to get addresses using different generic search queries
    for (const query of searchQueries) {
      for (const baseUrl of baseUrls) {
        try {
          // Use a high limit to get as many results as possible
          const url = `${baseUrl}?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
            query
          )}&format=json&limit=100&addressdetails=1&countrycodes=us&statecode=CO&viewbox=${manitouSpringsViewbox}&bounded=1`;

          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              data.forEach((item) => {
                const address = item.display_name || "";
                const normalized = stripUnitInfo(address).toUpperCase();
                // Only add if it's actually an address (contains a number and street info)
                if (normalized.length > 0 && /\d/.test(normalized)) {
                  allAddresses.add(normalized);
                }
              });
            }
            break; // Success, move to next query
          }

          if (response.status === 429) {
            // Rate limited - stop trying and use what we have
            if (import.meta.env.DEV) {
              console.warn(
                "LocationIQ API: Rate limited while loading address list"
              );
            }
            break;
          }
        } catch (error) {
          // Continue to next endpoint
          continue;
        }
      }

      // Small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    cachedAddressList.value = Array.from(allAddresses).sort();

    if (import.meta.env.DEV) {
      console.log(
        `Loaded ${cachedAddressList.value.length} addresses from LocationIQ`
      );
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Error loading address list:", error);
    }
  } finally {
    isLoadingAddresses.value = false;
  }
};

// Filter cached address list based on user input (client-side only, no API calls)
const filterAddressSuggestions = (input) => {
  if (!input || input.length < 2) {
    locationIQSuggestions.value = [];
    return;
  }

  if (cachedAddressList.value.length === 0) {
    // If address list hasn't loaded yet, return empty
    locationIQSuggestions.value = [];
    return;
  }

  const normalizedInput = input.toUpperCase();

  // Filter and score addresses
  const suggestions = cachedAddressList.value
    .map((address) => ({
      address,
      score: calculateRelevanceScore(address, normalizedInput),
    }))
    .filter((item) => item.score > 0) // Only include addresses that match
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .map((item) => item.address)
    .slice(0, 10);

  locationIQSuggestions.value = suggestions;

  if (suggestions.length > 0) {
    showSuggestions.value = true;
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

  // Reset selection flag when user starts typing again
  hasSelectedAddress.value = false;

  // Show suggestions if we have at least 2 characters (client-side filtering)
  if (input.length >= 2) {
    showSuggestions.value = true;
  } else {
    showSuggestions.value = false;
  }

  // Debounce LocationIQ API calls - longer delay to reduce API calls
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    if (input.length >= 2) {
      // Use client-side filtering only - no API calls
      filterAddressSuggestions(addressInput.value);
    } else {
      locationIQSuggestions.value = [];
    }
  }, 150); // Much shorter debounce since we're only filtering locally
};

const handleFocus = () => {
  // Show suggestions if we have results already
  const input = addressInput.value.trim();
  if (input.length >= 2) {
    filterAddressSuggestions(input);
    showSuggestions.value = locationIQSuggestions.value.length > 0;
  } else {
    showSuggestions.value = false;
  }
};

const handleBlur = () => {
  // Delay closing suggestions to allow click events on suggestion items to fire first
  setTimeout(() => {
    showSuggestions.value = false;
    // Mark as selected when user blurs (finished entering address)
    if (addressInput.value.trim().length > 0) {
      hasSelectedAddress.value = true;
    }
  }, 200);
};

const selectAddress = (address) => {
  addressInput.value = address;
  selectedAddress.value = address;
  showSuggestions.value = false;
  hasSelectedAddress.value = true; // Mark as selected
  locationIQSuggestions.value = []; // Clear LocationIQ suggestions when selected
};

// Close suggestions when clicking outside
watch(addressInput, (newVal) => {
  if (!newVal.trim()) {
    showSuggestions.value = false;
    locationIQSuggestions.value = [];
    hasSelectedAddress.value = false; // Reset when input is cleared
  }
});

// Load address list on component mount (one-time API call)
onMounted(() => {
  if (LOCATIONIQ_API_KEY) {
    // Load address list asynchronously in the background
    loadAddressList();
  }
});

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<style scoped>
/* Component-specific styles only - common styles are in style.css */

.address-search-container {
  position: relative;
  max-width: 800px;
}

.address-input {
  width: 100%;
  padding: 1.25rem;
  font-size: 1.125rem;
  border: 2px solid var(--border-color, #ddd);
  border-radius: 8px;
  background-color: #fff;
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.address-input:focus {
  outline: none;
  border-color: var(--brand-primary, #0066cc);
}

.address-input::placeholder {
  color: var(--text-secondary, #999);
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
  .address-input {
    font-size: 1.25rem;
    padding: 1.5rem;
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
  .address-input {
    font-size: 1.375rem;
    padding: 1.75rem;
  }
}
</style>
