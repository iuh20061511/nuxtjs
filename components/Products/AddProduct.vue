<template>
  <div>
    <!-- Nút mở dialog để thêm sản phẩm mới -->
    <v-btn @click="dialog = true" color="#4CAF50" class="m-3">Thêm sản phẩm mới</v-btn>

    <!-- Dialog hiển thị form thêm sản phẩm -->
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:default>
        <v-card>
          <v-card-title>
            <span class="headline">Thêm sản phẩm mới</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="product.name" label="Tên Sản Phẩm" required></v-text-field>
              <v-text-field v-model="product.description" label="Mô tả" required></v-text-field>
              <v-text-field v-model="product.price" label="Giá" type="number" required></v-text-field>
              <v-file-input
                v-model="product.image"
                label="Thêm Ảnh"
                accept="image/*"
                prepend-icon="mdi-camera"
                placeholder="Chọn ảnh sản phẩm"
                show-size
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Hủy</v-btn>
            <v-btn color="green darken-1" text @click="saveProduct">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      product: {
        name: '',
        description: '',
        price: '',
        image: null // Đảm bảo `image` khởi tạo là `null` hoặc `undefined`
      }
    };
  },
  methods: {
    saveProduct() {
      console.log("Thông tin sản phẩm:", this.product);
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.product = {
        name: '',
        description: '',
        price: '',
        image: null // Đặt lại `image` về `null`
      };
    }
  }
};
</script>

<style scoped>
</style>
