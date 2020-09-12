<template>
  <div class="body red">
    <div class="contain">
      <div class="white__bg">
        <form @submit.prevent="register">
          <input v-model="body.email" placeholder="Email" />
          <input v-model="body.name" placeholder="Full Name" />
          <button>Apply</button>
        </form>
      </div>
    </div>
    <div class="contain">
      <div class="white__bg">
        <div class="item" v-for="(person, i) in users" :key="i">
          //looping through the users array
          <span>{{ person.name }}</span>
          <button class="del__btn" @click="del(person._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f1f1f1;
}
.body {
  font-family: "PT Serif", serif;
  display: flex;
  height: 100vh;
}
.contain {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}
.white__bg {
  background-color: #ffffff;
  border-radius: 10px;
  width: 300px;
  margin: auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
}
form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
input {
  padding: 5px;
  margin-bottom: 10px;
}
button {
  padding: 5px;
}
.item {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  margin: 4px;
}
</style>
<script>
import { EventBus } from "@/utils/eventbus.js";
export default {
  data: () => {
    return {
      body: {},
      confirm: "",
      resetBody: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  mounted() {},
  methods: {
    reset() {
      let err;
      EventBus.$emit("load", true);
      if (
        this.resetBody.oldPassword.length === 0 ||
        this.resetBody.newPassword.length === 0 ||
        this.confirm.length === 0
      ) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Missing Fields",
          type: "error",
          text: "You must provide all fields to change your password"
        });
        return err;
      }
      if (this.resetBody.newPassword !== this.confirm) {
        EventBus.$emit("load", false);
        this.$notify({
          group: "foo",
          title: "Equality Error",
          type: "error",
          text: "New password must match confirm password"
        });
        return err;
      }
      this.$post("/api/v1/company/password", this.resetBody, this, () => {
        EventBus.$emit("load", false);
      });
    }
  }
};
</script>
