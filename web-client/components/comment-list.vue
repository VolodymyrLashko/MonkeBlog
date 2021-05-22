<template>
  <v-card elevation="0" class="">
    <v-row class="pa-4">
      <v-col class="col-2 pa-0">
        <v-btn
          class="px-0 mt-7 d-flex justify-space-between"
          v-if="likeButtonColor.liked"
          text
          color="#E91E63"
          @click="like"
        >
          <v-icon>mdi-heart</v-icon>
          {{ likes.length }}
        </v-btn>
        <v-btn
          class="px-0 mt-7 d-flex justify-space-between"
          v-else
          text
          color="#FFFFFF"
          @click="like"
        >
          <v-icon class="ml-1">mdi-heart</v-icon>
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
          <!-- <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar> -->

          <v-list-item-content class="py-0">
            <v-list-item-subtitle
              class="text-center listItem"
              v-html="item.text"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
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
    };
  },
  computed: {
    ...mapState("comments", ["fetchedComments"]),
  },
  beforeMount() {
    this.likeExist();
    console.log("m2342342341");
  },
  methods: {
    ...mapActions("comments", ["postComment"]),
    ...mapActions("posts", ["fetchPosts"]),
    ...mapActions("likes", ["postLikes", "deleteLikes"]),
    postCom() {
      this.postComment({ comment: this.comment, postId: this.postid });
      this.fetchPosts();
    },

    async like() {
      let id = this.likeExist();
      console.log(id)
      if (id) {
        this.deleteLikes({id});
        await this.fetchPosts();
        this.likeExist();
      } else {
        await this.postLikes({ like: { post_id: this.postid } });
        await this.fetchPosts();
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
  },
};
</script>

<style>
.listItem {
  height: 2em;
}
</style>