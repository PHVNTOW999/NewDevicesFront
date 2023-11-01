<template>
  <div class="index">
    <div class="currencies">
      <h1 class="currencies__title">Курс Валют</h1>
      {{ CURR }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  computed: {
    CURR() {
      return this.$store.getters["main/CURRENCY"]
    }
  },
  created() {
    // this.$store.dispatch('main/GET_CURRENCIES')
  }
}
</script>
