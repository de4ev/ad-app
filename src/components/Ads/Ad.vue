<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-2">{{ad.title}}</h1>
                <v-card
                  class="elevation-12"
                >
                <v-card-media
                  height="350px"
                  :src="ad.src"
                ></v-card-media>
                <v-card-text>
                    <span>{{ad.description}}</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <app-edit-ad-modal></app-edit-ad-modal>
                  <v-btn color="orange">Buy</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    }
  },
  components: {
    AppEditAdModal: EditAdModal
  }
}
</script>
