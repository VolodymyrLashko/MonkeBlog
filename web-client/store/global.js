const initState = () => ({
  loggedIn: tokenExist(),
  filtered: false,
  category: "",
  tags: ""
})

const tokenExist = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export const state = initState;

export const mutations = {
  setLoggedIn(state, { loggedIn }) {
    state.loggedIn = loggedIn;
  },
  logIn(state) {
    state.loggedIn = true;
  },
  logOut(state) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    state.loggedIn = false;
  },
  setFiltered(state, {filtered}) {
    state.filtered = filtered;
  },
  setCategory(state, {category}) {
    state.category = category
  },
  setTags(state, {tags}) {
    state.tags = tags
  }
}

export const actions = {
  login({ state, commit }, { form }) {
    this.$axios
      .$post("/login", form)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          console.log(res);
          commit("logIn");
        }
      })
      .then((err) => console.log(err));

    this.$router.push("/");
  },
  register({ commit }, { form }) {
    this.$axios
      .$post("/users", form)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          console.log(res);
          commit("logIn");
        }
      })
      .then((err) => console.log(err));

    this.$router.push("/");
  }
}


