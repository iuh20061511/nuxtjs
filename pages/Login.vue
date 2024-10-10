<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md5>
      <v-card class="elevation-12 rounded-lg pa-5">
        <h2 class="text-center">Đăng nhập</h2>
        <p v-if="errorMessage" class="ml-2 red--text text-center m-1"><b>{{ errorMessage }}</b></p>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="login.email"
              prepend-icon="mdi-account-circle"
              name="login"
              label="Login"
              type="text"
              outlined
              rounded
              color="deep-purple accent-4"
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              outlined
              rounded
              color="deep-purple accent-4"
            ></v-text-field>
          </v-form>
          <v-layout justify-center>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="onSubmit" color="deep-purple" width="100px" dark>Login</v-btn>
            <v-spacer></v-spacer>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <load :visible="isLoading"></load>
</v-container>

</template>

<script>
import load from '../components/Loading/load.vue';

export default {
  name: "Login",
  components: {
    load,
  },
  data: () => ({
    login: {
      email: "",
      password: "",
    },
    isLoading: false, // Biến điều khiển hiển thị loader
    errorMessage: "", 
  }),
  methods: {
    async onSubmit() {
      this.errorMessage = "";
      this.isLoading = true; // Hiển thị loader khi bắt đầu đăng nhập
      try {
        // Lấy CSRF cookie từ Laravel backend
        await this.$axios.get("/sanctum/csrf-cookie");
        const response = await this.$auth.loginWith("laravelSanctum", {
          data: {
            email: this.login.email,
            password: this.login.password,
          },
        });

        if(response.status == 200){
          console.log('đã đăng nhập');
          localStorage.setItem("token", response.data.token);
          // Nếu đăng nhập thành công, gọi API để lấy thông tin người dùng
          const userResponse = await this.$axios.get("/api/user");
        }else {
          this.errorMessage = "Email hoặc mật khẩu không tồn tại";
        }
      
         
        this.$router.push("/");
      } catch (err) {
        console.error("Login failed:", err);
        this.errorMessage =
          "Email hoặc mật khẩu không tồn tại";
      } finally {
        this.isLoading = false; // Ẩn loader khi kết thúc quá trình đăng nhập
      }
    },
  },
};
</script>

<style scoped>
/* Thêm CSS cho trang login */
</style>
