const initState = ({
    tags: []
});

export const state = initState;

export const mutations = {
    setTags(state, { tags }) {
        state.tags = tags
    }
}

export const actions = {
    async fetchTags({ commit }) {
        const JWTToken = localStorage.getItem("token");

        let tags = await this.$axios.$get("/tags",
            { headers: { "Authorization": `Bearer ${JWTToken}` } })

        commit("setTags", { tags });
    },

    postTags({ commit }, { tags, postId }) {
        let JWTToken = localStorage.getItem("token")

        tags.forEach(element => {
            this.$axios.$post("post_tags", {
                tag_id: element,
                post_id: postId
            },{headers: { Authorization: `Bearer ${JWTToken}` }}).then(res => console.log(res))
        });
    }
}