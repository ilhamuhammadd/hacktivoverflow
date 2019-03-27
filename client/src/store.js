import Vue from 'vue';
import Vuex from 'vuex';
import local from './api/local.js';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: '',
    description: '',
    email: '',
    password: '',
    posts: [],
    post: {},
    params: '',
  },
  mutations: {
    setTitle(state, value) {
      state.title = value
    },
    setDescription(state, value) {
      state.description = value
    },
    setEmail(state, value) {
      state.email = value
    },
    setPassword(state, value) {
      state.password = value
    },
    setParams(state, value) {
      // console.log(value)
      state.params = value
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
      // console.log(state.params , '=======>')
      // console.log(value, "-------")
      // console.log(state, "&&&&&&")
      // console.log(this.state.post.answerId._id)
      // console.log(state.post.answerId._id)
      local.get(`/posting/${state.params}`)
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
    },
    setParams(context) {
      context.commit('setParams', params)
    }
  }
})
