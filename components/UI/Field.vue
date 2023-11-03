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
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
        <b-input v-model="pole" type="number" />
      </div>

      <div class="flex justify-between" v-if="field === 'name'">
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
        <b-input v-model="pole" />
      </div>

      <div class="flex justify-between" v-if="field === 'client'">
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateClientBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
        <div v-if="CLIENTS">
          <multiselect v-model="pole" :options="CLIENTS" track-by="name" label="name" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }">
              <strong>{{ option.name }}</strong>
            </template>
          </multiselect>
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'contacts'">
        <div @click="modalActive = true">
          <b-icon
            icon="phone"
            size="is-medium" />
        </div>

        <b-modal
          v-model="modalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          aria-role="dialog"
          aria-label="Example Modal"
          close-button-aria-label="Close"
          aria-modal>
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Contacts</p>
              <button
                type="button"
                class="delete"
                @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
              <b-field label="Phones">
                <div class="addPhone">
                  <div class="addPhone__input">
                    <b-input
                      type="text"
                      v-model="phoneInput"
                      placeholder="Write phone">
                    </b-input>
                    <b-input
                      type="text"
                      v-model="phoneDesc"
                      placeholder="Write phone's description">
                    </b-input>
                  </div>
                  <div class="addPhone__btn">
                    <b-tooltip label="Добавить номер" position="is-left">
                      <b-button type="is-success"
                                size="is-small"
                                icon-right="plus"
                                @click="updateContacts()"/>
                    </b-tooltip>
                  </div>
                </div>
                <div class="phoneList">
                  <div class="phoneBlock" v-for="phone in contacts.phones" :key="phone.uuid">
                    <a :href="'tel:' + phone.num"><h1 class="hover:text-sky-400">{{ phone.num }}</h1></a>
                    <p>{{ phone.uuid }}</p>
                    <b-tooltip label="Удалить номер" position="is-left">
                      <b-button type="is-danger"
                                size="is-small"
                                icon-right="delete"
                                @click="delPhone(phone.uuid)"/>
                    </b-tooltip>
                  </div>
                </div>
              </b-field>

              <b-field label="Emails">
                <div class="addEmail">
                  <b-input
                    type="text"
                    v-model="emailInput"
                    placeholder="Write email">
                  </b-input>
                </div>
                <div class="emailList">
                  <div class="emailBlock" v-for="email in contacts.emails">
                    {{ email.name }}
                  </div>
                </div>
              </b-field>

            </section>
          </div>
        </b-modal>
      </div>

      <div class="flex justify-between" v-if="field === 'datetime'" >
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
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
      </div>

      <div class="flex justify-between" v-if="field === 'details'">
        <div @click="updateBTN()">
          <SaveBTN />
        </div>
        <b-input v-model="pole" />
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

export default {
  name: "customInput",
  props: ['uuid', 'data', 'field', 'contacts'],
  components: {DelBTN, SaveBTN, Multiselect },
  data() {
    return {
      pole: null,

      modalActive: false,
      phoneInput: null,
      phoneDesc: null,
      emailInput: null,
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
    async updateContacts() {
      const loadingComponent = this.$buefy.loading.open()
      const form = {
        num: this.phoneInput,
        desc: this.phoneDesc
      }
      try {
        const phoneUUID = await this.$store.dispatch('info/POST__PHONE', form)
        const newForm = {
          uuid: this.uuid,
          data: {
            phones: phoneUUID,
            emails: "",
            client: ""
          }
        }
        await this.$store.dispatch('info/SET__CONTACT', newForm)
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
        setTimeout(() => {
          this.$store.dispatch('info/GET__MEETS')
        }, 100)
        loadingComponent.close()
      }
    },
    async delPhone(payload) {
      const loadingComponent = this.$buefy.loading.open()

      const form = {}
      form["uuid"] = payload

      try {
        console.log(form)

        await this.$store.dispatch('info/DEL__CONTACT', form)

        this.$buefy.notification.open({
          message: 'Удалено!',
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
    }
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
