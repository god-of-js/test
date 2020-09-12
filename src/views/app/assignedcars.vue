<template>
   <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
   <template v-slot:item.driver="{ item }">
       <div class="pa-2 pl-0">
      <v-avatar>
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
      >
    </v-avatar>
    <span class="ml-3">{{item.driver}}</span>
       </div>
    </template>
   <template v-slot:item.actions="{ item }">
      <v-btn class="blue__tbl__btn" @click="view(item)">View Detail</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Make',
            align: 'start',
            sortable: false,
            value: 'make',
          },
          { text: 'Model', sortable: false, value: 'model' },
          { text: 'Category', sortable: false,value: 'category' },
          { text: 'Driver',sortable: false, value: 'driver' },
          { text: '',sortable: false, value: 'actions', align: 'end' },
        ],
        desserts: [
          {
            make: 'Frozen Yogurt',
            model:'Benz',
            category: 'Truck',
            driver: 'John son abracadabra',
            actions: ''
          },
        ],
      }
    },
  }
</script>