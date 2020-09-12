<template>
  <div
    class="upload__box d-flex align-center flex-column justify-center mt-4 pb-8 pt-8"
    @click="clickFile('file')"
    @dragover.prevent
    @drop.prevent="droppedFile($event, 'img')"
  >
    <div class="font_md__sm green__text font__bold text-center" img-name>Select Image</div>
    <div class="font__x__sm grey__text text-center" change>or drop image here</div>
    <input type="file" class="imgfile hide" @change="imgfile" />
  </div>
</template>
<script>
export default {
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
      this.$emit("image", file);
      document.querySelector("[img-name]").textContent = file.name;
      document.querySelector("[change]").textContent =
        "Click or drag to change Image";
    },
    clickFile() {
      document.querySelector(`.imgfile`).click();
    },
    droppedFile(e) {
      const file = e.dataTransfer.files;
      if (!this.$imgCheck(...file)) {
        this.$notify({
          group: "foo",
          type: "error",
          text: "Wrong format of image",
          title: "Error"
        });
        throw e;
      }
      this.$emit("image", file);
      document.querySelector("[img-name]").textContent = file[0].name;
    }
  }
};
</script>