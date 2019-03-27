<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 offset-3" v-for="(post, index) in posts" :key="index">
        <div class="card">
          <router-link :to="{name: 'profile', params: {id:post._id}}">@{{post.userId.name}}</router-link>
          <!-- <button  @click.prevent="selectedPosting(post,index)"> -->
          <!-- <span>@{{post.userId.name}}</span> -->
          <!-- </button> -->
          <!-- </a> -->
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{post.description}}</p>
              <footer class="footer">
                Upvoted:{{post.upvotes.length}} 
                Downvoted:{{post.downvotes.length}}
              </footer>
              <button @click.prevent="selectedPosting(post, index)">See detail</button>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import local from '@/api/local.js'
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
      this.$router.push({
        path: `posting/${post._id}`
      })
    }
  
  },
  mounted() {
      this.$store.dispatch('loadPosts')
  }
};
</script>

