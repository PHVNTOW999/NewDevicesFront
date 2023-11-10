<template>
  <div class="Form pr-5 pl-5">

    <div class="mt-8">
      <b-button class="w-full" type="is-success" is-light @click="modalActive = true">{{ $t("add") + $t("header.meets") }}</b-button>
    </div>

    <b-modal
      v-model="modalActive"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal>
      <div class="modal-card text-left" style="width: auto">
        <header class="modal-card-head">
          <h1 class="modal-card-title">Add Meet</h1>
        </header>

        <section class="modal-card-body">
          <b-field v-for="obj in FIELDS" :label="obj.label">
            <FormField :field="obj.field" :CLIENTS="CLIENTS" :MaxNO="MaxNO" @returnedValue="returnedValue" />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button
            label="Close"
            @click="modalActive = false" />
          <b-button
            label="Save"
            type="is-success"
            @click="$emit('submitForm', form)"/>
        </footer>
      </div>
    </b-modal>

  </div>

</template>

<script>
import FormField from "~/components/UI/FormField.vue";

export default {
  name: "FormModal",
  props: ['FIELDS', 'CLIENTS', 'MaxNO'],
  components: {FormField},
  data() {
    return {
      modalActive: false,
      form: {
        isActive: false,
        no: "",
        client: "",
        datetime: "",
        details: "",
      },
    }
  },
  methods: { returnedValue(payload) { this.form[payload.field] = payload.val } },
  created() { this.form.datetime = null }
}
</script>

<style scoped>

</style>
