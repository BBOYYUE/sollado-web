<template>
    <div>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :on-success="handleSucess"
        :on-change="handleChange"
        :before-upload="handleBeforeUpload"
        :show-file-list="false"
        :data="data"
        :on-error="handleError"
        :file-list="files"
      >
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
  </template>
  <script>
  // import { getOssPolicy } from '@/api/oss' // 这里就是获取直传配置接口
  import axios from "axios";

  export default {
    name: 'TestView',
    props: {
      url: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        uploadUrl: '', // 上传提交地址
        data: {}, // 上传提交额外数据
        dialogImageUrl: '', // 预览图片
        files: [] // 上传的文件
      }
    },
    computed: {},
    created() {
      this.dialogImageUrl = this.url
    },
    methods: {
      handleChange(file, fileList) {
        console.log(file, fileList)
      },
      // 上传之前处理动作
      async handleBeforeUpload(file) {
        const fileName = this.makeRandomName(file.name)
        try {
          const res = await axios.create({
            baseURL: 'https://api.sollado.com/api/v1'
          }).get('/ossSignatureVerification')
          const response = res.data
          console.log(res, 'res')
          console.log(response, 'response')
          this.uploadUrl = response.host
  
          // 组装自定义参数「如果要自定义回传参数这段代码不能省略」
          if (response['callback-var'] && Object.keys(response['callback-var']).length) {
            for (const [key, value] of Object.entries(response['callback-var'])) {
              this.data[key] = value
            }
          }
          this.data.policy = response.policy
          this.data.OSSAccessKeyId = response.accessid
          this.data.signature = response.signature
          this.data.host = response.host
          this.data.callback = response.callback
          this.data.key = response.dir + fileName
          console.log(this.data, 'data')
        } catch (error) {
          this.$message.error('获取上传配置失败')
          console.log(error)
        }
      },
      // 文件上传成功处理
      handleSucess(response, file, fileList) {
        const fileUrl = this.uploadUrl + this.data.key
        this.dialogImageUrl = fileUrl
        this.$emit('update:url', fileUrl)
        this.files.push({
          name: this.data.key,
          url: fileUrl
        })
      },
      // 上传失败处理
      handleError() {
        this.$message.error('上传失败')
      },
      // 随机名称
      makeRandomName(name) {
        const randomStr = Math.random().toString().substr(2, 4)
        const suffix = name.substr(name.lastIndexOf('.'))
        return Date.now() + randomStr + suffix
      }
    }
  
  }
  </script>
  
  <style>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  </style>