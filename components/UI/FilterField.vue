<template>
  <div class="customInput">
    <b-field>

      <div v-if="field === 'isActive'">
        <b-checkbox v-model="pole"
                    type="is-success">
          <span :class="!pole ? 'line-through' : 'no-underline'">
            {{ !pole ? $t("field.isDone") : $t("field.active") }}
          </span>
        </b-checkbox>
      </div>

      <div class="flex justify-between" v-if="field === 'no'">
        <b-input class="w-full" v-model="pole" type="number" />
      </div>

      <div class="flex justify-between" v-if="field === 'name'">
        <b-input class="w-full" v-model="pole" />
      </div>

      <div class="flex justify-between" v-if="field === 'client'">
        <div v-if="CLIENTS" class="w-full">
          <multiselect v-model="pole" :options="CLIENTS" track-by="name" label="name" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }">
              <strong>{{ option.name }}</strong>
            </template>
          </multiselect>
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'datetime'" >
        <b-datetimepicker v-model="pole.from"
                          class="w-full"
                          placeholder="Click to select...">

          <template #left>
            <b-button
              label="Now"
              type="is-primary"
              icon-left="clock"
              @click="pole.from = new Date()" />
          </template>

          <template #right>
            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="pole.from = null" />
          </template>
        </b-datetimepicker>

        <b-datetimepicker v-model="pole.to"
                          class="w-full"
                          placeholder="Click to select...">

          <template #left>
            <b-button
              label="Now"
              type="is-primary"
              icon-left="clock"
              @click="pole.to = new Date()" />
          </template>

          <template #right>
            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="pole.to = null" />
          </template>
        </b-datetimepicker>
      </div>

      <div class="flex justify-between" v-if="field === 'details'">
        <b-input class="w-full" v-model="pole" type="text" />
      </div>

    </b-field>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import field from "~/components/UI/Field.vue";

export default {
  name: "FormField",
  props: ['field', 'CLIENTS', 'clear'],
  components: { Multiselect },
  data() {
    return {
      pole: null
    }
  },
  watch: {
    pole: {
      handler() {
        const payload = {
          field: this.field,
          val: this.pole
        }
        return this.$emit('returnedValue', payload)
      },
      deep: true
    },
    clear() { this.field && this.field === 'datetime' ? this.pole = { from: null, to: null } : this.pole = null }
  },
  created() { this.field && this.field === 'datetime' ? this.pole = { from: null, to: null } : this.pole = null }
}
</script>

<style scoped>

</style>
