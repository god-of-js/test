import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./utils/imports.js";
import Notifications from "vue-notification";
import VueCompositionApi from "@vue/composition-api";

Vue.use(VueCompositionApi);
Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
