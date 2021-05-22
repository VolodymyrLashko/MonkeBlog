<template>
  <v-app dark>
    <v-app-bar app dark dense>
      <v-toolbar-title >
        <nuxt-link class="nuxt-link-style" to="/">Monke Blog</nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <nuxt-link v-if="this.loggedIn" class="mx-3 nuxt-link-style" to="/CreatePost">Create new post</nuxt-link>
      <button @click="logOut"><nuxt-link v-if="this.loggedIn" class="mx-3 nuxt-link-style" to="/">Log out</nuxt-link></button>
      
      <nuxt-link v-if="!this.loggedIn" class="mx-3 nuxt-link-style" to="/SignIn" >Sign In</nuxt-link>
      <nuxt-link v-if="!this.loggedIn" class="mx-3 nuxt-link-style" to="/SignUp">Sign Up</nuxt-link>
      
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  computed: {
    ...mapState("global", ["loggedIn"])
  },
  methods: {
    ...mapMutations("global", ["logOut"])
  }
};
</script>

<style scoped>
  .nuxt-link-style {
    text-decoration: none;
    color: white;
  }

  .bar-max-height {
    max-height: 48px;
  }
</style>
