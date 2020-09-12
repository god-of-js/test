<template>
  <div class="pa-10 pt-0">
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="10" xs="12" md="3" class="pt-0">
        <v-list :avatar="true" class="box__shadow border__radius">
          <v-list-item-group v-model="drivers">
            <v-list-item
              v-for="(driver, i) in drivers"
              :key="i"
              @click="viewDriver(driver)"
            >
              <v-list-item-avatar>
                <v-img
                  :src="driver.avatar ? driver.avatar : '/img/avatar.jpg'"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="font__sm"
                  v-html="$format(driver.firstName + ' ' + driver.lastName)"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col
        md="9"
        sm="10"
        xs="12"
        class="white__bg box__shadow border__radius"
      >
        <v-row>
          <v-col cols="12" sm="12" xs="12" md="4">
            <div class=" pt-5 pb-5 pl-2 pr-2 text-center mb-3">
              <div class="d-flex justify-center pb-2 align-end">
                <img src="/img/avatar.jpg" width="90" class="circle" />
                <div>
                  <button class="circle green__btn img__change">
                    <img src="/img/image.svg" width="15" />
                  </button>
                </div>
              </div>
              <div
                class="font__sm font__bold black__text wid__100 text__no__overflow "
              >
                {{ $format(driver[0].lastName + " " + driver[0].firstName) }}
              </div>
              <div
                class="font__md__sm  black__text wid__100 text__no__overflow pb-3"
              >
                {{ driver[0].email }}
              </div>
            </div>
          </v-col>
          <v-col sm="12" md="8" cols="12" xs="12">
            <div class=" pa-5 text-center mb-3">
              <div class="green__text text-left font__x__md ">
                Account Information
              </div>
              <form
                class="text-left border__bottom pb-8"
                @submit.prevent="updateDriverProfile"
              >
                <v-row>
                  <v-col
                    class="d-flex flex-column pt-6"
                    cols="12"
                    sm="6"
                    xs="12"
                    md="6"
                  >
                    <label class=" pb-2">First Name</label>
                    <input
                      class="auth__input__reg"
                      v-model="body.firstName"
                      required
                      :placeholder="driver[0].firstName"
                    />
                  </v-col>
                  <v-col
                    class="d-flex flex-column pt-6"
                    cols="12"
                    sm="6"
                    xs="12"
                    md="6"
                  >
                    <label class=" pb-2">Last Name</label>
                    <input
                      type="email"
                      class="auth__input__reg"
                      v-model="body.lastName"
                      :placeholder="driver[0].lastName"
                    />
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
                    <label class=" pb-2">Email Address</label>
                    <input
                      class="auth__input__reg"
                      v-model="body.email"
                      type="email"
                      required
                      disabled
                      :placeholder="driver[0].email"
                    />
                  </v-col>
                  <v-col
                    class="d-flex flex-column pt-6"
                    cols="12"
                    sm="6"
                    xs="12"
                    md="6"
                  >
                    <label class=" pb-2">Phone Number</label>
                    <input
                      class="auth__input__reg"
                      v-model="body.phoneNumber"
                      type="text"
                      required
                      :placeholder="driver[0].phoneNumber"
                    />
                  </v-col>
                </v-row>
                <div class="mt-4">
                  <v-btn
                    class="green__border__btn pl-8 pr-8"
                    @click="updateDriverProfile"
                    >Save
                  </v-btn>
                </div>
              </form>
              <div class="text-left pt-4">
                <div class="font__sm black__text font__bold">
                  Update Password
                </div>
                <form class="text-left pb-8">
                  <v-row>
                    <v-col
                      class="d-flex flex-column pt-6"
                      cols="12"
                      sm="6"
                      xs="12"
                      md="6"
                    >
                      <label class=" pb-2">Old Password</label>
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
                      <label class=" pb-2">New Password</label>
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
                      <label class=" pb-2">Confirm Password</label>
                      <input
                        class="auth__input__reg"
                        v-model="confirm"
                        type="password"
                        required
                      />
                    </v-col>
                  </v-row>
                  <div class="mt-4">
                    <v-btn class="green__border__btn pl-8 pr-8"
                      >Reset Password
                    </v-btn>
                  </div>
                </form>
              </div>
              <div class="d-flex justify-end">
                <v-btn color="red" @click="deleteDriver"> Delete Driver </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
import { mapState, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      body: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null
      },
      confirm: "",
      resetBody: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  mounted() {
    const vueApp = this;
    if (vueApp.$router.history.current.params.id !== "all") {
      this.$store.commit(
        "company/setDriver",
        vueApp.$router.history.current.params.id
      );
    }
    this.$store.dispatch("company/fetchDrivers", { vueApp });
  },
  computed: {
    ...mapState({
      drivers: state => state.company.drivers
    }),
    ...mapGetters({
      driver: "company/driver"
    })
  },
  watch: {
    $route(to, from) {
      to, from;
      this.$forceUpdate();
    }
  },
  methods: {
    UpdateProfile() {
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
    updateDriverProfile() {
      EventBus.$emit("load", true);
      this.body.firstName = this.driver.firstName;
      this.body.email = this.driver.email;
      this.body.lastName = this.driver.lastName;
      this.body.phoneNumber = this.driver.phoneNumber;
      this.$post(
        `/api/v1/company/drivers/${this.$router.history.current.params.id}`,
        this.body,
        this,
        () => {
          EventBus.$emit("load", false);
        }
      );
    },
    viewDriver(driver) {
      EventBus.$emit("inviteDriver", true);
      this.$store.commit("company/setDriver", driver._id);
      this.$router.push({ name: "drivers", params: { id: driver._id } });
    },
    deleteDriver() {
      EventBus.$emit("load", true);
      let data = "driver";
      let vueApp = this;
      this.$Delete(
        `/api/v1/company/drivers/${this.$router.history.current.params.id}`,
        { data },
        this,
        () => {
          EventBus.$emit("load", false);
          this.$router.push({ name: "drivers", params: { id: "all" } });
          this.$store.dispatch("company/fetchDrivers", { vueApp });
        }
      );
    }
  }
};
</script>
