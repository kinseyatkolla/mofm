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
              <strong>Social Media:</strong><br />
              <a
                href="https://www.instagram.com/movingonfrommetro"
                target="_blank"
                rel="noopener noreferrer"
                >Instagram: @movingonfrommetro</a
              >
              <br />
              <a
                href="https://www.facebook.com/p/Moving-On-From-Metro-61586078616693/"
                target="_blank"
                rel="noopener noreferrer"
                >Facebook: @movingonfrommetro</a
              >
            </li>
            <li>
              <strong>Mailing Address:</strong><br />
              PO Box 103<br />
              Manitou Springs, CO 80829
            </li>
          </ul>
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
.contact-info {
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
</style>
