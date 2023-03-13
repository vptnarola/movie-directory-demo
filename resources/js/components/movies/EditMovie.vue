<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between pb-2 mb-2">
        <h5 class="card-title">Update Movie</h5>
        <div>
          <router-link :to="{name: 'movies'}" class="btn btn-success">Go Back</router-link>
        </div>
      </div>

      <div v-if="strSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>{{strSuccess}}</strong>
      </div>

      <div v-if="strError" class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>{{strError}}</strong>
      </div>

      <form @submit.prevent="updateMovie" enctype="multipart/form-data">
        <div class="form-group mb-2">
          <label>Movie Name</label>
          <span class="text-danger">*</span>
          <input type="text" class="form-control" v-model="name" placeholder="Enter movie name" />
        </div>

        <div class="form-group mb-2">
          <label>Director</label>
          <span class="text-danger">*</span>
          <input type="text" class="form-control" v-model="director" placeholder="Enter movie name" />
        </div>

        <div class="form-group mb-2">
          <label>Artist</label>
          <span class="text-danger">*</span>
          <input type="text" class="form-control" v-model="artist" placeholder="Enter movie name" />
        </div>

        <div class="form-group mb-2">
          <label>Relese Date:</label>
          <span class="text-danger">*</span>
          <div class="input-group date" data-provide="datepicker">
            <input type="text" class="form-control" data-date-end-date="0d" v-model="relese_date" />
            <div class="input-group-addon">
              <span class="glyphicon glyphicon-th"></span>
            </div>
          </div>
        </div>

        <div class="form-gorup mb-2">
          <label>Image</label>
          <span class="text-danger">*</span>
          <input type="file" class="form-control mb-2" v-on:change="onChange" />

          <div v-if="img">
            <img v-bind:src="imgPreview" width="100" height="100" />
          </div>
        </div>

        <button type="submit" class="btn btn-primary mt-4 mb-4">Update movie</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      artist: "",
      director: "",
      relese_date: "",
      img: "",
      strSuccess: "",
      strError: "",
      imgPreview: null
    };
  },

  created() {
    this.$axios.get("/sanctum/csrf-cookie").then(response => {
      this.$axios
        .get(`/api/movies/edit/${this.$route.params.id}`)
        .then(response => {
          this.name = response.data["name"];
          this.director = response.data["director"];
          this.artist = response.data["artist"];
          this.relese_date = response.data["relese_date"];
          this.img = "/img/" + response.data["image"];
          this.imgPreview = this.img;
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  methods: {
    onChange(e) {
      this.img = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.imgPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.img) {
        if (/\.(jpe?g|png|gif)$/i.test(this.img.name)) {
          reader.readAsDataURL(this.img);
        }
      }
    },
    updateMovie(e) {
      this.$axios.get("/sanctum/csrf-cookie").then(response => {
        let existingObj = this;
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("director", this.director);
        formData.append("artist", this.artist);
        formData.append("relese_date", this.relese_date);
        formData.append("file", this.img);

        this.$axios
          .post(`/api/movies/update/${this.$route.params.id}`, formData, config)
          .then(response => {
            existingObj.strError = "";
            existingObj.strSuccess = response.data.success;
          })
          .catch(function(error) {
            existingObj.strSuccess = "";
            existingObj.strError = error.response.data.message;
          });
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
