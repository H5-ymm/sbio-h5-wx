<style lang="scss">
  .send_view {
		height: 100%;
  }
</style>

<template>
  <div class="send_view">
    <logisticsTemplate :list="newList" :logisticsOrderId="logisticsOrderId"></logisticsTemplate>
		<tipTeamplte></tipTeamplte>
  </div>
</template>
<script>
import tipTeamplte from '@/components/tipTeamplte'
import logisticsTemplate from '@/components/logisticsTemplate'
import { getRoute } from '@/api/sample'
export default {
  components: {
    tipTeamplte: tipTeamplte,
    logisticsTemplate: logisticsTemplate
  },
  data() {
    return {
      list: [],
      logisticsOrderId: '',
      logisticsId: ''
    }
  },
  computed: {
    newList() {
      return this.list.map(item => {
        item.operatorTime = $moment.unix(item.operatorTime).format('YYYY-MM-DD HH:mm')
        return item
      })
    }
  },
	created() {
    this.logisticsId = this.$route.query.logisticsId || 4
    this.getLogisticsInfo(this.logisticsId)
  },
  methods: {
    // 获取物流路由
   async getLogisticsInfo(logisticsId) {
      const { data } = getRoute(logisticsId)
      this.logisticsOrderId = data.logisticsOrderId
      this.list = data.route || []
    }
  }
}
</script>