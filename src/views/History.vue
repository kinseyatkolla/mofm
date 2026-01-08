<template>
  <div class="history-page">
    <section class="page-content">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">History of the Metro District</h2>
        </div>
      </div>

      <section class="page-content">
        <div class="container">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">1989</div>
              <div class="timeline-content">
                <p>
                  The Manitou Springs Metropolitan District (the District) was
                  established to manage public parking on behalf of the City of
                  Manitou Springs (the City). Since that time the District has
                  operated and maintained the Wichita Lot (86 parking spaces)
                  and the Smischny Lot (42 parking spaces), and in 2024 took
                  over the historic Ute Pass Motel property adjacent to Smichny,
                  with the hope for parking lot expansion. The District also
                  planned to create a Fountain Creek walking trail, but this has
                  not been fully developed.
                </p>
                <p>
                  The District was initially funded through a downtown property
                  tax mill levy and parking revenues. Over time parking fees
                  have mostly replaced the tax revenues for funding the
                  District's operations, though the District still receives some
                  funds from the mill levy.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">Late 1980s - 1990s</div>
              <div class="timeline-content">
                <p>
                  The District acquired and demolished the Wichita Motel, and
                  constructed the existing Wichita parking lot.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2010s - 2020s</div>
              <div class="timeline-content">
                <p>
                  City parking program expands and intergovernmental agreements
                  (IGAs) are formed between the District and the City for
                  District-managed parking maintenance.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2022</div>
              <div class="timeline-content">
                <p>
                  The City paid for ADA accessible bathrooms for the District
                  managed Wichita parking lot after the District board declined
                  to do so.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2023</div>
              <div class="timeline-content">
                <p>
                  The historic Ute Pass Motel was acquired by the Metro District
                  with the goal of expanding parking onto the property, however,
                  plans were stalled when the District board realized that they
                  first must go through the Historic Preservation Committee,
                  Planning Commission, and City Council to make any changes to
                  the property. It has been boarded up since.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2024 (December)</div>
              <div class="timeline-content">
                <p>
                  The two parties agreed to terminate the Intergovernmental
                  Agreement. The City then proposed dissolvement of the
                  District, with the District in disagreement. Both entities
                  proposed plans but could not decide on a good faith agreement.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2025 (January)</div>
              <div class="timeline-content">
                <p>
                  Metro District took over management from the City of the two
                  parking lots, hiring an outside company, while removing
                  parking permits and other benefits for residents and
                  businesses.
                </p>
                <p>
                  The District closed the Wichita bathrooms, claiming management
                  was not their responsibility. The District requested the City
                  should be responsible or pay the District up to $3,000 per
                  month to manage them.
                </p>
                <p>
                  Though this issue has been a City priority for over a decade,
                  the closure of the Wichita restrooms was a catalyst for moving
                  forward with an attempt to negotiate with the District on a
                  joint Dissolution Plan.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2025 (February)</div>
              <div class="timeline-content">
                <p>
                  Resolution 0425 for Dissolution resolution passed City
                  Council.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2025 (October)</div>
              <div class="timeline-content">
                <p>
                  The City's Dissolution plan was filed and court notice was
                  issued.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2025 (November)</div>
              <div class="timeline-content">
                <p>
                  Court hearing on the City's petition and Dissolution Plan. A
                  judge directed that the City put the proposed management Plan
                  before eligible voters in the Metro District's boundaries.
                  Further, the judge deemed the District's proposed plan a
                  "poison pill".
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2025 (December)</div>
              <div class="timeline-content">
                <p>New resolution was read and approved by City Council.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2026 (January)</div>
              <div class="timeline-content">
                <p>
                  The District hired an outside company to begin managing the
                  parking lots, which no longer allowed local residents the free
                  parking or parking pass benefits during peak tourist season
                  (March through October).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup></script>

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

.timeline {
  max-width: 900px;
  position: relative;
  padding-left: 0;
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--brand-primary);
  min-width: 80px;
  flex-shrink: 0;
  text-align: right;
}

.timeline-content {
  flex: 1;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.timeline-content p {
  margin: 0;
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

  .timeline-year {
    font-size: 1.75rem;
    min-width: 100px;
  }

  .timeline-content {
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

  .timeline-year {
    font-size: 2rem;
    min-width: 120px;
  }

  .timeline-content {
    font-size: 1.25rem;
  }
}

@media (max-width: 767px) {
  .timeline-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .timeline-year {
    text-align: left;
    min-width: auto;
  }
}
</style>
