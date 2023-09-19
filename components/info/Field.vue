<template>
  <div class="customInput">
    <b-field>

      <div v-if="field === 'status'" @click="update()">
        <b-checkbox v-model="pole"
                    type="is-success">
          <span>{{ !pole ? 'Завершено' : 'Активно' }}</span>
        </b-checkbox>
      </div>

      <div v-if="field === 'no'" >
        <b-input v-model="pole" type="number" />
      </div>

      <div v-if="field === 'name'">
        <b-input v-model="pole" />
      </div>

      <div class="flex" v-if="field === 'phone'" >
        <b-input v-model="pole" type="tel" />
        <div class="block text-center pt-1">
          <a :href="'tel: ' + pole">
            <b-button type="is-success" size="is-small" is-light>Позвонить</b-button>
          </a>
        </div>
      </div>

      <div v-if="field === 'datetime'" >
        <div class="flex">
          <input type="datetime-local" v-model="pole">
        </div>
      </div>

      <div v-if="field === 'details'" >
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'delete'" >
        <b-button type="is-danger"
                  icon-right="delete"
                  @click="del" />
      </div>

    </b-field>
  </div>
</template>

<script>

export default {
  name: "customInput",
  props: ['uuid', 'data', 'field'],
  data() {
    return {
      pole: null
    }
  },
  methods: {
    async update() {
      const loadingComponent = this.$buefy.loading.open()

      const form = {}
      form['uuid'] = this.uuid
      form['field'] = {}
      form.field[this.field] = this.pole

      try {
        await this.$store.dispatch('info/PUT_MEET', form)
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
    async del() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        await this.$store.dispatch('info/DEL_MEET', this.uuid)
        // this.$buefy.notification.open({
        //   message: 'Удалено',
        //   type: 'is-success'
        // })
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        setTimeout(() => {
          this.$store.dispatch('info/GET_MEETS')
          this.$router.go()
        }, 100)
        loadingComponent.close()
      }
    }
  },
  watch: {
    pole() {
      if(this.pole !== null && this.pole !== this.data) this.update()
    }
  },
  created() {
    this.pole = this.data
  }
}
</script>

<style scoped>

</style>
