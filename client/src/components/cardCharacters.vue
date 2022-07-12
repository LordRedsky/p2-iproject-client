<script>
import { mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "CardCharacters",
  props: ["character"],
  data() {
    return {
      size: "portrait_uncanny.jpg",
    };
  },
  methods: {
    goToDetail(id, descriptions, name) {
      this.characterId = id;
      this.imageUrl = `${this.character.thumbnail.path}/${this.size}`;
      this.description = descriptions;
      this.name = name;
      this.$router.push(`/detail-character/${id}`);
    },
  },
  computed: {
    ...mapWritableState(useMaarvelStore, [
      "characterId",
      "description",
      "imageUrl",
      "name",
    ]),
  },
};
</script>

<template>
  <figure
    class="card"
    v-on:click.prevent="goToDetail(character.id, character.description, character.name)"
  >
    <img :src="character.url" />
    <figcaption>{{ character.name }}</figcaption>
  </figure>
</template>
