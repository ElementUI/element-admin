<template>
  <section>
    <navbar />
    <router-view />
  </section>
</template>

<script>
  import Navbar from 'src/components/navbar';

  export default {
    components: { Navbar }
  };
</script>

<style>
  @reset-global pc;
</style>
