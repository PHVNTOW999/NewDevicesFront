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

      <div v-if="field === 'no'" >
        <b-input v-model="pole" type="number" />
      </div>

      <div v-if="field === 'name'" >
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'phone'" >
        <b-input v-model="pole" type="tel" />
        <div class="block text-center">
          <a :href="'tel: ' + pole">
            <b-button type="is-success" is-light>Позвонить</b-button>
          </a>
        </div>
      </div>

      <div v-if="field === 'datetime'" >
        <div class="flex w-52">
          <input type="time" v-model="pole.time">
          <span> | </span>
          <input type="date" v-model="pole.data">
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
      pole: {
        time: null,
        date: null,
      },
    }
  },
  created() {
    this.pole = this.data
    if(this.field === 'datetime') {
      this.pole.time = this.data.time
      this.pole.date = this.data.date
    }
  }
}
</script>

<style scoped>

</style>
