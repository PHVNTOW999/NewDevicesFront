<template>
  <div class="meets">
    <div class="main w-full">
      <div class="main__title">
        <h1 class="m-5 text-4xl text-center">{{ $t("header.meets") }}</h1>
      </div>
      <Form />
      <TableFilter />
      <Table class="mt-10" />
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
  created() {
    this.GET_DATA()
  }
}
</script>

<style scoped>

</style>
