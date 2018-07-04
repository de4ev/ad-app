<template>
  <div v-if="!loading">
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item 
              v-for="ad in promoAds"
              :src="ad.src"
              :key="ad.id"
            >
              <div class="ad-btn">
                <v-btn
                  color="orange accent-2"
                  :to="'/ad/' + ad.id"
                >{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex 
              xs12
              sm6
              md4
              lg3
              v-for="ad in ads" 
              :key='ad.id'
            >
                <v-card>
                  <v-card-media
                  :to="'/ad/' + ad.id"
                    :src="ad.src"
                    height="200px"
                  >
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ ad.title }}</h3>
                      <div>{{ ad.description }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      flat
                      color="orange accent-2"
                      :to="'/ad/' + ad.id"
                    >Open</v-btn>
                    <app-buy-modal :ad="ad"></app-buy-modal>
                  </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center home__loader-margin">
          <v-progress-circular :size="70" :width="4" indeterminate color="orange accent-2"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    ads () {
      return this.$store.getters.ads
    },
    promoAds () {
      return this.$store.getters.promoAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
  .home__loader-margin {
    margin-top: 40vh;
  }
  .jumbotron__image {
    width: 100%;
  }
  .ad-btn {
    position: absolute;
    bottom: 50px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, .5);
    border-radius: 5px 5px 0 0;
    left: 50%;
    transform: translate(-50%, 0)
  }
</style>
