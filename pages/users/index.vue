<template>
  <v-container>
    <add-user @user-added="addUser"></add-user>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(user, index) in items" :key="user.id">
            <td>{{ ++index }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="d-flex">
              <edit-user
                class="m-1"
                :user-id="user.id"
                @user-updated="updateUserInList"
              ></edit-user>
              <v-btn
                @click="confirmDeleteUser(user.id)"
                class="m-1"
                color="#F44336"
                small
                >Delete</v-btn
              >
              <detail-user class="m-1" :user-id="user.id"></detail-user>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import AddUser from "../../components/User/AddUser.vue";
import DetailUser from "../../components/User/DetailUser.vue";
import EditUser from "../../components/User/EditUser.vue";
import Swal from "sweetalert2";
export default {
  components: {
    DetailUser,
    AddUser,
    EditUser,
  },
  data() {
    return {
      users: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.users = response.data.data.data || [];
        })
        .catch((error) => {
          console.error(
            "Error fetching users:",
            error.response ? error.response.data : error
          );
        });
    },
    addUser(newUser) {
      this.users.unshift(newUser);
    },
    confirmDeleteUser(userId) {
      Swal.fire({
        title: "Xác nhận xóa",
        text: "Bạn có chắc chắn muốn xóa người dùng này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(userId);
        }
      });
    },
    deleteUser(userId) {
      const token = localStorage.getItem("token");
      axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.users = this.users.filter((user) => user.id !== userId);
      Swal.fire({
        title: "Thành công",
        text: "Người dùng đã được xóa thành công.",
        icon: "success",
      });
    },
    updateUserInList(updatedUser) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.$set(this.users, index, updatedUser);
      }
    },
  },
};
</script>
