<template>
  <div class="report-detail">
    <van-tabs v-model="active" title-active-color="#F04D6F" line-width="15" line-height="2">
      <van-tab title="检测结果" class="tab-item">
        <div class="detection-result-box">
          <detectionResult :item="resultInfo"></detectionResult>
          <div class="result-box">
            <div class="weui-flex start result-content">
              <img src="../assets/img/line.png" alt=""
                class="line-icon" />
              <img src="../assets/img/text1.png" alt=""
              class="title_icon" />
            </div>
            <div class="result-table">
              <div class="weui-flex between result-title">
                <p class="result-text-left">高危型HPV感染
                  <img src="../assets/img/question.png" alt="" class="question">
                </p>
                <p class="result-num-right">{{highMaleCount}}个</p>
              </div>
              <div class="weui-flex between wrap">
                <p class="item" :class="{'item-avtive':item.resultInt}" v-for="(item, index) in highTypes" :key="index">
                  <span class="subType">{{item.subType}}</span>
                  <span class="result">{{item.result}}</span>
                </p>
              </div>
              <div class="weui-flex between result-title">
                <p class="result-text-left">
                  低危型HPV感染
                  <img src="../assets/img/question.png" alt="" class="question">
                </p>
                <p class="result-num-right">{{lowMaleCount}}个</p>
              </div>
              <div class="weui-flex between wrap">
                <p class="item" :class="{'item-avtive':item.resultInt}" v-for="(item, index) in lowTypes" :key="index"> 
                  <span class="subType">{{item.subType}}</span>
                  <span class="result">{{item.result}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <resultDetail></resultDetail>
      </van-tab>
      <van-tab title="健康建议" class="tab-item">
        <healthTemplate :result="resultInfo.result"></healthTemplate>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Tab, Tabs } from 'vant';
import { getSampleDetail } from '@/api/sample'
import  detectionResult from '@/components/detectionResult'
import  resultDetail from '@/components/resultDetail'
import healthTemplate from '@/components/healthTemplate'
export default {
  name: 'Home',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    detectionResult: detectionResult,
    resultDetail: resultDetail,
    healthTemplate: healthTemplate
  },
  data() {
    return {
      active: 0,
      highTypes: [],
      lowTypes: [],
      highMaleCount: 0,
      lowMaleCount: 0,
      resultInfo: {
        result: '',
        resultShow: ''
      },
      sampleId: ''
    }
  },
  created() {
    this.sampleId = this.$route.query.sampleId
    this.getDetail(this.sampleId)
  },
  methods: {
    async getDetail(sampleId) {
      const { data } = await getSampleDetail({ sampleId })
      this.highTypes = data.highTypes
      this.lowTypes = data.lowTypes
      this.highMaleCount = data.highMaleCount
      this.lowMaleCount = data.lowMaleCount
      this.resultInfo.resultShow = data.resultShow
      this.resultInfo.result = data.result
    }
  }
}
</script>

<style lang="scss">
 .report-detail {
   width: 100%;
   background: #ffffff;
   padding-bottom: 20px;
  .detection-result-box {
    margin: 16px 26px 10px;
  }
  .tab-item {
    font-size: 16px;
  }
  .result-content {
    margin: 20px 0;
    .line-icon {
      width: 4px;
      height: 14px;
    }
    .title_icon {
      height: 16px;
      width: 64px;
      margin-left: 11px;
    }
  }
  .result-table {
    .result-title {
      margin: 6px 0;
    }
    .result-text-left {
      color: #000000;
      font-size: 16px;
      .question {
        width: 13px;
        height: 13px;
        margin-left: 6px;
      }
    }
    .result-num-right {
      font-size: 16px;
      color: #F04D6F;
    }
    .item {
      font-size: 14px;
      color: #000000;
      font-weight: 300;
      width: 28%;
      margin: 5px 0;
      &:nth-of-type(3n) {
        justify-content: flex-end;
      }
      span {
        display: inline-block;
        width: 50px;
      }
      &.item-avtive {
        color: #F04D6F;
      }
      .result {
        width: 30px;
        margin-left: 6px;
        text-align: right;
      }
    }
  }
 }
</style>