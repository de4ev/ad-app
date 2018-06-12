<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-2">Orders</h1>
                <v-list three-line>
                  <v-list-tile
                    v-for="order in orders"
                    :key="order.id"
                  >
                    <v-list-tile-action>
                      <v-checkbox
                        color="orange accent-2"
                        :input-value="order.done"
                        @change="changeStatus(order)"
                      ></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ order.name }} ( {{ order.phone }} )</v-list-tile-title>
                      <v-list-tile-sub-title>{{ order.msg }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-btn color="orange accent-2">Open</v-btn>
                  </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          name: 'Andy',
          phone: '+13284023490',
          msg: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens.',
          orderId: '1',
          adId: '1',
          done: false
        },
        {
          name: 'Chris',
          phone: '+13284023490',
          msg: 'Que travailler avec du texte lisible et contenant du sens.',
          orderId: '2',
          adId: '2',
          done: true
        },
        {
          name: 'Sam',
          phone: '+13284023490',
          msg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          orderId: '3',
          adId: '3',
          done: false
        }
      ]
    }
  },
  methods: {
    changeStatus (order) {
      order.done = !order.done
    }
  }
}
</script>
