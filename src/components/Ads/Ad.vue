<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-2">Title</h1>
                <v-card>
                <v-card-media
                  height="350px"
                  src="https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg"
                ></v-card-media>
                <v-card-text>
                    <span>Description</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="orange" >Edit</v-btn>
                  <v-btn color="orange">Buy</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
