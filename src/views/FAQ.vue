<template>
  <div class="faq-page">
    <section class="page-content">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">FAQs</h2>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 0 }"
              @click="toggleFaq(0)"
            >
              <span
                >Q: Isn't this campaign just a way for the City to try to manage
                its general funds deficit?</span
              >
              <span class="faq-icon">{{ openIndex === 0 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 0 }">
              <p>
                No. This issue predates the City's current budget concerns by
                over a decade.
              </p>
              <p>
                It is critical to note that parking revenue supports parking
                management through the Enterprise and Mobility Fund, managed by
                the City's Parking and Mobility Enterprise–it is in no way
                connected to the City's general fund. Legally, an Enterprise has
                to pay for itself, and there are no general funds that can be
                used for its operations.
              </p>
              <p>
                Further, per the court-approved Plan, revenue from Smischny
                (approximately 42 spaces) and Wichita (approximately 86 spaces)
                parking lots can ONLY be reinvested in downtown parking and
                beautification projects.
              </p>
              <p>
                Additionally, the City projects that consolidating parking
                operations will reduce expenses significantly due to a more
                streamlined approach to parking management. Part of the
                efficiency savings comes from the elimination of the District's
                3rd party parking management contract, possibly increasing net
                operating income by over $150,000, which can ONLY be reinvested
                in parking and downtown related projects.
              </p>
              <p>
                Last, the City has been advised by multiple outside consultant
                teams evaluating traffic and mobility issues for the City that
                the Metro District should be dissolved to ensure a more
                streamlined parking system city-wide. This includes a traffic
                study, which concluded that a three story parking garage, which
                the District has been pushing to erect, would significantly
                increase downtown traffic and congestion.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 1 }"
              @click="toggleFaq(1)"
            >
              <span
                >Q: How can the City manage taking on three properties with a
                budget deficit?</span
              >
              <span class="faq-icon">{{ openIndex === 1 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 1 }">
              <p>
                Parking revenue goes to the Enterprise and Mobility Fund
                Enterprise.
              </p>
              <p>
                Parking revenue supports parking management, not connected to
                the general fund. An Enterprise has to pay for itself, there are
                no general funds that can be used for it.
              </p>
              <p>
                This issue predates the City's current budget concerns related
                to the decrease in tax revenue from marijuana sales. Revenue
                from Schmichny and Wichita parking lots can ONLY be reinvested
                in downtown parking, infrastructure, and beautification
                initiatives per the City's Plan.
              </p>
              <p>
                The City projects that consolidating parking operations will
                reduce expenses significantly compared to the District's
                contracted third-party service, possibly increasing net
                operating income by over $150,000 each year, which will be
                reinvested in community infrastructure, mobility and
                beautification initiatives downtown.
              </p>
              <p>
                Further, projected operation expenses for these properties are
                expected to be much lower when combined with the City's current
                parking and mobility operations.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 2 }"
              @click="toggleFaq(2)"
            >
              <span>Q: Why is this happening after 2A failed to pass?</span>
              <span class="faq-icon">{{ openIndex === 2 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 2 }">
              <p>
                While this may appear to be happening after 2A failed to pass,
                this issue predates the 2A initiative by over a decade. Further,
                the Moving on from Metro campaign is distinct from the earlier
                2A initiative. While 2A focused on a tax measure, the Metro
                District dissolution is centered on community services and City
                operations. This effort is not about raising revenue, it is
                about streamlining parking management, improving efficiency, and
                ensuring that parking and related resources are aligned with the
                City's broader vision for residents, businesses, and visitors.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 3 }"
              @click="toggleFaq(3)"
            >
              <span
                >Q: What benefits will the City's Plan for Dissolution
                have?</span
              >
              <span class="faq-icon">{{ openIndex === 3 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 3 }">
              <p>
                Currently residents are limited as to when they can purchase
                monthly or annual passes, or use residential free parking hours
                in the Wichita or Smischny lots. The District allows monthly
                parking in the Wichita and Smischny lots only during the
                non-peak months (November - February), without the option for
                residents and business employees to purchase or renew an annual
                pass. Also, free parking after 6 p.m. is not allowed in the
                District managed parking lots, or the free 50 hours/resident
                benefit.
              </p>
              <p>
                With the Plan for Dissolution, the benefits to residents and
                downtown business owners are numerous:
              </p>
              <ul>
                <li>
                  76 parking dedicated spots available for residents and
                  business owner permit holders
                </li>
                <li>
                  Same day applications for year-round monthly and annual
                  resident and downtown business employee permits
                </li>
                <li>
                  Continuity of signage and communication across all of
                  Manitou's parking
                </li>
                <li>Enhanced payment options</li>
                <li>
                  School District for Manitou Springs Elementary drop-off access
                  in Wichita Parking Lot
                </li>
                <li>50 hours annual free parking in both lots for residents</li>
                <li>Wichita Public Restrooms available 365 days</li>
                <li>Locally operated parking management</li>
                <li>Improved traffic mitigation in downtown</li>
                <li>
                  Capital improvements including ADA markings, resurfacing,
                  restriping and lighting upgrades that meet dark sky
                  requirements
                </li>
                <li>
                  Completion of the Creekwalk Trail, Phase 2 of the District's
                  plan
                </li>
                <li>Streamlined bicycle and pedestrian mobility plans</li>
                <li>Downtown beautification investments</li>
              </ul>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 4 }"
              @click="toggleFaq(4)"
            >
              <span
                >Q: What has been done to try to resolve this issue before
                now?</span
              >
              <span class="faq-icon">{{ openIndex === 4 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 4 }">
              <p>
                The District dissolution has been a focus of the City for over a
                decade.
              </p>
              <p>
                In early 2025 the City voted for dissolution. The City and the
                District began to negotiate a more formalized plan for
                dissolution but were unable to come to an agreed upon plan.
              </p>
              <p>
                In July 2025 a court ordered each entity to submit their Plans
                for Dissolution by September 16th, 2025.
              </p>
              <p>
                Both parties presented their respective dissolution plans and
                there was a hearing in November, 2025.
              </p>
              <p>
                According to the judge, the District's plan was a "poison pill",
                not meeting the legal requirements of a Metro District.
              </p>
              <p>
                The City was able to acquire necessary signatures to place this
                issue on a ballot for voters to decide.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 5 }"
              @click="toggleFaq(5)"
            >
              <span>Q: How will this affect current parking rates?</span>
              <span class="faq-icon">{{ openIndex === 5 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 5 }">
              <p>
                This will bring these parking lots in line with public parking
                rates throughout the City. It will also allow for: monthly and
                year-round residential parking permits; will be subject to the
                free parking hours allocated each year for residents (currently
                set at 50 hours per year); and, free parking after 6 p.m. in the
                Wichita and Smeschny lots.
              </p>
              <p>
                Currently none of these are options provided under Metro
                District management.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              :class="{ active: openIndex === 6 }"
              @click="toggleFaq(6)"
            >
              <span
                >Q: Why were the bathrooms in the Wichita parking lot closed for
                three months last year and how will the City ensure this doesn't
                happen again?</span
              >
              <span class="faq-icon">{{ openIndex === 6 ? "−" : "+" }}</span>
            </button>
            <div class="faq-answer" :class="{ open: openIndex === 6 }">
              <p>
                Because the Wichita restrooms are managed by the Metro District,
                the City does not have jurisdiction over them. The Metro
                District (not the City) chose to close the restrooms, requesting
                that the City pay the Metro District to maintain them despite
                the restrooms being under the Metro District's management
                responsibilities. This was after the City paid for the
                remodeling of the restrooms to ensure they are ADA accessible,
                which the District was unwilling to do.
              </p>
              <p>
                The closing of these restrooms caused significant inconveniences
                to downtown businesses, residents and visitors. Though this
                issue has been a City priority for over a decade, the closure of
                the Wichita restrooms was a catalyst for moving forward with an
                attempt to negotiate with the District on a joint Dissolution
                Plan.
              </p>
              <p>
                Under City management these restrooms will remain open 365 days
                a year and serviced in line with other City managed public
                restrooms, such as those in Soda Springs Park.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const toggleFaq = (index) => {
  if (openIndex.value === index) {
    openIndex.value = null; // Close if already open
  } else {
    openIndex.value = index; // Open the clicked FAQ
  }
};
</script>

<style scoped>
.page-header {
  background-color: var(--white);
  border-bottom: 2px solid var(--border-color);
  padding: 2rem 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--brand-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-content {
  padding: 3rem 0;
}

.faq-list {
  max-width: 800px;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--white);
  transition: box-shadow 0.2s ease;
}

.faq-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-primary);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.faq-question:hover {
  background-color: var(--bg-color);
}

.faq-question.active {
  background-color: var(--bg-color);
  color: var(--brand-primary);
}

.faq-question span:first-child {
  flex: 1;
  line-height: 1.4;
}

.faq-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.3s ease, background-color 0.2s ease, color 0.2s ease;
}

.faq-question.active .faq-icon {
  background-color: var(--brand-primary);
  color: var(--white);
}

.faq-answer {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-primary);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 1.5rem;
}

.faq-answer.open {
  max-height: 5000px;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.faq-answer p {
  margin-bottom: 1rem;
}

.faq-answer p:last-child {
  margin-bottom: 0;
}

.faq-answer em {
  color: var(--text-secondary);
  font-style: italic;
}

.faq-answer ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.faq-answer li {
  margin-bottom: 0.75rem;
  line-height: 1.8;
}

.faq-answer li:last-child {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .page-header {
    padding: 3rem 0;
  }

  .page-title {
    font-size: 3rem;
  }

  .page-content {
    padding: 4rem 0;
  }

  .faq-question {
    font-size: 1.5rem;
  }

  .faq-answer {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .page-header {
    padding: 4rem 0;
  }

  .page-title {
    font-size: 3.5rem;
  }

  .page-content {
    padding: 5rem 0;
  }

  .faq-question {
    font-size: 1.75rem;
  }
}
</style>
