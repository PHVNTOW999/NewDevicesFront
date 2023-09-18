<template>
  <div class="compTable">
<!--    <div class="compTable__filters">-->
<!--      <div class="compTable__filters-title">-->
<!--        <h1>Фильтр</h1>-->
<!--      </div>-->
<!--      <div class="filter">-->
<!--        <b-field v-for="filter in MEET_COLUMNS" :key="filter.field">-->
<!--          <b-input :placeholder="filter.label"></b-input>-->
<!--        </b-field>-->
<!--      </div>-->
<!--    </div>-->
    <div class="compTable__body">
      <b-table
        :data="MEET_DATA"
        :bordered="true">

        <b-table-column field="status" label="Статус" sortable v-slot="props">
          <Field :data="props.row.status" :field="'status'" />
        </b-table-column>

        <b-table-column field="no" label="№" sortable v-slot="props">
          <Field :data="props.row.no" :field="'no'" />
        </b-table-column>

        <b-table-column field="name" label="Имя" sortable v-slot="props">
          <Field :data="props.row.name" :field="'name'" />
        </b-table-column>

        <b-table-column field="phone" label="Телефон" sortable v-slot="props">
          <Field :data="props.row.phone" :field="'phone'" />
        </b-table-column>

        <b-table-column field="datetime" label="Дата" sortable v-slot="props">
          <Field :data="props.row.datetime" :field="'datetime'" />
        </b-table-column>

        <b-table-column field="details" label="Детали" sortable v-slot="props">
          <Field :data="props.row.details" :field="'details'" />
        </b-table-column>

        <b-table-column field="delete" sortable v-slot="props">
          <Field :data="props.row" :field="'delete'" />
        </b-table-column>

      </b-table>
    </div>
  </div>
</template>

<script>
import Field from "~/components/info/Field.vue";

export default {
  name: "meetTable",
  components: {Field},
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
