<template>
  <section id="upcoming-events" class="content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Upcoming Events</h2>
      </div>
      <div class="section-content">
        <p>
          Join members of the Moving on from Metro Committee and other
          community members to learn more about this issue and get your
          questions answered.
        </p>
        <div class="events-list">
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
// Component logic can be added here if needed in the future
</script>

<style scoped>
.events-list {
  margin-top: 2rem;
}

.events-list ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.events-list li {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: var(--bg-color, #f8f9fa);
  border-left: 4px solid var(--brand-primary, #392650);
  border-radius: 4px;
  line-height: 1.8;
}

.events-list li:last-of-type {
  margin-bottom: 0;
}

.events-list strong {
  color: var(--brand-primary, #392650);
  font-size: 1.125rem;
  display: block;
  margin-bottom: 0.5rem;
}

.events-list > p {
  font-style: italic;
  color: var(--text-secondary, #666);
  font-size: 1rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .events-list li {
    padding: 2rem;
  }

  .events-list strong {
    font-size: 1.25rem;
  }

  .events-list > p {
    font-size: 1.125rem;
  }
}
</style>
