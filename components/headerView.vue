<template>
  <v-toolbar color="yellow" > 
    <v-toolbar-items>
      <v-icon color="#E91E63" size="64px">mdi-home</v-icon>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text ><nuxt-link  class="text-decoration-none" to="/home">Home page</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/products">Sản phẩm</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/users">Người dùng</nuxt-link></v-btn>
      <v-btn text><nuxt-link class="text-decoration-none" to="/home">Home page</nuxt-link></v-btn>
     

      <v-card-text v-if="$auth.loggedIn" > 
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text style="text-transform: lowercase;">
              <v-icon left>
                mdi-account-circle-outline
              </v-icon>
              Hi {{ $auth.user.username }} !!
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-text>
    
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>


export default {
  methods: {
    async  logout() {
      localStorage.clear();
      await this.$auth.logout();
      this.$router.push('/login');

    }
  }
}
</script>

<style scoped>

</style>
