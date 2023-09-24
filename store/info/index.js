export const state = () => ({
  meets: null,
  // filteredMeets: null,
})

export const getters = {
  MEETS(state) {
    return state.meets
  },
  // SET_FILTER(state, payload) {
  //   const mass = state.meets
  //   state.meets = mass.filter((el) => {
  //     return el.isActive === payload.isActive
  //   })
  // }
}

export const mutations = {
  SET_MEETS(state, payload) {
    state.meets = payload
  },
  SET_FILTER(state, payload) {
    state.meets = state.meets.filter((el) => {
      return el.isActive === payload.isActive
    })
  }
}

export const actions = {
  GET_MEETS({ commit }) {
    return new Promise((res, rej) => {
      this.$axios.$get(`/api/meetlist/`).then((data) => {
        commit('SET_MEETS', data)
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  POST_MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$post(`/api/meetlist/`, payload).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  PUT_MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$put(`/api/meet/${payload.uuid}/`, payload.field).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  PATCH_MEET_DATETIME({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$patch(`/api/meet/${payload.uuid}/`, payload.field).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  DEL_MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/meet/${payload}/`).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
}
