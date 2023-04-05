<template>
  <view class="rf-index">
    <!-- 搜索导航栏 -->
    <uni-nav-bar title="导航栏组件"></uni-nav-bar>
    <uni-search-bar
      radius="5"
      placeholder="一直显示"
      clear-button="always"
      cancel-button="always"
      @confirm="search"
      @cancel="cancel"
    />
    <view class="swiper">
      <view class="swiper-box">
        <uni-swiper-dot :info="home.carouselList.index_top" :current="home.current">
          <swiper @change="handleDotChange" autoplay="true">
            <swiper-item v-for="(item, index) in home.carouselList.index_top" :key="index">
              <view class="swiper-item">
                <image :src="item.cover" mode="aspectFill" />
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
    </view>
    <!-- <view class="category-list rf-skeleton">
      <view class="category" v-for="(item, index) in home.productCateList" :key="index">
        <view class="img">
          <image :src="item.cover || ''" mode="aspectFill"></image>
        </view>
        <view class="text">{{ item.title }}</view>
      </view>
    </view>-->

    <!-- 分类列表 -->
    <swiper
      :indicator-active-color="'red'"
      indicator-color="#666"
      :indicator-dots="home.productCateList.length > 10"
      :style="{ height: home.productCateList.length <= 5 ? '200rpx' : '400rpx' }"
      class="category-list-wrapper"
      v-if="home.productCateList.length > 0"
    >
      <swiper-item
        class="category-list"
        v-for="(fItem, fIndex) in home.swipeCateList"
        :key="fIndex"
      >
        <view class="category" v-for="(sItem, sIndex) in fItem" :key="sIndex">
          <view class="img">
            <image :src="sItem.cover || '/static/errorImage.jpg'" mode="aspectFill"></image>
          </view>
          <view class="text in1line">{{ sItem.title }}</view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import apiProduct from "@/api/product";
import { forward } from "@/utils/router";
// 隐藏原生tabBar
// uni.hideTabBar();
const home: any = reactive({
  background: ["color1", "color2", "color3"],
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500,
  carouselList: {},
  current: 0,
  hotSearchDefault: "请输入关键字",
  productCateList: [], // 商品栏目
  swipeCateList: [],
  search: {},
  categoryList: [{ id: 0, title: '首页' }], // 分类列表
	merchantData: {}
});

function getIndexList() {
  apiProduct.indexList().then((data: any) => {
    if (data.data) {
      const { adv, cate, search } = data.data;
      home.carouselList = adv;
      home.productCateList = cate;
      home.search = search;
      const list: any[] = cate;
      let result: any[] = [];
      for (let i = 0, len = list.length; i < len; i += 10) {
        result.push(list.slice(i, i + 10));
      }

      home.swipeCateList = result;

      uni.stopPullDownRefresh();
    }
  });
}

// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
onPullDownRefresh(() => {
  getIndexList();
});

function goToDetailPage(_item: any) {
  forward("test1");
}

// 通用跳转
function navToSearch() {
  forward(`/pages/index/search/search?data=${JSON.stringify(home.search)}`);
}

function tabClick({ id }) {
  home.currentCate = id;
  if (id === 0) return;
  home.loading = true;
  home.page = 1;
  home.productLoading = true;
  home.categoryProductList = [];
  // this.getProductList(id);
}

onLoad(() => {
  getIndexList();
});
function handleDotChange() {}
// 跳转至分类页

function search(res) {
  uni.showToast({
    title: "搜索：" + res.value,
    icon: "none",
  });
}
function cancel(res) {
  uni.showToast({
    title: "点击取消，输入值为：" + res.value,
    icon: "none",
  });
}

const list: any = [
  {
    url: "/static/c1.png",
    text: "Grid 1",
    badge: "0",
    type: "primary",
  },
  {
    url: "/static/c2.png",
    text: "Grid 2",
    badge: "1",
    type: "success",
  },
  {
    url: "/static/c3.png",
    text: "Grid 3",
    badge: "99",
    type: "warning",
  },
  {
    url: "/static/c4.png",
    text: "Grid 4",
    badge: "2",
    type: "error",
  },
  {
    url: "/static/c5.png",
    text: "Grid 5",
  },
  {
    url: "/static/c6.png",
    text: "Grid 6",
  },
  {
    url: "/static/c7.png",
    text: "Grid 7",
  },
  {
    url: "/static/c8.png",
    text: "Grid 8",
  },
  {
    url: "/static/c9.png",
    text: "Grid 9",
  },
];

function change(e: any) {
  let { index } = e.detail;
  list[index].badge && list[index].badge++;

  uni.showToast({
    title: `点击第${index + 1}个宫格`,
    icon: "none",
  });
}
</script>


