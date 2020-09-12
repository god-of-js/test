<template>
  <nav
    class="top__nav d-flex justify-space-between pa-5 pt-3 align-center pb-2"
  >
    <span class="pl-6 font__bold "
      >{{ $format($router.history.current.name) }}
    </span>
    <div class="d-flex  align-center">
      <div class="search__cont pl-4 pt-1 pb-1 mr-12">
        <input type="text" class="transparent wid__90" placeholder="Search" />
        <v-icon class="icon"> mdi-magnify</v-icon>
      </div>
      <div class="avatar__cont circle mr-6">
        <img src="/img/avatar.jpg" width="35" class="circle" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style lang="scss">
.wid__90 {
  width: 210px;
}
.icon {
  font-size: 1.3em !important;
}
</style>
