<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model='drawer'
    >
      <v-list>
        <v-list-tile 
          v-for='(link, i) in links'
          :key= 'link.title'
          :to="link.url"
        >
            <v-list-tile-action>
              <v-icon>{{ links[i].icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ links[i].title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
          v-if="isUserLoggedIn"
          @click="onLogout"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app color='blue-grey darken-3'>
      <v-toolbar-side-icon
        class='hidden-md-and-up'
        @click="drawer = !drawer"
        >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" class='pointer' tag="span">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class='hidden-sm-and-down'>
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url" 
          flat
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          @click="onLogout"
          flat
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        color="blue-grey darken-3"
        :value="true"
      >
        {{ error }}
        <v-btn
          flat 
          color="error" 
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
    <template v-if="message">
      <v-snackbar
        color="blue-grey darken-1"
        :value="true"
        :right="true"
        :timeout=6000
      >
        {{ message }}
      </v-snackbar>
  </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    message () {
      return this.$store.getters.message
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
          {title: 'New ad', icon: 'note_add', url: '/new'},
          {title: 'My ads', icon: 'list', url: '/list'}
        ]
      }
      return [
        {title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'person', url: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>