<style lang="scss">
page {
  background-color: $page-color-base;
}
.rf-index {
  background-color: $color-white;
  /*爆款拼团*/
  .wrapper {
    border-radius: 10upx;
    .h-list {
      background-color: $page-color-base;
      white-space: nowrap;
      padding: 0 $spacing-sm;
      .h-item {
        margin: $spacing-sm $spacing-sm $spacing-sm 0;
        display: inline-block;
        background-color: $color-white;
        font-size: $font-sm;
        width: 280upx;
        border-radius: 6upx;
        .h-item-img {
          display: inline-block;
          width: 280upx;
          height: 300upx;
          border-top-left-radius: 12upx;
          border-top-right-radius: 12upx;
          border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
        }
        .title {
          width: 280upx;
          white-space: normal;
          height: 60upx;
          line-height: 30upx;
          font-size: $font-sm;
          padding: 0 $spacing-sm;
          margin: $spacing-sm 0;
        }
        .last-line {
          padding: 0 $spacing-sm $spacing-base;
          margin-bottom: 5upx;
          display: flex;
          justify-content: space-between;
          align-items: center; /* 垂直居中 */
          .red {
            font-size: $font-sm;
            margin-right: 4upx;
          }
        }
        .price {
          font-size: $font-base - 2upx;
          line-height: 1;
          .m-price {
            margin-left: 8upx;
            color: $font-color-light;
            font-size: $font-sm;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  /*轮播图*/
  .swiper {
    width: 100%;
    margin-bottom: 20upx;
    display: flex;
    justify-content: center;
    .swiper-box {
      width: 92%;
      height: 40vw;
      overflow: hidden;
      border-radius: 15upx;
      box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
      //兼容ios，微信小程序
      position: relative;
      z-index: 1;
      swiper {
        width: 100%;
        height: 40vw;
        swiper-item {
          image {
            width: 100%;
            height: 40vw;
          }
        }
      }
    }
  }
  /* 爆款推荐 */
  .hot-recommend {
    background-color: $color-white;
    display: flex;
    padding: $spacing-base $spacing-lg 0;
    .hot-recommend-image {
      width: 100%;
      height: 100%;
    }
    .left {
      flex: 3;
      height: 350upx;
      margin-right: 15upx;
    }
    .right {
      flex: 4;
      .hot-recommend-image {
        height: 170upx;
      }
    }
  }
  /*轮播图2*/
  .swiper-item-text {
    position: absolute;
    bottom: 16upx;
    left: 30upx;
    height: 48upx;
    line-height: 48upx;
    background: rgba(0, 0, 0, 0.2);
    width: 90%;
    color: $color-white;
    border-bottom-left-radius: 12upx;
    padding-left: 20upx;
  }
  /*新闻通知*/
  .swiper-slide-header {
    .iconfont {
      font-size: $font-lg + 8upx;
      font-weight: 600;
    }
  }
  /*分类列表*/
  .category-list-wrapper {
    .category-list {
      width: 100%;
      padding: $spacing-base;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .category {
        margin-top: 10upx;
        width: calc(20% - 20upx);
        height: 132upx;
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .img {
          width: 100%;
          display: flex;
          justify-content: center;
          image {
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
          }
        }
        .text {
          margin-top: 16upx;
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 24upx;
          color: #3c3c3c;
        }
      }
    }
  }
  /*版权显示*/
  .copyright {
    margin: 10upx 0;
    width: 100%;
    text-align: center;
    color: #666;

    a {
      display: block;
      color: #666;
      text-decoration: none;
    }
  }
  /*限时抢购*/
  .order-item {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 0 30upx;
    margin-bottom: 20upx;

    .goods-box-single {
      display: flex;
      padding: 40upx 10upx 10upx;
      height: 330upx;
      border-radius: 12upx;
      margin-top: 20upx;
      box-shadow: 2px 2px 10px rgba(66, 135, 193, 0.2); // 阴影
      border-bottom: 1px solid rgba(0, 0, 0, 0.05); // 边框
      position: relative;

      .goods-img {
        display: block;
        border-radius: 12upx;
        width: 190upx;
        height: 200upx;
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 30upx 0 24upx;
        overflow: hidden;

        .title {
          font-weight: bold;
          line-height: 1.2;
          margin: 10upx 0;
        }

        .attr-box {
          line-height: 1.2;
          margin-bottom: 8upx;
          margin-left: 10upx;
        }

        .last-line {
          margin-top: 3upx;
          display: flex;
          justify-content: space-between;
          align-items: center; /* 垂直居中 */
          .red {
            margin-right: 4upx;
          }
        }

        .price {
          font-size: $font-lg;
          line-height: 1;
          .m-price {
            margin-left: 8upx;
            color: $font-color-light;
            font-size: $font-sm;
            text-decoration: line-through;
          }
        }

        .triangle-wrapper {
          position: absolute;
          overflow: hidden;
          top: 0;
          right: 0;
          border-radius: 12upx;

          .triangle {
            color: #5eba8f;
            width: 0;
            height: 0;
            border-top: 120upx solid;
            opacity: 0.8;
            border-left: 120upx solid transparent;
          }

          .triangle-content {
            position: absolute;
            top: 28upx;
            right: 0;
            transform: rotate(45deg);
            font-size: $font-sm - 2upx;
            color: #fff;
          }
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 90upx;
      position: relative;

      .discount-time {
        font-size: $font-sm;
        color: $uni-color-success;
        margin-right: 20upx;
      }
    }
  }
  .index-cate-product-list {
    padding-top: $spacing-sm;
    background-color: $page-color-base;
    .no-data {
      margin: 48upx 0;
      color: $font-color-light;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        margin-right: 20upx;
        font-size: $font-lg + 16upx;
      }
    }
  }
}
</style>

