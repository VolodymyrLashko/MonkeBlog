<template>
  <div>
    <div class="d-flex justify-center text-h2">All posts</div>

    <div class="posts-div body-1" v-if="this.posts">
      <v-card
        v-for="post in this.posts"
        :key="post.id + post"
        class="mx-auto mt-5 rounded-xl pa-5"
        max-width="30em"
        color="dark"
      >
        <div class="text-h4">{{ post.title }}</div>
        <div>Created by - {{ post.user.username }}</div>
        <div>Category - {{ post.category.name }}</div>

        <v-divider />

        <div>
          <p>{{ post.text }}</p>
        </div>

        <v-divider class="mb-3" />
        

        <comment-list :postid="post.id" :comments="post.comments"></comment-list>
      </v-card>
    </div>
    <button @click="log"></button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentList from "../components/comment-list";

export default {
  data() {
    return {
      message: "message",
    };
  },
  computed: {
    ...mapState("posts", ["posts"]),
    
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("posts", ["fetchPosts"]),
    async fetchData() {
      this.fetchPosts();
      // this.posts = await this.$axios.$get("/posts");
    },
    commentIdFactory(c) {
      return `comment-${c.id}`;
    },
    log() {
      console.log(this.posts);
    },
  },
  components: {
    CommentList
  }
};
</script>

<style scoped>
.posts-div {
  width: 40em;
  margin: 2em auto;
  text-align: center;
}
</style>