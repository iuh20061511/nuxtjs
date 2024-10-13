<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <p>
            <span class="h6">Giỏ hàng </span>
            <span class="">({{ totalItems }} sản phẩm)</span>
          </p>

          <!-- Hiển thị sản phẩm trong giỏ hàng -->
          <template
            v-if="
              carts && carts.order_details && carts.order_details.length > 0
            "
          >
            <div
              v-for="(product, index) in carts.order_details"
              :key="product.id_product"
              class="card mb-1 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <div class="card-body">
                <div class="row align-items-center text-center">
                  <div class="col-md-3">
                    <img
                      :src="getFullImageUrl(product.image)"
                      alt="Image"
                      style="width: 100px; height: auto"
                    />
                  </div>
                  <div class="col-md-2">
                    <p class="small text-muted">Tên</p>
                    <p class="lead fw-normal">{{ product.product_name }}</p>
                  </div>
                  <div class="col-md-2">
                    <p class="small text-muted">Số lượng</p>
                    <div class="d-flex justify-content-center">
                      <button
                        class="btn btn-outline-dark me-1"
                        @click="
                          updateQuantity(product, index, product.quantity - 1)
                        "
                        :disabled="product.quantity <= 1"
                      >
                        -
                      </button>
                      <input
                        class="form-control text-center me-1"
                        type="number"
                        v-model.number="product.quantity"
                        min="0"
                        @change="
                          updateQuantity(product, index, product.quantity)
                        "
                        style="max-width: 5rem"
                      />
                      <button
                        class="btn btn-outline-dark"
                        @click="
                          updateQuantity(product, index, product.quantity + 1)
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <p class="small text-muted">Đơn giá</p>
                    <p class="lead fw-normal">
                      {{ formatPrice(product.unit_price) }} đ
                    </p>
                  </div>
                  <div class="col-md-2">
                    <p class="small text-muted">Thành tiền</p>
                    <p class="lead fw-normal">
                      {{ formatPrice(product.unit_price * product.quantity) }} đ
                    </p>
                  </div>
                  <div class="col-1">
                    <button
                      class="border-0"
                      style="background: none"
                      @click="deleteProductcart(product)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Thông báo giỏ hàng trống -->
          <div v-if="!carts?.order_details?.length">
            <p class="text-center">Giỏ hàng của bạn đang trống.</p>
          </div>

          <!-- Thông tin tổng tiền -->
          <div class="card mb-5" v-if="carts.total_order !== undefined">
            <div class="card-body p-4 bg-secondary">
              <div class="float-end" style="margin-right: 8%">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Tổng tiền:</span>
                  <span class="lead fw-normal"
                    >{{ formatPrice(carts.total_order) }} đ</span
                  >
                </p>
              </div>
            </div>
          </div>

          <!-- Nút đặt hàng -->
          <div class="d-flex justify-content-end">
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-primary btn-lg"
              @click="placeOrder"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  
  <script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      carts: {
        order_details: [],
        order_id: 0,
        total_order: 0,
      },
    };
  },
  computed: {
    totalItems() {
      return this.carts.order_details.length || 0;
    },
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price).toLocaleString();
    },
    getFullImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    async fetchcarts() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);

        this.carts = response.data[1] ||
          response.data[0] || { order_details: [] };

        this.updateTotalOrder();
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },
    async placeOrder() {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/order`,
          {
            order_details: this.carts.order_details,
            total_order: this.carts.total_order,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Đặt hàng thành công!",
            text: "Cảm ơn bạn đã đặt hàng!",
          });

          this.carts.order_details = [];
          this.carts.total_order = 0;
        }
      } catch (error) {
        console.error("Error placing order:", error);
        await Swal.fire({
          icon: "error",
          title: "Đặt hàng thất bại!",
          text: "Vui lòng thử lại.",
        });
      }
    },
    async updateQuantity(product, index, newQuantity) {
      if (newQuantity < 1) return;

      const order_id = this.carts.order_id;
      const product_id = product.id_product;

      this.carts.order_details[index].quantity = newQuantity;
      this.carts.order_details[index].total_price =
        product.unit_price * newQuantity;

      await this.updateCartQuantity(order_id, product_id, newQuantity);
      this.updateTotalOrder();
    },
    async updateCartQuantity(order_id, product_id, quantity) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/update-cart/${order_id}/${product_id}`,
          { quantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Update successful:", response.data);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        await Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại!",
          text: "Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.",
        });
      }
    },
    async deleteProductcart(product) {
      const order_id = this.carts.order_id;
      const product_id = product.id_product;

      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/delete-product-cart/${order_id}/${product_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          await this.fetchcarts();
          this.$toast.error("Xóa sản phẩm thành công!", {
            timeout: 1000,
          });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    updateTotalOrder() {
      this.carts.total_order = this.carts.order_details.reduce(
        (total, item) => total + item.unit_price * item.quantity,
        0
      );
    },
  },
  mounted() {
    this.fetchcarts();
  },
};
</script>
  
  <style scoped>
/* Bạn có thể thêm các kiểu dáng tùy chỉnh ở đây */
</style>
  