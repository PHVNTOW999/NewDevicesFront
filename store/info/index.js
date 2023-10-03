export const state = () => ({
  meets: null,
  filtersMeets: null,
})

export const getters = {
  MEETS(state) {
    return state.meets
  },
  FILTERS__MEETS(state) {
    return state.filtersMeets
  },
}

export const mutations = {
  SET__MEETS(state, payload) {
    state.meets = payload
    state.filtersMeets = payload
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
  // PATCH__MEET__DATETIME({ commit }, payload) {
  //   return new Promise((res, rej) => {
  //     this.$axios.$patch(`/api/info/meet/${payload.uuid}/`, payload.field).then((data) => {
  //       res(data)
  //     }).catch((error) => { rej(console.error(error)) })
  //   })
  // },
  DEL__MEET({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/info/meet/${payload}/`).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
}
