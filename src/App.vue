<template>
    <div class="container">
        <div app="id" style="text-align: center">
            <div style="text-align: center">
                <br>
            <img src="uploads/images.jfif">
            </div>
                <br>
            <router-link v-bind:to="'/'">Armoire à Pharmacie</router-link>
            <router-link v-bind:to="'/About'">Règles de bon usage des médicaments</router-link>
                <router-view></router-view>
        </div>
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>
    export default{
    }
</script>

