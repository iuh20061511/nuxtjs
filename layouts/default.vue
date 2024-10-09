<template>
  <v-app data-app>
    <header-view></header-view>
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
};
</script>

<style>
/* Add your styles here */
</style>
