export const state = () => ({
  meets: null,
  meetsFields: [
    { field: 'isActive', label: 'Status'},
    { field: 'no', label: '№', type: 'number'},
    { field: 'client', label: 'Client'},
    { field: 'contacts', label: 'Contacts'},
    { field: 'datetime', label: 'Date - Time'},
    { field: 'details', label: 'Details'},
  ],

  filtersMeets: null,
  meetsFormFields: [
    { field: 'no', label: '№', type: 'number'},
    { field: 'name', label: 'Name'},
    { field: 'phone', label: 'Phone'},
    { field: 'datetime', label: 'Date'},
    { field: 'details', label: 'Details'},
  ],

  clients: null
})

export const getters = {
  MEETS(state) {
    return state.meets
  },
  FILTERS__MEETS(state) {
    return state.filtersMeets
  },
  MEETS_FIELDS(state) {
    return state.meetsFields
  },
  MEETS_FORM_FIELDS(state) {
    return state.meetsFormFields
  },
  CLIENTS(state) {
    return state.clients
  }
}

export const mutations = {
  SET__MEETS(state, payload) {
    state.meets = payload
    state.filtersMeets = payload
  },
  MEETS__DEL__PHONE(state, payload) {
    const meet = state.meets.find((meet) => {
      return meet.uuid === payload.uuid
    })
    meet.phones.splice(payload.data, 1)
  },
  SET__FILTERS(state, payload) {
    const copyFilter = Object.entries(payload)
    const copyArr = state.meets
    let res = []

    for (const [key, val] of copyFilter) {
      if(val !== null && val !== '') {
        copyArr.forEach(el => {
          const check = res.find((obj) => {
            return obj.uuid == el.uuid
          })
          if(String(el[key]).includes(val) && !check) res.push(el)
        })
      }
    }
    state.filtersMeets = res
  },
  DEL__FILTERS(state) {
    state.filtersMeets = state.meets
  },
  SET__CLIENTS(state, payload) {
    state.clients = payload
  },
}

export const actions = {
  // MEETS
  GET__MEETS({ commit }) {
    return new Promise((res, rej) => {
      this.$axios.$get(`/api/info/meetlist/`).then((data) =>{
        commit('SET__MEETS', data)
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  POST__MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$post(`/api/info/meetlist/`, payload).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  PUT__MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$put(`/api/info/meet/${payload.uuid}/`, payload.field).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  DEL__MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/info/meet/${payload}/`).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  // CLIENTS
  GET__CLIENTS({ commit }) {
    return new Promise((res, rej) => {
      this.$axios.$get(`/api/info/clientslist/`).then((data) => {
        commit('SET__CLIENTS', data)
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  SET__CLIENT({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$patch(`/api/info/meet/${payload.uuid}/`, payload.data).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  // CONTACTS
  POST__PHONE({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$post(`/api/info/phone/`, payload).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  DEL__PHONE({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/info/phone/${payload}`).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  // SET PHONE IR EMAIL
  SET__CONTACT({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$patch(`/api/info/meet/${payload.uuid}/`, payload.data).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
}
