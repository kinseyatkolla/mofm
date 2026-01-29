<template>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen }">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" @click="handleBrandClick"
          >Moving on from Metro</router-link
        >
      </div>

      <!-- Hamburger menu button (mobile) -->
      <button
        class="hamburger"
        @click="toggleMenu"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation links -->
      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li>
          <a href="/#how-learn" @click="handleNavClick">Get Involved</a>
        </li>
        <li>
          <a href="/#what-moving" @click="handleNavClick"
            >What is Moving on from Metro?</a
          >
        </li>
        <li>
          <a href="/#what-metro" @click="handleNavClick"
            >What is The Metro District?</a
          >
        </li>
        <li>
          <a href="/#why" @click="handleNavClick"
            >Why is dissolution of the Metro District the solution?</a
          >
        </li>
        <li>
          <a href="/#benefits" @click="handleNavClick"
            >What benefits will we see as residents?</a
          >
        </li>
        <li>
          <a href="/#downtown-parking" @click="handleNavClick"
            >Downtown Parking Benefit Program</a
          >
        </li>
        <li>
          <a href="/#am-i-eligible" @click="handleNavClick">Am I Eligible?</a>
        </li>
        <li>
          <a href="/#who" @click="handleNavClick"
            >Who is involved in this issue?</a
          >
        </li>
        <li>
          <a href="/#when-how" @click="handleNavClick"
            >When and how will voting happen?</a
          >
        </li>
        <li>
          <a href="/#upcoming-events" @click="handleNavClick"
            >Upcoming Events</a
          >
        </li>
        <li>
          <a href="/#connect" @click="handleNavClick">Connect with us</a>
        </li>
        <!-- <li>
          <a href="/#endorsements" @click="handleNavClick">Endorsements</a>
        </li> -->
        <li>
          <router-link to="/faq" @click="closeMenu">FAQs</router-link>
        </li>
        <li>
          <router-link to="/history" @click="closeMenu"
            >History of the Metro District</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const isMenuOpen = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleBrandClick = (event) => {
  closeMenu();

  // If already on the index page, scroll to top instead of navigating
  if (route.path === "/") {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const handleNavClick = async (event) => {
  event.preventDefault();
  closeMenu();

  const href = event.target.getAttribute("href");
  if (!href) return;

  const hash = href.split("#")[1];

  // If we're not on the home page, navigate first
  if (route.path !== "/") {
    await router.push("/");
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      scrollToSection(hash);
    }, 100);
  } else {
    scrollToSection(hash);
  }
};

const scrollToSection = (sectionId) => {
  if (!sectionId) return;

  const element = document.getElementById(sectionId);
  if (element) {
    // On mobile, account for sticky navbar height; on desktop, sidebar doesn't affect scroll
    const isDesktop = window.innerWidth >= 768;
    const offset = isDesktop ? 20 : 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Close menu on window resize if it becomes desktop size
const handleResize = () => {
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.navbar {
  background-color: #392650;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.navbar-brand a {
  font-family: "PT Sans", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.02em;
  color: var(--white);
}

/* Hamburger menu button */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: var(--white);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger:hover span {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Navigation links */
.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #392650;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0;
  margin: 0;
}

.nav-links.open {
  max-height: calc(100vh - 60px);
  padding: 1rem 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.nav-links li {
  width: 100%;
}

.nav-links a {
  display: block;
  padding: 1rem 1.5rem;
  color: var(--white);
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
}

.nav-links li:last-child a {
  border-bottom: none;
}

/* Desktop styles - Left sidebar */
@media (min-width: 768px) {
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    padding: 2rem 0;
    max-width: none;
  }

  .navbar-brand {
    padding: 0 1.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 1.5rem;
    width: 100%;
  }

  .navbar-brand a {
    font-size: 1.25rem;
  }

  .hamburger {
    display: none;
  }

  .nav-links {
    position: static;
    flex-direction: column;
    max-height: none;
    box-shadow: none;
    padding: 0;
    width: 100%;
    gap: 0;
    overflow: visible;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.95rem;
    white-space: normal;
    text-align: left;
  }

  .nav-links a:hover,
  .nav-links a.router-link-active {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
    text-decoration: none;
  }

  .nav-links li:last-child a {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}

@media (min-width: 1024px) {
  .navbar {
    width: 320px;
  }

  .nav-links a {
    font-size: 1rem;
    padding: 1.125rem 1.5rem;
  }
}
</style>
