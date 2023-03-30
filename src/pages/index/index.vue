<template>
  <view>
    <page-head title="swiper,可滑动视图"></page-head>
    <view class="uni-margin-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="home.indicatorDots"
        :autoplay="home.autoplay"
        :interval="home.interval"
        :duration="home.duration"
      >
        <swiper-item
          v-for="(item, index) in home.carouselList.index_top"
          :key="index"
          @tap="goToDetailPage(item)"
        >
          <view class="swiper-item">
            <image :src="item.cover" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="uni-flex">
      <view>1</view>
      <view>2</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import apiProduct from "@/api/product";
import { reactive } from "vue";
import { forward } from "@/utils/router";
const home: any = reactive({
  background: ["color1", "color2", "color3"],
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500,
  carouselList: {},
});

function getIndexList() {
  apiProduct.indexList().then((data: any) => {
    if (data.data) {
      home.carouselList = data.data.adv;
      uni.stopPullDownRefresh();
    }
  });
}

// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
onPullDownRefresh(() => {
  getIndexList();
});

function goToDetailPage(item: any) {
  forward("test");
}

onLoad(() => {
  getIndexList();
});
</script>

<style lang="scss">
/* 背景色 */
.uni-bg-red {
  background: #f76260;
  color: #fff;
}
.uni-bg-green {
  background: #09bb07;
  color: #fff;
}
.uni-bg-blue {
  background: #007aff;
  color: #fff;
}
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}
.swiper {
  height: 300rpx;
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}
.uni-common-mt {
  position: relative;
  margin-top: 60rpx;
}
.info {
  position: absolute;
  right: 20rpx;
}
.uni-padding-wrap {
  padding: 0 100rpx;
  width: 550rpx;
}
</style>
