<template>
   <div id="app">
      <Navbar />
      <router-view />
   </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
   components: {
      Navbar,
   },
   created() {
      this.$store.dispatch("fetchData");
   },
};
</script>

<style>
#app {
   font-family: "Poppins", sans-serif;
}
</style>
