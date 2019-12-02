<template>
    <div>
        <header class="navbar">
        <span class="navbar-text">  VueJs, NodeJs 
          <a href="https://sightengine.com/">Sightengine</a>
        </span>
        </header>

        <div class="container">
            <img :src="imageSrc" class="image">
            <input @change="uploadImage" type="file" name="photo" accept="image/*">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imageSrc: '',
    }
  },
  methods: {
    uploadImage: function(e) {
      var files = e.target.files;
      if(!files[0]) {
        return;
      }
      var data = new FormData();
      data.append('image', files[0]);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
      this.axios.post('/uploads', data, {headers: { 'Content-Type': 'multipart/form-data' } }).then(function (response) {
        reader.readAsDataURL(files[0]);
      }).catch(function (error) {
        console.log(error) // catch your error
      });
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.image {
  width: 100%;
  height: 100%;
}
.container {
  margin: 0 auto;
  width: 600px;
}
.navbar {
  width: 100%;
  cursor: default;
  background-color: #2CA8E5;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 35px;
  margin-bottom:50px;
}
.navbar-text {
  color: white;
  font-weight: bold;
}
.navbar-text a {
  color: white;
}
</style>
