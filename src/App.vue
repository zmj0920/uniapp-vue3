<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide11");
});
</script>

<style lang="scss">
// 导入colorUI
// @import "@/static/css/colorui/main.css";
// @import "@/static/css/colorui/icon.css";
// @import "@/static/css/colorui/animation.css";
// // 导入阿里巴巴矢量图标库
// @import "@/static/css/iconfont/iconfont.css";
@import "@/static/css/reset.scss";
@import "@/static/css/uni.scss";
</style>
