<script>
import { mapActions, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "GIF",
  computed: {
    ...mapWritableState(useMaarvelStore, [
      "isLogin",
      "isGifs",
      "gifs",
      "isCharacters",
      "isComics",
      "searchDataGif",
      "gifs",
    ]),
  },
  methods: {
    ...mapActions(useMaarvelStore, ["input"]),

    copyUrl(copy) {
      navigator.clipboard.writeText(copy);
      Swal.fire({
        icon: "success",
        title: `Copied to clipboard`,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },

  mounted() {
    this.isGifs = true;
    this.isLogin = true;
    this.isCharacters = false;
    this.isComics = false;
    this.searchDataGif = "";
    this.gifs = [];
  },
};
</script>

<template>
  <div class="gift-container">
    <div class="gift" v-for="gif in gifs" :key="gif.id">
      <img class="gift-display" :src="gif.images.original.url" alt="" />
      <div>
        <input
          class="copy-gift"
          type="text"
          ref="url"
          :value="`${gif.images.original.url}`"
          readonly
        />
        <button class="copy-btn" v-on:click.prevent="copyUrl(gif.images.original.url)">
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.gift-container {
  margin-top: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.gift {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

button.copy-btn {
  margin-top: 10px;
  background: #e54040;
  color: #fff;
  border: 0;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  width: 21%;
  height: 40px;
  font-size: 20px;
}

img.gift-display {
  width: 320px;
  height: 320px;
  margin: 10px;
}

input.copy-gift {
  margin: 10px;
  width: 70%;
  height: 40px;
  padding: 10px 5px;
  float: left;
  font: bold 17px "lucida sans", "trebuchet MS", "Tahoma";
  border: 0;
  background: #eee;
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 5px;
}
</style>
