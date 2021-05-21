<template>
  <div>
    <div class="d-flex justify-center text-h2">
      All posts 
    </div>

    <div class="posts-div body-1" v-if="posts">

      <v-card v-for="post in posts" :key="post.id + post"
       class="mx-auto mt-5 rounded-xl pa-5" max-width="30em" color="dark">
        <div class="text-h4">{{ post.title }}</div>
        <div>Created by - {{ post.user.username }}</div>
        <div>Category - {{ post.category.name }}</div>

        <v-divider/>

        <div>
          <p>{{post.text}}</p>
        </div>
      </v-card>
    </div>
    <button @click="log"></button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "message",
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:5000/posts")
        .then((res) => (this.posts = res.data));
    },
    log() {
      console.log(this.posts);
    },
  },
};
</script>

<style scoped>
.posts-div {
  width: 30em;
  margin: 2em auto;
  text-align: center;
}

.post-div {
  width: 100%;
  margin: 1em 0;
  padding: 1em;
  border: 2px solid black;
  border-radius: 2em;
}

</style>