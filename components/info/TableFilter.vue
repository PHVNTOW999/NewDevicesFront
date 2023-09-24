<template>
  <div class="table__filters">
    <div class="table__filters-title">
      <h1 class="m-5 text-4xl text-center">Фильтр</h1>
    </div>
    <div class="filter grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr]">

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
<!--        <input type="datetime-local" v-model="filter.datetime">-->
        <b-input class="w-full" v-model="filter.datetime" />
      </b-field>

      <b-field label="Детали">
        <b-input class="w-full" v-model="filter.details" type="details" />
      </b-field>

      <b-field>
        <b-tooltip label="Сбросить" position="is-left">
          <b-button type="is-danger"
                    icon-right="delete"
                    @click="$store.commit('info/DEL__FILTER')" />
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
    filter: {
      handler() {
        return this.$store.commit('info/SET__FILTER', this.filter)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
