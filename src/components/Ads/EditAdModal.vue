<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn flat color="orange" slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <h1 class="text--primary">Edit ad</h1>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      modal: false
    }
  }
}
</script>
