<template>
  <div class="Form">

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
<!--            <b-input class="w-full" v-model="form[obj.field]" :type="obj.type" />-->
            <Field :data="obj.field"
                   :field="obj.field" />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button
            label="Close" />
          <b-button
            label="Save"
            type="is-success" />
        </footer>
      </div>
    </b-modal>

  </div>

</template>

<script>
import Field from "~/components/UI/Field.vue";

export default {
  name: "Form",
  components: {Field},
  data() {
    return {
      modalActive: false,
      form: {
        isActive: true,
        no: null,
        name: null,
        phone: null,
        datetime: new Date(),
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
  computed: {
    MEET_DATA() {
      return this.$store.getters["info/MEETS"]
    },
    FIELDS() {
      return this.$store.getters["info/MEETS_FORM_FIELDS"]
    }
  },
  created() {
    this.form.datetime = null
  }
}
</script>

<style scoped>

</style>
