<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed 
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router 
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <v-menu
          offset-y
          bottom
          left
          origin="top right"
        >
          <v-btn
            slot="activator"
            flat
          >
            {{ loggedInUser.name }}
            <v-avatar
              size="36px"
              style="margin-left: 8px"
            >
              <img
                src="https://randomuser.me/api/portraits/women/70.jpg"
                alt="">
            </v-avatar>
          </v-btn>
          <v-list>
            <v-btn
              dark
              @click="logout"
            >
              ログアウト
            </v-btn>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'home', title: 'Home', to: '/' },
        { icon: 'assessment', title: 'Report', to: '/reports' },
        { icon: 'work', title: 'Project', to: '/projects' },
        { icon: 'account_box', title: 'User', to: '/users' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    loggedInUser() {
      return this.$auth.user
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
