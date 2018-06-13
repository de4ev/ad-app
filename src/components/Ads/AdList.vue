<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h1 class="text--secondary mb-2">My ads</h1>
              <v-card
                class="elevation-10 mb-3"
                v-for="ad in userAds"
                :key="ad.id"
              >
                <v-card-media 
                  class="white--text"
                  height="150px"
                  :src="ad.src"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">{{ad.title}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-title>
                    <span>{{ ad.description }}</span>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    small
                    color="orange"
                    :to="'/ad/' + ad.id"
                  >Open</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    userAds () {
      return this.$store.getters.userAds
    }
  }
}
</script>
