<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-2">Create new ad</h1>
                <v-form v-model="valid" ref="form" validation>
                  <v-text-field 
                    v-model="title"
                    required
                    :rules="[v => !!v || 'Title is required']"
                    color="blue-grey darken-1"
                    name="title"
                    label="Title"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    multi-line
                    required
                    v-model="description"
                    color="blue-grey darken-1"
                    :rules="[v => !!v || 'Description is required']"
                    name="description"
                    label="Description"
                    type="description"
                  ></v-text-field>
                </v-form>
                <v-layout row class="mt-3">
                  <v-flex xs12>
                    <img 
                      v-if="imageSrc"
                      :src="imageSrc"
                      height="100"
                    >
                  </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                  <v-flex xs12>
                    <v-btn
                      color="blue-grey darken-2"
                      class="white--text"
                      @click="triggerUpload"
                    >
                      Upload
                      <v-icon right dark>add_a_photo</v-icon>
                    </v-btn>
                    <input @change="onFileChange" ref="imageUpload" type="file" style="display:none" accept="image/*">
                  </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                          color="blue-grey darken-2"
                          class="mt-3"
                          label="Add to promo"
                          v-model="promo"
                        ></v-switch>
                        <v-btn
                          :loading="loading"
                          :disabled="!valid || loading || !this.image"
                          @click="createAd"
                          color="orange accent-2"
                          class="white--text mt-2"
                          >
                            Create ad
                        </v-btn>
                      </v-flex>
                  </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      valid: false,
      promo: false,
      imageSrc: '',
      image: null
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          src: 'https://geekmaze.ru/wp-content/uploads/2016/02/nodejs-2560x1440.png'
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.imageUpload.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
