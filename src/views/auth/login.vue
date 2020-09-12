<template>
  <v-container class="pt-7 pl-14  mt-10">
    <div class="form_text pb-8">
      <div class="font__xmax font__bold">Welcome back.</div>
      <div class="font__sm grey__text">
        Continue from where you left off on<br />
        <span class="green__text">cargopas</span>
      </div>
    </div>
    <form @submit.prevent="login" class="pl-0">
      <div class="d-flex flex-column">
        <label class=" pb-2">Company Email</label>
        <input class="auth__input" v-model="body.email" required type="email" />
      </div>
      <div class="d-flex flex-column pt-6 pl-0">
        <label class=" pb-2">Password</label>
        <input
          class="auth__input"
          v-model="body.password"
          required
          type="password"
        />
      </div>
      <v-col class="pt-8 d-flex justify-space-between align-center pl-0" sm="9">
        <button class="green__btn pa-2 pr-14 pl-14 font__x__sm">Sign In</button>
        <router-link to="/reset-password" class="font__x__sm"
          >forgot password?</router-link
        >
      </v-col>
    </form>
  </v-container>
</template>
<script>
import auth from "@/auth";
import { EventBus } from "@/utils/eventbus.js";
export default {
  data: () => {
    return {
      body: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      EventBus.$emit("load", true);
      auth.login(this.body, this);
    }
  }
};
</script>
