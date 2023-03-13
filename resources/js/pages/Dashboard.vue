<style>
.card-wrapper {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 4px 18px 0px #00000012;
    margin-bottom: 1.5rem;
}

.card-wrapper h3 {
    color: #424242;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-wrapper .card-img {
    width: 100%;
    min-height: 200px;
    height: 200px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.card-wrapper .card-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top center;
}

.card-wrapper h6 {
    color: #424242;
    text-align: center;
}
</style>

<template>
  <div>
    <div class="container p-3 my-3">
      <div class="row">
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="(post,index) in posts" :key="post.id">
          <div class="card-wrapper">
            <p hidden>{{index+1}}</p>
            <h3>{{post.name}}</h3>
            <div class="card-img" v-if="post.image">
              <img alt="post-img" width="100" v-bind:src="'/img/' +post.image" />
            </div>
            <h6>Artist : {{post.artist}}</h6>
            <h6>Director : {{post.director}}</h6>
            <h6>Relese Date : {{post.relese_date}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      name: null,
      posts: [],
      strSuccess: "",
      strError: ""
    };
  },
  created() {
    if (window.Laravel.user) {
      this.name = window.Laravel.user.name;
      this.$axios.get("/sanctum/csrf-cookie").then(response => {
        this.$axios
          .get("/api/movies")
          .then(response => {
            this.posts = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) {
    if (!window.Laravel.isLoggedin) {
      window.location.href = "/";
    }
    next();
  }
};
</script>
