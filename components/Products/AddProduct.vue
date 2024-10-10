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
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="product.name"
                label="Tên Sản Phẩm"
                required
                :error-messages="errors.name"
              ></v-text-field>
              <v-textarea
                v-model="product.description"
                label="Mô tả"
                required
                :error-messages="errors.description"
              ></v-textarea>
              <v-text-field
                v-model="product.price"
                label="Giá"
                type="number"
                required
                :error-messages="errors.price"
              ></v-text-field>
              <v-file-input
                v-model="product.image"
                label="Thêm Ảnh"
                accept="image/*"
                prepend-icon="mdi-camera"
                placeholder="Chọn ảnh sản phẩm"
                show-size
                :error-messages="errors.image"
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
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      product: {
        name: '',
        description: '',
        price: '',
        image: null,
      },
      errors: {
        name: '',
        description: '',
        price: '',
        image: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allProducts']), // Sử dụng mapGetters để truy xuất tất cả sản phẩm nếu cần
  },
// Component Vue
methods: {
  async saveProduct() {
    // Kiểm tra các trường dữ liệu trước khi lưu
    this.errors = {
      name: this.product.name ? '' : 'Tên sản phẩm là bắt buộc.',
      description: this.product.description ? '' : 'Mô tả là bắt buộc.',
      price: this.product.price ? '' : 'Giá là bắt buộc.',
      image: this.product.image ? '' : 'Ảnh là bắt buộc.',
    };

    if (this.errors.name || this.errors.description || this.errors.price || this.errors.image) {
      Swal.fire({
        title: "Thông báo",
        text: "Vui lòng điền đầy đủ thông tin sản phẩm.",
        icon: "warning",
      });
      return; // Không thực hiện lưu nếu có trường không hợp lệ
    }

    try {
      // Gọi action để thêm sản phẩm
      await this.$store.dispatch('addProduct', this.product); 
      this.dialog = false; // Đóng dialog
      this.resetForm(); // Reset form
      console.log(this.product);
      Swal.fire({
        title: "Thêm sản phẩm thành công",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Có lỗi xảy ra",
        text: "Vui lòng thử lại.",
        icon: "error",
      });
    }
  },
  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: '',
      image: null,
    };
    this.errors = { name: '', description: '', price: '', image: '' }; // Reset lỗi
  },
}

};
</script>

<style scoped>
</style>
