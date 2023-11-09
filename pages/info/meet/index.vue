<template>
  <div class="meets">
    <div class="main w-full">
      <div class="main__title">
        <h1 class="m-5 text-4xl text-center">{{ $t("header.meets") }}</h1>
      </div>
      <Form />
      <TableFilter />
      <Table class="mt-10"
             title="Data"
             :DATA="DATA"
             :FIELDS="FIELDS"
             :CLIENTS="CLIENTS"
              @save="save"
              @setClient="setClient"
              @del="del"/>
    </div>
  </div>
</template>

<script>

import TableFilter from "~/components/UI/TableFilter.vue";
import Form from "~/components/UI/Form.vue";
import Table from "~/components/UI/Table.vue";

export default {
  name: "index",
  components: {TableFilter, Form, Table},
  methods: {
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
        setTimeout(() => {
          this.$store.dispatch('info/GET__MEETS')
        }, 100)
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
    CLIENTS() {
      return this.$store.getters["info/CLIENTS"]
    },
  },
  created() {
    this.GET_DATA()
  }
}
</script>

<style scoped>

</style>
