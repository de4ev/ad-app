<template>
  <v-dialog width="500px" v-model="modal">
    <v-btn flat color="orange" slot="activator">Delete</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want to delete this ad?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <h3>{{ title }}</h3>
            </v-card-text>
            <v-card-media
              height="150px"
              :src="ad.src"
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn color="error" @click="onDelete">Delete</v-btn>
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
      title: this.ad.title,
      modal: false
    }
  },
  methods: {
    onCancel () {
      this.modal = false
    },
    onDelete () {
      this.$store.dispatch('deleteAd', this.ad)
        .then(() => {
          this.$router.push('/list')
          this.modal = false
        })
        .catch(() => {})
    }
  }
}
</script>
