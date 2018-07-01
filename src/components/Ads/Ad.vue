<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 v-if="!loading">
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
                <v-card-actions v-if="!isOwner">
                  <v-spacer></v-spacer>
                  <app-buy-modal :ad="ad"></app-buy-modal>
                </v-card-actions>
                <v-card-actions v-else>
                  <v-spacer></v-spacer>
                  <app-edit-ad-modal :ad="ad"></app-edit-ad-modal>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 v-else class="text-xs-center home__loader-margin">
              <v-progress-circular :size="70" :width="4" indeterminate color="orange accent-2"></v-progress-circular>
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
    },
    isOwner () {
      return this.$store.getters.user !== null && this.ad.ownerId === this.$store.getters.user.id
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    AppEditAdModal: EditAdModal
  }
}
</script>
