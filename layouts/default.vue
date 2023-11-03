<template>
  <div class="app">
    <TheHeader />
    <Nuxt />
  </div>
</template>
<script>

import TheHeader from "~/components/TheHeader.vue";

export default {
  name: 'DefaultLayout',
  components: {TheHeader},
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
