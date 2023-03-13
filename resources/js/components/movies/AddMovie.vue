<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between pb-2 mb-2">
        <h5 class="card-title">Add New Movie</h5>
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

      <form @submit.prevent="addMovie" enctype="multipart/form-data">
        <div class="form-group mb-2">
          <label>Movie Name</label>
          <span class="text-danger">*</span>
          <input type="text" class="form-control" v-model="name" placeholder="Enter movie name" />
        </div>

        <div class="form-group mb-2">
          <label>Director</label>
          <span class="text-danger">*</span>
          <input type="text" class="form-control" v-model="director" placeholder="Enter movie director" />
        </div>

        <div class="form-group mb-2">
          <label>Artist</label>
          <span class="text-danger">*</span>
          <vue3-tags-input :tags="tags"  class="form-control" placeholder="Enter movie artist"  v-model="artist" @on-tags-changed="handleChangeTag" />
        </div>

        <div class="form-group mb-2">
            <label> Relese Date:</label>
          <span class="text-danger">*</span>
          <div class="input-group date" data-provide="datepicker">
            <input type="date" class="form-control" data-date-end-date="0d" placeholder="Enter relese date" v-model="relese_date"/>
            <div class="input-group-addon">
              <span class="glyphicon glyphicon-th"></span>
            </div>
          </div>
        </div>

        <div class="form-gorup mb-2">
          <label>Movie poster</label>
          <span class="text-danger">*</span>
          <input type="file" placeholder="select movie poster" class="form-control mb-2" v-on:change="onChange" />

          <div v-if="img">
            <img v-bind:src="imgPreview" width="100" height="100" />
          </div>
        </div>

        <button type="submit" class="btn btn-primary mt-4 mb-4">Add Movie</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      tags:[],
      artist: "",
      director:"",
      relese_date:"",
      img: "",
      strSuccess: "",
      strError: "",
      imgPreview: null
    };
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
    addMovie(e) {
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
        formData.append("artist", this.tags);
        formData.append("relese_date", this.relese_date);
        formData.append("file", this.img);

        this.$axios
          .post("/api/movies/store", formData, config)
          .then(response => {
            existingObj.strError = "";
            existingObj.strSuccess = response.data.success;
            window.location.href = "/movies";
            this.$toast.success(`Movie Create Successfully`);
            // $toast.success('Done');
          })
          .catch(function(error) {
            existingObj.strSuccess = "";
            existingObj.strError = error.response.data.message;
            this.$toast.error(`Something Want to wrong`);
            // $toast.success('Something went wrong!');
          });
      });
    },
    handleChangeTag(tags) {
      this.tags = tags;
      console.log('tag_input', this.tags);
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
