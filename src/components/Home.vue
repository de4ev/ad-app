<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item v-for="ad in ads" :src="ad.src" :key="ad.id"></v-carousel-item>
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
                  <v-card-media :src="ad.src" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ ad.title }}</h3>
                      <div>{{ ad.description }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="orange accent-2">Open</v-btn>
                    <v-btn color="orange accent-2">Buy</v-btn>
                  </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ads: [
        {
          title: 'First ad',
          description: 'Description',
          src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
          promo: false,
          id: 1
        },
        {
          title: 'Second ad',
          description: 'Description',
          src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
          promo: true,
          id: 2
        },
        {
          title: 'Third ad',
          description: 'Description',
          src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
          promo: true,
          id: 3
        },
        {
          title: 'Last ad',
          description: 'Description',
          src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
          promo: false,
          id: 4
        }
      ]
    }
  }
}
</script>
