import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import app from "./modules/app";
import user from "./modules/user";
import company from "./modules/company";
Vue.use(Vuex);

const vueLocalStorage = new VuexPersist({
  key: "STORAGE_KEY",
  storage: window.localStorage,
  reducer: state => ({
    user: {
      user: state.user.user,
      config: state.user.config
    }
  })
});
export default new Vuex.Store({
  state: {},
  plugins: [vueLocalStorage.plugin],
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
    company
  }
});
