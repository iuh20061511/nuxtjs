import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const state = () => ({
  products: [], // Danh sách sản phẩm
  userInfo: null, // Thông tin người dùng
});

export const mutations = {
  setProducts(state, products) {
    state.products = products; // Cập nhật danh sách sản phẩm
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo; // Cập nhật thông tin người dùng
  },
};

export const getters = {
  allProducts(state) {
    return state.products; // Trả về toàn bộ danh sách sản phẩm
  },
  userInfo(state) {
    return state.userInfo; // Trả về thông tin người dùng
  },
};

export const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('setProducts', response.data.data); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  },

  async addProduct({ dispatch }, product) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      await dispatch('fetchProducts'); // Cập nhật lại danh sách sản phẩm sau khi thêm
    } catch (error) {
      console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
      throw error; // Đẩy lỗi lên để xử lý ở component
    }
  },
};
