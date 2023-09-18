<template>
  <div class="meets">
    <div class="table w-full">
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
  components: {Form, MeetTable}
}
</script>

<style scoped>

</style>
