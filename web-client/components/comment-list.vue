<template>
  <v-card elevation="0" class="">
    <v-row class="pa-4">
      <v-col class="col-9">
        <v-text-field v-model="comment.text" :counter="256" label="Comment" required></v-text-field>
      </v-col>
      <v-col class="col-2">
        <v-flex justify-center>
          <v-btn class="mt-3" @click="postData" depressed color="primary"> Add </v-btn>
        </v-flex>
      </v-col>

      <!-- <v-divider></v-divider> -->
    </v-row>
    <v-list three-line >
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

          <v-list-item-content class="py-0"  >
            <v-list-item-subtitle class="text-center listItem" v-html="item.text"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import {mapActions,mapState} from "vuex";

export default {
  props: {
    comments: Array,
    postid: Number
  },
  data() {
    return {
      comment: {
        text: ""
      }
    }
  },
  computed: {
    ...mapState("comments", ["fetchedComments"])
  },
  methods: {
    ...mapActions("comments", ["postComment"]),
    ...mapActions("posts", ["fetchPosts"]),
    postData() {
      this.postComment(({comment:this.comment, postId:this.postid}))
      this.fetchPosts();
    }
  }
};
</script>

<style>
.listItem {
  height: 2em;
}
</style>