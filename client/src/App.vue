<script>
import Navbar from "./components/navbar.vue";
import { mapWritableState } from "pinia";
import { useMaarvelStore } from "./stores/marvel";

export default {
  name: "app",
  components: { Navbar },
  computed: {
    ...mapWritableState(useMaarvelStore, ["isLogin"]),
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.isLogin = true;
    }
  },
};
</script>

<template>
  <Navbar v-if="isLogin === true" />
  <RouterView />
</template>

<style></style>
