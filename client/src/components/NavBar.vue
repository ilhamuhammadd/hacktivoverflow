<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">HacktivOverflow</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/posting/">Profile</router-link>
        </li>
      </ul>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#addquestion"
      >Add Question</button>

      <!-- Modal -->
      <div
        class="modal"
        id="addquestion"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampelModalLabel">Add Question</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form  class="needs-validation" novalidate>
                <div class="form-group">
                  <label for="title">Title</label>
                  <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Enter your Title"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>
                <!-- <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                  <button
                    v-on:click.prevent="addquestion"
                    class="btn btn-success"
                    data-dismiss="modal"
                  >Posting</button>
                <!-- </div> -->
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Button trigger modal -->
      <button
        v-show="!isLogin"
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#login"
      >Login</button>
      <button v-show="isLogin" @click="logout" data-toggle="off" class="btn btn-danger">Logout</button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="email"
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    autofocus
                  >
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  >
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button
                    v-on:click.prevent="login"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import local from "@/api/local.js";
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      email: "",
      password: "",
      isLogin: false,
      title: "",
      description: "",
      user: "",
    };
  },
  //   computed: {
  //       email: {
  //           get() {
  //               return this.$store.state.email
  //           },
  //           set(value) {
  //               this.$store.commit('email', value)
  //           }
  //       },
  //       password: {
  //           get() {
  //               return this.$store.state.password
  //           },
  //           set(value) {
  //               this.$store.commit('password', value)
  //           }
  //       },
  //       ...mapState(['title','email', 'password'])
  //   },
  methods: {
    login() {
      // console.log(this.$store.state.email);
      // console.log("masok");
      local
        .post("/user/signin", { email: this.email, password: this.password })
        .then(({ data }) => {
          this.email = "";
          this.password = "";
          Swal.fire({
            position: "top-center",
            type: "success",
            title: "Login is succeed",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user)
          this.isLogin = true;
          this.$router.push("/home");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>"
          });
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.isLogin = false;
    },
    addquestion() {
      this.userId = localStorage.getItem('user')
      local
        .post('/posting', {title: this.title, description: this.description, userId: this.userId } , {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data=>{
          Swal.fire({
            position: "top-center",
            type: "success",
            title: "Add question is succeed",
            showConfirmButton: false,
            timer: 500
          });
          this.title = ''
          this.description = ''
          this.$router.push('/home')
        })
        .catch(err=>{
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>"
          });
        })
    }
  },
  created() {
    // this.addquestion()
  }
  ,
  mounted() {
    // this.$store.dispatch('loadPosts')
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>
