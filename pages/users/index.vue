<template>
  <v-container>

    <v-btn @click="addUser" color="#4CAF50" class="mt-4 position-absolute top-1 left-100">Add User</v-btn>


    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="user in items" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <v-btn @click="editUser(user)" color="#03A9F4" small>Edit</v-btn>
              <v-btn @click="deleteUser(user.id)" color="#F44336" small>Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';


export default {
 
  data() {
    return {
      users: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get('http://127.0.0.1:8000/api/users')
        .then(response => {
          this.users = response.data.data.data || [];
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
};
</script>
