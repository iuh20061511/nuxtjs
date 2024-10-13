<template>
  <v-container>
    <v-row class="align-center mb-2">
      <v-col cols="12">
        <add-product
          style="position: absolute; right: 7%; top: 10px"
          @productAdded="onProductAdded"
        >
        </add-product>
      </v-col>
    </v-row>
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
              <tr v-for="(product, index) in items" :key="product?.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    :src="getFullImageUrl(product?.image)"
                    alt="Image"
                    class="p-2"
                    style="width: 60px; height: auto"
                  />
                </td>
                <td>{{ product?.name }}</td>
                <td>{{ product?.price | currency }}</td>
                <td>
                  <div class="d-flex">
                    <edit-product class="m-1" :product-id="product?.id" />
                    <v-btn
                      class="m-1"
                      @click="confirmDeleteProduct(product.id)"
                      color="red"
                      small
                    >
                      Delete
                    </v-btn>
                    <detail-product-vue class="m-1" :product-id="product?.id" />
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
import { mapState, mapActions } from "vuex";
import AddProduct from "../../components/Products/AddProduct.vue";
import DetailProductVue from "../../components/Products/DetailProduct.vue";
import EditProduct from "../../components/Products/EditProduct.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    AddProduct,
    EditProduct,
    DetailProductVue,
  },
  data() {
    return {
      headers: [
        { text: "STT", value: "index" },
        { text: "Hình ảnh", value: "image" },
        { text: "Tên sản phẩm", value: "name" },
        { text: "Giá", value: "price" },
        { text: "Hành động", value: "action" },
      ],
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts"]),

    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },

    onProductAdded(newProduct) {
      this.$store.commit("ADD_PRODUCT", newProduct);
    },

    confirmDeleteProduct(productId) {
      Swal.fire({
        title: "Xác nhận xóa",
        text: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(productId);
        }
      });
    },

    deleteProduct(productId) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://127.0.0.1:8000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.getProducts();
          Swal.fire({
            title: "Thành công",
            text: "Sản phẩm đã được xóa thành công.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          Swal.fire({
            title: "Có lỗi xảy ra!",
            text: "Không thể xóa sản phẩm. Vui lòng thử lại.",
            icon: "error",
          });
        });
    },
  },
  filters: {
    currency(value) {
      if (!value) return "";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style scoped>
</style>
