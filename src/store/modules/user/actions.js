export default {
  async getCompanyProfile({ commit }, { vueApp }) {
    let request = await vueApp.$getRequest("/api/v1/company", vueApp);
    commit("setUserInfo", request.data.data);
  }
};
