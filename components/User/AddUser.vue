<template>
  <div>
    <v-btn @click="dialog = true" color="#4CAF50" class="m-3">
      Thêm người dùng
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Thêm mới người dùng</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="user.firstName"
              label="First Name"
              :rules="[(v) => !!v || 'First Name là bắt buộc']"
            ></v-text-field>
            <v-text-field
              v-model="user.lastName"
              label="Last Name"
              :rules="[(v) => !!v || 'Last Name là bắt buộc']"
            ></v-text-field>
            <v-text-field
              v-model="user.username"
              label="Username"
              :rules="[(v) => !!v || 'Username là bắt buộc']"
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              label="Email"
              :rules="[(v) => !!v || 'Email là bắt buộc']"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Password"
              type="password"
              :rules="[(v) => !!v || 'Password là bắt buộc']"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Hủy</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="saveUser"
            :disabled="isSaving"
          >
            <!-- Vô hiệu hóa nút nếu đang lưu -->
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(user, index) in users" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.username }} - {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
  
  <script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
      users: [],
      errors: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
      isSaving: false, // Trạng thái lưu
    };
  },
  methods: {
    async saveUser() {
      this.validateForm();

      if (this.hasErrors()) {
        Swal.fire({
          title: "Thông báo",
          text: "Vui lòng điền đầy đủ thông tin người dùng.",
          icon: "warning",
        });
        return;
      }

      this.isSaving = true; // Bắt đầu lưu

      try {
        await this.$axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        const csrfToken = document.head.querySelector(
          'meta[name="csrf-token"]'
        ).content;

        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          {
            first_name: this.user.firstName,
            last_name: this.user.lastName,
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          },
          {
            headers: {
              "X-CSRF-TOKEN": csrfToken,
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const newUser = {
            id: response.data.user_id, // Đảm bảo rằng bạn nhận được id đúng từ server
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            email: this.user.email,
          };

          this.$emit("user-added", newUser); // Truyền đối tượng người dùng mới đến component cha

          Swal.fire({
            title: "Thêm người dùng thành công",
            icon: "success",
            timer: 2000,
          });

          this.dialog = false;
          this.resetForm();
        }
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        Swal.fire({
          title: "Có lỗi xảy ra",
          text: error.response
            ? error.response.data.message
            : "Vui lòng thử lại.",
          icon: "error",
        });
      } finally {
        this.isSaving = false; // Hoàn tất lưu
      }
    },

    validateForm() {
      this.errors = {
        firstName: this.user.firstName ? "" : "First Name là bắt buộc",
        lastName: this.user.lastName ? "" : "Last Name là bắt buộc",
        username: this.user.username ? "" : "Username là bắt buộc",
        email: this.user.email ? "" : "Email là bắt buộc",
        password: this.user.password ? "" : "Password là bắt buộc",
      };
    },
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== "");
    },
    resetForm() {
      this.user = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      };
      this.errors = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      };
    },
    cancel() {
      this.dialog = false;
      this.resetForm();
    },
  },
};
</script>
  