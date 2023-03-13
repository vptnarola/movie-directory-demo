<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between pb-2 mb-2">
        <h5 class="card-title">All Movies</h5>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            @click="this.$router.push('/movies/store')"
          >New Movie</button>
        </div>
      </div>

      <table class="table table-hover table-sm">
        <thead class="bg-dark text-light">
          <tr>
            <th width="50" class="text-center">#</th>
            <th class="text-center" width="120">Poster</th>
            <th>Movie Name</th>
            <th>Artist</th>
            <th>Director</th>
            <th>Relese Date</th>
            <th class="text-center" width="200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td class="text-center">{{index+1}}.</td>
            <td class="text-center">
              <div v-if="post.image">
                <img alt="post-img" width="100" v-bind:src="'/img/' +post.image" />
              </div>
            </td>
            <td>{{post.name}}</td>

            <td class="badge rounded-pill bg-success"  >{{post.artist}}</td>
            <td>{{post.director}}</td>
            <td>{{post.relese_date}}</td>
            <td class="text-center">
              <div class="btn-group ">
                <router-link :to="{name:'editmovie', params: {id:post.id}}" class="btn btn-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                </router-link>
                <button class="btn btn-danger" @click="deletePost(post.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      strSuccess: "",
      strError: ""
      //   dialog: null
    };
  },
  created() {
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
  },
  methods: {
    deletePost(id) {
      this.$axios.get("/sanctum/csrf-cookie").then(response => {
        let existingObj = this;

        if (confirm("Do you really want to delete this data?")) {
          this.$axios
            .delete(`/api/movies/delete/${id}`)
            .then(response => {
              let i = this.posts.map(item => item.id).indexOf(id); // find index of your object
              this.posts.splice(i, 1);
              existingObj.strError = "";
              existingObj.strSuccess = response.data.success;
              this.$toast.success(`Movie Delete Successfully`);
            })
            .catch(function(error) {
              existingObj.strError = "";
              existingObj.strSuccess = error.response.data.message;
            });
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!window.Laravel.isLoggedin) {
      window.location.href = "/";
    }
    next();
  }

};
</script>
