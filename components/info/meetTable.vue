<template>
  <div class="table w-full">
    <div class="table__title">
      <h1 class="m-5 text-4xl text-center">Данные</h1>
    </div>
    <div class="table__body" v-if="DATA">
      <b-table
        :key="tableKey"
        :data="DATA"
        :bordered="true"
        ref="table">

        <b-table-column field="isActive" label="Статус" v-slot="props" sortable centered>
          <Field :data="props.row.isActive" :field="'isActive'" :uuid="props.row.uuid" />
        </b-table-column>

        <b-table-column field="no" label="№" v-slot="props" centered>
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
  data() { return { tableKey: 0 } },
  components: {Field},
  computed: {
    DATA() {
      return this.$store.getters["info/FILTERS__MEETS"]
    },
  },
  watch: {
    DATA() {
      return this.tableKey += 1
    },
    '$refs.table'() {
      return this.tableKey += 1
    }
  }
}
</script>

<style scoped>

</style>
