<template>
   <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
   <template v-slot:item.actions="{ item }">
      <v-btn class="green__vbtn font__md__sm mr-2" @click="view(item)">Assign Driver</v-btn>
      <v-btn class="blue__tbl__btn ml-2" @click="view(item)">View Detail</v-btn>
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
          { text: '',sortable: false, value: 'actions', align: 'end' },
        ],
        desserts: [
          {
            make: 'Frozen Yogurt',
            model:'Benz',
            category: 'Truck',
            actions: ''
          },
        ],
      }
    },
  }
</script>