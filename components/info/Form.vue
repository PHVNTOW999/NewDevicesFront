<template>
  <div class="Form grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr]">

    <div class="mt-8">
      <b-button class="w-full" type="is-success" is-light @click="post()">Добавить</b-button>
    </div>

    <b-field label="№">
      <b-input class="w-full" v-model="form.no" type="number" />
    </b-field>

    <b-field label="Имя">
      <b-input class="w-full" v-model="form.name" />
    </b-field>

    <b-field label="Телефон">
      <b-input class="w-full" v-model="form.phone" />
    </b-field>

    <b-field label="Дата">
      <div class="flex w-full">
        <input class="w-full" type="datetime-local" v-model="form.datetime">
      </div>
    </b-field>

    <b-field label="Детали">
      <b-input class="w-full" v-model="form.details" type="details" />
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
        await this.$store.dispatch('info/POST_MEET', this.form)
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
    }
  },
  created() {
    this.form.datetime = null
  }
}
</script>

<style scoped>

</style>
