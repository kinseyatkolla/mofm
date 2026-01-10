<template>
  <section id="how-learn" class="content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Get Involved</h2>
      </div>
      <div class="section-content">
        <ul class="action-list">
          <li>Vote YES on 5A by March 3rd</li>
          <li>
            Attend a public event (see
            <a href="/#upcoming-events" @click="handleUpcomingEventsClick"
              >Upcoming Events</a
            >)
          </li>
          <li>Talk with your neighbors</li>
          <li>
            Reach out to our committee to get your questions answered and learn
            more about how you can get involved (see
            <a href="/#connect" @click="handleConnectClick">Connect with us</a>)
          </li>
        </ul>
        <p>
          We will be hosting coffee hour conversations to answer questions about
          the City's Dissolution Plan, and will be sending out postcard mailings
          with more information. Please stay tuned to this website, your mailbox
          and our social media for details about the coffee hours and other
          opportunities to connect.
        </p>
        <p>
          Members of our committee are also available to talk with members of
          the community individually. Please reach out to us, we'd be glad to
          hear from you.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const handleConnectClick = async (event) => {
  event.preventDefault();

  // If we're not on the home page, navigate first
  if (route.path !== "/") {
    await router.push("/");
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      scrollToSection("connect");
    }, 100);
  } else {
    scrollToSection("connect");
  }
};

const handleUpcomingEventsClick = async (event) => {
  event.preventDefault();

  // If we're not on the home page, navigate first
  if (route.path !== "/") {
    await router.push("/");
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      scrollToSection("upcoming-events");
    }, 100);
  } else {
    scrollToSection("upcoming-events");
  }
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
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
</script>

<style scoped>
.action-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.action-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.action-list li:last-child {
  margin-bottom: 0;
}

.action-list a {
  color: var(--brand-primary, #392650);
  text-decoration: underline;
  font-weight: 500;
}

.action-list a:hover {
  text-decoration: none;
}

@media (min-width: 768px) {
  .action-list {
    padding-left: 2rem;
  }

  .action-list li {
    font-size: 1.125rem;
  }
}
</style>
