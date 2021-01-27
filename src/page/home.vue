<template>
  <div class="report-container" @click="close" v-if="isHas">
    <div class="form">
      <p class="title">新冠核酸检验报告查询</p>
      <div class="input-box">
        <label class="label">姓名</label>
        <input v-model="form.name" placeholder="请输入姓名">
      </div>
      <div class="input-box">
        <label class="label">身份证号</label>
        <input v-model="form.cardNo" placeholder="请输入身份证号">
      </div>
      <div class="btn-box">
        <button :class="{'search-btn': form.name&&form.cardNo}" @click.stop="submit">查询</button>
      </div>
    </div>
    <div class="toast" v-if="show">{{text}}</div>
    <div class="footer">
      <img src="../assets/img/bg.png" class="img">
      <div class="footer-text">
        <p>泰州硕世医学检验所</p>
        <p>联系电话<span>0523-86201522</span></p>
      </div>
    </div>
  </div>
  <div class="tip" v-else>
    关注"硕果累累2"公众号，才能访问哦！
  </div>
</template>
<script>
import { reportCovid, downResport } from '@/api/sample'
import { downloadData } from '@/utils/http'
import { validateIdCard } from '@/utils/tool'
export default {
  data() {
    return {
      isHas: false,
      form: {
        name: '',
        cardNo: ''
      },
      show: false,
      text: '',
      url: ''
    }
  },
  created() {
    if (sessionStorage.getItem('shuoshiSessionId')) {
      this.isHas = true
    }
  },
  methods: {
    submit() {
      if (!this.form.name) {
        this.show = true
        this.text = '请输入姓名'
      } else if (this.form.name > 30) {
        this.show = true
        this.text = '姓名不能大于30个字符'
      } else if (!this.form.cardNo) {
        this.show = true
        this.text = '请输入身份证号'
      } else if (!validateIdCard(this.form.cardNo)) {
        this.show = true
        this.text = '请输入正确身份证号'
      } else {
        // 查询检测
        reportCovid(this.form).then(res => {
          // console.log(res)
          if (res.data) {
            downloadData('/sample/api/downReportCovid', {covidReportId: res.data})
            // this.url = downloadData('/sample/api/downReportCovid', {covidReportId: res.data, type: 'png'})
          } else {
            this.show = true
            this.text = '暂无样本报告'
          }
        })
      }
    },
    close() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  html,body,#app {
    height: 100%;
    overflow: hidden;
    font-family: PingFangSC, PingFangSC-Regular;
  }
  body {
    background: #fff;
  }
  .report-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .tip {
    width: 60%;
    text-align: center;
    color: #848484;
    font-size: 20px;
    padding: 40% 20%;
  }
  .title {
    font-size: 25px;
    text-align: center;
    color: #555555;
    padding-bottom: 15%;
  }
  .form {
    width: 86%;
    margin: 0 auto;
    height: calc(100% - 260px);
    padding-top: 20%;
    .input-box {
      margin-bottom: 20px;
    }
    .label {
      font-size: 16px;
      color: #444444;
      display: block;
      width: 130px;
      text-align: left;
      padding-bottom: 20px;
    }
    input {
      font-family: PingFangSC, PingFangSC-Regular;
      font-size: 18px;
      padding-bottom: 10px;
      border: none;
      outline: none;
      border-bottom: 1px solid #f5f5f5;
      width: 100%;
      display: block;
      border-radius: 0;
      color: #444444;
      &::placeholder {
        color: #cccccc;
      }
    }
    .btn-box {
      width: 100%;
      text-align: center;
      margin-top: 40px;
    }
    button {
      width: 86%;
      height: 50px;
      background: #f7f7f7;
      color: #666;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      outline: none;
      // &:fouse {
      //   border: none;
      //   outline: none;
      // }
      &:active {
        opacity: 0.5;
        border: none;
        outline: none;
      }
    }
    .search-btn {
      background: #48a4ff;
      color: #fff;
    }
  }
  .toast {
    height: 40px;
    position: fixed;
    top: 40%;
    transform: translateX(-50%);
    padding: 0 10px;
    left: 50%;
    background-color: rgba(0,0,0,.6);
    border-radius: 8px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    transition: .3s;
  }
  .footer {
    text-align: center;
    height: 125px;
    padding-bottom: 50px;
    .footer-text {
      position: absolute;
      bottom: 20px;
      left: 25%;
    }
    p {
      text-align: center;
      color: #888888;
      font-size: 16px;
      padding-bottom: 6px;
      span {
        color: #48a4ff;
        margin-left: 5px;
      }
    }
    img {
      max-width: 100%;
    }
  }
</style>