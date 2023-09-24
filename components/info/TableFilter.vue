<template>
  <div class="table__filters">
    <div class="table__filters-title">
      <h1 class="m-5 text-4xl text-center">Фильтр</h1>
    </div>
    <div class="filter grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr]">

      <b-field label="Статус">
        <b-checkbox v-model="filter.isActive"
                    type="is-success">
          <span>{{ !filter.isActive ? 'Завершено' : 'Активно' }}</span>
        </b-checkbox>
      </b-field>

      <b-field label="№">
        <b-input class="w-full" v-model="filter.no" type="number" />
      </b-field>

      <b-field label="Имя">
        <b-input class="w-full" v-model="filter.name" />
      </b-field>

      <b-field label="Телефон">
        <b-input class="w-full" v-model="filter.phone" />
      </b-field>

      <b-field label="Дата">
        <b-input class="w-full" v-model="filter.datetime" />
      </b-field>

      <b-field label="Детали">
        <b-input class="w-full" v-model="filter.details" type="details" />
      </b-field>

    </div>
  </div>
</template>

<script>
export default {
  name: "TableFilter",
  data() {
    return {
      filter: {
        isActive: null,
        no: null,
        name: null,
        phone: null,
        datetime: null,
        details: null,
      }
    }
  },
  watch: {
    'filter.isActive'() {
      return this.$store.commit('info/SET_FILTER', this.filter)
      // return this.$store.getters["info/SET_FILTER"]
    }
  }
}
</script>

<style scoped>

</style>
