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
        <b-select placeholder="Select a name" selected>
          <option
            v-for="client in CLIENTS"
            v-model="pole"
            selected
            :key="client.uuid">
            {{ client.name }}
          </option>
        </b-select>
<!--        <b-input v-model="pole.name" />-->
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
                  <b-input
                    type="text"
                    :value="emailInput"
                    placeholder="Write phone">
                  </b-input>
                </div>
                <div class="phoneList">
                  <div class="phoneBlock" v-for="phone in contacts.phones">
                    <h1><a :href="'tel:' + phone.num">{{ phone.num }}</a></h1>
                    <b-tooltip label="Удалить номер" position="is-left">
                      <b-button type="is-danger"
                                size="is-small"
                                icon-right="delete" />
                    </b-tooltip>
                  </div>
                </div>
              </b-field>

              <b-field label="Emails">
                <div class="addEmail">
                  <b-input
                    type="text"
                    :value="emailInput"
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
        <b-tooltip label="Сохранить">
          <div class="p-2 cursor-pointer" @click="updateBTN()">
            <b-icon
              icon="content-save-all-outline"
              size="is-medium" />
          </div>
        </b-tooltip>
<!--        <b-input v-model="pole" />-->
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
  props: ['uuid', 'data', 'field', 'contacts'],
  data() {
    return {
      pole: null,

      modalActive: false,
      phoneInput: null,
      emailInput: null,
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
    if(this.field === 'datetime') {
      this.pole = new Date(this.data)
    }
    else this.pole = this.data
  }
}
</script>

<style scoped>

</style>
