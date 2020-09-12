<template>
  <div>
    <div class="d-flex align-center pt-7 pl-10 pb-10">
      <logo :width="35" />
      <span class="font__bold font__md ml-2">{{ $store.state.app.name }}</span>
    </div>
    <v-col cols="12" md="8" sm="12" xs="12" class="mx-auto">
      <div>Account Verification</div>
      <v-row class="d-flex">
        <v-col
          cols="12"
          md="4"
          sm="4"
          xs="4"
          v-for="(step, index) in stages"
          :key="index"
        >
          <div
            :class="stage >= step.index ? 'green__loader ' : ' loader '"
          ></div>
          <div class="pl-2 font__x__sm d-flex align-center grey__text">
            {{ index + 1 + ". " }} {{ " " }}{{ " " + step.name }}
          </div>
        </v-col>
      </v-row>
      <div>
        <component :is="componentId"></component>
      </div>
    </v-col>
  </div>
</template>
<script>
import companydetails from "./companydetails";
import iddetails from "./iddetails";
import location from "./location";
import { EventBus } from "@/utils/eventbus.js";
export default {
  data: () => {
    return {
      stages: [
        {
          name: "Manager Id Details",
          index: 1
        },
        {
          name: "Company Details",
          index: 2
        },
        {
          name: "Proof of Location",
          index: 3
        }
      ],
      componentId: "iddetails",
      stage: 1,
      body: {
        officeAddress: {
          location: {}
        },
        locations: [
          {
            location: {}
          }
        ]
      }
    };
  },
  mounted() {
    EventBus.$on("change", value => {
      this.componentId = value[0];
      this.stage = value[1];
      if (value[3] === "id") {
        this.body.managerIdType = value[2].idType;
        this.body.managerIdCard = value[2].img;
      } else if (value[3] === "compdetails") {
        this.body.officeAddress.street = value[2].street.addr;
        this.body.officeAddress.city = value[2].city.city;
        this.body.officeAddress.state = value[2].city.state;
        this.body.officeAddress.postalCode = value[2].postalCode;
        this.body.officeAddress.country = value[2].city.country;
        this.body.officeAddress.location.longitude = value[2].street.lon;
        this.body.officeAddress.location.latitude = value[2].street.lat;
        this.body.companyRegistration = value[2].img;
      } else if (value[3] === "location") {
        this.body.locations[0].street = value[2].street.addr;
        this.body.locations[0].city = value[2].city.city;
        this.body.locations[0].state = value[2].city.state;
        this.body.locations[0].postalCode = value[2].postalCode;
        this.body.locations[0].country = value[2].city.country;
        this.body.locations[0].location.longitude = value[2].street.lon;
        this.body.locations[0].location.latitude = value[2].street.lat;
        this.body.electricityBill = value[2].img;
        this.upload();
      }
    });
  },
  methods: {
    async upload() {
      await this.$upload(
        this.body.electricityBill,
        `electricbill-${this.$store.state.user.user._id}`,
        this
      );
      this.body.electricityBill = await this.$getImage(
        `electricbill-${this.$store.state.user.user._id}`,
        this
      );
      await this.$upload(
        this.body.companyRegistration,
        `companyRegistration-${this.$store.state.user.user._id}`,
        this
      );
      this.body.companyRegistration = await this.$getImage(
        `companyRegistration-${this.$store.state.user.user._id}`,
        this
      );
      console.log(this.body.companyRegistration, "registration");
      await this.$upload(
        this.body.managerIdCard,
        `managerIdCard-${this.$store.state.user.user._id}`,
        this
      );
      this.body.managerIdCard = await this.$getImage(
        `managerIdCard-${this.$store.state.user.user._id}`,
        this
      );
      console.log(this.body.managerIdCard, "manager");
      this.$post("/api/v1/verification/company", this.body, this, () => {
        EventBus.$emit("load", false);
        this.$router.push("/dashboard");
      });
    }
  },
  components: {
    companydetails,
    iddetails,
    location
  }
};
</script>
<style scoped></style>
