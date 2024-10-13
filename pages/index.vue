<template>
  <v-row class="mt-5" justify="center" align="center">
    <v-col
      cols="12"
      md="6"
      lg="2"
      xl="2"
      v-for="product in data"
      :key="product.id"
      class="mb-1"
    >
      <v-card class="h-100">
        <v-img
          :src="getFullImageUrl(product.image)"
          alt="Product Image"
          height="200"
        ></v-img>
        <nuxt-link :to="`/products/${product.id}`" class="text-decoration-none">
          <v-card-title class="d-flex justify-center align-center">
            {{ product.name }}
          </v-card-title>
        </nuxt-link>
        <v-card-subtitle class="text-center">
          {{ formatPrice(product.price) }} VNĐ
        </v-card-subtitle>
        <v-btn color="info" class="m-1 ml-15" @click="addToCart(product.id)">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.$get(
        "http://127.0.0.1:8000/api/products",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      this.data = response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price).toLocaleString();
    },
    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    async addToCart(productId) {
      try {
        await this.$axios.post(
          `http://127.0.0.1:8000/api/add-product/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$toast.success("Thêm sản phẩm vào giỏ hàng thành công!", {
          timeout: 1000,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.error("Bạn cần đăng nhập để thực hiện thao tác này.", {
            timeout: 1000,
          });
          this.$router.push("/login");
        } else {
          console.error("Error adding product to cart:", error);
          this.$toast.error(
            "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.",
            {
              timeout: 1000,
            }
          );
        }
      }
    },
  },
};
</script>
