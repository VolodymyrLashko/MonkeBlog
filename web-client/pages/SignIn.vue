<template>
  <div>
    <v-card width="40em" class="mx-auto pa-8 mt-10 rounded-xl">
      <v-form ref="form" v-model="valid" lazy-validation>
        <h2>Enter your data</h2>
        <v-text-field
          v-model="form.username"
          :counter="20"
          label="Nickname"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :counter="20"
          label="Password"
          required
        ></v-text-field>

        <v-btn color="submit" @click="this.postData" class="mr-4">
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      valid: false,
    };
  },
  methods: {
    ...mapActions("global", ["login"]),

    postData() {

      this.login({form: this.form});
      //this.$router.push("/");
    },
  },
};
</script>

<style>
</style>