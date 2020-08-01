<template>
  <div class="report-container">
    <van-list
      v-if="hasData&&list.length"
      v-model="loading"
      :finished="finished"
      class="report-list" 
      @load="onLoad">
      <div class="report-item" v-for="(item, index) in list" :key="index">
        <p>样本编号: {{item.sampleNo}}</p>
        <p class="weui-flex between">
          <span>产品: {{item.productName}}</span>
          <span class="link" @click="download(item)" v-if="item.status==3" >点击下载PDF报告</span>
        </p>
        <p>姓名: {{item.name}}</p>
        <p>状态: {{item.status | statusText}}</p>
        <button class="btn weui-flex center" @click="viewDetail(item)">{{item.status | btnText}}</button>
      </div>
    </van-list>
    <div v-if="!hasData&&!list.length" class="noData-box">
			<div class="noData-text">完成样本绑定及采集后，才能预约快递哦！</div>
		  <img src="../assets/img/noData.png" alt="" class="noData-icon">
      <div class="footer-btn">
        <button class="weui-flex center" @click="bindSample">去绑定</button>
      </div>
		</div>
  </div>
</template>
<script>
import {statusList } from '@/base/base'
import { downloadFile } from '@/utils/tool'
import { List } from 'vant'
import { downResport, getSampleList, getCancelFlag } from '@/api/sample'
export default {
  name: 'Home',
  components: {
    [List.name]: List
  },
  filters: {
    statusText(val) {
      let label
      statusList.forEach(item => {
        if (val == item.value) {
          label = item.label
        }
      })
      return label || ''
    },
    btnText(val) {
      let btnText
      statusList.forEach(item => {
        if (val == item.value) {
          btnText = item.btnText
        }
      })
      return btnText || ''
    }
  },
  data() {
    return {
      list: [],
      params: {
        current: 1,
        size: 10
      },
      loading: false,
      finished: true,
      total: 0,
      sampleList: [],
      hasData: true
    }
  },
  created() {
    this.getSampleData()
  },
  methods: {
    onLoad() {
      if (this.total > this.list.length && this.list.length == 10) {
        this.params.size = this.params.size + 10
        this.getSampleData()
      }
    },
    async getSampleData() {
      const { data } = await getSampleList(this.params)
      this.finished = true
      if (data.total) {
        this.list = data.sampleList || []
        this.hasData = true
        this.total = data.total
      } else {
        this.hasData = false
      }
    },
    // 判断是否可以取消订单 可以取消跳转订单详情,不可以取消跳转物流路由详情
    async cancelFlag(item) {
      const { data } = getCancelFlag({logisticsId: item.logisticsId})
      if (data.cancelFlag) {
        wx.miniProgram.navigateTo({url: `/pages/sample/detail?sampleId=${sampleId}`})   
      } else {
        this.routerLogistics(item.logisticsId)
      }
    },
    // 跳转物流详情页面
    routerLogistics(logisticsId) {
      this.$router.push({
        path: 'logisticsDetail',
        query: {
          logisticsId: logisticsId
        }
      })
    },
    viewDetail(item) {
      if (!item.status) {
        wx.miniProgram.navigateTo({url: `/pages/sample/send?sampleId=${item.sampleId}`})   
      } else if (item.status == 1) {
          this.cancelFlag(item)
      } else if (item.status == 1) {
        this.routerLogistics(item.logisticsId)
        // wx.miniProgram.navigateTo({url: `/pages/sample/logisticsDetail?logisticsId=${item.logisticsId}`})    
      } else {
        this.$router.push({
          path: 'reportDetail',
          query: {
            sampleId: item.sampleId
          }
        })
      }
    },
    bindSample() {
      wx.miniProgram.navigateTo({url: `/pages/home/usageProcess`})   
    },
    async download(item) {
      const data = await downResport({ sampleId: item.sampleId })
      downloadFile(data)
    }
  }
}
</script>

<style lang="scss">
  html,body,#app {
    height: 100%;
  }
  body {
    background: #F8F8F8;
  }
 .report-container {
   background: #F8F8F8;
   width: 100%;
   height: 100%;
   .report-list {
    .report-item {
      margin-bottom: 20px;
      margin: 20px;
      height: 116px;
      background:#fff;
      font-size: 16px;
      border-radius: 10px;
      padding: 6px 16px;
      line-height: 29px;
      color: #000000;
      position: relative;
      .btn {
        width:87px;
        height: 29px;
        background:#F36681;
        border-radius:15px;
        color: #fff;
        font-size: 13px;
        position: absolute;
        right: 14px;
        bottom: 17px;
        border: none;
      }
      .link {
        color: #E94B70;
        font-size: 12px;
        line-height: 22px;
      }
    }
   }
   .noData-box {
      text-align: center;
      height: 100%;
      background: #ffffff;
      .noData-text {
        color: #000000;
        font-weight: 300;
        font-size: 16px;
        padding: 61px 0;
      }
      .noData-icon {
        width: 100%;
        height: 60%;
        object-fit: fill;
      }
    }
    .footer-btn {
      width: 70%;
      margin: 0 auto;
      button {
        height: 40px;
        width: 100%;
        background: #F36681;
        border-radius: 20px;
        color: #ffffff;
        font-size: 15px;
      }
		}
 }
</style>