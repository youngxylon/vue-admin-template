import { buildFullPath } from '@/utils'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default function(param) {
  /**
   * @param {Object} param
   * @param {string} [param.dataType = 'array'] - array or string
   * @param {string} [param.fileType = 'image'] - see below fileType
   * @param {number} [param.limit = 0] - file limit
   */
  const config = { dataType: 'array', fileType: 'image', limit: 0, ...param }

  const FILE_TYPE_NAME = {
    image: 'jpg / png',
    pdf: 'pdf',
    word: 'doc / docx',
    excel: 'xls / xlsx',
    video: 'mp4'
  }

  const FILE_TYPE = {
    image: ['image/png', 'image/jpeg'],
    video: ['video/mp4'],
    word: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    excel: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    pdf: ['application/pdf']
  }

  if (config.dataType === 'string') {
    config.limit = 1
  }

  return {
    props: ['value'],
    components: { ElImageViewer },
    render(h) {
      return (
        <div>
          <el-upload
            class='upload-demo'
            action={buildFullPath('upload')}
            list-type='picture'
            limit={config.limit}
            file-list={this.fileList}
            props={{
              onRemove: this.onRemove,
              onSuccess: this.onSuccess,
              onPreview: this.onPreview,
              beforeUpload: this.beforeUpload
            }}
          >
            <el-button size='small' type='primary'>
              点击上传
            </el-button>
            <div slot='tip' class='el-upload__tip'>
              {this.aTips()}
            </div>
          </el-upload>
          {this.showPreview ? (
            <el-image-viewer
              props={{
                onClose: () => {
                  this.showPreview = false
                }
              }}
              url-list={this.imgPreviewList}
            />
          ) : (
            ''
          )}
        </div>
      )
    },
    computed: {
      fileList() {
        if (!this.value) return []

        const result = []
        if (config.dataType === 'array') {
          this.value.forEach(e => {
            result.push(this.aImageUrl(e))
          })
        } else {
          result.push(this.aImageUrl(this.value))
        }

        return result
      }
    },
    data() {
      return {
        showPreview: false,
        imgPreviewList: []
      }
    },
    methods: {
      onPreview(file) {
        this.imgPreviewList = [file.url]
        this.showPreview = true
      },
      aTips() {
        let result = ''
        if (typeof config.fileType === 'string') {
          result = FILE_TYPE_NAME[config.fileType]
        } else {
          result = config.fileType.map(e => FILE_TYPE_NAME[e]).join(' / ')
        }

        return `只能上传 ${result} 文件，且不超过10MB`
      },
      aImageUrl(image) {
        return {
          name: image?.__toString ?? image,
          url: this.$getImage(image)
        }
      },
      onRemove(file, fileList) {
        if (config.dataType === 'array') {
          this.$emit(
            'input',
            fileList.map(e => e.name)
          )
        } else {
          this.$emit('input', '')
        }
      },
      onSuccess(response) {
        if (!response?.data?.[0]) {
          this.$message.error('上传错误')
          return
        }

        if (config.dataType === 'array') {
          if (this.value) {
            this.$emit('input', [...this.value, response.data[0]])
          } else {
            this.$emit('input', [response.data[0]])
          }
        } else {
          this.$emit('input', response.data[0])
        }
      },
      beforeUpload(file) {
        const maxSize = 20
        const isLimitSize = file.size / 1024 / 1024 < maxSize
        if (!isLimitSize) {
          this.$message.error(`上传文件请不要大于${maxSize}Mb`)
          return false
        }

        const fileTypeArr = []
        if (typeof config.fileType === 'string') {
          fileTypeArr.push(...FILE_TYPE[config.fileType])
        } else {
          config.fileType.forEach(e => {
            fileTypeArr.push(...FILE_TYPE[e])
          })
        }

        if (fileTypeArr.includes(file.type)) {
          return true
        } else {
          this.$message.error(`请上传正确的格式`)
          return false
        }
      }
    }
  }
}
