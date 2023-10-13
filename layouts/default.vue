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
