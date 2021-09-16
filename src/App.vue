<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
};
</script>
