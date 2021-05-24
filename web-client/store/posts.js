const initState = () => ({
  posts: [],
  pages: 2,
  page: 1
})


const getPagesFromPosts = (posts) => {

  if (!posts)
    return 0;
  return posts[0].pages
}

export const state = initState;

export const getters = {
  getPage: state => state.page
}

export const mutations = {
  setPosts(state, { posts }) {
    state.posts = posts
  },
  setPages(state, { pages }) {
    state.pages = pages;
  },
  setPage(state, {page}) {
    state.page = page
  }
}

export const actions = {

  async fetchPosts({ commit, dispatch, getters }, { currPage }) {

    let pg = currPage

    if(currPage){
      commit("setPage", {page: pg});
    }
    else {
      pg = getters.getPage;     
    }

    let JWTToken = localStorage.getItem("token");

    let posts = await this.$axios.$get(`/posts?page=${pg}`, {
      headers: { "Authorization": `Bearer ${JWTToken}` }
    })

    let numOfPages = getPagesFromPosts(posts)

    commit("setPages", {pages: numOfPages})

    commit("setPosts", {
      posts: posts
    })
  },

  async searchByCategoryAndTags({ commit }, { category, tags, currPage }) {
    let pg = currPage

    if(currPage){
      commit("setPage", {page: pg});
    }
    else {
      pg = getters.getPage;     
    }

    const JWTToken = localStorage.getItem("token");

    const posts = await this.$axios.$get("/find_posts", {
      headers: {
        Authorization: `Bearer ${JWTToken}`,

      },
      params: {
        category: category,
        tags: tags,
        page: pg
      }
    },
    );
    commit("setPosts", {posts: posts})

    let numOfPages = getPagesFromPosts(posts)

    commit("setPages", {pages: numOfPages})

  },

  createPost({ dispatch }, { post }) {
    const JWTToken = localStorage.getItem("token");

    this.$axios
      .$post("/posts", post, {
        headers: { Authorization: `Bearer ${JWTToken}` },
      })
      .then((res) => {
        dispatch('tag/postTags',
          { tags: post.tags, postId: res.id }, { root: true })
      });
  },
}