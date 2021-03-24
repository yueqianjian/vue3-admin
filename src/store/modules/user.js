import { getS, setS } from "@/utils/tools";
const state = () => ({
  token: getS("token"),
  role: getS("role"),
});

const mutations = {
  setData(state, { k, v }) {
    state[k] = v;
  },
  clearUser(state) {
    state.token = "";
    state.role = "";
    setS("role", "");
    setS("token", "");
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
