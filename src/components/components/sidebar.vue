<template>
  <div class="sidebar box__shadow">
    <div class="d-flex align-center justify-center pt-2">
      <logo :width="35" />
      <span class="font__bold font__md ml-2">{{ $store.state.app.name }}</span>
    </div>
    <ul class="pt-7 mt-4 pa-0">
      <li
        v-for="(path, i) in routes"
        :key="i"
        @click="changeRoute(path)"
        :class="[
          { active__route: $router.history.current.path === path.path },
          routestyle
        ]"
        :id="`${path.name}-route`"
      >
        <div
          :class="
            $router.history.current.path === path.path
              ? 'align-center d-flex active__route'
              : ' align-center d-flex'
          "
        >
          <v-icon style="font-size: 1.2em;">{{ path.icon }}</v-icon>
          <span class="text-left pl-3 font__x__sm font__bold pt-1">{{
            path.name
          }}</span>
        </div>
        <div
          :class="
            $router.history.current.path === path.path ? 'active__signal' : ''
          "
          :id="path.name"
        ></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      routes: [
        {
          name: "DASHBOARD",
          path: "/dashboard",
          icon: "mdi-home"
        },
        {
          name: "OVERVIEW",
          path: "/overview",
          icon: "mdi-database"
        },
        {
          name: "PROFILE",
          path: "/profile",
          icon: "mdi-account"
        },
        {
          name: "JOBS",
          path: "/jobs",
          icon: "mdi-briefcase"
        }
      ],
      routestyle:
        "mt-5 mb-5 pt-3 pb-3 pl-3 d-flex align-center list__item justify-space-between"
    };
  },
  methods: {
    changeRoute(path) {
      this.$router.push(path.path);
      let id, item;
      for (let i = 0; i < this.routes.length; i++) {
        id = document.getElementById(`${this.routes[i].name}-route`);
        item = document.getElementById(`${this.routes[i].name}`);
        id.classList.remove("active__route");
        item.classList.remove("active__signal");
      }
      document.querySelector(`#${path.name}`).classList.add("active__signal");
    }
  }
};
</script>
<style>
.active__route {
  color: #000;
}
</style>
