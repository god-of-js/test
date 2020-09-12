import { EventBus } from "@/utils/eventbus.js";
export default {
  reg: (body, vueApp) => {
    vueApp.$axios
      .post(
        vueApp.$store.state.app.apiUrl + "/api/v1/auth/company/register",
        body
      )
      .then(response => {
        vueApp.$notify({
          group: "foo",
          title: "Error",
          type: "sucess",
          text: response.data.message
        });
        vueApp.$router.push("/dashboard");
        EventBus.$emit("load", false);
        if (response.data.data.activated === false) {
          EventBus.$emit("verify", true);
        }
      })
      .catch(err => {
        err;
        console.log(err);
        vueApp.$notify({
          group: "foo",
          title: "Error",
          type: "error",
          text: err.response.data.message
        });
        EventBus.$emit("load", false);
      });
  },
  login: (body, vueApp) => {
    vueApp.$axios
      .post(vueApp.$store.state.app.apiUrl + "/api/v1/auth/company/login", body)
      .then(response => {
        vueApp.$store.commit("user/setUserInfo", response.data.data);
        vueApp.$notify({
          group: "foo",
          title: "Success",
          type: "sucess",
          text: response.data.message
        });
        vueApp.$router.push("/dashboard");
        EventBus.$emit("load", false);
        if (response.data.data.activated === false) {
          EventBus.$emit("verify", true);
        }
      })
      .catch(err => {
        vueApp.$notify({
          group: "foo",
          title: "Access Denied",
          type: "error",
          text: err.response.data.message
        });
        EventBus.$emit("load", false);
      });
  }
};
