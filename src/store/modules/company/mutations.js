import { EventBus } from "../../../utils/eventbus.js";
export default {
  setDrivers(state, drivers) {
    state.drivers = drivers;
  },
  setDriver(state, driverId) {
    state.driverId = driverId;
    EventBus.$emit("inviteDriver", false);
  }
};
