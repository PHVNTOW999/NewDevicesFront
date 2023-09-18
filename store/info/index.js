export const state = () => ({
  meetData: [
    { 'No': 1, 'status': false, 'name': 'Jesse', 'phone': '+57', 'date': '2016-10-15 13:43:27', 'time': '12:02', 'details': 'bjkkbjbkj' },
    { 'No': 2, 'status': true, 'name': 'John', 'phone': '+575757', 'date': '2016-12-15 06:00:53', 'time': '12:02', 'details': 'Male' },
    { 'No': 3, 'status': false, 'name': 'Tina', 'phone': '+958758', 'date': '2016-04-26 06:26:28', 'time': '12:02', 'details': 'Female' },
    { 'No': 4, 'status': false, 'name': 'Clarence', 'phone': '+578875587', 'date': '2016-04-10 10:28:46', 'time': '12:02', 'details': 'Male' },
    { 'No': 5, 'status': false, 'name': 'Anne', 'phone': '+578875', 'date': '2016-12-06 14:38:38', 'time': '12:02', 'details': 'Female' }
  ],
  meetColumns: [
    {
      field: 'status',
      label: 'Статус',
      centered: true,
      searchable: true,
    },
    {
      field: 'No',
      label: '№',
      width: '100',
      centered: true,
      searchable: true,
    },
    {
      field: 'name',
      label: 'Имя',
      centered: true,
      searchable: true,
    },
    {
      field: 'phone',
      label: 'Телефон',
      centered: true,
      searchable: true,
    },
    {
      field: 'date',
      label: 'Дата',
      centered: true,
    },
    {
      field: 'details',
      label: 'Детали',
      centered: true,
    },
    {
      field: 'delete',
      label: 'Удалить',
      centered: true,
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
