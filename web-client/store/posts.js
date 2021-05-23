const initState = () => ({
  posts: []
})

export const state = initState;

export const mutations = {
  setPosts(state, { posts }) {
    state.posts = posts
  }
}

export const actions = {

  async fetchPosts({ commit }) {

    let JWTToken = localStorage.getItem("token");

    const posts = await this.$axios.$get("/posts",
      { headers: { "Authorization": `Bearer ${JWTToken}` } })

    commit("setPosts", { posts })
  },

  createPost({ dispatch }, { post }) {


    this.$axios
      .$post("/posts", post, {
        headers: { Authorization: `Bearer ${JWTToken}` },
      })
      .then((res) => {
        dispatch('tag/postTags',
          { tags: post.tags, postId: res.id }, { root: true })
      });
  },

  async searchByCategoryAndTags({ commit }, { category, tags }) {
    const JWTToken = localStorage.getItem("token");

    const posts = await this.$axios.$get("/find_posts", {
      headers: {
        Authorization: `Bearer ${JWTToken}`,

      },
      params: {
        category: category,
        tags: tags
      }
    },
    );

    console.log(posts);

    commit("setPosts", { posts })
  }
}