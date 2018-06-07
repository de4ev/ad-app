<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model='drawer'
    >
      <v-list>
        <v-list-tile 
          v-for="(link, i) in links"
          :key= "link.title"
          :to="link.url"
        >
            <v-list-tile-action>
              <v-icon>{{ links[i].icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ links[i].title }}</v-list-tile-title>
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
      drawer: false,
      links: [{ title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'person', url: '/registration'}
      ]
    }
  }
}
</script>
