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

        <b-table-column v-for="obj in FIELDS" :field="obj.field" :label="obj.label" v-slot="props">
          <Field :data="props.row[obj.field]" :field="obj.field" :uuid="props.row.uuid" />
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
    FIELDS() {
      return this.$store.getters["info/MEETS_FIELDS"]
    }
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
