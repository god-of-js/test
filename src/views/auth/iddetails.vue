<template>
  <div class="pt-4">
    <form @submit.prevent="submit">
      <div class="pb-10">
        <div class="d-flex align-center">
          <div class="green__bullet mr-4"></div>
          <div class="font__sm">Manager Id Card</div>
        </div>
        <div class="d-flex justify-center">
          <div
            class="upload__box d-flex align-center flex-column justify-center mt-4 pb-8 pt-8"
            @click="clickFile('file')"
            @dragover.prevent
            @drop.prevent="droppedFile($event, 'img')"
          >
            <div class="font_md__sm green__text font__bold " img-name>
              Select Image
            </div>
            <div class="font__x__sm grey__text  " change>
              or drop image here
            </div>
            <input type="file" class="imgfile hide" @change="imgfile" />
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex align-center">
          <div class="green__bullet mr-4"></div>
          <div class="font__sm">ID Card Type</div>
        </div>
        <div>
          <div class="font__x__sm pl-7 pt-4">ID type</div>
          <v-col md="6">
            <input type="text" class="auth__input ml-3" v-model="body.idType" />
          </v-col>
        </div>
      </div>

      <div class="d-flex justify-center pb-4 pt-8">
        <v-btn class="green__vbtn pl-16 pr-16" @click="next">next step</v-btn>
        <router-link to="/dashboard" class="no__link__style">
          <v-btn class=" pl-16 pr-16 ml-4" @click="next">Dashboard</v-btn>
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { EventBus } from "../../utils/eventbus";
export default {
  data: () => {
    return {
      body: {
        img: null,
        idType: null
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
      this.body.img = file;
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
        this.body.img = file;
        document.querySelector("[img-name]").textContent = file[0].name;
      }
    },
    next() {
      if (!this.body.img || !this.body.idType) {
        this.$notify({
          group: "foo",
          type: "error",
          text: "All fields must be filled before submission",
          title: "Missing Fields"
        });
        return this;
      }
      EventBus.$emit("change", ["companydetails", 2, this.body, "id"]);
    }
  }
};
</script>
