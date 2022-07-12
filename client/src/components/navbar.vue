<script>
import { mapActions, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";
import axios from "axios";
import SearchGifs from "./search-gifs.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "NavBar",
  data() {
    return {
      size: "standard_large.jpg",
    };
  },
  methods: {
    ...mapActions(useMaarvelStore, ["fetchComics"]),
    async seachByAlphabet(alphabet, page) {
      try {
        this.alphabet = alphabet;
        this.currentPage = page;
        this.characters = [];
        this.totalCharacters = 0;

        const { data } = await axios.get(
          `${this.url}/characters?page=${page}&name=${alphabet}`
        );

        this.totalCharacters = data.data.total;
        this.totalPage = Math.ceil(this.totalCharacters / 50);
        const result = data.data.results;

        result.forEach((el) => {
          this.characters.push(el);
          el.url = `${el.thumbnail.path}/${this.size}`;
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      }
    },
    home() {
      this.$router.push("/");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.isLogin = false;
    },
    previousPage() {
      this.currentPage = this.currentPage - 1;
      this.seachByAlphabet();
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
      this.seachByAlphabet();
    },
    searchLocalHandler() {
      this.fetchComics();
    },
  },
  computed: {
    ...mapWritableState(useMaarvelStore, [
      "isCharacters",
      "isComics",
      "currentPage",
      "totalPage",
      "url",
      "characters",
      "alphabet",
      "year",
      "isLogin",
      "isGifs",
    ]),
  },
  components: { SearchGifs },
};
</script>

<template>
  <header>
    <div class="nav-bar">
      <nav>
        <ul class="navbar-ul">
          <li class="active">
            <router-link to="/" class="active">RED MARVEL</router-link>
          </li>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/comics">All Comics</router-link></li>
          <li><a href="#">Favourite</a></li>
          <li><router-link to="/gifs" href="#">GIF's</router-link></li>
          <!-- <li><a href="#">Trailer</a></li> -->
          <li><a href="#" v-on:click.prevent="logout">Logout</a></li>
        </ul>
      </nav>

      <!-- SEARCH  -->
      <form
        class="form-wrapper cf"
        v-on:submit.prevent="searchLocalHandler"
        v-if="isComics === true"
      >
        <input
          name="year"
          type="number"
          placeholder="Search by year..."
          required
          v-model="this.year"
        />
        <button type="submit">Search</button>
      </form>

      <!-- SEARCH BY ALPHABET  -->
      <div class="pagination" v-if="isCharacters === true">
        <a
          href="#"
          v-if="this.currentPage > 1"
          v-on:click.prevent="seachByAlphabet(alphabet, this.currentPage - 1)"
        >
          &laquo;</a
        >
        <a href="#" v-on:click.prevent="seachByAlphabet('A')">A</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('B')">B</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('C')">C</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('D')">D</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('E')">E</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('F')">F</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('G')">G</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('H')">H</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('I')">I</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('J')">J</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('K')">K</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('L')">L</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('M')">M</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('N')">N</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('O')">O</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('P')">P</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('Q')">Q</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('R')">R</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('S')">S</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('T')">T</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('U')">U</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('V')">V</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('W')">W</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('X')">X</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('Y')">Y</a>
        <a href="#" v-on:click.prevent="seachByAlphabet('Z')">Z</a>
        <a
          href="#"
          v-if="this.currentPage < this.totalPage"
          v-on:click.prevent="seachByAlphabet(alphabet, this.currentPage + 1)"
        >
          &raquo;</a
        >
      </div>

      <!-- SEARCH GIFS  -->
      <SearchGifs v-if="isGifs === true" />
    </div>
  </header>
</template>

<style>
@font-face {
  font-family: decade;
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/decade.ttf");
}

body {
  font-family: decade;
}
.pagination {
  margin-top: 20px;
  margin-bottom: -20px;
  display: inline-block;
  align-items: center;
  display: flex;
  justify-content: center;
}

.total-char {
  color: whitesmoke;
  font-size: 20px;
}
.pagination a {
  color: whitesmoke;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 20px;
}
.navbar-ul {
  height: 70px;
  align-items: center;
  justify-content: center;
}

form.form-wrapper.cf {
  margin-top: 5px;
  margin-bottom: -10px;
}

.form-wrapper {
  width: 500px;
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

.form-wrapper input {
  width: 360px;
  height: 40px;
  padding: 10px 5px;
  float: left;
  font: bold 20px "lucida sans", "trebuchet MS", "Tahoma";
  border: 0;
  background: #eee;
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}

.form-wrapper input:focus {
  outline: 0;
  background: #fff;
  -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
  -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
}

.form-wrapper input::-webkit-input-placeholder {
  color: #999;
  font-weight: normal;
  font-style: italic;
}

.form-wrapper input:-moz-placeholder {
  color: #999;
  font-weight: normal;
  font-style: italic;
}

.form-wrapper input:-ms-input-placeholder {
  color: #999;
  font-weight: normal;
  font-style: italic;
}

.form-wrapper button {
  overflow: visible;
  position: relative;
  float: right;
  border: 0;
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 110px;
  font: bold 15px/40px "lucida sans", "trebuchet MS", "Tahoma";
  color: #fff;
  text-transform: uppercase;
  background: #d83c3c;
  -moz-border-radius: 0 3px 3px 0;
  -webkit-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
}

.form-wrapper button:hover {
  background: #e54040;
}

.form-wrapper button:active,
.form-wrapper button:focus {
  background: #c42f2f;
}

.form-wrapper button:before {
  content: "";
  position: absolute;
  border-width: 8px 8px 8px 0;
  border-style: solid solid solid none;
  border-color: transparent #d83c3c transparent;
  top: 12px;
  left: -6px;
}

.form-wrapper button:hover:before {
  border-right-color: #e54040;
}

.form-wrapper button:focus:before {
  border-right-color: #c42f2f;
}

.form-wrapper button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

a {
  font-size: 35px;
  align-items: center;
  justify-content: center;
}

.nav-bar {
  position: fixed;
  padding: 50px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 40;
  background-color: #1d1f20;
}

.nav-bar nav {
  margin: 0 auto;
  max-width: 1300px;
}

.nav-bar nav ul {
  font-size: 0;
}
.nav-bar nav ul li {
  display: inline-block;
  font-size: 25px;
  text-transform: uppercase;
  color: #fff;
  padding: 5px 10px;
  border-right: 2px solid #fff;
}
.nav-bar nav ul li:last-child {
  border-right: none;
}
.nav-bar nav ul li a.active {
  color: #ff5954;
}
.nav-bar nav ul li a:hover {
  color: #ff5954;
}

</style>
