export default {
  driver: state => {
    return state.drivers.filter(x => x._id === state.driverId);
  }
};
