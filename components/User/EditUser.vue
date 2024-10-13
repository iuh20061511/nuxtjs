<template>
  <div>
    <v-btn @click="dialog = true" color="success" small>Chỉnh sửa</v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-center">
          <h3 class="headline text-center">Chỉnh sửa người dùng</h3>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="user.first_name"
              label="First Name"
              :rules="[(v) => !!v || 'First Name là bắt buộc']"
            ></v-text-field>
            <v-text-field
              v-model="user.last_name"
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Hủy</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="updateUser"
            :disabled="isSaving"
          >
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      user: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
      },
      isSaving: false,
    };
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`http://127.0.0.1:8000/api/users/${this.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.user = response.data.data || {};
          console.log(this.user);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        });
    },
    async updateUser() {
      this.isSaving = true; // Bắt đầu lưu
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/users/${this.userId}`,
          {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            username: this.user.username,
            email: this.user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Chỉnh sửa thành công",
            icon: "success",
            timer: 2000,
          });
          this.dialog = false;
          this.$emit("user-updated", response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        Swal.fire({
          title: "Có lỗi xảy ra",
          text: error.response
            ? error.response.data.message
            : "Vui lòng thử lại.",
          icon: "error",
        });
      } finally {
        this.isSaving = false;
      }
    },

    cancel() {
      this.dialog = false;
    },
  },
};
</script>
  
  <style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-image {
  margin-right: 1rem;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
  