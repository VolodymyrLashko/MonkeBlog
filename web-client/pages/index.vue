<template>
  <div>
    <filter-menu
      :categories="this.categories"
      :tags="this.tags"
      class="posts-div body-1"
    ></filter-menu>

    <div class="d-flex justify-center text-h2">All posts</div>

    <v-container class="max-width">
      <v-pagination
        v-model="currPage"
        class="my-4"
        :length="this.pages"
        @input="this.fetchData"
      ></v-pagination>
    </v-container>

    <div class="body-1" v-if="this.posts">
      <v-card
        v-for="post in this.posts"
        :key="post.id + post"
        class="mx-auto mt-5 rounded-xl pa-5"
        width="40em"
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

        <comment-list
          :postid="post.id"
          :comments="post.comments"
          :likes="post.likes"
        ></comment-list>
      </v-card>
    </div>
    <button @click="log"></button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentList from "../components/comment-list";
import FilterMenu from "../components/filter-menu";

export default {
  data() {
    return {
      currPage: 1,
      isFiltered: false
    };
  },
  computed: {
    ...mapState("posts", ["posts", "pages"]),
    ...mapState("tag", ["tags"]),
    ...mapState("category", ["categories"]),
    ...mapState("global", ["filtered"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("posts", ["fetchPosts"]),
    ...mapActions("category", ["fetchCategories"]),
    ...mapActions("tag", ["fetchTags"]),

    async fetchData() {
      this.fetchPosts({currPage: this.currPage});
      this.fetchCategories();
      this.fetchTags();
    },
    commentIdFactory(c) {
      return `comment-${c.id}`;
    },
    log() {
      console.log(this.posts);
    },
  },
  components: {
    CommentList,
    FilterMenu,
  },
};
</script>

<style scoped>
.posts-div {
  width: 40em;
  margin: 2em auto;
  text-align: center;
}
</style>