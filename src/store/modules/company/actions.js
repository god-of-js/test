export default {
  async fetchDrivers({ commit }, { vueApp }) {
    let request = await vueApp.$getRequest("/api/v1/company/drivers", vueApp);
    commit("setDrivers", request.data.data);
  },
  async fetchDriver({ commit }, { vueApp }) {
    let request = await vueApp.$getRequest("/api/v1/company/drivers", vueApp);
    commit("setDriver", request.data.data);
  },
  async fetchJobs({ commit }, { vueApp }) {
    console.log(vueApp);
    let request = await vueApp.$getRequest(
      "/api/v1/jobs/company?perPage=20&page=1&status=posting",
      vueApp
    );
    console.log(request);
    commit;
    // commit("setDriver", request.data.data);
  }
};
