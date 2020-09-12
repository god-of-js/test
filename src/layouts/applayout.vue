<template>
  <div class="d-flex" style="min-height: 100vh; background-color: #E5E5E5;">
    <div style="flex: 1.2;">
      <sidebar />
    </div>
    <div style="flex: 8; padding-top: 6%;">
      <navbar style="" :key="$router.history.current.name" />
      <router-view class=""></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/components/sidebar.vue";
import navbar from "../components/components/navbar.vue";
export default {
  components: {
    sidebar,
    navbar
  },
  mounted() {
    this.$store.dispatch("user/getCompanyProfile", { vueApp: this });
  }
};
</script>
