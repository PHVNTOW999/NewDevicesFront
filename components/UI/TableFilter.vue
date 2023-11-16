<template>
  <div class="table__filters p-5">
    <div class="table__filters-title">
      <h1 class="m-5 text-4xl text-center">Фильтр</h1>
    </div>
    <div :class="widthClass">

      <b-field v-for="obj in FIELDS" :label="obj.label">
        <FilterField :field="obj.field" :CLIENTS="CLIENTS" :clear="clearField" @returnedValue="returnedValue" />
      </b-field>

      <b-field class="mt-8">
        <b-tooltip label="Сбросить" position="is-left" class="w-full">
          <b-button type="is-danger"
                    icon-right="delete"
                    class="w-full"
                    @click="DEL__FILTERS" />
        </b-tooltip>
      </b-field>

    </div>
  </div>
</template>

<script>
import FilterField from "~/components/UI/FilterField.vue";

export default {
  name: "TableFilter",
  components: {FilterField},
  props:['FIELDS', 'CLIENTS', 'widthClass'],
  data() {
    return {
      filters: {},
      clearField: null,
    }
  },
  methods: {
    returnedValue(payload) {
      this.filters[payload.field] = payload.val
      this.$emit('returnedValue', this.filters)
    },
    DEL__FILTERS() {
      this.clearField += 1
      this.filters = null
      this.$emit('DEL__FILTERS')
    }
  },
  watch: {
    filters: {
      handler() {
        return this.$emit('returnedValue', this.filters)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
