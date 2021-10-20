import { fetchEvent } from '@/api/article'
import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import {asyncRoutes} from "@/router";
import {filterAsyncRoutes} from "@/store/modules/permission";

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium',
  reals: [],
  nodes: [],
  newData: {}
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_REALS: (state, reals) => {
    state.reals = reals
    Cookies.set('reals', reals)
  },
  SET_NODES: (state, nodes) => {
    state.nodes = nodes
    Cookies.set('nodes', nodes)
  },
  SET_NEWDATA: (state, newData) => {
    state.newData = newData
    Cookies.set('newData', newData)
  }



}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  async getReals({ commit },reals){
    return new Promise(resolve => {
      var obj = {
        url: 'core/initData',
        data: {
          queryString:{
            nodeType:"ly"
          },
          currentPage: 1,
          pageSize: 10,

        }
      }
      fetchEvent(obj).then(response => {
        var context = this;
        state.reals = response.responseBody.map((e)=>{
          return e;
        });
        commit('SET_REALS', state.reals)
        resolve(state.reals)
      })
    })
  },
  setReals({ commit }, reals) {
    commit('SET_REALS', reals)
  },
  setNodes({ commit }, nodes) {
    commit('SET_NODES', nodes)
  },
  setNewData({ commit }, newData) {
    commit('SET_NEWDATA', newData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
