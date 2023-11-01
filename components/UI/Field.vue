<template>
  <div class="customInput">
    <b-field>

      <div v-if="field === 'isActive'" @click="updateBTN()">
        <b-checkbox v-model="pole"
                    type="is-success">
          <span :class="pole ? 'line-through' : 'no-underline'">
            {{ pole ? $t("field.isDone") : $t("field.active") }}
          </span>
        </b-checkbox>
      </div>

      <div class="flex justify-between" v-if="field === 'no'" >
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-input v-model="pole" type="number" />
      </div>

      <div class="flex justify-between" v-if="field === 'name'">
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-input v-model="pole" />
      </div>

      <div class="flex justify-between" v-if="field === 'client'">
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-select placeholder="Select a name">
          <option
            v-for="client in CLIENTS"
            :value="pole"
            :key="client.uuid">
            {{ client.name }}
          </option>
        </b-select>
<!--        <b-input v-model="pole.name" />-->
      </div>

      <div class="flex justify-between" v-if="field === 'phone'">
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-input v-model="pole" type="tel" />
        <div class="block text-center pt-1">
          <a :href="'tel: ' + pole" class="p-2">
            <b-icon
              icon="phone"
              size="is-medium" />
          </a>
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'datetime'" >
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-input v-model="pole" />
      </div>

      <div class="flex justify-between" v-if="field === 'details'">
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <b-input v-model="pole" />
      </div>

      <div v-if="field === 'delete'">
        <b-tooltip label="Удалить" position="is-left">
          <b-button type="is-danger"
                    icon-right="delete"
                    @click="delBTN()" />
        </b-tooltip>
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
    updateBTN() {
      this.$buefy.dialog.confirm({
        message: 'Сохранить изменения?',
        cancelText: 'Нет',
        confirmText: 'Сохранить',
        onConfirm: () => this.update()
      })
    },
    delBTN() {
      this.$buefy.dialog.confirm({
        message: 'Удалить?',
        cancelText: 'Нет',
        confirmText: 'Удалить',
        onConfirm: () => this.del()
      })
    },
    async update() {
      const loadingComponent = this.$buefy.loading.open()

      const form = {}
      form['uuid'] = this.uuid
      form['field'] = {}
      form.field[this.field] = this.pole

      try {
        await this.$store.dispatch('info/PUT__MEET', form)
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
        await this.$store.dispatch('info/DEL__MEET', this.uuid)
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        this.$router.go(0)
        loadingComponent.close()
      }
    }
  },
  computed: {
    CLIENTS() {
      return this.$store.getters["info/CLIENTS"]
    },
  },
  created() {
    this.pole = this.data
  }
}
</script>

<style scoped>

</style>
