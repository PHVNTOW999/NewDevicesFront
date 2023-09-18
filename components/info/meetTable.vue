<template>
  <div class="table">
    <div class="table__filters">
      <div class="table__filters-title">
        <h1>Фильтр</h1>
      </div>
      <div class="filter">
        <b-field v-for="filter in MEET_COLUMNS" :key="filter.field">
          <b-input :placeholder="filter.label"></b-input>
        </b-field>
      </div>
    </div>
    <div class="table__body">
      <div class="table__body-title">
        <h1>Сортировка</h1>
      </div>
      <b-table
        :data="MEET_DATA"
        bordered="isBordered">

        <b-table-column field="status" label="Статус" sortable v-slot="props">

          <b-checkbox :value="!props.row.status"
                      type="is-success"
                      v-if="props.row.status">
            {{ props.row.status ? 'Активно' : 'Завершено' }}
          </b-checkbox>

          <b-checkbox :value="!props.row.status"
                      type="is-success"
                      v-else>
            {{ props.row.status ? 'Активно' : 'Завершено' }}
          </b-checkbox>

        </b-table-column>

        <b-table-column field="No" label="№" sortable v-slot="props">
          {{ props.row.No }}
        </b-table-column>

        <b-table-column field="name" label="Имя" sortable v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="phone" label="Телефон" sortable v-slot="props">
          <a :href="'tel: ' + props.row.phone">{{ props.row.phone }}</a>
        </b-table-column>

        <b-table-column field="date" label="Дата" sortable v-slot="props">
          <span class="tag is-success">
            {{ props.row.time }}
          </span>
          -
          <span class="tag is-success">
            {{ new Date(props.row.date).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="details" label="Детали" sortable v-slot="props">
          {{ props.row.details }}
        </b-table-column>

        <b-table-column field="delete" sortable v-slot="props">
          <b-button type="is-danger"
                    icon-right="delete" />
        </b-table-column>

      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "meetTable",
  computed: {
    MEET_DATA() {
      return this.$store.getters["info/MEET_DATA"]
    },
    MEET_COLUMNS() {
      return this.$store.getters["info/MEET_COLUMNS"];
    }
  }
}
</script>

<style scoped>

</style>
