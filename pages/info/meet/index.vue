<template>
  <div class="meets">
    <div class="main w-full">
      <div class="main__title">
        <h1 class="m-5 text-4xl text-center">Встречи</h1>
      </div>
      <Form />
      <meet-table class="mt-10" />
    </div>
  </div>
</template>

<script>
import MeetTable from "~/components/info/meetTable.vue";
import Form from "~/components/info/Form.vue";

export default {
  name: "index",
  components: {Form, MeetTable},
  methods: {
    async GET_DATA() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/GET_MEETS')
      } catch(e) {
        this.$buefy.notification.open({
          message: `Error: ${e}`,
          type: 'is-danger',
        })
      } finally {
        setTimeout(() => {
          this.$store.dispatch('info/GET_MEETS')
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
