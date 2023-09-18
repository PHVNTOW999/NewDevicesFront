<template>
  <div class="Form grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_0.34fr]">

    <div class="mt-8">
      <b-button type="is-success" is-light>Добавить</b-button>
    </div>

    <b-field label="№">
      <b-input v-model="form.no" type="number" />
    </b-field>

    <b-field label="Имя">
      <b-input v-model="form.name" />
    </b-field>

    <b-field label="Телефон">
      <b-input v-model="form.phone" type="tel" />
    </b-field>

    <b-field label="Дата">
      <div class="flex w-52">
        <b-timepicker v-model="form.datetime.time"
                      placeholder="Click to select...">
          <b-button
            label="Now"
            type="is-primary"
            icon-left="clock"
            @click="form.datetime.time = new Date()" />
          <b-button
            label="Clear"
            type="is-danger"
            icon-left="close"
            outlined
            @click="form.datetime.time = null" />
        </b-timepicker>

        <b-datepicker v-model="form.datetime.date"
                      :first-day-of-week="1"
                      placeholder="Click to select...">

          <b-button
            label="Today"
            type="is-primary"
            icon-left="calendar-today"
            @click="form.datetime.date = new Date()" />

          <b-button
            label="Clear"
            type="is-danger"
            icon-left="close"
            outlined
            @click="form.datetime.date = null" />
        </b-datepicker>
      </div>
    </b-field>

    <b-field label="Детали">
      <b-input v-model="form.details" type="details" />
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
        status: true,
        no: null,
        name: null,
        phone: null,
        datetime: {
          time: null,
          date: null,
        },
        details: null,
      },
    }
  },
  computed: {
    MEET_DATA() {
      return this.$store.getters["info/MEET_DATA"]
    }
  }
}
</script>

<style scoped>

</style>
