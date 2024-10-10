<template>
  <div>
    <v-btn @click="dialog = true" color="success" small>View</v-btn>
    
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:default>
        <v-card>
          <v-card-title class="text-center">
            <span class="headline ml-16">{{ product.name }}</span>
          </v-card-title>
          <v-card-text>
            <div class="product-info d-flex">
              <div class="product-image">
                <img :src="getFullImageUrl(product.image)" alt="Image" class="img-fluid rounded" />
              </div>
              <div class="product-details ms-3">
              <p><strong>Giá: </strong> {{ product.price | currency }}</p>
              <p><strong>Mô tả: </strong></p>
              <p>{{ product.description }}</p>
            
              </div>
            </div>
          </v-card-text>
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
        image: null 
      }
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
        .then(response => {
          this.product = response.data || {};
          console.log(this.product);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    },
  },
  filters: {
    currency(value) {
      if (!value) return '';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    },
  },
};
</script>

<style scoped>
</style>
