import { Region } from '../components/form/Region'

export default {
  querierConfig: [
    {
      type: 'input',
      property: 'name',
      props: { placeholder: '请输入名称' }
    },
    {
      type: 'input',
      property: 'region.__toString',
      props: { placeholder: '请输入区域' }
    }
  ],

  tableConfig: [
    'id',
    'address',
    'category',
    'description',
    'name',
    'phone',
    'photo',
    'region',
    'user'
  ],

  formConfig: [
    'address',
    'category',
    'description',
    'name',
    'phone',
    'photo',
    { property: 'region', component: Region() },
    'user'
  ]
}
