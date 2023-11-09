<template>
  <div class="customInput">
    <b-field>

      <div v-if="field === 'isActive'" @click="saveBTN()">
        <b-checkbox v-model="pole"
                    type="is-success">
          <span :class="pole ? 'line-through' : 'no-underline'">
            {{ pole ? $t("field.isDone") : $t("field.active") }}
          </span>
        </b-checkbox>
      </div>

      <div class="flex justify-between" v-if="field === 'no'">
        <b-input class="w-full" v-model="pole" type="number" />
        <div @click="saveBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'name'">
        <b-input class="w-full" v-model="pole" />
        <div @click="saveBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'client'">
        <div v-if="CLIENTS" class="w-full">
          <multiselect v-model="pole" :options="CLIENTS" track-by="name" label="name" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }">
              <strong>{{ option.name }}</strong>
            </template>
          </multiselect>
        </div>
        <div @click="saveBTNClientBTN()">
          <SaveBTN />
        </div>
      </div>

      <div class="flex justify-between" v-if="field === 'contacts'">
        <ContactsModal :uuid="this.uuid" :contacts="this.contacts" />
      </div>

      <div class="flex justify-between" v-if="field === 'datetime'" >
        <b-datetimepicker v-model="pole"
                          class="w-full"
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

        <div @click="saveBTN()">
          <SaveBTN />
        </div>

      </div>

      <div class="flex justify-between" v-if="field === 'details'">
        <b-input class="w-full" v-model="pole" />
        <div @click="saveBTN()">
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
  props: ['uuid', 'data', 'field', 'contacts', 'CLIENTS'],
  components: {ContactsModal, DelBTN, SaveBTN, Multiselect },
  data() {
    return {
      pole: null,
    }
  },
  methods: {
    saveBTNClientBTN() {
      this.$buefy.dialog.confirm({
        message: 'Сохранить изменения?',
        cancelText: 'Нет',
        confirmText: 'Сохранить',
        onConfirm: () => this.setClient()
      })
    },
    saveBTN() {
      this.$buefy.dialog.confirm({
        message: 'Сохранить изменения?',
        cancelText: 'Нет',
        confirmText: 'Сохранить',
        onConfirm: () => this.save()
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
    save() {
      const payload = {}
      payload['uuid'] = this.uuid
      payload['field'] = {}
      payload.field[this.field] = this.pole

      this.$emit('save', payload)
    },
    setClient() {
      const payload = {
        uuid: this.uuid,
        data: {
          client: this.pole,
          phones: "",
          emails: ""
        }
      }

      this.$emit('setClient', payload)
    },
    async del() {
      const payload = this.uuid
      this.$emit('del', payload)
    }
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
