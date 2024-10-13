<template>
  <v-container class="mt-4">
    <v-row style="margin-top: 60px">
      <v-col cols="12">
        <v-card class="shadow-sm">
          <v-card-title class="bg-danger text-center text-white">
            <h5 class="mb-0">Đơn Hàng Của Bạn</h5>
          </v-card-title>
          <v-card-text>
            <template v-if="orders.length > 0">
              <v-card
                v-for="(order, orderIndex) in orders"
                :key="orderIndex"
                class="mb-3 p-3"
                @click="toggleOrderDetails(orderIndex)"
              >
                <v-card-title class="d-flex justify-space-between align-center">
                  <span class="text-dark cursor-pointer">
                    Đơn Hàng #{{ order.order_id }}
                  </span>
                  <v-badge color="green">
                    <template #content> Đã đặt </template>
                  </v-badge>
                </v-card-title>
                <div class="text-muted mb-2">
                  Ngày đặt: {{ new Date(order.date).toLocaleDateString() }}
                </div>
                <v-expand-transition>
                  <div
                    v-if="openOrderDetails === orderIndex"
                    class="order-details"
                  >
                    <table class="table w-100">
                      <thead>
                        <tr>
                          <th>Tên Sản Phẩm</th>
                          <th>Đơn Giá</th>
                          <th>Số Lượng</th>
                          <th>Thành Tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(orderDetail, index) in order.order_details"
                          :key="index"
                        >
                          <td>{{ orderDetail.product_name }}</td>
                          <td>{{ formatPrice(orderDetail.unit_price) }} VNĐ</td>
                          <td>{{ orderDetail.quantity }}</td>
                          <td>
                            {{ formatPrice(orderDetail.total_price) }} VNĐ
                          </td>
                        </tr>
                        <tr class="table-info">
                          <td><strong>Tổng Tiền</strong></td>
                          <td></td>
                          <td></td>
                          <td class="text-danger h5">
                            <strong
                              >{{ formatPrice(order.total_order) }} VNĐ</strong
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-expand-transition>
              </v-card>
            </template>

            <div v-else class="text-center text-muted">
              <p>Hiện tại bạn chưa có đơn hàng nào.</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      openOrderDetails: null,
    };
  },

  methods: {
    formatPrice(price) {
      return parseFloat(price).toLocaleString();
    },

    async fetchOrders() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders-user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.orders = response.data;
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },

    toggleOrderDetails(index) {
      this.openOrderDetails = this.openOrderDetails === index ? null : index;
    },
  },

  mounted() {
    this.fetchOrders();
  },
};
</script>
  
  <style>
.table {
  width: 100% !important;
  table-layout: auto;
}
</style>
  