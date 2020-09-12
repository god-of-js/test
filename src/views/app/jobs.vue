<template>
  <div class="pl-7 pa-5 pt-0">
    <div
      class="white__bg pa-5 wid__full green__left__border ma-3"
      v-for="index in 7"
      :key="index"
    >
      <div class="d-flex justify-space-between">
        <span class="green__text font__md__sm">Description</span>
      </div>
      <div class="font__sm">
        I need a fragile parcel transported to Lagos Nigeria and i would if it
        will be delivered with 2 weeks because it is kind of urgent
      </div>
      <div class="green__text font__md__sm pt-4">Location</div>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="font__md__sm font__bold">Johannessburg, SA</span>
          <span class="font__md__sm grey__text">Sept 13, 2020</span>
        </div>
        <v-icon class="ma-3 mt-0">mdi-arrow-right</v-icon>
        <div class="d-flex flex-column">
          <span class="font__md__sm font__bold">Johannessburg, SA</span>
          <span class="font__md__sm grey__text">Sept 13, 2020</span>
        </div>
      </div>
      <div class="d-flex justify-space-between align-end">
        <div>
          <div class="green__text font__md__sm pt-4">Price</div>
          <span class="font__md__sm font__bold">&#8358;10000</span>
        </div>
        <button class="green__view__btn font__md__sm pl-4 pr-4">
          Assign Job
        </button>
      </div>
    </div>
  </div>
</template>
<script>
let vueApp;
export default {
  mounted() {
    vueApp = this;
    console.log(vueApp);
    vueApp.$store.dispatch("company/fetchJobs", { vueApp });
  }
};
</script>
<style scoped>
.green__view__btn {
  background-color: #006763;
  color: #ffffff;
  border-radius: 25px;
  outline: none;
}
.green__view__btn:hover {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
}
</style>
