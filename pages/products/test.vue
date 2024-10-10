<template>
  <v-container>
    <v-row class="align-center mb-2">
      <v-col cols="12">
        <add-product style="position: absolute; right: 7%; top: 10px"></add-product>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="products"
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(product, index) in items" :key="product.id">
                <td>{{ ++index }}</td>
                <td>
                  <v-img
                    v-if="product.image"
                    :src="getImageUrl(product.image)"
                    alt="Product Image"
                    width="60"
                    height="60"
                    contain
                  ></v-img>
                </td>
                <td>{{ product.name }}</td>
                <td>
                  <span>{{ product.price.toLocaleString() }} VNĐ</span>
                </td>
                <td>
                  <div class="d-flex">
                    <edit-product class="m-1" :product-id="product.id"></edit-product>
                    <v-btn class="m-1" @click="deleteProduct(product.id)" color="red" small>Delete</v-btn>
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
import { mapGetters, mapActions } from 'vuex';
import AddProduct from '../../components/Products/AddProduct.vue';
import DetailProduct from '../../components/Products/DetailProduct.vue';
import EditProduct from '../../components/Products/EditProduct.vue';
export default {
  name: 'ProductList',
  components: {
      AddProduct,
      DetailProduct,
        EditProduct
    },

  computed: {
    ...mapGetters({
      products: 'allProducts',
    }),

    headers() {
      return [
        { text: 'STT', value: 'index', sortable: false },
        { text: 'Hình ảnh', value: 'image', sortable: false },
        { text: 'Tên sản phẩm', value: 'name' },
        { text: 'Giá', value: 'price' },
        { text: 'Hành động', value: 'actions', sortable: false },
      ];
    },
  },

  methods: {
    ...mapActions(['fetchProducts']),

    loadProducts() {
      this.fetchProducts();
    },

    getImageUrl(relativePath) {
      const baseUrl = 'http://127.0.0.1:8000/storage/';
      return baseUrl + relativePath;
    },

    deleteProduct(id) {
      // Thêm logic xóa sản phẩm tại đây
      console.log(`Deleting product with id: ${id}`);
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>
