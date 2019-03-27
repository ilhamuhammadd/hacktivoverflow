<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-7">
        <div class="card">
            <button v-on:click="deletepost(post._id)" class="close letakpost" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          <p>{{post.userId.name}}</p>
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{post.description}}</p>
              <footer class="footer">
                <!-- Upvoted:{{post.upvotes.length}} -->
                <!-- Downvoted:{{post.downvotes.length}} -->
                <span>{{ post.upvotes.length - post.downvotes.length}}</span> <br>
                <button class="btn btn-success" @click.prevent="upvotes">{{post.upvotes.length}}</button>
                <button class="btn btn-danger" @click.prevent="downvotes">{{post.downvotes.length}}</button>
              </footer>
              <!-- <button @click.prevent="selectedPosting(post, index)">See detail</button> -->
            </blockquote>
          </div>
        </div>
        <!-- Answer Components -->
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <form>
                <div class="form-group">
                  <input v-model="inputtitle" type="text" name="title" class="form-control" >
                  <textarea v-model="inputdescription" name="description" cols="56.5" rows="3" class="form-control"></textarea>
                  <button class="btn btn-primary" @click.prevent="postanswer" >Post an Answer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Ending Answer Components -->
        <div class="card" v-for="(answer, index) in post.answerId" v-bind:key="index">
          <button v-on:click="deleteanswer(answer._id)" class="close letakanswer" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          <div class="card-header">{{answer.title}}</div>
          <div class="card-body">
              {{answer.userId.name}}
            <blockquote class="blockquote mb-0">
              <p>{{answer.description}}</p>
              <footer class="footer">
                <!-- Upvoted: {{answer.upvote.length}} -->
                <!-- Downvoted:{{answer.downvote.length}} -->
                <span>{{ answer.upvote.length - answer.downvote.length}}</span> <br>
                <button class="btn btn-success">{{answer.upvote.length}}</button>
                <button class="btn btn-danger">{{answer.downvote.length}}</button>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>


<style>
  button.letakpost {
    width: 20px;
    position: relative;
    left: 510px;
  }

  button.letakanswer {
      width: 20px;
      position: relative;
      left: 510px;
  }
  
</style>

<script>
import local from "@/api/local.js";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "postdetail",
  data() {
    return {
      userId: localStorage.getItem('user')
    };
  },
  methods: {

      deletepost(idpost) {
          local.delete(`/posting/${idpost}`, {
              headers: {
                  token: localStorage.getItem('token')
              }
          })
          .then(response=>{
              console.log('delete post succesfully')
          })
          .catch(err=>{
              console.log(err)
          })
      },

      deleteanswer(idanswer) {
        //   console.log(idanswer, '<================')
          local.delete(`/answer/${idanswer}`, {
              headers: {
                  token: localStorage.getItem('token')
              }
          })
          .then(response=>{
              console.log('delete answer succesfully')
          })
          .catch(err=> {
              console.log(err)
          })
      },

      postanswer() {
          local.post('/answer', {title: this.title, description: this.description, userId: this.userId, postId: this.$route.params.id }, {
              headers: {
                  token: localStorage.getItem('token')
              }
          })
            .then(response=>{
                this.title = ''
                this.description = ''
            })
            .catch(err=>{
                console.log(err)
            })
      },
      ...mapState(['title', 'description'])
  }
  ,
  computed: {
      inputtitle: {
          get() {
              return this.$store.state.title
          },
          set(value) {
              this.$store.commit('setTitle',value)
          }
      },
      inputdescription: {
          get() {
              return this.$store.state.description
          },
          set(value) {
              this.$store.commit('setDescription', value)
          }
      },
    ...mapState(["post", 'title', 'description'])
  },
  mounted() {
      this.$store.dispatch("loadPost")
  }
};
</script>


