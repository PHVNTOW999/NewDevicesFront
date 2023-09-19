<template>
  <div class="table">
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
    <div class="tableable__body" v-if="MEET_DATA">
      <b-table
        :data="MEET_DATA"
        :bordered="true">

        <b-table-column field="status" label="Статус" v-slot="props">
          <Field :data="props.row.status" :field="'status'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="no" label="№" v-slot="props">
          <Field :data="props.row.no" :field="'no'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="name" label="Имя" v-slot="props">
          <Field :data="props.row.name" :field="'name'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="phone" label="Телефон" v-slot="props">
          <Field :data="props.row.phone" :field="'phone'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="datetime" label="Дата" v-slot="props">
          <Field :data="props.row.datetime" :field="'datetime'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="details" label="Детали" v-slot="props">
          <Field :data="props.row.details" :field="'details'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="delete" v-slot="props">
          <Field :field="'delete'" :uuid="props.row.uuid" />
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
      return this.$store.getters["info/MEETS"]
    },
  }
}
</script>

<style scoped>

</style>
