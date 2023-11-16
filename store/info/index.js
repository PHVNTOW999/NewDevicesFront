import src from "vue-multiselect/src";

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
    { field: 'isActive', label: 'Status'},
    { field: 'no', label: '№', type: 'number'},
    { field: 'client', label: 'Client'},
    { field: 'datetime', label: 'Date - Time'},
    { field: 'details', label: 'Details'},
  ],

  meetsFilterFields: [
    { field: 'isActive', label: 'Status' },
    // { field: 'no', label: '№', type: 'number' },
    { field: 'client', label: 'Client' },
    { field: 'datetime', label: 'Date - Time (from - to)' },
    // { field: 'datetime_to', label: 'Date - Time (to)' },
    { field: 'details', label: 'Details' },
  ],

  clients: null
})

export const getters = {
  FILTERS__MEETS(state) {
    return state.filtersMeets
  },
  MEETS_FILTER_FIELDS(state) {
    return state.meetsFilterFields
  },
  MEETS_FIELDS(state) {
    return state.meetsFields
  },
  MEETS_FORM_FIELDS(state) {
    return state.meetsFormFields
  },
  CLIENTS(state) {
    return state.clients
  },
  MEETS__MAX__NO(state) {
    if(state.meets?.length) return state.meets?.reduce((a,b) => a.no > b.no ? a : b).no + 1
    else return 1
  }
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

    if(copyArr && copyFilter) {
      copyArr.filter((obj) => {

        const check = res.find((el) => {
          return obj.uuid === el.uuid
        })

        if(payload.datetime && payload.datetime.from || payload.datetime.to && !check) {
          if(payload.datetime.from && payload.datetime.to && !check) {
            new Date(obj.datetime).toISOString() >= new Date(payload.datetime.from).toISOString() &&
            new Date(obj.datetime).toISOString() <= new Date(payload.datetime.to).toISOString() ? res.push(obj) : null
          } else if(payload.datetime.from && !check) {
            new Date(obj.datetime).toISOString() >= new Date(payload.datetime.from).toISOString() ? res.push(obj) : null
          } else if(payload.datetime.to && !check) {
            new Date(obj.datetime).toISOString() <= new Date(payload.datetime.to).toISOString() ? res.push(obj) : null
          }
        }

        if(payload.isActive) {
          if(res.length) {
            res.forEach((obj) => {
              if(payload.isActive === true) console.log(obj.isActive, payload.isActive)
              else console.log(obj.isActive, payload.isActive)
            })
          }
        }

      })
    }

    state.filtersMeets = res

    // if(copyArr && copyFilter) {
    //   for (const [key, val] of copyFilter) {
    //     copyArr.forEach(el => {
    //       const check = res.find((obj) => {
    //         return obj.uuid === el.uuid
    //       })
    //
    //       if(key === 'datetime' && val.to || val.from) {
    //         // switch / case
    //         if(val.from && val.to && !check) {
    //           new Date(el.datetime).toISOString() >= new Date(val.from).toISOString() &&
    //           new Date(el.datetime).toISOString() <= new Date(val.to).toISOString() ? res.push(el) : null
    //         } else if (val.from && !check) {
    //           new Date(el.datetime).toISOString() >= new Date(val.from).toISOString() ? res.push(el) : res.forEach((obj, i) => {
    //             new Date(el.datetime).toISOString() >= new Date(val.from).toISOString() ? res.splice(i, 1) : null
    //           })
    //         } else {
    //           new Date(el.datetime).toISOString() <= new Date(val.to).toISOString() ? res.push(el) : res.forEach((obj, i) => {
    //             new Date(el.datetime).toISOString() <= new Date(val.to).toISOString() ? res.splice(i, 1) : null
    //           })
    //         }
    //       } else if(key === 'isActive' && val !== null && !check) {
    //         console.log('gg')
    //         el.isActive === val ? res.push(el) : res.forEach((obj, i) => {
    //           obj.isActive !== val ? res.splice(i, 1) : null
    //         })
    //       } else if(key === 'client' && val && !check) {
    //         el.client.uuid === val.uuid ? res.unshift(el) : null
    //       }
    //       // else {
    //       //   String(el[key]).includes(val) && !check ? res.push(el) : null
    //       // }
    //     })
    //   }
    // }

    // state.filtersMeets = res
  },
  DEL__FILTERS(state) {
    state.filtersMeets = state.meets
  },
  SET__CLIENTS(state, payload) {
    state.clients = payload
  },
  MEETS__DEL__PHONE(state, payload) {
    const meet = state.meets.find((meet) => {
      return meet.uuid === payload.uuid
    })
    meet.phones.splice(payload.data, 1)
  },
  MEETS__DEL__EMAIL(state, payload) {
    const meet = state.meets.find((meet) => {
      return meet.uuid === payload.uuid
    })
    meet.emails.splice(payload.data, 1)
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
  POST__EMAIL({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$post(`/api/info/email/`, payload).then((data) => {
        res(data)
      }).catch((error) => { rej(console.error(error)) })
    })
  },
  DEL__EMAIL({ commit }, payload) {
    return new Promise((res, rej) => {
      this.$axios.$delete(`/api/info/email/${payload}`).then((data) => {
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
