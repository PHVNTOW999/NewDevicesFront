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
<!--        <input type="datetime-local" v-model="form.datetime">-->
        <b-datetimepicker class="w-full" v-model="form.datetime">

          <template #left>
            <b-button
              label="Сегодня"
              type="is-primary"
              icon-left="clock"
              @click="form.datetime = new Date()" />
          </template>

          <template #right>
            <b-button
              label="Удалить"
              type="is-danger"
              icon-left="close"
              outlined
              @click="form.datetime = null" />
          </template>
        </b-datetimepicker>
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
        datetime: new Date().toLocaleDateString(),
        details: null,
      },
    }
  },
  methods: {
    async post() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/POST_MEET', this.form)
        // this.$buefy.notification.open({
        //   message: 'Добавлено',
        //   type: 'is-success'
        // })
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
  watch: {
    // 'form.datetime'() {
    //   this.form.datetime = new Date().toLocaleDateString()
    // }
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
