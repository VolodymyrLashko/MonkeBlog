const initState = () => ({
  loggedIn: tokenExist()
})

const tokenExist = () => {
  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"))
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


