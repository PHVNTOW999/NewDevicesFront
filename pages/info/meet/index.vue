<template>
  <div class="meets">
    <div class="main w-full">
      <div class="main__title">
        <h1 class="m-5 text-4xl text-center">{{ $t("header.meets") }}</h1>
      </div>
      <FormModal
        :FIELDS="MEETS_FORM_FIELDS"
        :CLIENTS="CLIENTS"
        :MaxNO="MEETS__MAX__NO"
        @submitForm="submitForm" />
      <TableFilter
        :FIELDS="MEETS_FILTER_FIELDS"
        :CLIENTS="CLIENTS"
        :widthClass="widthClass"
        @returnedValue="returnedValue"
        @DEL__FILTERS="DEL__FILTERS" />
      <Table class="mt-10"
             title="Data"
             :DATA="DATA"
             :FIELDS="FIELDS"
             :CLIENTS="CLIENTS"
              @save="save"
              @setClient="setClient"
              @MEETS__DEL__PHONE="MEETS__DEL__PHONE"
              @MEETS__DEL__EMAIL="MEETS__DEL__EMAIL"
              @del="del"/>
    </div>
  </div>
</template>

<script>

import TableFilter from "~/components/UI/TableFilter.vue";
import FormModal from "~/components/UI/FormModal.vue";
import Table from "~/components/UI/Table.vue";

export default {
  name: "index",
  components: {TableFilter, FormModal, Table},
  data() { return { windowWidth: window.innerWidth } },
  methods: {
    MEETS__DEL__PHONE(payload) {
      this.$store.commit('info/MEETS__DEL__PHONE', payload)
    },
    MEETS__DEL__EMAIL(payload) {
      this.$store.commit('info/MEETS__DEL__EMAIL', payload)
    },
    DEL__FILTERS() {
      this.$store.commit('info/DEL__FILTERS')
    },
    returnedValue(payload) {
      // if(payload.field == 'datetime')
      this.$store.commit('info/SET__FILTERS', payload)
    },
    // SET__FILTERS(payload) {
    //   this.$store.commit('info/SET__FILTERS', payload)
    // },
    async submitForm(payload) {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/POST__MEET', payload)

        this.$buefy.notification.open({
          message: 'Встречя добавлена',
          type: 'is-success'
        })
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        await this.$store.dispatch('info/GET__MEETS')
        loadingComponent.close()
      }
    },
    async save(payload) {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/PUT__MEET', payload)
        this.$buefy.notification.open({
          message: 'Сохранено',
          type: 'is-success'
        })
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        loadingComponent.close()
      }
    },
    async setClient(payload) {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/SET__CLIENT', payload)
        this.$buefy.notification.open({
          message: 'Сохранено',
          type: 'is-success'
        })
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        loadingComponent.close()
      }
    },
    async del(payload) {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/DEL__MEET', payload)
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        await this.$store.dispatch('info/GET__MEETS')
        loadingComponent.close()
      }
    },
    async GET_DATA() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/GET__MEETS')
        await this.$store.dispatch('info/GET__CLIENTS')
      } catch(e) {
        this.$buefy.notification.open({
          message: `Error: ${e}`,
          type: 'is-danger',
        })
      } finally {
        loadingComponent.close()
      }
    }
  },
  computed: {
    DATA() {
      return this.$store.getters["info/FILTERS__MEETS"]
    },
    FIELDS() {
      return this.$store.getters["info/MEETS_FIELDS"]
    },
    MEETS_FORM_FIELDS() {
      return this.$store.getters["info/MEETS_FORM_FIELDS"]
    },
    MEETS_FILTER_FIELDS() {
      return this.$store.getters["info/MEETS_FILTER_FIELDS"]
    },
    CLIENTS() {
      return this.$store.getters["info/CLIENTS"]
    },
    MEETS__MAX__NO() {
      return this.$store.getters["info/MEETS__MAX__NO"]
    },
    widthClass() {
      if(this.windowWidth > 425) return 'filter grid grid-cols-[0.1fr_0.3fr_1fr_1fr_1fr_1fr_0.01fr]'
      else return 'filter grid grid-cols-[1fr] text-center'
    }
  },
  async mounted() {
    await this.GET_DATA()
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
}
</script>

<style scoped>

</style>
