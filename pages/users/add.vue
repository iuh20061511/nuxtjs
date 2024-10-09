<template>
  <v-container>
    <v-btn @click="showDialog">Mở Modal</v-btn>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>Thông báo</v-card-title>
        <v-card-text>Modal đã mở thành công!</v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
  },
};
</script>
