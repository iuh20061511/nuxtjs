<template>
  <v-container class="py-5">
    <v-row class="mt-5" justify="center" align="center">
      <v-col cols="12" md="6" lg="3" xl="3" v-for="(product, index) in products" :key="index" class="mb-5">
        <v-card class="h-100">
          <!-- Product image-->
          <v-img :src="product.image" alt="Product Image" height="200"></v-img>
          <!-- Product details-->
          <v-card-title class="text-center">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-center">
            {{ product.price }}
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
      products: [
        { name: "Fancy Product", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$40.00 - $80.00" },
        { name: "Special Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$18.00", oldPrice: "$20.00", isSale: true, reviews: 5 },
        { name: "Sale Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$25.00", oldPrice: "$50.00", isSale: true },
        { name: "Popular Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$40.00", reviews: 5 },
        { name: "Sale Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$25.00", oldPrice: "$50.00", isSale: true },
        { name: "Fancy Product", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$120.00 - $280.00" },
        { name: "Special Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$18.00", oldPrice: "$20.00", isSale: true, reviews: 5 },
        { name: "Popular Item", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg", price: "$40.00", reviews: 5 }
      ]
    };
  },
  methods: {
    viewProductOptions(product) {
      alert(`View options for ${product.name}`);
    },
    addToCart(product) {
      alert(`${product.name} added to cart`);
    }
  }
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
