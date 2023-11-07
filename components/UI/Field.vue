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

      <div class="flex justify-between" v-if="field === 'no'">
        <b-input v-model="pole" type="number" />
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'name'">
        <b-input v-model="pole" />
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'client'">
        <div v-if="CLIENTS">
          <multiselect v-model="pole" :options="CLIENTS" track-by="name" label="name" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }">
              <strong>{{ option.name }}</strong>
            </template>
          </multiselect>
        </div>
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'contacts'">
        <ContactsModal :uuid="this.uuid" :contacts="this.contacts" />
      </div>

      <div class="flex justify-between" v-if="field === 'datetime'" >
        <b-datetimepicker v-model="pole"
                          placeholder="Click to select...">

          <template #left>
            <b-button
              label="Now"
              type="is-primary"
              icon-left="clock"
              @click="pole = new Date()" />
          </template>

          <template #right>
            <b-button
              label="Clear"
              type="is-danger"
              icon-left="close"
              outlined
              @click="pole = null" />
          </template>
        </b-datetimepicker>

        <div @click="updateBTN()">
          <SaveBTN />
        </div>

      </div>

      <div class="flex justify-between" v-if="field === 'details'">
        <b-input v-model="pole" />
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
      </div>

      <div v-if="field === 'delete'">
        <div @click="delBTN()">
          <DelBTN />
        </div>
      </div>

    </b-field>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SaveBTN from "~/components/UI/Buttons/SaveBTN.vue";
import DelBTN from "~/components/UI/Buttons/DelBTN.vue";
import ContactsModal from "~/components/UI/ContactsModal.vue";

export default {
  name: "customInput",
  props: ['uuid', 'data', 'field', 'contacts'],
  components: {ContactsModal, DelBTN, SaveBTN, Multiselect },
  data() {
    return {
      pole: null,
    }
  },
  methods: {
    updateClientBTN() {
      this.$buefy.dialog.confirm({
        message: 'Сохранить изменения?',
        cancelText: 'Нет',
        confirmText: 'Сохранить',
        onConfirm: () => this.setClient()
      })
    },
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
    async setClient() {
      const loadingComponent = this.$buefy.loading.open()

      const form = {
        uuid: this.uuid,
        data: {
          client: this.pole,
          phones: "",
          emails: ""
        }
      }

      try {
        await this.$store.dispatch('info/SET__CLIENT', form)
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
    },
  },
  computed: {
    CLIENTS() {
      return this.$store.getters["info/CLIENTS"]
    },
  },
  created() {
    if(this.field === 'datetime' && this.data !== null) {
      this.pole = new Date(this.data)
    }
    else this.pole = this.data
  }
}
</script>

<style scoped>

</style>
