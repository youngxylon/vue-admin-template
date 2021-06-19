import ImageRender from '../components/table/ImageRender'

export default {
  hasTodo: true,

  disableActions: ['new', 'delete', 'edit'],

  tableConfigs: [
    'id',
    'issue',
    'order',
    { property: 'pictures', component: ImageRender() },
    'status',
    'user'
  ]
}
