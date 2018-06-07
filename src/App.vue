<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile>
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Link 1</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        >
      </v-toolbar-side-icon>
      <v-toolbar-title>Ad application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
