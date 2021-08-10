<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="p-2">
      <b-navbar-brand href="#"><img src="../assets/logos/icon-left-font-monochrome-white-navbar.png"></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="ml-auto" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"><router-link to="/">Accueil</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/user">Espace membre</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
