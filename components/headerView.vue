<template>
  <v-toolbar color="">
    <v-toolbar-items v-if="$auth.loggedIn">
      <nuxt-link to="/">
        <img
          src="https://i.imgur.com/1MP695I.jpeg"
          alt=""
          style="width: 65px"
        />
      </nuxt-link>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text v-if="$auth.loggedIn"
        ><nuxt-link class="text-decoration-none" to="/"
          >TRANG CHỦ</nuxt-link
        ></v-btn
      >
      <v-btn text v-if="$auth.loggedIn"
        ><nuxt-link class="text-decoration-none" to="/products"
          >Sản phẩm</nuxt-link
        ></v-btn
      >
      <v-btn text v-if="$auth.loggedIn"
        ><nuxt-link class="text-decoration-none" to="/users"
          >Người dùng</nuxt-link
        ></v-btn
      >
      <v-btn text v-if="$auth.loggedIn"
        ><nuxt-link class="text-decoration-none" to="/cart"
          ><v-icon color="red">mdi-cart</v-icon></nuxt-link
        ></v-btn
      >

      <v-card-text v-if="$auth.loggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text style="text-transform: lowercase">
              <v-icon left> mdi-account-circle-outline </v-icon>
              Hi {{ $auth.user.username }} !!
            </v-btn>
          </template>
          <v-list class="mt-5">
            <v-list-item>
              <nuxt-link
                to="/order/oders-tatistics"
                class="text-decoration-none text-dark"
              >
                <v-list-item-title>thống kê đặt hàng</v-list-item-title>
              </nuxt-link>
            </v-list-item>
            <v-list-item>
              <nuxt-link
                to="/order/product-statistics"
                class="text-decoration-none text-dark"
              >
                <v-list-item-title>thống kê sản phẩm</v-list-item-title>
              </nuxt-link>
            </v-list-item>
            <v-list-item>
              <nuxt-link to="/order" class="text-decoration-none text-dark">
                <v-list-item-title>Đơn hàng</v-list-item-title>
              </nuxt-link>
            </v-list-item>
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
    async logout() {
      localStorage.clear();
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>
