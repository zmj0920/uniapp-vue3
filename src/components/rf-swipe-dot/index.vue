<script lang="ts" setup name="UniSwiperDot">
  const props = defineProps({
    info: {
      type: Array,
      default() {
        return [];
      },
    },
    current: {
      type: Number,
      default: 0,
    },
    dotsStyles: {
      type: Object,
      default() {
        return {};
      },
    },
    // 类型 ：default(默认) indexes long nav
    mode: {
      type: String,
      default: "default",
    },
    // 只在 nav 模式下生效，变量名称
    field: {
      type: String,
      default: "",
    },
  });

  let dots: any = reactive({
    width: 8,
    height: 8,
    bottom: 10,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, .3)",
    border: "1px rgba(0, 0, 0, .3) solid",
    selectedBackgroundColor: "#333",
    selectedBorder: "1px rgba(0, 0, 0, .9) solid",
  });

  onMounted(() => {
    if (props.mode === "indexes") {
      dots.width = 20;
      dots.height = 20;
    }
    dots = Object.assign(dots, props.dotsStyles);
  });

  watch([props.dotsStyles, props.mode], (newVal) => {
    dots = Object.assign(dots, props.dotsStyles);
    if (newVal[1] === "indexes") {
      dots.width = 20;
      dots.height = 20;
    } else {
      dots.width = 8;
      dots.height = 8;
    }
  });
</script>

<template>
  <view class="uni-swiper__warp">
    <slot />
    <view
      v-if="mode === 'default'"
      :style="{ bottom: `${dots.bottom}px` }"
      class="uni-swiper__dots-box"
    >
      <view
        v-for="(item, index) in info"
        :key="index"
        :style="{
          width: `${index === current ? dots.width * 2 : dots.width}px`,
          height: `${dots.width / 3}px`,
          'background-color':
            index !== current ? dots.backgroundColor : dots.selectedBackgroundColor,
          'border-radius': '0px',
        }"
        class="uni-swiper__dots-item uni-swiper__dots-bar"
      />
    </view>
    <view
      v-if="mode === 'dot'"
      :style="{ bottom: `${dots.bottom}px` }"
      class="uni-swiper__dots-box"
    >
      <view
        v-for="(item, index) in info"
        :key="index"
        :style="{
          width: `${dots.width}px`,
          height: `${dots.height}px`,
          'background-color':
            index !== current ? dots.backgroundColor : dots.selectedBackgroundColor,
          border: index !== current ? dots.border : dots.selectedBorder,
        }"
        class="uni-swiper__dots-item"
      />
    </view>
    <view
      v-if="mode === 'round'"
      :style="{ bottom: `${dots.bottom}px` }"
      class="uni-swiper__dots-box"
    >
      <view
        v-for="(item, index) in info"
        :key="index"
        :class="[index === current && 'uni-swiper__dots-long']"
        :style="{
          width: `${index === current ? dots.width * 3 : dots.width}px`,
          height: `${dots.height}px`,
          'background-color':
            index !== current ? dots.backgroundColor : dots.selectedBackgroundColor,
          border: index !== current ? dots.border : dots.selectedBorder,
        }"
        class="uni-swiper__dots-item"
      />
    </view>
    <view
      v-if="mode === 'nav'"
      :style="{ 'background-color': dotsStyles.backgroundColor }"
      class="uni-swiper__dots-box uni-swiper__dots-nav"
    >
      <view :style="{ color: dotsStyles.color }" class="uni-swiper__dots-nav-item"
        >{{ `${current + 1}/${info.length}` }}
        {{ info[current] && info[current]?.[field] }}
      </view>
    </view>
    <view
      v-if="mode === 'indexes'"
      :style="{ bottom: `${dots.bottom}px` }"
      class="uni-swiper__dots-box"
    >
      <view
        v-for="(item, index) in info"
        :key="index"
        :style="{
          width: `${dots.width}px`,
          height: `${dots.height}px`,
          color: index === current ? dots.selectedColor : dots.color,
          'background-color':
            index !== current ? dots.backgroundColor : dots.selectedBackgroundColor,
          border: index !== current ? dots.border : dots.selectedBorder,
        }"
        class="uni-swiper__dots-item uni-swiper__dots-indexes"
        >{{ index + 1 }}</view
      >
    </view>
  </view>
</template>

<style>
  .uni-swiper__warp {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
  }
  .uni-swiper__dots-box {
    display: flex;
    position: absolute;
    bottom: 20rpx;
    justify-content: center;
    align-items: center;
    box-sizing: box-sizing;
    width: 100%;
  }
  .uni-swiper__dots-item {
    flex-shrink: 0;
    margin-left: 12rpx;
    border-radius: 50%;
    width: 16rpx;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.2s linear;
  }
  .uni-swiper__dots-item:first-child {
    margin: 0;
  }
  .uni-swiper__dots-default {
    border-radius: 50%;
  }
  .uni-swiper__dots-long {
    border-radius: 100rpx;
  }
  .uni-swiper__dots-bar {
    border-radius: 100rpx;
  }
  .uni-swiper__dots-nav {
    overflow: hidden;
    bottom: 0;
    z-index: 10;
    justify-content: flex-start;
    box-sizing: box-sizing;
    height: 60rpx;
    background: rgba(0, 0, 0, 0.2);
  }
  .uni-swiper__dots-nav-item {
    overflow: hidden;
    box-sizing: box-sizing;
    margin: 0 30rpx;
    text-overflow: ellipsis;
    font-size: 28rpx;
    color: #fff;
    white-space: nowrap;
  }
  .uni-swiper__dots-indexes {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    color: #fff;
  }
</style>
