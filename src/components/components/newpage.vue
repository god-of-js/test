<template>
  <div class="d-flex" style="min-height: 100vh; background-color: #E5E5E5;">
    <div style="overflow: none;flex: 1.2;" class="side">
      <sidebar
        style=" position: -webkit-sticky;position: sticky;top: 0;width: 100%"
      />
    </div>
    <div style="flex: 8; padding-bottom: 0px; height: 100vh;">
      <navbar style="" :key="$router.history.current.name" />
      <router-view></router-view>
    </div>
  </div>
</template>
