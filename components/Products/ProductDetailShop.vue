<template>
  <v-container class="py-5">
    <v-row class="align-items-center shadow p-3 mb-5 bg-body">
      <v-col cols="12" md="6">
        <v-img :src="image" alt="Product Image" class="mb-5" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="small mb-1">SKU: BST-498</div>
        <h1 class="display-5 fw-bolder">{{ name }}</h1>
        <div class="fs-5 mb-5">
          <span>{{ formatPrice(price) }}</span>
        </div>
        <p class="lead">{{ description }}</p>
        <div class="d-flex">
          <v-text-field
            v-model.number="quantity"
            type="number"
            min="1"
            class="me-3 text-center"
            style="max-width: 5rem"
            solo
          />
          <v-btn color="dark" outlined @click="addToCart">
            <v-icon left>mdi-cart</v-icon>
            Thêm vào giỏ hàng
          </v-btn>
        </div>
        <p class="text-success mt-3" v-if="message">{{ message }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      price: "",
      description: "",
      image: "",
      createdAt: "",
      quantity: 1,
      idProduct: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async fetchUserData() {
      try {
        const result = await axios.get(
          `http://127.0.0.1:8000/api/products/${this.idProduct}`,
          { headers: { Authorization: `Bearer ${this.userInfo.token}` } }
        );
        if (result.status === 200) {
          const productData = result.data;
          this.name = productData.name;
          this.price = productData.price;
          this.description = productData.description;
          this.image = "http://127.0.0.1:8000/storage/" + productData.image;
          this.createdAt = new Date(productData.created_at).toLocaleString();
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    },
    async addToCart() {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/add-product/${this.idProduct}`,
          { quantity: this.quantity },
          { headers: { Authorization: `Bearer ${this.userInfo.token}` } }
        );

        if (response.status === 200) {
          toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
        }
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        toast.error(
          "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau."
        ); // Hiển thị thông báo lỗi toast
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>
  
  <style>
</style>
  