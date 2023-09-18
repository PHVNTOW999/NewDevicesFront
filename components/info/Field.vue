<template>
  <div class="customInput">
    <b-field>

      <div v-if="field === 'status'" >
        <b-checkbox :value="!pole"
                    type="is-success"
                    v-if="pole">
          {{ pole ? 'Активно' : 'Завершено' }}
        </b-checkbox>

        <b-checkbox :value="!pole"
                    type="is-success"
                    v-else>
          {{ pole ? 'Активно' : 'Завершено' }}
        </b-checkbox>
      </div>

      <div v-if="field === 'No'" >
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'name'" >
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'phone'" >
        <b-input v-model="pole" />
        <div class="block text-center">
          <a :href="'tel: ' + pole">
            <b-button type="is-success" is-light>Позвонить</b-button>
          </a>
        </div>
      </div>

      <div v-if="field === 'datetime'" >
        <div class="flex w-52">
          <b-timepicker v-model="datetime.time"
                        placeholder="Click to select...">
            <b-button
              label="Now"
              type="is-primary"
              icon-left="clock"
              @click="datetime.time = new Date()" />
            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="datetime.time = null" />
          </b-timepicker>

          <b-datepicker v-model="datetime.date"
                        :first-day-of-week="1"
                        placeholder="Click to select...">

            <b-button
              label="Today"
              type="is-primary"
              icon-left="calendar-today"
              @click="datetime.date = new Date()" />

            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="datetime.date = null" />
          </b-datepicker>
        </div>

        <div class="text-center">
          <span class="tag is-success" v-if="pole.time">
            {{ pole.time }}
          </span>
          <span v-if="pole.time && pole.data">-</span>
          <span class="tag is-success"  v-if="pole.data">
            {{ new Date(pole.data).toLocaleDateString() }}
          </span>
        </div>

      </div>

      <div v-if="field === 'details'" >
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'delete'" >
        <b-button type="is-danger"
                  icon-right="delete" />
      </div>

    </b-field>
  </div>
</template>

<script>

export default {
  name: "customInput",
  props: ['data', 'field'],
  data() {
    return {
      pole: null,
      datetime: {
        time: new Date(),
        data: new Date(),
      }
    }
  },
  created() {
    this.pole = this.data
    // if(this.field === 'datetime') {
      // this.datetime.time = new Date()
      // this.datetime.time  = this.data.time
      // this.datetime.data = new Date()
      // this.datetime.data  = this.data.data
    // }
  }
}
</script>

<style scoped>

</style>
