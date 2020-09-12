<template>
  <div class="pt-4">
    <div class="pb-10">
      <div class="d-flex align-center">
        <div class="green__bullet mr-4"></div>
        <div class="font__sm">Electricity bill</div>
      </div>
      <div class="d-flex justify-center">
        <div
          class="upload__box d-flex align-center flex-column justify-center mt-4 pb-8 pt-8"
          @click="clickFile('file')"
          @dragover.prevent
          @drop.prevent="droppedFile($event, 'img')"
        >
          <div class="font_md__sm green__text font__bold" img-name>
            Select Image
          </div>
          <div class="font__x__sm grey__text" change>or drop image here</div>
          <input type="file" class="imgfile hide" @change="imgfile" />
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex align-center">
        <div class="green__bullet mr-4"></div>
        <div class="font__sm">Location</div>
      </div>
      <div>
        <v-row>
          <v-col md="4" sm="6" xs="12">
            <div class="font__x__sm pl-7 pt-4 pb-4">State</div>
            <input
              type="text"
              class="auth__input ml-5"
              @input="searchState"
              v-model="stateSearch"
              required
            />
          </v-col>
          <v-col md="4" sm="6" xs="12">
            <div
              class="font__x__sm  pt-4 pb-4 d-flex justify-between align-center"
            >
              <span>City</span>
              <v-progress-circular
                :value="20"
                class="ml-7"
                v-if="load"
              ></v-progress-circular>
            </div>
            <select name id class="auth__input" required v-model="body.city">
              <option v-if="cityArr.length === 0">Select state first</option>
              <option
                :value="city[index]"
                v-for="(city, index) in cityArr"
                :key="index"
                >{{ city[index].city }}</option
              >
            </select>
          </v-col>
          <v-col md="4" sm="6" xs="12">
            <div class="font__x__sm pl-7 pt-4 pb-4">Street</div>
            <placescomp @placesChange="setPlace" required />
          </v-col>
          <v-col md="4" sm="6" xs="12">
            <div class="font__x__sm pl-7 pt-4 pb-4">Postal Code</div>
            <input
              type="text"
              v-model="body.postalCode"
              class="auth__input ml-5"
              required
            />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="d-flex justify-center pb-4 pt-8">
      <v-btn class="green__vbtn pl-16 pr-16" @click="submit">Submit</v-btn>
      <v-btn class="pl-16 pr-16 ml-4" @click="prev">Back</v-btn>
    </div>
  </div>
</template>
<script>
import { EventBus } from "../../utils/eventbus";
import axios from "axios";
export default {
  data: () => {
    return {
      img: null,
      streetSearch: null,
      load: false,
      stateSearch: "",
      cityArr: [],
      stateArr: [],
      body: {
        city: null,
        street: null,
        postalCode: null
      }
    };
  },
  methods: {
    imgfile() {
      let err;
      const fileInput = document.querySelector(".imgfile");
      const file = fileInput.files[0];
      if (!this.$imgCheck(file)) {
        this.$notify({
          group: "foo",
          type: "error",
          text: "Wrong format of image",
          title: "Error"
        });
        throw err;
      }
      this.img = file;
      document.querySelector("[img-name]").textContent = file.name;
      document.querySelector("[change]").textContent =
        "Click or drag to change Image";
    },
    clickFile() {
      document.querySelector(`.imgfile`).click();
    },
    droppedFile(e, type) {
      const file = e.dataTransfer.files;
      if (type === "img") {
        if (!this.$imgCheck(...file)) {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Wrong format of image",
            title: "Error"
          });
          throw e;
        }
        this.img = file;
        document.querySelector("[img-name]").textContent = file[0].name;
      }
    },
    prev() {
      EventBus.$emit("change", ["companydetails", 2]);
    },
    async retValue() {
      axios({
        method: "GET",
        url: "https://andruxnet-world-cities-v1.p.rapidapi.com/",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "andruxnet-world-cities-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "d07f9ee355msh50d2fce181f024fp139c32jsn39a73fd73134",
          useQueryString: true
        },
        params: {
          query: this.stateSearch,
          searchby: "state"
        }
      })
        .then(response => {
          this.cityArr = [];
          this.cityArr.push(response.data);
          this.load = false;
        })
        .catch(() => {
          this.load = false;
        });
    },
    searchState() {
      this.load = true;
      setTimeout(() => {
        this.retValue();
      }, 3000);
    },
    async submit() {
      if (
        !this.body.postalCode ||
        !this.body.city ||
        !this.body.street ||
        !this.img
      ) {
        this.$notify({
          group: "foo",
          type: "error",
          text: "All fields must be filled before submission",
          title: "Missing Fields"
        });
        return this;
      }
      EventBus.$emit("load", true);
      this.body.img = this.img;
      EventBus.$emit("change", ["location", 3, this.body, "location"]);
    },
    setPlace(e) {
      this.body.street = e;
    }
  }
};
</script>
