import Vue from "vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import axios from "axios";
import logo from "../components/components/logo.vue";
import invitedriver from "../components/components/invitedriver.vue";
import placescomp from "../components/components/placescomp.vue";
import imageupload from "../components/components/imageupload.vue";
import Firebase from "./firebase";
import cuid from 'cuid';
import {
  format,
  post,
  Delete,
  pdfCheck,
  imgCheck,
  get,
  put,
  patch,
  upload,
  getImage
} from "./helpers";
import VueTelInput from "vue-tel-input";
Vue.prototype.$axios = axios;
Vue.prototype.$format = format;
Vue.prototype.$post = post;
Vue.prototype.$getRequest = get;
Vue.prototype.$pdfCheck = pdfCheck;
Vue.prototype.$imgCheck = imgCheck;
Vue.prototype.$getImage = getImage;
Vue.prototype.$Delete = Delete;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$upload = upload;
Vue.prototype.$generateId = cuid();
Vue.prototype.$Firebase = new Firebase();
Vue.component("logo", logo);
Vue.component("invitedriver", invitedriver);
Vue.component("placescomp", placescomp);
Vue.component("imageupload", imageupload);
Vue.use(VueTelInput);
Vue.component(VueGoogleAutocomplete);
