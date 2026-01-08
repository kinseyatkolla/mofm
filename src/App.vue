<template>
  <div id="app">
    <NavigationBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";
</script>

<style scoped>
main {
  min-height: calc(100vh - 60px);
}

@media (min-width: 768px) {
  #app {
    display: flex;
  }

  main {
    margin-left: 280px;
    min-height: 100vh;
    width: calc(100% - 280px);
  }
}

@media (min-width: 1024px) {
  main {
    margin-left: 320px;
    width: calc(100% - 320px);
  }
}
</style>
