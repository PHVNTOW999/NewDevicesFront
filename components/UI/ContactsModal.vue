<template>
  <div>
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
      <div class="modal-card text-left" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Contacts</p>
          <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
        </header>
        <section class="modal-card-body">
          <b-field label="Add Phone">

            <div class="addPhone grid grid-cols-[1fr_0.3fr]">
              <div class="addPhone__input">
                <b-input
                  class="w-full"
                  type="text"
                  v-model="phoneNum"
                  placeholder="Write phone"
                  @keyup.native.enter="addPhone()" />
                <b-input
                  class="w-full"
                  type="text"
                  v-model="phoneDesc"
                  placeholder="Write phone's description"
                  @keyup.native.enter="addPhone()" />
              </div>
              <div class="addPhone__btn ml-2 h-full">
                <b-tooltip label="Добавить номер" position="is-top" class="h-full">
                  <b-button type="is-success"
                            class="h-full"
                            size="is-small"
                            icon-right="plus"
                            @click="addPhone()" />
                </b-tooltip>
              </div>
            </div>

          </b-field>

          <b-field>

            <div class="phoneList pr-16">

              <div class="phoneListOld">
                <div class="phoneBlock mt-1 p-2 flex justify-between shadow-2xl shadow-black-300/80"
                     v-for="(phone, i) in contacts.phones"
                     :key="phone.uuid">
                  <a :href="'tel:' + phone.num"><h1 class="hover:text-emerald-500">{{ phone.num }}</h1></a>
                  <span v-if="phone.desc">-</span>
                  <p>{{ phone.desc }}</p>
                  <b-tooltip label="Удалить номер" position="is-left">
                    <b-button type="is-danger"
                              size="is-small"
                              icon-right="delete"
                              @click="delPhone(i, phone.uuid)"/>
                  </b-tooltip>
                </div>
              </div>

              <div class="phoneListNew">
                <div class="phoneBlock mt-1 p-2 flex justify-between shadow-2xl shadow-black-300/80"
                     v-for="(phone, i) in newPhones"
                     :key="phone.id">
                  <a :href="'tel:' + phone.num"><h1 class="hover:text-emerald-500">{{ phone.num }}</h1></a>
                  <span v-if="phone.desc">-</span>
                  <p>{{ phone.desc }}</p>
                  <b-tooltip label="Удалить номер" position="is-left">
                    <b-button type="is-danger"
                              size="is-small"
                              icon-right="delete"
                              @click="delNewPhone(i)"/>
                  </b-tooltip>
                </div>
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

        <footer class="modal-card-foot">
          <b-button
            label="Close"
            @click="modalActive = false" />
          <b-button
            label="Save"
            type="is-success"
            @click="saveContacts()"/>
        </footer>

      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: "ContactsModal",
  props: ['uuid', 'contacts'],
  data() {
    return {
      modalActive: false,
      phoneNum: null,
      phoneDesc: null,
      emailInput: null,

      newPhones: [],
      deletedPhones: [],
    }
  },
  watch: {
    modalActive() {
      this.modalActive ? this.modalActive = true : this.modalActive = false
      this.phoneNum = null
      this.phoneDesc = null
      this.emailInput = null
      this.newPhones = []
      this.deletedPhones = []

      // if(this.modalActive = false) await this.$store.dispatch('info/GET__MEETS')
    }
  },
  methods: {
    addPhone() {
      if(this.phoneNum) {
        const form = {
          uuid: this.uuid,
          data: {
            id: this.newPhones.length,
            num: this.phoneNum,
            desc: this.phoneDesc,
          }
        }
        this.newPhones.push(form.data)
        this.phoneNum = null
        this.phoneDesc = null
      }
    },
    delNewPhone(i) {
      this.newPhones.splice(i, 1)
    },
    async postPhone(payload) {
      const loadingComponent = this.$buefy.loading.open()
      const form = {
        num: payload.num,
        desc: payload.desc
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
      } catch(e) {
        this.$buefy.notification.open({
          message: `Ошибка: ${e}`,
          type: 'is-danger',
        })
      } finally {
        loadingComponent.close()
      }
    },
    delPhone(i, uuid) {
      const form = {
        uuid: this.uuid,
        data: i
      }
      this.$store.commit('info/MEETS__DEL__PHONE', form)
      this.deletedPhones.push(uuid)
    },
    async saveContacts() {
      const loadingComponent = this.$buefy.loading.open()
      try {
        // Phones
        if(this.newPhones.length) {
          for(let phone of this.newPhones) {
            await this.postPhone(phone)
          }
        }
        if(this.deletedPhones.length) {
          for(let phone of this.deletedPhones) {
            await this.$store.dispatch('info/DEL__PHONE', phone)
          }
        }
        // Emails
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
        await this.$store.dispatch('info/GET__MEETS')
        loadingComponent.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
