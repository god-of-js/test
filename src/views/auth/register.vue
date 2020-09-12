<template>
  <v-container class=" pl-14  mt-10">
    <div class="form_text pb-4">
      <div class="font__xmax font__bold">Hello there.</div>
      <div class="font__sm grey__text">
        Set up your account to get started with <br />
        <span class="green__text">cargopas</span>
      </div>
    </div>
    <form @submit.prevent="reg">
      <v-row>
        <v-col class="d-flex flex-column pt-6" cols="12" sm="6" xs="12" md="6">
          <label class=" pb-2">Company Name</label>
          <input class="auth__input__reg" v-model="body.companyName" required />
        </v-col>
        <v-col class="d-flex flex-column pt-6" cols="12" sm="6" xs="12" md="6">
          <label class=" pb-2">Company Phone Number</label>
          <vue-tel-input
            v-bind="verify"
            class="auth__input__reg"
            id="vti__input"
            v-model="body.phoneNumber"
          ></vue-tel-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column pt-6" cols="12" sm="6" xs="12" md="6">
          <label class=" pb-2">Company Email</label>
          <input
            class="auth__input__reg"
            v-model="body.email"
            type="email"
            required
          />
        </v-col>
        <v-col class="d-flex flex-column pt-6" cols="12" sm="6" xs="12" md="6">
          <label class=" pb-2">Password</label>
          <input
            class="auth__input__reg"
            v-model="body.password"
            type="password"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column pt-6" cols="12" sm="6" xs="12" md="6">
          <label class=" pb-2">Confirm Password</label>
          <input
            class="auth__input__reg"
            v-model="cpassword"
            type="password"
            required
          />
        </v-col>
      </v-row>

      <div class="d-flex align-center pt-6">
        <input type="checkbox" class="mr-6" />
        <span class="font__sm grey__text">Remember me</span>
      </div>

      <div class="pt-8">
        <button class="green__btn pa-2 pr-14 pl-14 font__x__sm">Sign Up</button>
      </div>
    </form>
  </v-container>
</template>
<script>
import auth from "@/auth";
import { EventBus } from "@/utils/eventbus.js";
export default {
  data: () => {
    return {
      cpassword: "",
      verify: {
        validate: true,
        mode: "international",
        defaultCountry: "NG",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: true,
        placeholder: "Enter a phone number",
        required: true,
        enabledCountryCode: false,
        enabledFlags: true,
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 17,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: false
        }
      },
      body: {
        companyName: "",
        phoneNumber: null,
        email: "",
        password: ""
      }
    };
  },
  methods: {
    reg() {
      EventBus.$emit("load", true);
      let error;
      if (this.cpassword !== this.body.password) {
        this.$notify({
          group: "foo",
          type: "error",
          text: "The two passwords dont match",
          title: "Error"
        });
        return error;
      }
      auth.reg(this.body, this);
    }
  }
};
</script>
