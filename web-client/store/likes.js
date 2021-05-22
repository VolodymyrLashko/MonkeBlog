const initState = ({
  likes: []
});

export const state = initState;

export const mutations = {
  setLikes(state, { likes }) {
    state.likes = likes
  }
}

export const actions = {
  async fetchLikes({ commit }) {
    const JWTToken = localStorage.getItem("token");

    let likes = await this.$axios.$get("/likes",
      { headers: { "Authorization": `Bearer ${JWTToken}` } })

    commit("setLikes", { likes });
  },
  async postLikes({ commit }, { like }) {
    const JWTToken = localStorage.getItem("token");

    await this.$axios.$post("/likes", like,
      { headers: { "Authorization": `Bearer ${JWTToken}` } })
  },
  async deleteLikes({commit}, {id}) {
    const JWTToken = localStorage.getItem("token");

    await this.$axios.$delete(`/likes/${id}`,
      { headers: { "Authorization": `Bearer ${JWTToken}` } })
  }

}