const initState = () => ({
    posts: []
})

export const state = initState;

export const mutations = {
    setPosts(state, {posts}) {
        state.posts = posts
    }
}

export const actions = {

    async fetchPosts({ commit }) {
        const posts = await this.$axios.$get("/posts");
        commit("setPosts", {posts})
    }
}