<template>
  <v-card class="pa-10">
    <v-row justify="center" height="10em"> <h2>Search filters</h2></v-row>
    <v-row class="mt-5">
      <v-col class="py-0">
        <h3>Categories</h3>
        <v-select
          class="mt-4 py-0"
          v-model="selectedCategory"
          :items="selectCategories"
          outlined
          label="Category"
          solo
        ></v-select>
      </v-col>
      <v-col class="py-0">
        <h3>tags</h3>
        <v-select
          class="mt-4 py-0"
          v-model="selectedTags"
          :items="selectTags"
          chips
          label="Tags"
          multiple
          solo
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn @click="loadPosts" dense depressed color="primary"> Search </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedTags: [],
      selectedCategory: "",
    };
  },
  props: {
    categories: Array,
    tags: Array,
  },
  computed: {
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
  methods: {
    ...mapActions("posts", ["searchByCategoryAndTags"]),
    loadPosts() {
      this.searchByCategoryAndTags({
        category: this.selectedCategory,
        tags: this.selectedTags,
      });
    },
  },
};
</script>

<style>
.centerText {
  text-align: center;
}

subtitleDiv {
  display: block;
  width: 100%;
  margin: auto;
}
</style>