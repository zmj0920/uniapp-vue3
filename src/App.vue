<script setup lang="ts">
	import {
		onHide,
		onLaunch,
		onShow
	} from '@dcloudio/uni-app';

	onLaunch(() => {
		console.log('App Launch');
	});
	onShow(() => {
		console.log('App Show');
	});
	onHide(() => {
		console.log('App Hide11');
	});
</script>

<style lang="scss">
  @import '@/static/css/index.scss';
</style>
