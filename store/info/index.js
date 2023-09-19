export const state = () => ({
  meets: null,
})

export const getters = {
  MEETS(state) {
    return state.meets
  },
}

export const mutations = {
  SET_MEETS(state, payload) {
    state.meets = payload
  },
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
      console.log(payload)
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
  DEL_MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/meet/${payload}/`).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
}
