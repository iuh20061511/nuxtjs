<template>
  <v-container class="py-2">
    <v-row class="mt-5" justify="center" align="center">
      <v-col cols="12" md="6" lg="3" xl="3" v-for="(product, index) in data" :key="index" class="mb-1">
        <v-card class="h-100">
          <!-- Product image-->
          <v-img :src=" getFullImageUrl(product.image)" alt="Product Image" height="200"></v-img>
          <!-- Product details-->
          <v-card-title class="text-center">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-center">
            {{  formatPrice(product.price) }}
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn outlined color="primary" @click="viewProductOptions(product)">View options</v-btn>
            <v-btn v-if="product.isSale" outlined color="primary" @click="addToCart(product)">Add to cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      const response = await this.$axios.$get('http://127.0.0.1:8000/api/products'); // Thay đổi endpoint này
      this.data = response.data;
      console.log(this.data);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price).toLocaleString();
    },
    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
  }
};
</script>
<style>

</style>