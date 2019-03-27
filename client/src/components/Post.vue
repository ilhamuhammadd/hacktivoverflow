<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-7">
        <div class="card">
          <p>{{post.userId.name}}</p>
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{post.description}}</p>
              <footer class="footer">
                Upvoted:{{post.upvotes.length}}
                Downvoted:{{post.downvotes.length}}
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
                  <textarea name="answer" cols="56.5" rows="3"></textarea>
                  <button class="btn btn-primary" @click.prevent="postanswer" >Post an Answer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Ending Answer Components -->
        <div class="card" v-for="(answer, index) in post.answerId" v-bind:key="index">
          <div class="card-header">{{answer.title}}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{answer.description}}</p>
              <footer class="footer">
                Upvoted: {{answer.upvote.length}}
                Downvoted:{{answer.downvote.length}}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
import local from "@/api/local.js";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "postdetail",
  data() {
    return {
      // post:
    };
  },
  computed: {
    ...mapState(["post"])
  },
  mounted() {
    this.$store.dispatch("loadPost");
  }
};
</script>


