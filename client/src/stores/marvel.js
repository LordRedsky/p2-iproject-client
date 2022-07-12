import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from "sweetalert2/dist/sweetalert2.js";

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    url: 'https://redmarvel24.herokuapp.com/marvel',
    // url: 'http://localhost:5550/marvel',
    characterId: 0,
    character: [],
    characters: [],
    comics: [],
    gifs: [],
    imageUrl: '',
    name: '',
    description: '',
    isComics: false,
    isCharacters: false,
    isGifs: false,
    isLogin: false,
    currentPage: 1,
    totalPage: 0,
    totalComics: 0,
    alphabet: "A",
    pageComics: 1,
    comicSize: "portrait_xlarge.jpg",
    ID_Comic: 0,
    year: "",
    QR_Code: "",
    searchDataGif: '',
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    //* GET DETAIL
    async seachByAlphabet() {
      try {
        this.characters = [];
        this.totalCharacters = 0;
        const { data } = await axios.get(
          `${this.url}/characters?page=${this.currentPage}&name=${this.alphabet}`
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

    async fetchComics() {
      try {
        this.comics = [];
        const { data } = await axios.get(
          `${this.url}/comics?page=${this.pageComics}&year=${Number(this.year)}`
        );

        this.totalComics = data.data.total;
        this.totalPage = Math.ceil(this.totalComics / 20);

        const result = data.data.results;

        result.forEach((el) => {
          this.comics.push(el);
          el.url = `${el.thumbnail.path}/${this.comicSize}`;
        });
        this.year = "";
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      }
    },

    async getDetailComics(id) {
      try {

        const { data } = await axios.get(
          `${this.url}/comics/${id}`
        );

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      }
    },

    async getQRCode() {
      try {
        const { data } = await axios.get(
          `https://api.happi.dev/v1/qrcode?apikey=185ab93aPadgXSlQHNyfKxq88A4RJJTEuCRBtN6fKFxLrcgEKRw41j81&data=${this.imageUrl}`
        )

        this.QR_Code = data.qrcode
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      }
    },

    input() {
      clearTimeout(this.timeOutInput);
      this.timeOutInput = setTimeout(() => {
        this.searchGif();
      }, 500);
    },

    async searchGif() {
      try {

        this.gifs = [];

        const { data } = await axios.get(
          `http://api.giphy.com/v1/gifs/search?q=${this.searchDataGif}&api_key=NqKS6feoumT4SeZzi5nS3kumS2kp2wZb&limit=100`
        );
        this.gifs = data.data;

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      }
    },
  }
})
