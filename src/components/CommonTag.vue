<template>
    <div class="tab">
        <el-tag v-for="(item,index) in tagList"
        :key="item.path"
        :effect="$route.name===item.name?'dark':'plain'"
        :closable="item.name!=='home'"
        @click="changeMenu(item)"
        @close="closeMenu(item,index)"
        size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('tab', ['tagList'])
  },
  methods: {
    changeMenu (item) {
      this.$router.push({ name: item.name })
    },
    closeMenu (item, index) {
      // 传入index,删除tag标签
      this.$store.commit('tab/closeTagList', index)
      // 处理跳转逻辑
      if (item.name === this.$route.name) {
        // 表示删除的是最后一项
        if (index > this.tagList.length - 1) {
          this.$router.push({
            name: this.tagList[index - 1].name
          })
        // 表示的是删除中间项
        } else if (index < this.tagList.length) {
          this.$router.push({
            name: this.tagList[index].name
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tab{
    padding: 20px;
    .el-tag {
            cursor: pointer;
            margin-right: 15px;
        }
}
</style>
