<template>
  <div id="modal" v-if="isActive">
    <v-col sm="5" md="4" class="mx-auto" xs="10">
      <v-card class="pa-3 pr-5 pl-5">
        <div class="green__text font__bold pt-3 d-flex align-center justify-space-between">
          <span>Add Vehicle</span>
          <button @click="$emit('close-modal')">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
        <div class="font__sm pt-4">Enter vehicle details</div>
        <form class="pa-0 pt-4" @submit.prevent="createVehicle" ref="form">
          <input
            required
            placeholer="Enter Email"
            type="text"
            class="auth__input__reg"
            v-model="make"
            placeholder="Enter Make of vehicle"
          />
          <input
            required
            type="text"
            class="auth__input__reg"
            v-model="model"
            placeholder="Enter Model of vehicle"
          />
          <select
            required
            type="text"
            class="auth__input__reg mb-2"
            v-model="category"
            placeholder="Enter Category of vehicle"
          >
            <option
              :value="item.value"
              v-for="(item, index) in categories"
              :key="index"
            >{{$format(item.text)}}</option>
          </select>
          <input
            required
            type="number"
            class="auth__input__reg"
            placeholder="Enter Price per kilometer in Naira"
            v-model="pricePerKilometer"
          />
          <input
            required
            type="text"
            class="auth__input__reg"
            v-model="maxCargoWeight"
            placeholder="Enter Maximum cargo weight"
          />
          <imageupload @image="getImage($event)" style="width: 80%" class="mx-auto" />
          <div class="d-flex justify-center pt-3">
            <button class="green__btn pa-2 pr-14 pl-14 font__x__sm">Add Vehicle</button>
          </div>
        </form>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventbus.js";
let err;
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data: () => {
    return {
      make: null,
      model: null,
      category: null,
      pricePerKilometer: null,
      maxCargoWeight: null,
      driver: null,
      vehicleImages: null,
      categories: [
        {
          text: "Lorry",
          value: "lorry"
        },
        {
          text: "convertible",
          value: "convertible"
        },
        {
          text: "station wagon",
          value: "station wagon"
        },
        {
          text: "crossover",
          value: "crossover"
        },
        {
          text: "hatchback",
          value: "hatchback"
        },
        {
          text: "minivans",
          value: "minivans"
        },
        {
          text: "pickup trucks",
          value: "pickup trucks"
        },
        {
          text: "sedan",
          value: "sedan"
        },
        {
          text: "Motorcycle",
          value: "motorcycle"
        }
      ]
    };
  },
  methods: {
    createVehicle() {
        EventBus.$emit("load", true);
      if (!this.$imgCheck(this.vehicleImages)) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Error",
          type: "error",
          text: "Images must be provided"
        });
        return err;
      }
     this.$upload(
        this.vehicleImages,
        `vehicle-image-${this.$generateId}`,
        this
      ).then(async () => {
          console.log("okay");
          this.vehicleImages = await this.$getImage(
            `vehicle-image-${this.$generateId}`,
            this
          );
          let data = {
            make: this.make,
            model: this.model,
            category: this.category,
            pricePerKilometer: this.pricePerKilometer,
            maxCargoWeight: this.maxCargoWeight,
            vehicleImages: [this.vehicleImages]
          };
          console.log(data)
          this.$post("/api/v1/vehicle/company", data, this, () => {
            EventBus.$emit("load", false);
            (this.firstName = null),
              (this.lastName = null),
              (this.phone = null),
              (this.email = null),
              (this.password = null);
            EventBus.$emit("inviteDriver", false);
            this.$store.dispatch("company/fetchDrivers", { vueApp: this });
          });
          });
    },
    close() {
      EventBus.$emit("inviteDriver", false);
    },
    getImage(e) {
      this.vehicleImages = e;
    }
  }
};
</script>
