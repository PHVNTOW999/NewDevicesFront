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
            <FormField :field="obj.field" :CLIENTS="CLIENTS" :MaxNO="MaxNO" />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button
            label="Close"
            @click="modalActive = false" />
          <b-button
            label="Save"
            type="is-success" />
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
        no: null,
        datetime: null,
        details: null,
      },
    }
  },
  methods: {
    async post() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/POST__MEET', this.form)
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        this.$router.go(0)
        loadingComponent.close()
      }
    },
  },
  created() {
    this.form.datetime = null
  }
}
</script>

<style scoped>

</style>
