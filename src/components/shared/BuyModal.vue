<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn color="orange" slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                      v-model="name"
                      required
                      color="blue-grey darken-1"
                      name="name"
                      label="Your name"
                      type="text"
              ></v-text-field>
              <v-text-field
                    v-model="phone"
                    required
                    color="blue-grey darken-1"
                    name="phone"
                    label="Your phone"
                    type="text"
              ></v-text-field>
              <v-text-field
                    v-model="message"
                    color="blue-grey darken-1"
                    name="message"
                    label="Message"
                    multi-line
                    type="text"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                flat 
                @click="onClose"
                :disabled="localLoading"
              >
                Close
              </v-btn>
              <v-btn
                :disabled="!valid || localLoading"
                :loading="localLoading"
                color="orange"
                @click="onBuy"
              >
                Buy
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      name: '',
      phone: '',
      message: '',
      modal: false,
      localLoading: false
    }
  },
  computed: {
    valid () {
      return this.name !== '' && this.phone !== ''
    }
  },
  methods: {
    onClose () {
      this.name = ''
      this.phone = ''
      this.message = ''
      this.modal = false
    },
    onBuy () {
      if (this.valid) {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          message: this.message,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.message = ''
          this.modal = false
          this.localLoading = false
        })
      }
    }
  }
}
</script>
