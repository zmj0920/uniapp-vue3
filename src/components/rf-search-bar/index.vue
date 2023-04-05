<script lang="ts" setup>
  const props = defineProps({
    headerShow: {
      type: Boolean,
      default: true,
    },
    inputDisabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入关键字",
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  });

  const emit = defineEmits(["link", "search"]);

  const search = reactive({
    afterHeaderOpacity: 1, // 不透明度
    headerPosition: "fixed",
    headerTop: null,
    statusTop: null,
    nVueTitle: null,
    searchValue: props.placeholder,
  });

  function handleSearchValueChange(e) {
    search.searchValue = e.detail.value;
  }

  function discard() {}

  function link() {
    emit("link");
  }

  function toSearch() {
    emit("search", {
      searchValue: search.searchValue,
    });
  }
</script>

<template>
  <view class="rf-search-bar">
    <!-- 状态栏 -->
    <view
      v-if="props.headerShow"
      class="status"
      :style="{
        position: search.headerPosition,
        top: search.statusTop,
        opacity: search.afterHeaderOpacity,
      }"
    ></view>
    <!-- 顶部搜索栏 -->
    <view
      v-if="props.headerShow"
      class="header"
      :style="{
        position: search.headerPosition,
        top: search.headerTop,
        opacity: search.afterHeaderOpacity,
      }"
    >
      <!-- 跳转分类模块 -->
      <view class="addr" @tap.stop="link">
        <i class="iconfont" :class="icon"></i>
        {{ title }}
      </view>
      <!-- 搜索框 -->
      <view v-if="props.inputDisabled" class="input-box" @tap.stop="discard">
        <input
          :value="props.placeholder"
          :placeholder="props.placeholder ? '' : '请输入关键字'"
          style="color: #888"
          placeholder-style="color:#ccc;"
          @confirm="toSearch"
          @input="handleSearchValueChange"
        />
        <view class="icon search" @tap.stop="toSearch"></view>
      </view>
      <view v-else class="input-box">
        <input
          disabled
          :value="props.placeholder"
          placeholder-style="color:#ccc;"
          @tap="toSearch"
        />
        <view class="icon search"></view>
      </view>
    </view>
    <!-- 占位 -->
    <view v-if="props.headerShow" class="place"></view>
  </view>
</template>

<style scoped lang="scss">
  .rf-search-bar {
    background-color: #fff;

    .status {
      width: 100%;
      height: 0;
      position: fixed;
      z-index: 10;
      background-color: #fff;
      top: 0;
      /*  #ifdef  APP-PLUS  */
      height: var(--status-bar-height); //覆盖样式
      /*  #endif  */
    }

    .header {
      width: 100%;
      height: 100upx;
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      z-index: 10;
      background-color: #fff;
      /*  #ifdef  APP-PLUS  */
      top: var(--status-bar-height);

      /*  #endif  */
      .addr {
        width: 120upx;
        height: 60upx;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        font-size: 28upx;

        .iconfont {
          height: 60upx;
          margin-right: 6upx;
          margin-left: 15upx;
          display: flex;
          align-items: center;
          font-size: 35upx;
          color: $base-color;
        }
      }

      .input-box {
        width: 100%;
        height: 60upx;
        background-color: #f5f5f5;
        border-radius: 30upx;
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 20upx 0 10upx;

        .icon {
          z-index: 9;
          display: flex;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
          width: 60upx;
          height: 60upx;
          font-size: 34upx;
          color: #c0c0c0;
        }

        input {
          width: 100%;
          padding-left: 28upx;
          height: 28upx;
          color: #888;
          font-size: 28upx;
        }
      }
    }

    .place {
      background-color: #ffffff;
      height: 100upx;
      /*  #ifdef  APP-PLUS  */
      margin-top: var(--status-bar-height);
      /*  #endif  */
    }
  }
</style>
