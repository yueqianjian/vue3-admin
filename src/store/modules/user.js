import { getS } from "@/utils/tools";
const state = () => ({
  token: getS("token"),
  role: getS("role"),
});

const mutations = {
  setData(state, { k, v }) {
    state[k] = v;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
