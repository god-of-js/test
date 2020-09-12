<template>
  <div id="modal">
    <v-col sm="6" class="mx-auto" xs="10" md="4">
      <v-card class="pa-3 pr-5 pl-5">
        <div
          class="green__text font__bold pt-3 d-flex align-center justify-end"
        >
          <button @click="close"><v-icon>mdi-close </v-icon></button>
        </div>
        <div class="green__text font__bold font__md text-center pb-3">
          Your account has not been verified
        </div>
        <div class="d-flex justify-center">
          <v-col md="8" sm="8" class="text-center"
            >Your account will not appear in the search till it is
            verified</v-col
          >
        </div>
        <div class="d-flex justify-center pb-4 pt-2">
          <v-btn class="green__vbtn pl-16 pr-16" @click="verify"
            >Verify My Account</v-btn
          >
        </div>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
export default {
  methods: {
    close() {
      EventBus.$emit("verify", false);
    },
    verify() {
      this.$router.push("/verification");
      EventBus.$emit("verify", false);
    }
  }
};
</script>
