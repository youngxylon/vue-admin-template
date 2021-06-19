import Uploader from '../components/form/Uploader'
import ImageRender from '../components/table/ImageRender'

export default {
  tableConfigs: [
    'id',
    'issue',
    'order',
    { property: 'pictures', component: ImageRender() },
    'status',
    'user'
  ],

  formConfigs: [
    'issue',
    'order',
    { property: 'pictures', component: Uploader() },
    'user'
  ]
}
