<template>
  <div class="mayor-letter-page">
    <section class="page-content">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Letter from Manitou Springs Mayors</h2>
        </div>

        <p class="publication-blurb">
          Published in <a href="https://gazette.com/2026/02/02/a-unified-vision-for-downtown-manitou-springs/" target="_blank" rel="noopener noreferrer">The Gazette</a> Monday, February 2nd, 2026.
        </p>

        <div class="letter-paper">
          <div class="letter-content">
            <p class="letter-date">February 2, 2026</p>

            <h3 class="letter-title">
              A Unified Vision for Manitou Springs: Vote YES to Unify our
              Parking
            </h3>

            <p class="letter-quote">
              "As current and former Mayors, with over 40 years of collective
              service to Manitou Springs, we are writing to share our unified
              perspective on the future of our downtown."
            </p>

            <p class="letter-salutation">Dear Neighbor,</p>

            <p>
              As current and former Mayors, with over 40 years of collective
              service to Manitou Springs, we are writing to share our unified
              perspective on the future of our downtown. Many of us were
              actively involved in the community in 1989 when the Metro
              District was first envisioned, and all of us have been involved
              with parking needs and operations throughout our respective
              terms.
            </p>

            <p>
              <strong>In the late 1980s, our downtown faced a crisis:</strong> the Wichita
              Motel was a significant eyesore and we desperately needed
              off-street parking. At that time, the City lacked the funds to
              address this directly. In response, the Downtown merchants
              decided to organize the Manitou Springs Metropolitan District, a
              Special District under Colorado Law, as a necessary tool to buy
              the property and convert it into the lots there today. The
              Downtown merchants voluntarily agreed to pay a special property
              tax to help fund this. The taxable area is limited to the
              Downtown area. Its eligible voters include residents and
              business owners, provided the businesses are non-corporations.
            </p>

            <p>
              <strong>The District served its purpose well.</strong> We thank the volunteers
              who have served on the Metro Board for their dedication.
              However, we believe the time for that "workaround" has passed.
            </p>

            <p class="letter-subhead">
              Addressing the "Stealing" Claim:
            </p>
            <p>
              There has been suggestion that the City is "stealing" property.
              Having served as the city's legal and executive leaders, we want
              to clarify the reality:
            </p>

            <ul class="letter-list">
              <li><strong>A Public Trust:</strong> The District is a quasi-governmental entity that holds assets in trust for the public. By law, when it dissolves, those assets transfer to the City to ensure they stay in public hands.</li>
              <li><strong>Fulfilling the Promise:</strong> The District was created to solve a community problem. At the time, the City had a limited parking enforcement program. By 2022, the City had developed a more comprehensive parking program and formally created a Parking Enterprise Fund, a bank account fed by parking fees and dedicated to solving parking and transportation problems. Also, through an agreement with the Metro District Board of Directors, the City provided many of the day-to-day maintenance services for the Metro District, such as snow plowing, striping, etc. In light of the evolution, it makes sense to consolidate all parking assets under one integrated service, thereby providing the greatest flexibility for residents and simplifying parking for visitors and reducing congestion.</li>
            </ul>

            <p class="letter-subhead">Why the City is Ready Now:</p>

            <ul class="letter-list">
              <li><strong>End the Confusion:</strong> We can finally have one payment system and one set of rules for every lot in town, eliminating the frustration of the current "split" system.</li>
              <li><strong>Expert Oversight:</strong> The City's Mobility and Parking (MAP) Board includes residents and business stakeholders, ensuring strategy remains sensitive to our local economy and ensures accountability and transparency.</li>
              <li><strong>Financial Integrity:</strong> All revenues are legally restricted to the Parking Enterprise Fund, requiring they be reinvested back into parking and transportation issues. Downtown infrastructure and beautification activities can be a legitimate use of those funds.</li>
              <li><strong>Parking Benefits District Opportunity:</strong> With the dissolution of the Metropolitan Parking District, the city will implement a Parking Benefit Program that will greatly enhance the visitor experience and support the needs of our downtown residents.</li>
            </ul>

            <p>
              We appreciate your thoughtful consideration and a <strong>YES</strong> vote to dissolve the Metropolitan District.
            </p>

            <p class="letter-closing">Sincerely,</p>

            <div class="letter-signatures">
              <p>Mayor Natalie Johnson</p>
              <p>Former Mayor John Graham</p>
              <p>Former Mayor Ken Jaray</p>
              <p>Colorado State Senator and Former Mayor Marc Snyder</p>
              <p>Former Mayor Bill Koerner</p>
              <p>Former Mayor Dan Stuart</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.page-content {
  padding: 3rem 0;
}

.publication-blurb {
  font-size: 1rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 2rem;
}

/* Letter paper: 8.5" x 11" aspect, white background, drop shadow */
.letter-paper {
  max-width: 816px; /* 8.5" at 96dpi */
  margin: 0 auto;
  background-color: var(--white);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 3rem 2.5rem;
  min-height: 400px;
}

.letter-content {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.85;
  color: #000000;
}

.letter-content p {
  margin-bottom: 1.25rem;
}

.letter-content p:last-child {
  margin-bottom: 0;
}

.letter-date {
  margin-bottom: 1.5rem !important;
  font-size: 1rem;
  color: #000000;
}

.letter-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 1.25rem;
  line-height: 1.35;
  text-align: center;
}

.letter-quote {
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1.5rem !important;
  text-align: center;
  font-size: 1.1rem;
}

.letter-salutation {
  margin-bottom: 1rem !important;
}

.letter-subhead {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: 1.5rem !important;
  margin-bottom: 0.5rem !important;
  color: #000000;
}

.letter-list {
  margin: 1rem 0 1.25rem 1.25rem;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.letter-list li {
  margin-bottom: 1rem;
  line-height: 1.85;
}

.letter-list li:last-child {
  margin-bottom: 0;
}

.letter-closing {
  margin-top: 1.5rem !important;
  margin-bottom: 1rem !important;
}

.letter-signatures {
  margin-top: 0.5rem;
}

.letter-signatures p {
  margin-bottom: 0.35rem;
}

@media (min-width: 768px) {
  .page-content {
    padding: 4rem 0;
  }

  .letter-paper {
    padding: 4rem 3.5rem;
  }

  .letter-content {
    font-size: 1.0625rem;
  }

  .letter-title {
    font-size: 1.65rem;
  }

  .letter-quote {
    font-size: 1.15rem;
  }
}

@media (min-width: 1024px) {
  .page-content {
    padding: 5rem 0;
  }

  .letter-paper {
    padding: 4.5rem 4rem;
  }

  .letter-content {
    font-size: 1.125rem;
  }

  .letter-title {
    font-size: 1.75rem;
  }

  .letter-quote {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .letter-paper {
    padding: 2rem 1.5rem;
  }
}
</style>
