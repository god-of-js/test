export default {
  setUserInfo: (state, user) => {
    state.user = user;
    let token = user.accessToken;
    if (state.config === null) {
      state.config = { headers: { Authorization: `Bearer ${token}` } };
    }
  }
};
