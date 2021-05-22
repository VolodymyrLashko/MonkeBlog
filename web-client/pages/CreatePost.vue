<template>
  <div>
    <v-card width="40em" class="mx-auto pa-8 mt-10 rounded-xl">
      <v-form ref="form" v-model="valid" lazy-validation>
        <h2>Create your post</h2>
        <v-row>
          <v-col>
            <v-text-field
              v-model="post.title"
              :counter="64"
              label="Title"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="post.category_id"
              :items="selectCategories"
              outlined
              label="Category"
              solo
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="post.tags"
              :items="selectTags"
              chips
              label="Tags"
              multiple
              solo
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-textarea
          outlined
          name="input-7-4"
          label="Text"
          v-model="post.text"
          height="10em"
          noResize
          :counter="1024"
        ></v-textarea>

        <v-btn color="submit" @click="postData" class="mr-4"> Post </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      post: {
        title: "",
        text: "",
        category_id: "",
        tags: [],
      },
      valid: false,
    };
  },
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("tag", ["tags"]),
    selectCategories() {
      return this.categories.map((x) => ({
        text: x.name,
        value: x.id,
      }));
    },
    selectTags() {
      return this.tags.map((x) => ({
        text: x.name,
        value: x.id,
      }));
    },
  },
  created() {
    this.fetchCategories();
    this.fetchTags();
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    ...mapActions("posts", ["createPost"]),
    ...mapActions("tag", ["fetchTags", "postTags"]),
    postData() {
      this.createPost({post:this.post})
    },
  },
};
</script>

<style>
.select-field {
  height: 2em;
}
</style>