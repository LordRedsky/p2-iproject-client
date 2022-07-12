<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "DetailCard",

  methods: {
    ...mapActions(useMaarvelStore, ["getDetailCharacter", "getQRCode"]),
  },
  computed: {
    ...mapState(useMaarvelStore, ["description", "imageUrl", "name", "QR_Code"]),
    ...mapWritableState(useMaarvelStore, ["isCharacters"]),
  },

  mounted() {
    this.isCharacters = false;
    this.getQRCode();
  },
};
</script>

<template>
    <div  class="detail-content">
      <div class="content">
        <div class="image">
          <img :src="imageUrl" />
        </div>
        <div class="info">
          <div class="title">
            <a href="#">
              <h2>{{ name }}</h2>
            </a>
          </div>
          <div class="about">
            <div class="overview">
              <h3>Description</h3>
              <p>{{ description }}.</p>
            </div>
          </div>
        </div>
        <div class="qr-code">
          <img :src="this.QR_Code" alt="" />
        </div>
      </div>
    </div>
</template>

<style>
html {
  font-size: 10px;
}

.title {
  margin-left: 10px;
  margin-top: 10px;
  max-width: 80%;
}

.overview {
  margin-top: 80px;
  margin-left: -10px;
}
.qr-code img {
  width: 15%;
  margin-left: -180px;
  margin-top: 20px;
  position: absolute;
}

h3 {
  font-size: 22px;
  font-weight: 600;
  margin: 50px 10px 10px 30px;
}

p {
  font-size: 20px;
  margin: 3px 10px 10px 30px;
}
a {
  color: #fff;
}

.detail-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.content {
  display: flex;
  position: absolute;
  width: 100rem;
  height: 55rem;
  top: 20%;
  left: 26.5%;
  justify-content: center;
  /* align-items: center; */
}

.image {
  width: 40rem;
}
.info {
  color: #fff;
  width: 700rem;
  background-color: rgba(19.61%, 21.96%, 23.53%);
  padding: 4rem 2rem;
}
.title {
  padding-bottom: 1rem;
}
.title a h2 {
  display: inline-block;
  font-size: 3.84rem;
  color: #fff;
}
.title span {
  opacity: 0.6;
  font-size: 2.72rem;
  font-weight: 400;
}
</style>
