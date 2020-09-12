<template>
  <v-app class="auth__body">
    <v-row>
      <v-col cols="12" sm="9" xs="12" md="5" class="">
        <div class="d-flex justify-space-between align-center pa-4 pl-6">
          <img src="/img/cargologo.svg" alt="cargopas logo" width="50" />
          <div class="d-flex align-center">
            <router-link
              to="/register"
              :class="
                $router.history.current.name === 'login'
                  ? link + ' link '
                  : link + ' active__link'
              "
              >Sign Up</router-link
            >
            <router-link
              to="/"
              :class="
                $router.history.current.name === 'register'
                  ? link + ' link '
                  : link + ' active__link'
              "
              >Sign In
            </router-link>
          </div>
        </div>
        <transition name="slide-left">
          <router-view></router-view>
        </transition>
      </v-col>
      <v-col
        cols="12"
        sm="7"
        md="7"
        class="grey__bg d-flex align-center hide__790"
        id="hide__790"
        v-show="$vuetify.breakpoint.mdAndUp"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          color="#006763"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            class=""
            color="#006763"
          >
            <div class="d-flex  flex-column align-center  ">
              <img :src="slide.img" width="400" />
              <span class="black__text ">{{ slide.text }}</span>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      slides: [
        {
          img: "/img/deliveryman.svg",
          text: "Book service and get access to drivers and freight companies"
        },
        {
          img: "/img/mobilepayment.svg",
          text: "Pay for your freight services online"
        },
        {
          img: "/img/mappointers.svg",
          text: "Pay for freight services online using credit"
        }
      ],
      link: "font__sm mr-2 ml-2 "
    };
  }
};
</script>
<style lang="scss" scoped></style>
