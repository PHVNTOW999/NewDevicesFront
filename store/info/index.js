export const state = () => ({
  meetData: [
    { 'No': 1, 'status': false, 'name': 'Jesse', 'phone': '+57', 'datetime': { 'time': null, 'data': '2016-12-06 14:38:38' }, 'details': 'bjkkbjbkj' },
    { 'No': 2, 'status': true, 'name': 'John', 'phone': '+575757', 'datetime': { 'time': '12:02', 'data': null }, 'details': 'Male' },
    { 'No': 3, 'status': false, 'name': 'Tina', 'phone': '+958758', 'datetime': { 'time': '12:02', 'data': '2016-12-06' }, 'details': 'Female' },
    { 'No': 4, 'status': false, 'name': 'Clarence', 'phone': '+578875587', 'datetime': { 'time': '12:02', 'data': '2016-12-06' }, 'details': 'Male' },
    { 'No': 5, 'status': false, 'name': 'Anne', 'phone': '+578875', 'datetime': { 'time': '12:02', 'data': '2016-12-06' }, 'details': 'Female' }
  ],
  meetColumns: [
    {
      id: 1,
      field: 'status',
      label: 'Статус',
      centered: true,
      searchable: true,
      input: 'checkbox'
    },
    {
      id: 2,
      field: 'No',
      label: '№',
      width: '100',
      centered: true,
      searchable: true,
      input: 'number'
    },
    {
      id: 3,
      field: 'name',
      label: 'Имя',
      centered: true,
      searchable: true,
      input: 'text'
    },
    {
      id: 4,
      field: 'phone',
      label: 'Телефон',
      centered: true,
      searchable: true,
      input: 'number'
    },
    {
      id: 5,
      field: 'date',
      label: 'Дата',
      centered: true,
      input: 'datetime'
    },
    {
      id: 6,
      field: 'details',
      label: 'Детали',
      centered: true,
      input: 'text'
    },
    {
      id: 7,
      field: 'delete',
      label: 'Удалить',
      centered: true,
      input: 'button'
    }
  ]
})

export const getters = {
  MEET_DATA(state) {
    return state.meetData
  },
  MEET_COLUMNS(state) {
    return state.meetColumns
  }
}

export const mutations = {

}

export const actions = {

}
