const initState = ({
    categories: []
});

export const state = initState;

export const mutations = {
    setCategories(state, {categories}) {
        state.categories = categories
    }
}

export const actions = {
    async fetchCategories({ commit }) {
        const JWTToken = localStorage.getItem("token");

        let categories = await this.$axios.$get("/categories",
        { headers: {"Authorization" : `Bearer ${JWTToken}`}})
            
        commit("setCategories", {categories});
    }
}