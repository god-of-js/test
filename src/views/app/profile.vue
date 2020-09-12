<template>
  <div class="pa-10 pt-0">
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="10" xs="12" md="3" class="mr-7">
        <div
          class="white__bg border__radius box__shadow pt-5 pb-5 pl-2 pr-2 text-center mb-3"
        >
          <div class="d-flex justify-center pb-2 align-end">
            <img src="/img/avatar.jpg" width="90" class="circle" />
            <div>
              <button class="circle green__btn img__change">
                <img src="/img/image.svg" width="15" />
              </button>
            </div>
          </div>
          <div
            class="font__sm font__bold black__text wid__100 text__no__overflow"
          >
            {{ $format(user.companyName) }}
          </div>
          <div
            class="font__md__sm black__text wid__100 text__no__overflow pb-3"
          >
            {{ user.email }}
          </div>
        </div>
      </v-col>
      <v-col sm="10" md="8" cols="12" xs="12">
        <div
          class="white__bg box__shadow border__radius pa-5 text-center mb-3 wid__100"
        >
          <div class="green__text text-left font__x__md">
            Account Information
          </div>
          <form class="text-left border__bottom pb-8">
            <v-row>
              <v-col
                class="d-flex flex-column pt-6"
                cols="12"
                sm="6"
                xs="12"
                md="6"
              >
                <label class="pb-2">Company Name</label>
                <input
                  class="auth__input__reg"
                  v-model="body.companyName"
                  required
                  disabled
                  :placeholder="$format(user.companyName)"
                />
              </v-col>
              <v-col
                class="d-flex flex-column pt-6"
                cols="12"
                sm="6"
                xs="12"
                md="6"
              >
                <label class="pb-2">Company Phone Number</label>
                <vue-tel-input
                  v-bind="verify"
                  class="auth__input__reg"
                  id="vti__input"
                  v-model="body.phoneNumber"
                ></vue-tel-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="d-flex flex-column pt-6"
                cols="12"
                sm="6"
                xs="12"
                md="6"
              >
                <label class="pb-2">Company Email</label>
                <input
                  class="auth__input__reg"
                  :placeholder="user.email"
                  type="email"
                  v-model="body.email"
                />
              </v-col>
              <v-col
                class="d-flex flex-column pt-6"
                cols="12"
                sm="6"
                xs="12"
                md="6"
              >
                <label class="pb-2">Company Address</label>
                <input
                  class="auth__input__reg"
                  v-model="body.password"
                  type="text"
                  required
                />
              </v-col>
            </v-row>
            <div class="mt-4">
              <v-btn class="green__border__btn pl-8 pr-8" @click="editProfile"
                >Save Profile</v-btn
              >
            </div>
          </form>
          <div class="text-left pt-4">
            <div class="font__sm black__text font__bold">Update Password</div>
            <form class="text-left pb-8">
              <v-row>
                <v-col
                  class="d-flex flex-column pt-6"
                  cols="12"
                  sm="6"
                  xs="12"
                  md="6"
                >
                  <label class="pb-2">Old Password</label>
                  <input
                    class="auth__input__reg"
                    v-model="resetBody.oldPassword"
                    required
                    type="password"
                  />
                </v-col>
                <v-col
                  class="d-flex flex-column pt-6"
                  cols="12"
                  sm="6"
                  xs="12"
                  md="6"
                >
                  <label class="pb-2">New Password</label>
                  <input
                    type="password"
                    class="auth__input__reg"
                    v-model="resetBody.newPassword"
                  />
                </v-col>
                <v-col
                  class="d-flex flex-column pt-6"
                  cols="12"
                  sm="6"
                  xs="12"
                  md="6"
                >
                  <label class="pb-2">Confirm Password</label>
                  <input
                    class="auth__input__reg"
                    v-model="confirm"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
              <div class="mt-4">
                <v-btn class="green__border__btn pl-8 pr-8" @click="reset"
                  >Reset Password</v-btn
                >
              </div>
            </form>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <div class="white__bg box__shadow border__radius pa-5">henry</div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      body: {
        email: "",
        phoneNumber: ""
      },
      confirm: "",
      resetBody: {
        oldPassword: "",
        newPassword: ""
      },
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
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    reset() {
      let err;
      EventBus.$emit("load", true);
      if (
        this.resetBody.oldPassword.length === 0 ||
        this.resetBody.newPassword.length === 0 ||
        this.confirm.length === 0
      ) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Missing Fields",
          type: "error",
          text: "You must provide all fields to change your password"
        });
        return err;
      }
      if (this.resetBody.newPassword !== this.confirm) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Equality Error",
          type: "error",
          text: "New password must match confirm password"
        });
        return err;
      }
      this.$post("/api/v1/company/password", this.resetBody, this, () => {
        EventBus.$emit("load", false);
      });
    },
    editProfile() {
      EventBus.$emit("load", true);
      let err;
      if (this.body.email) {
        if (/\S+@\S+/.test(this.body.email)) {
          err;
        } else {
          EventBus.$emit("load", false);
          this.$notify({
            group: "foo",
            title: "Invalid Email",
            type: "error",
            text: "Email has wrong format"
          });
          return err;
        }
      }
      if (!this.body.phoneNumber && !this.body.email) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Empty Request",
          type: "error",
          text: "You must pass a value to be edited"
        });
        return err;
      }
      if (this.body.email.length === 0) delete this.body.email;
      if (this.body.phoneNumber.length === 0) delete this.body.phoneNumber;
      this.$patch("/api/v1/company", this.body, this, () => {
        this.body.phoneNumber = "";
        this.body.email = "";
        EventBus.$emit("load", false);
      });
    }
  }
};
</script>
