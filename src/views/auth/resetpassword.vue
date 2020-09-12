<template>
  <div>
    <div class="pt-4 pl-8"><logo /></div>
    <v-col sm="4" class="mx-auto pt-6" xs="10">
      <v-card class="pa-3 pr-5 pl-5">
        <div class="green__text font__bold pt-3 pb-4">Reset Password</div>
        <span class="font__x__sm">
          Enter the email address you signed up with so we can send a password
          reset link to the address</span
        >
        <form class=" pt-4" @submit.prevent="reset">
          <label>Email </label>
          <input
            required
            placeholer="Enter Email"
            type="email"
            class="auth__input__reg"
            v-model="email"
          />
          <div class="d-flex justify-center pt-3">
            <button class="green__btn pa-2 pr-14 pl-14 font__x__sm">
              Reset Password
            </button>
          </div>
        </form>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
export default {
  data: () => {
    return {
      email: null
    };
  },
  methods: {
    reset() {
      EventBus.$emit("load", true);
      this.$post(
        "/api/v1/auth/company/init-password-reset",
        { email: this.email },
        this,
        () => {
          EventBus.$emit("load", false);
          this.$notify({
            group: "foo",
            title: "Error",
            type: "sucess",
            text:
              "Check your email for a reset link.. you can close this tab now"
          });
        }
      );
    }
  }
};
</script>
