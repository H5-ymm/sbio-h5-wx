<style lang="scss">
	.tip-box {
    margin-top: 30rpx;
    border-top: 14rpx solid #F6F6F6;
    .bind-info {
       margin: 36rpx 36rpx 20rpx;
      .tip-icon {
        width: 30rpx;
        height: 30rpx;
      }
      .sample-text {
        font-size: 32rpx;
        font-weight: 300;
        color: #000000;
        margin-left: 20rpx;
        text {
          color: #F36681;
        }
			}
    }
    .tip-box-text {
      padding:  0 36rpx;
      font-size: 28rpx;
      font-weight: 300;
      line-height: 50rpx;
      color: #000000;
      > div {
        margin-bottom: 20rpx;
      }
    }
  }
</style>
<template>
  <div class="tip-box">
    <div class="weui-flex start bind-info">
      <img src="../assets/img/tip1.png" mode="scaleToFill" class="tip-icon" alt="" />
      <div class="sample-text">温馨提示</div>
    </div>
    <div class="tip-box-text">
      <div>您可在【硕世健康】公众号-【我的报告】菜单查看样本状态。</div>
      <div>您的报告将在样本抵达检测中心3-5个工作日内完成，当收到短信提示后，可进入【硕世健康】公众号-【我的报告】菜单查看检测报告。</div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>