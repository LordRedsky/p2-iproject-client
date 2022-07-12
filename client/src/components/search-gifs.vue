<script>
import { mapActions, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";
export default {
  name: "SearchGIFs",
  data() {
    return {
      timeOutInput: null,
      dataGifs: [],
    };
  },
  methods: {
    ...mapActions(useMaarvelStore, ["input"]),
  },
  computed: {
    ...mapWritableState(useMaarvelStore, ["searchDataGif"]),
  },
};
</script>

<template>
  <!-- SEARCH GIFS  -->
  <div class="searchgifs">
    <input
      class="search-gifs"
      type="text"
      placeholder="Type and search for marvel gifs"
      v-on:input="input"
      v-model="this.searchDataGif"
    />
  </div>
</template>

<style>
.searchgifs {
  width: 800px;
  height: 70px;
  padding: 15px;
  margin: 30px auto 20px auto;
  background: #444;
  background: rgba(0, 0, 0, 0.2);
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset, 0 1px 0 rgba(255, 255, 255, 0.2);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset, 0 1px 0 rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset, 0 1px 0 rgba(255, 255, 255, 0.2);
}

input.search-gifs {
  width: 100%;
  padding: 10px 5px;
  float: left;
  font: bold 20px "lucida sans", "trebuchet MS", "Tahoma";
  border: 0;
  background: #eee;
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 5px;
}

input.search-gifs:focus {
  border-color: #009ad7;
}
</style>
