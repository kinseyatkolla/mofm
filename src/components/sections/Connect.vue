<template>
  <section id="connect" class="content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Connect with us</h2>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      </div>
      <div class="section-content">
        <p>
          Have questions or want to speak with one of our committee members?
          We're here to help.
        </p>
        <div class="contact-info">
          <ul>
            <!-- <li>
              <strong>Phone:</strong>
              <a href="tel:+17193187936">(719) 318-7936</a>
            </li> -->
            <li>
              <strong>Email:</strong>
              <a href="mailto:movingonfrommetro@gmail.com"
                >movingonfrommetro@gmail.com</a
              >
            </li>
            <li>
              <strong>Social Media:</strong>
              <a
                href="https://www.instagram.com/movingonfrommetro"
                target="_blank"
                rel="noopener noreferrer"
                >Instagram: @movingonfrommetro</a
              >
            </li>
            <li>
              <strong>Mailing Address:</strong><br />
              PO Box 103<br />
              Manitou Springs, CO 80829
            </li>
          </ul>
        </div>
        <div class="upcoming-events">
          <h3>Upcoming Public Events:</h3>
          <p>
            Join members of the Moving on from Metro Committee and other
            community members to learn more about this issue and get your
            questions answered.
          </p>
          <ul>
            <li>
              <strong>Saturday, January 24th, 2 - 4 pm:</strong> Coffee +
              Conversation at the Manitou Springs Public Library. 701 Manitou
              Ave.
            </li>
            <li>
              <strong>Sunday, February 8th, 2 - 4 pm:</strong> Coffee +
              Conversation at the Manitou Art Center (MAC). 513 Manitou Ave.
            </li>
          </ul>
          <p>Other events coming soon, stay tuned!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// You can add props or remove the subtitle if not needed
const subtitle = null; // Set to null or remove if not needed
</script>

<style scoped>
.contact-info,
.upcoming-events {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.contact-info ul {
  list-style-type: none;
  padding-left: 0;
}

.contact-info li {
  margin-bottom: 1.25rem;
  line-height: 1.8;
}

.contact-info li:last-child {
  margin-bottom: 0;
}

.contact-info strong {
  margin-right: 0.5rem;
}

.contact-note {
  font-size: 0.9em;
  color: var(--text-secondary);
  font-style: italic;
}

.upcoming-events h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 1rem;
}

.upcoming-events ul {
  list-style-type: none;
  padding-left: 0;
}

.upcoming-events li {
  margin-bottom: 0.75rem;
}

@media (min-width: 768px) {
  .upcoming-events h3 {
    font-size: 1.75rem;
  }
}
</style>
