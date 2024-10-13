import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({
  products: [],
  productDetail: null,
});

export const actions = {
  async getProducts({ commit }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("SET_PRODUCTS", response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  async getProductDetail({ commit }, productId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("SET_PRODUCT_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  },

  async addProduct({ commit }, newProduct) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      commit("ADD_PRODUCT", response.data.data);
      return response;
    } catch (error) {
      console.error("Error while adding product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  add({ commit }, newProduct) {
    commit("ADD_PRODUCT", newProduct);
  }
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT_DETAIL(state, productDetail) {
    state.productDetail = productDetail;
  },
  ADD_PRODUCT(state, newProduct) {
    state.products.unshift(newProduct);
  },
};

export const getters = {
  getProducts: (state) => state.products,
  getProductDetail: (state) => state.productDetail,
};
