<template>
  <div class="index-page">
    <HeroBanner />
    <WhatMoving />
    <WhatMetro />
    <Why />
    <Benefits />
    <DowntownParking />
    <AmIEligible />
    <Who />
    <WhenHow />
    <HowLearn />
    <UpcomingEvents />
    <Connect />
    <!-- <Endorsements /> -->
  </div>
</template>

<script setup>
import HeroBanner from "../components/HeroBanner.vue";
import WhatMoving from "../components/sections/WhatMoving.vue";
import WhatMetro from "../components/sections/WhatMetro.vue";
import Why from "../components/sections/Why.vue";
import Benefits from "../components/sections/Benefits.vue";
import DowntownParking from "../components/sections/DowntownParking.vue";
import AmIEligible from "../components/sections/AmIEligible.vue";
import Who from "../components/sections/Who.vue";
import WhenHow from "../components/sections/WhenHow.vue";
import HowLearn from "../components/sections/HowLearn.vue";
import UpcomingEvents from "../components/sections/UpcomingEvents.vue";
import Connect from "../components/sections/Connect.vue";
// import Endorsements from "../components/sections/Endorsements.vue";
</script>

<style scoped>
.index-page {
  padding-top: 0;
}
</style>
