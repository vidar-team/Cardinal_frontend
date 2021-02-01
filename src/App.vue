<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left color="transparent" v-if="this.$route.name !== 'Login'">
        <v-toolbar-title>{{ base.Title }}</v-toolbar-title>
        <v-toolbar-items class="ml-5">
          <v-btn text to="/">{{ $t('header.status') }}</v-btn>
          <v-btn text to="/rank">{{ $t('header.rank') }}</v-btn>
          <v-btn text to="/bulletin">{{ $t('header.bulletin') }}</v-btn>
          <v-btn text @click="onLogout">{{ $t('header.logout') }}</v-btn>

        </v-toolbar-items>
        <v-spacer></v-spacer>
        <!-- switch language -->
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(lang, index) in $i18n.availableLocales"
                         v-bind:key="index"
                         @click="$i18n.locale = lang"
            >{{ lang }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-content>
        <router-view/>
      </v-content>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',

  data: () => ({
    base: {
      Title: ''
    }
  }),

  created() {
    this.utils.GET('/base').then(res => {
      this.base = res
      this.$i18n.locale = res.Language
    }).catch()
  },
  methods: {
    onLogout() {
      this.utils.GET("/logout").then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  },
  components: {}
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
