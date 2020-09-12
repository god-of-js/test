<template>
  <div id="modal">
    <v-col sm="5" md="4" class="mx-auto" xs="10">
      <v-card class="pa-3 pr-5 pl-5">
        <div
          class="green__text font__bold pt-3 d-flex align-center justify-space-between"
        >
          <span>Invite Driver </span>
          <button @click="close"><v-icon>mdi-close </v-icon></button>
        </div>
        <form class=" pt-4" @submit.prevent="invite" ref="form">
          <div>
            <label>Enter Drivers Email </label>
            <input
              required
              placeholer="Enter Email"
              type="email"
              class="auth__input__reg"
              v-model="email"
            />
          </div>
          <div>
            <label>Enter Drivers First Name </label>
            <input
              required
              type="text"
              class="auth__input__reg"
              v-model="firstName"
            />
          </div>
          <div>
            <label>Enter Drivers Last Name </label>
            <input
              required
              type="text"
              class="auth__input__reg"
              v-model="lastName"
            />
          </div>
          <div>
            <label>Enter Drivers Phone Number </label>
            <vue-tel-input
              v-bind="verify"
              class="auth__input__reg"
              id="vti__input"
              v-model="phone"
            ></vue-tel-input>
          </div>
          <div>
            <label>Enter Password for Driver</label>
            <input
              required
              type="password"
              class="auth__input__reg"
              v-model="password"
            />
          </div>
          <v-col sm="11" xs="12">
            <div class="d-flex align-center">
              <input required type="checkbox" class="mr-3" />
              <span class="font__x__sm">
                You confirm that bearer of the above email is trust worthy and
                you accept resposibility of actions taken by him</span
              >
            </div></v-col
          >
          <div class="d-flex justify-center pt-3">
            <button class="green__btn pa-2 pr-14 pl-14 font__x__sm">
              Invite Driver
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
      email: null,
      phone: null,
      firstName: null,
      lastName: null,
      password: null,
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
      }
    };
  },
  methods: {
    invite() {
      EventBus.$emit("load", true);
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phone,
        email: this.email,
        password: this.password
      };
      this.$post("/api/v1/company/drivers", data, this, () => {
        EventBus.$emit("load", false);
      });
      (this.firstName = null),
        (this.lastName = null),
        (this.phone = null),
        (this.email = null),
        (this.password = null);
      EventBus.$emit("inviteDriver", false);
      this.$store.dispatch("company/fetchDrivers", { vueApp: this });
    },
    close() {
      EventBus.$emit("inviteDriver", false);
    }
  }
};
</script>
