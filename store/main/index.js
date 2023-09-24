export const state = () => ({
  currency: null,
})

export const getters = {
  CURRENCY(state) {
    return state.meets
  },
}

export const mutations = {
  SET_CURRENCIES(state, payload) {
    state.meets = payload
  },
}

export const actions = {
  GET_CURRENCIES({ commit }) {
    return new Promise((res, rej) => {
      this.$axios.$get('ll').then((data) => {
        commit('SET_CURRENCIES', data)
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
}
