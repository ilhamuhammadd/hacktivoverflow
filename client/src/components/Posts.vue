<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 offset-3" v-for="(post, index) in posts" :key="index">
        <div class="card">
            <button  v-on:click="deletepost(post._id)" class="close letak" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          <!-- <router-link :to="{name: 'profile', params: {id:post._id}}">@{{post.userId.name}}</router-link> -->
          <button class="btn" @click.prevent="selectedPosting(post)">
          @{{post.userId.name}}
        </button>  
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{post.description}}</p>
              <footer class="footer">
                <span>{{post.upvotes.length - post.downvotes.length}}</span> <br>
                <button class="btn btn-success">{{ post.upvotes.length }}</button>
                <button class="btn btn-danger">{{ post.downvotes.length}}</button>
              </footer>
              <button class="btn" @click.prevent="selectedPosting(post, index)">See detail</button>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  button.letak {
    width: 20px;
    position: relative;
    left: 430px;
  }
  
</style>


<script>

import local from '@/api/local.js'
import { mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: "Post",
  computed: {
      // email: {
      //     get() {
      //         return this.$store.state.email
      //     },
      //     set(value) {
      //         this.$store.commit('setEmail', value)
      //     }
      // },
      ...mapState(['posts'])
  },
  methods: {
    selectedPosting(post, index) {
      this.$store.commit('setParams',post._id)
      this.$router.push({
        path: `posting/${post._id}`
      })
    },

    deletepost(idpost) {
      local.delete(`/posting/${idpost}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response=>{
        console.log('Deleted succesfully')
      })
      .catch(err=>{
        console.log(err)
      })
    }

  },
  mounted() {
      this.$store.dispatch('loadPosts')
  }
};
</script>

