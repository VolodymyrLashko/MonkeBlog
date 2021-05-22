const initState = ({
    comments: []
});

export const state = initState;

export const mutations = {
    setComments(state, { comments }) {
        state.comments = comments
    }
}

export const actions = {
    async fetchCommentsFromPost({ commit }, { id }) {
        const JWTToken = localStorage.getItem("token");

        let comments = await this.$axios.$get(`posts/${id}/comments`,
            { headers: { "Authorization": `Bearer ${JWTToken}` } })

        commit("setComments", { comment });
    },
    postComment({ commit }, { comment, postId }) {
        const JWTToken = localStorage.getItem("token");

        this.$axios.$post('/comments', {
            text: comment.text,
            post_id: postId
            },
            { headers: { "Authorization": `Bearer ${JWTToken}` } })
            .then(res => console.log(res));
    }
}