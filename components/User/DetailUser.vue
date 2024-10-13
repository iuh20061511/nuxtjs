<template>
  <div>
    <v-btn @click="dialog = true" color="success" small>View</v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:default>
        <v-card>
          <v-card-title class="text-center">
            <h3 class="headline text-center">Thông tin người dùng</h3>
          </v-card-title>
          <v-card-text>
            <div class="user-info d-flex">
              <div class="user-details ms-3">
                <h4><strong>First_name: </strong> {{ user.first_name }}</h4>
                <h4><strong>Last_name: </strong> {{ user.last_name }}</h4>
                <h4><strong>Username: </strong> {{ user.username }}</h4>
                <h4><strong>Email: </strong> {{ user.email }}</h4>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      user: {
        username: "",
        email: "",
        address: "",
        phone: "",
        avatar: null,
        description: "",
      },
    };
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`http://127.0.0.1:8000/api/users/${this.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.user = response.data.data || {};
          console.log(this.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
  },
};
</script>
  
  <style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-image {
  margin-right: 1rem;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
  