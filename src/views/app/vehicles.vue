<template>
  <div class="pl-12" :key="$router.history.current.fullPath">
      <createvehicle
        :isActive="isAddVehicleActive"
        @close-modal="isAddVehicleActive = false"
      />
    <div class="d-flex justify-end">
      <v-btn class="d-flex justify-space-between green__vbtn ma-2" style="width: 200px" @click="isAddVehicleActive = true">
        <span>Add Vehicle</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center">
      <button :class="[makeActive === 'assigned' ||$router.history.current.fullPath === '/vehicles/assigned-cars'? 'active__table__btn': '' ,'table__btn pa-2']" @click="$router.push('/vehicles/assigned-cars')">Assigned Cars</button>
      <button :class="[makeActive === 'unassigned' || $router.history.current.fullPath === '/vehicles/unassigned-cars'? 'active__table__btn': '' ,'table__btn pa-2']" @click="$router.push('/vehicles/unassigned-cars')">Unassigned Cars</button>
    </div>
    <div class="d-flex justify-center">
         <div class="table__bg">
             <router-view/>
         </div>
    </div>
  </div>
</template>
<script>
import createvehicle from '@/components/components/createvehicle.vue'
export default {
  name: "vehicles",
  data: () => {
      return {
          makeActive: '',
          isAddVehicleActive: false
      }
  },
  components: {
      createvehicle
  },
  watch: {
      $route: {
          deep: true,
          handler() {
              if(this.$router.history.current.fullPath === '/vehicles/unassigned-cars') this.makeActive = 'unassigned'
              else if(this.$router.history.current.fullPath === '/vehicles/assigned-cars') this.makeActive = 'assigned'
          }
      }
  },
  mounted() {
     
  },
  methods:{

  }
};
</script>
