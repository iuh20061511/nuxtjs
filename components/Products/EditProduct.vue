<template>
  <div>
    <!-- Nút mở dialog để chỉnh sửa sản phẩm -->
    <v-btn @click="dialog = true" color="warning" small>Edit</v-btn>


    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:default>
        <v-card>
          <v-card-title>
            <span class="headline">Chỉnh sửa sản phẩm</span>
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
              <v-img v-if="product.image" :src="getFullImageUrl(product.image)" height="200px" contain></v-img>
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
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      product: {
        name: '',
        description: '',
        price: '',
        image: null, 
      },
    };
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    fetchProduct() {
      axios
        .get(`http://127.0.0.1:8000/api/products/${this.productId}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
        .then((response) => {
          this.product = {
            name: response.data.name || '',
            description: response.data.description || '',
            price: response.data.price || '',
            image: response.data.image || null,
          };
          console.log(this.product);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    },
    saveProduct() {
      console.log('Sản phẩm đã được lưu:', this.product);
    },
  },
};
</script>

<style scoped>
/* Tùy chỉnh CSS cho dialog */
</style>
