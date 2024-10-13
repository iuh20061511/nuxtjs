<template>
  <div>
    <v-btn @click="dialog = true" color="#4CAF50" class="m-3">
      Thêm sản phẩm mới
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Thêm sản phẩm mới</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="product.name"
              label="Tên Sản Phẩm"
              :rules="[(v) => !!v || 'Tên sản phẩm là bắt buộc']"
            ></v-text-field>
            <v-textarea
              v-model="product.description"
              label="Mô tả"
              :rules="[(v) => !!v || 'Mô tả là bắt buộc']"
            ></v-textarea>
            <v-text-field
              v-model="product.price"
              label="Giá"
              type="number"
              :rules="[(v) => !!v || 'Giá là bắt buộc']"
            ></v-text-field>
            <v-file-input
              v-model="product.image"
              label="Thêm Ảnh"
              accept="image/*"
              prepend-icon="mdi-camera"
              placeholder="Chọn ảnh sản phẩm"
              show-size
              :rules="[(v) => !!v || 'Hình ảnh là bắt buộc']"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Hủy </v-btn>
          <v-btn color="green darken-1" text @click="saveProduct">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions } from "vuex/dist/vuex.common.js";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      product: {
        name: "",
        description: "",
        price: "",
        image: null,
      },
      errors: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
    };
  },
  methods: {
    ...mapActions(["addProduct", "add"]),
    async saveProduct() {
      this.validateForm();

      if (this.hasErrors()) {
        Swal.fire({
          title: "Thông báo",
          text: "Vui lòng điền đầy đủ thông tin sản phẩm.",
          icon: "warning",
        });
        return;
      }

      try {
        // Lấy CSRF cookie
        await this.$axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        const formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("description", this.product.description);
        formData.append("price", this.product.price);
        formData.append("image", this.product.image);

        // Gửi yêu cầu POST để thêm sản phẩm
        const response = await this.$axios.post("/api/products", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Sản phẩm đã được thêm thành công:", response.data);
        this.add({
          id: response.data.product_id,
          name: response.data.product.name,
          description: response.data.product.description,
          price: response.data.product.price,
          image: response.data.product.image,
        });
        this.dialog = false;
        this.resetForm();
        Swal.fire({
          title: "Thêm sản phẩm thành công",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        Swal.fire({
          title: "Có lỗi xảy ra",
          text: error.response
            ? error.response.data.message
            : "Vui lòng thử lại.",
          icon: "error",
        });
      }
    },
    validateForm() {
      this.errors = {
        name: this.product.name ? "" : "Tên sản phẩm là bắt buộc",
        description: this.product.description ? "" : "Mô tả là bắt buộc",
        price: this.product.price ? "" : "Giá là bắt buộc",
        image: this.product.image ? "" : "Hình ảnh là bắt buộc",
      };
    },
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== "");
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
        price: "",
        image: null,
      };
      this.errors = {
        name: "",
        description: "",
        price: "",
        image: "",
      };
    },
    cancel() {
      this.dialog = false;
      this.resetForm();
    },
  },
};
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
