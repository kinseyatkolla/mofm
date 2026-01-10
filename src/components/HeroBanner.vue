<template>
  <section class="hero-banner">
    <div class="banner-image-container">
      <img
        src="../assets/MofMPostcard2.png"
        alt="Moving on from Metro Campaign Banner"
        class="banner-image"
      />
    </div>
    <h1 class="vote-header">🗳️ Vote YES by March 3rd</h1>
  </section>
</template>

<style scoped>
.hero-banner {
  width: 100%;
  padding: 0;
  margin: 0;
}

.banner-image-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 400px;
  /* Wavy mask with fixed 30px wave height and 60px wavelength - repeats horizontally */
  /* Mask covers full height with wavy bottom edge at exactly 30px */
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 800'%3E%3Cpath d='M0,0 L0,770 Q15,755 30,770 Q45,785 60,770 L60,0 Z' fill='white'/%3E%3C/svg%3E");
  mask-size: 60px 800px;
  mask-repeat: repeat-x;
  mask-position: left bottom;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 800'%3E%3Cpath d='M0,0 L0,770 Q15,755 30,770 Q45,785 60,770 L60,0 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 60px 800px;
  -webkit-mask-repeat: repeat-x;
  -webkit-mask-position: left bottom;
}

@media (min-width: 768px) {
  .banner-image {
    max-height: 500px;
  }
}

@media (min-width: 1024px) {
  .banner-image {
    max-height: 600px;
  }
}

.vote-header {
  text-align: center;
  font-size: 2rem;
  font-weight: 200;
  margin-top: 1rem;
  color: grey;
}

@media (min-width: 768px) {
  .vote-header {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .vote-header {
    font-size: 3rem;
  }
}
</style>
