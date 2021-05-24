<template>
  <div>
    <div class="d-flex justify-left">
      <v-btn
        class="px-0 mt-3 d-flex justify-space-between"
        text
        :color="likeButtonColor.liked ? liked : unliked"
        @click="like"
      >
        <v-icon>mdi-heart</v-icon>
        {{ likes.length }}
      </v-btn>

      <v-text-field class="mx-4"
        v-model="comment.text"
        :counter="256"
        label="Comment"
        required
      ></v-text-field>

      <v-btn class="mt-3" @click="postCom" dense depressed color="primary">
        Add
      </v-btn>
    </div>
    <v-expansion-panels class="pa-0 ma-0" flat>
      <v-expansion-panel class="pa-0 ma-0" v-for="(item, i) in 1" :key="i + item * item">
        <v-expansion-panel-header>
          <p class="text-subtitle-1">Comments [ {{ comments.length }} ]</p>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0 ma-0">
          <div class="pa-2" v-for="(comment, i) in comments" :key="comment + i * comment">
            <div class="d-flex justify-space-between">
              <strong>{{ comment.user.username }}</strong>
              <button block right>delete</button>
            </div>
            <div class="text-body2">piskaapis</div>

            <v-divider></v-divider>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

  <!-- <v-card elevation="0" class="">
    <v-row class="pa-4">
      <v-col class="col-2 pa-0">
        <v-btn
          class="px-0 mt-7 d-flex justify-space-between"
          text
         
          :color="likeButtonColor.liked?liked:unliked"
          @click="like"
        >
          <v-icon>mdi-heart</v-icon>
          {{ likes.length }}
        </v-btn>
      </v-col>
      <v-col class="col-8">
        <v-text-field
          v-model="comment.text"
          :counter="256"
          label="Comment"
          required
        ></v-text-field>
      </v-col>
      <v-col class="col-2">
        <v-flex justify-center>
          <v-btn class="mt-3" @click="postCom" dense depressed color="primary">
            Add
          </v-btn>
        </v-flex>
      </v-col>
    </v-row>
    <v-list three-line>
      <template v-for="(item, index) in comments">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider :key="index" :inset="item.inset"></v-divider>

        <v-list-item :key="item.title">
        

          <v-list-item-content class="py-0">
            <v-list-item-subtitle
              class="text-center listItem"
              v-html="item.text"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card> -->
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    comments: Array,
    postid: Number,
    likes: Array,
  },
  data() {
    return {
      comment: {
        text: "",
      },
      likeButtonColor: {
        liked: false,
      },
      liked: "#E91E63",
      unliked: "#FFFFFF",
    };
  },
  computed: {
    ...mapState("comments", ["fetchedComments"]),
    ...mapState("global", ["filtered", "category", "tags"]),
  },
  beforeMount() {
    this.likeExist();
  },
  methods: {
    ...mapActions("comments", ["postComment"]),
    ...mapActions("posts", ["fetchPosts", "searchByCategoryAndTags"]),
    ...mapActions("likes", ["postLikes", "deleteLikes"]),
    async postCom() {
      this.postComment({ comment: this.comment, postId: this.postid });
      await this.fetchPostsWrap();
    },

    async like() {
      let id = this.likeExist();
      if (id) {
        this.deleteLikes({ id });
        await this.fetchPostsWrap();
        this.likeExist();
      } else {
        await this.postLikes({ like: { post_id: this.postid } });
        await this.fetchPostsWrap();
        this.likeExist();
      }
    },
    likeExist() {
      let arr = this.likes.filter((e) => e.post_id === this.postid);
      if (arr.length > 0) {
        this.likeButtonColor.liked = true;
        return arr[0].id;
      } else {
        this.likeButtonColor.liked = false;

        return false;
      }
    },
    async fetchPostsWrap() {
      if (this.filtered) {
        await this.searchByCategoryAndTags({
          category: this.category,
          tags: this.tags,
          currPage: 1,
        });
      } else {
        await this.fetchPosts({});
      }
    },
  },
};
</script>

<style>
.listItem {
  height: 2em;
}
.divHeight {
  height: 4em;
}
</style>