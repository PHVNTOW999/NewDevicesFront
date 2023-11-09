<template>
  <div class="table w-full">
    <div class="table__title">
      <h1 class="m-5 text-4xl text-center">{{ $t(this.title) }}</h1>
    </div>
    <div class="table__body" v-if="DATA">
      <b-table
        :key="tableKey"
        :data="DATA"

        :bordered="true"
        ref="table">

        <b-table-column v-for="obj in FIELDS" :field="obj.field" :label="obj.label" v-slot="props">
          <Field :data="props.row[obj.field]"
                 :field="obj.field"
                 :contacts="{ 'phones': props.row.phones, 'emails': props.row.emails }"
                 :CLIENTS="CLIENTS"
                 :uuid="props.row.uuid"
                 @save="save"
                 @setClient="setClient" />
        </b-table-column>

        <b-table-column field="delete" v-slot="props">
          <Field :field="'delete'" :uuid="props.row.uuid" @del="del" />
        </b-table-column>

      </b-table>
    </div>
  </div>
</template>

<script>
import Field from "~/components/UI/Field.vue";
import {data} from "autoprefixer";

export default {
  name: "Table",
  computed: {
    data() {
      return data
    }
  },
  props: ['title', 'DATA', 'FIELDS', 'CLIENTS'],
  data() { return { tableKey: 0 } },
  components: {Field},
  methods: {
    save(payload) {
      this.$emit('save', payload)
    },
    setClient(payload) {
      this.$emit('setClient', payload)
    },
    del(payload) {
      this.$emit('del', payload)
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
