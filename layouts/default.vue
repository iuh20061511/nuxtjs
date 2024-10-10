<template>
  <v-app data-app>
    <header-view style="max-height: 65px;"></header-view>
    <v-main>
      <v-container>
        <nuxt></nuxt>
      </v-container>
    </v-main>
    <footer-view></footer-view>
  </v-app>
</template>

<script>
import footerView from '../components/footerView.vue';
import headerView from '../components/headerView.vue';

export default {
  components: {
    footerView,
    headerView,
  },
  head() {
    return {
      title: 'Tên trang của bạn',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Mô tả trang của bạn' },
        { name: 'csrf-token', content: '{{ csrf_token() }}' }, // Thêm token CSRF
      ],
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>
