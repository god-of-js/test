<template>
  <input
    :label="label"
    ref="googleplaces"
    v-model="addr"
    class="auth__input"
    type="text"
  />
</template>
<script>
let vueApp;
export default {
  props: {
    label: String,
    isOutlined: Boolean,
    value: String
  },
  data: () => ({
    lon: "",
    lat: "",
    addr: " "
  }),
  watch: {
    value(newState) {
      this.addr = newState;
    },
    lon(newState) {
      this.$emit("placesChange", {
        lon: newState,
        lat: vueApp.lat,
        addr: vueApp.addr
      });
    },
    addr(newState) {
      this.$emit("placesChange", {
        lon: vueApp.lon,
        lat: vueApp.lat,
        addr: newState
      });
    },
    lat(newState) {
      this.$emit("placesChange", {
        lon: vueApp.lon,
        lat: newState,
        addr: vueApp.addr
      });
    }
  },
  mounted() {
    vueApp = this;
    this.addr = this.value;
    // eslint-disable-next-line
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.googleplaces,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", () => {
      let place = this.autocomplete.getPlace();
      let address = place.formatted_address;
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      this.addr = address;
      this.lon = lon;
      this.lat = lat;
      this.postalCode = place.postal_code;
      console.log(place);
    });
  }
};
</script>
