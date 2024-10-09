<template>
  <v-toolbar color="yellow"> 
    <v-toolbar-items>
      <v-icon color="#E91E63" size="64px">mdi-home</v-icon>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text ><nuxt-link  class="text-decoration-none" to="/home">Home page</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/products">Sản phẩm</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/users">Người dùng</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/home">Home page</nuxt-link></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
