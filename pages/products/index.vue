<template>
  <v-container>

    <v-row class="align-center mb-2">
      <v-col cols="12">
        <add-product style="position: absolute; right: 7%; top:10px"></add-product>
      </v-col>
    </v-row>
    
    <!-- Row chứa bảng dữ liệu -->
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="products"
          item-key="id"
          class="elevation-1 table"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(product, index) in items" :key="index">
                <td>{{ ++index }}</td>
                <td>
                  <img :src="getFullImageUrl(product.image)" alt="Image" class="p-2" style="width: 60px; height: auto"/>
                </td>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency }}</td>
                <td>
                  <div class="d-flex ">
                    <edit-product class="m-1" :product-id="product.id"></edit-product>
                    <v-btn class="m-1" @click="deleteproduct(product.id)" color="red" small>Delete</v-btn>
                    <detail-product class="m-1" :product-id="product.id"></detail-product>
                </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

  
  <script>
  import axios from 'axios';
  import AddProduct from '../../components/Products/AddProduct.vue';
import DetailProduct from '../../components/Products/DetailProduct.vue';
import EditProduct from '../../components/Products/EditProduct.vue';
  export default {
    components: {
      AddProduct,
      DetailProduct,
        EditProduct
    },
    data() {
      return {
        products: [],
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'image', value: 'image' },
          { text: 'name', value: 'name' },
          { text: 'price', value: 'price' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      };
    },
    mounted() {
      this.ftechProduct();
    },
    methods: {
      getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    ftechProduct() {
        axios.get('http://127.0.0.1:8000/api/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          .then(response => {
            this.products = response.data.data || [];
            console.log(this.products);
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },
      addUser() {
        console.log('Adding new user');
      },
      editUser(user) {
        console.log('Editing user', user);
      },
      deleteUser(userId) {
        axios
          .delete(`http://127.0.0.1:8000/api/users/${userId}`)
          .then(() => {
            this.users = this.users.filter(user => user.id !== userId);
            console.log('User deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting user:', error);
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
  
