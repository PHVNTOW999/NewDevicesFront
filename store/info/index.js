export const state = () => ({
  meets: null,
  filteredMeets: null,
})

export const getters = {
  MEETS(state) {
    return state.meets
  },
}

export const mutations = {
  SET__MEETS(state, payload) {
    state.meets = payload
  },
  SET__FILTER(state, payload) {
    // let mass = state.meets
    let newFilter = []

    Object.keys(payload).forEach((filter) => {
      if(payload[filter] !== null || undefined) {
        this.newFilter = state.meets.filter((el) => {
          console.log(payload[filter], typeof(payload[filter]))
          return el[filter] == payload[filter]
        })
      }
    })
    state.filteredMeets = this.newFilter
  },
  DEL__FILTER(state) {
    state.filteredMeets = state.meets
  }
}

export const actions = {
  GET__MEETS({ commit }) {
    return new Promise((res, rej) => {
      this.$axios.$get(`/api/info/meetlist/`).then((data) => {
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
  PATCH__MEET__DATETIME({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$patch(`/api/info/meet/${payload.uuid}/`, payload.field).then((data) => {
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
}
