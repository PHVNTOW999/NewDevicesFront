<template>
  <div class="table__filters">
    <div class="table__filters-title">
      <h1 class="m-5 text-4xl text-center">Фильтр</h1>
    </div>
    <div class="filter grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_0.1fr]">

      <b-field label="Статус">
        <b-checkbox v-model="filters.isActive"
                    type="is-success">
          <span>{{ !filters.isActive ? 'Завершено' : 'Активно' }}</span>
        </b-checkbox>
      </b-field>

      <b-field label="№">
        <b-input class="w-full" v-model="filters.no" type="number" />
      </b-field>

      <b-field label="Имя">
        <b-input class="w-full" v-model="filters.name" />
      </b-field>

      <b-field label="Телефон">
        <b-input class="w-full" v-model="filters.phone" />
      </b-field>

      <b-field label="Дата">
<!--        <input type="datetime-local" v-model="filter.datetime">-->
        <b-input class="w-full" v-model="filters.datetime" />
      </b-field>

      <b-field label="Детали">
        <b-input class="w-full" v-model="filters.details" type="details" />
      </b-field>

      <b-field class="mt-8">
        <b-tooltip label="Сбросить" position="is-left">
          <b-button type="is-danger"
                    icon-right="delete"
                    @click="DEL__FILTERS" />
        </b-tooltip>
      </b-field>

    </div>
  </div>
</template>

<script>
export default {
  name: "TableFilter",
  data() {
    return {
      filters: {
        isActive: null,
        no: null,
        name: null,
        phone: null,
        datetime: null,
        details: null,
      }
    }
  },
  methods: {
    DEL__FILTERS() {
      this.filters = {
        isActive: null,
        no: null,
        name: null,
        phone: null,
        datetime: null,
        details: null,
      }
      setTimeout(() => {
        this.$store.commit('info/DEL__FILTERS')
      }, 100)
    }
  },
  watch: {
    filters: {
      handler() {
        return this.$store.commit('info/SET__FILTERS', this.filters)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
