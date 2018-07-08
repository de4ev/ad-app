<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-xs-center mt-5" v-if="loading">
                <v-progress-circular 
                  :size="70" 
                  :width="4" 
                  indeterminate 
                  color="orange accent-2"
                ></v-progress-circular>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length === 0">
              <h1 class="text--secondary mb-2">You have no orders</h1>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
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
                      <v-list-tile-sub-title>{{ order.message }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="orange accent-2"
                      :to="'/ad/' + order.adId"
                    >
                      Open
                    </v-btn>
                  </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    orders () {
      return this.$store.getters.orders
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    changeStatus (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
