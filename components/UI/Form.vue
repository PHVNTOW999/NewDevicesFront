<template>
  <div class="Form grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr]">

    <div class="mt-8">
      <b-button class="w-full" type="is-success" is-light @click="post()">{{ $t("add") }}</b-button>
    </div>

    <b-field v-for="obj in FIELDS" :label="obj.label">
      <b-input class="w-full" v-model="form[obj.field]" :type="obj.type" />
    </b-field>

    <hr />
  </div>

</template>

<script>

export default {
  name: "Form",
  data() {
    return {
      form: {
        isActive: true,
        no: null,
        name: null,
        phone: null,
        datetime: new Date(),
        details: null,
      },
    }
  },
  methods: {
    async post() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/POST__MEET', this.form)
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        this.$router.go(0)
        loadingComponent.close()
      }
    },
  },
  computed: {
    MEET_DATA() {
      return this.$store.getters["info/MEETS"]
    },
    FIELDS() {
      return this.$store.getters["info/MEETS_FORM_FIELDS"]
    }
  },
  created() {
    this.form.datetime = null
  }
}
</script>

<style scoped>

</style>
