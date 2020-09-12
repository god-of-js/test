<template>
  <v-app id="app" class="overflow-hidden">
    <notifications group="foo" />
    <loader v-if="loading === true" />
    <verify v-if="verification === true" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import loader from "./components/components/loader.vue";
import verify from "./components/components/verify.vue";
import { EventBus } from "./utils/eventbus.js";
export default {
  name: "App",
  components: {
    loader,
    verify
  },
  data: () => {
    return {
      loading: false,
      verification: false
    };
  },
  mounted() {
    EventBus.$on("load", value => {
      this.loading = value;
    });
    EventBus.$on("verify", value => {
      this.verification = value;
    });
  }
};
</script>
<style lang="scss">
@font-face {
  font-family: Raleway;
  src: url("/fonts/Raleway-Medium.ttf");
}
* {
  font-family: Raleway;
}
@import url("./style/variables.scss");
@import url("./style/style.scss");
@import url("./style/mobile.scss");
</style>
