import Vue from 'vue';
import Vuex from 'vuex';
import local from './api/local.js';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'Belajar Vuex',
    email: '',
    password: '',
    posts: [],
    post: {},
  },
  mutations: {
    setEmail(state, value) {
      state.email = value
    },
    setPassword(state, value) {
      state.password = value
    },
    // loadPosts(state, posts) {
    //   state.posts = posts
    // },
    getPosts(state) {
      local.get('/posting')
        .then(response=>{
          state.posts = response.data
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 5c9acd209b24da1e3088a944 testing id
    getPost(state, value) {
      // console.log(value, "-------")
      // console.log(state, "&&&&&&")
      local.get(`/posting/5c9acd209b24da1e3088a944`)
        .then(response=>{
          state.post = response.data
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  actions: {
    loadPosts(context) {
      context.commit('getPosts')
    },

    loadPost(context) {
      // console.log('getPost')
      context.commit('getPost')
    }
  }
})
