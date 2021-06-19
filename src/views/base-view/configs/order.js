import { Region } from '../components/form/Region'
import DataDetail from '../components/table/DataDetail'
import ItemList from '../components/table/ItemList'

const orderStatus = [
  '待提交',
  '待支付',
  '待指派',
  '待施工',
  '待验收评价',
  '已完成'
]

export default {
  querierConfig: [
    {
      type: 'input',
      property: 'region.__toString',
      props: { placeholder: '请输入区域' }
    },
    {
      type: 'select',
      property: 'status',
      props: {
        placeholder: '请选择状态',
        style: 'width:120px'
      },
      options: orderStatus
    },
    {
      type: 'input',
      property: 'worker.name',
      props: { placeholder: '请输入工人' }
    }
  ],

  tableConfigs: [
    'id',
    'address',
    'business',
    'comment',
    'contact',
    'discount',
    {
      property: 'items',
      component: ItemList([
        { label: '名称', prop: '__toString' },
        { label: '价格', prop: '__metadata.price' },
        { label: '数量', prop: '__metadata.quantity' },
        { label: '单价', prop: '__metadata.unitPrice' }
      ])
    },
    'measureResult',
    'paidTime',
    'phone',
    'price',
    'region',
    {
      property: 'status',
      component: {
        props: ['data'],
        render(h) {
          return <span>{orderStatus[this.data]}</span>
        }
      }
    },
    'type',
    'wallType',
    'worker',
    {
      property: 'detail',
      component: DataDetail([
        { name: 'no' },
        { name: 'provider' },
        { name: 'environmentPhoto', type: 'image' },
        { name: 'evaluation' },
        { name: 'extraData' },
        { name: 'fetchInfoAddress' },
        { name: 'finishPhoto', type: 'image' },
        { name: 'finishVideo' },
        { name: 'followingTime' },
        { name: 'hasFurniture' },
        { name: 'hasScaling' },
        { name: 'pickupAddress' },
        { name: 'pickupCode' },
        { name: 'user' },
        { name: 'userCoupon' },
        { name: 'totalPrice' },
        { name: 'shippingPrice' },
        { name: 'specialWall' },
        { name: 'specialWallPhoto', type: 'image' }
      ])
    }
  ],

  formConfigs: [
    'address',
    'business',
    'comment',
    'contact',
    'discount',
    'environmentPhoto',
    'evaluation',
    'extraData',
    'fetchInfoAddress',
    'finishPhoto',
    'finishVideo',
    'followingTime',
    'hasFurniture',
    'hasScaling',
    'items',
    'measureResult',
    'no',
    'paidTime',
    'phone',
    'pickupAddress',
    'pickupCode',
    'price',
    'provider',
    { property: 'region', component: Region() },
    'shippingPrice',
    'specialWall',
    'specialWallPhoto',
    {
      property: 'status',
      component: {
        props: ['form'],
        render(h) {
          return (
            <el-select v-model={this.form.status} placeholder='请选择'>
              {orderStatus.map((e, index) => (
                <el-option label={e} value={index}></el-option>
              ))}
            </el-select>
          )
        }
      }
    },
    'totalPrice',
    'type',
    'user',
    'userCoupon',
    'wallType',
    'worker'
  ]
}
