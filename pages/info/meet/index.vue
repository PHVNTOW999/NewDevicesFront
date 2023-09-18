<template>
  <div class="meets">
    <div class="table w-full">
      <meet-table />
    </div>
  </div>
</template>

<script>
import MeetTable from "~/components/info/meetTable.vue";

export default {
  name: "index",
  components: {MeetTable}
}
</script>

<style scoped>

</style>
