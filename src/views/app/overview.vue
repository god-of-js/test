<template>
  <div class="pl-4 pt-0">
    <invitedriver v-if="invite === true" />
    <div class="white__bg ma-6 mt-0 wid__full border__radius pa-3  box__shadow">
      <v-row>
        <v-col cols="12" sm="6" xs="12" md="3" class="ma-0 mt-3 mb-3 pt-3 pa-0">
          <div class="overview__section h__70">
            <div class="green__text text-center font__sm ">Active Cargo</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3" class="ma-0 mt-3 mb-3 pt-3 pa-0">
          <div class="overview__section h__70">
            <div class="green__text text-center font__sm ">Delivered Cargo</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3" class="ma-0 mt-3 mb-3 pt-3 pa-0">
          <div class="overview__section h__70">
            <div class="green__text text-center font__sm ">
              Unassigned Cargo
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3" class="ma-0 mt-3 mb-3 pt-3 pa-0">
          <div class=" h__70">
            <div class="green__text text-center font__sm ">Drivers</div>
            <div class="text-right font__x__sm mr-2">
              <router-link to="/drivers/all">Manage Drivers</router-link>
            </div>
            <div class="d-flex justify-end pt-3 font__x__sm pr-2">
              <button
                class="invite__btn pl-4 pr-4 pa-1 d-flex justify-space-between align-center"
                @click="invite = true"
              >
                <span>Invite Driver </span>
                <v-icon style="color: white;">mdi-plus</v-icon>
              </button>
            </div>

            <v-list :avatar="true">
              <v-list-item-group v-model="item">
                <v-list-item
                  v-for="(driver, i) in drivers.slice(0, 6)"
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
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      invite: false
    };
  },
  mounted() {
    EventBus.$on("inviteDriver", value => {
      this.invite = value;
    });
    this.$store.dispatch("company/fetchDrivers", { vueApp: this });
  },
  computed: {
    ...mapState({
      drivers: state => state.company.drivers
    })
  },
  methods: {
    viewDriver(driver) {
      this.$router.push({ name: "drivers", params: { id: driver._id } });
    }
  }
};
</script>
