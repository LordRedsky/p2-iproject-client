<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { mapState, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "register",
    data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
...mapState(useMaarvelStore, ["url"]),
  },
  methods: {
     async register() {
      try {
        const { data } = await axios.post(`${this.url}/register`, {
          email: this.email,
          password: this.password,
        });

        Swal.fire({
          icon: "success",
          title: "Successfully Registered",
          text: "Please Login",
          showConfirmButton: false,
          timer: 2000,
        });

        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      } finally {
        this.email = "";
        this.password = "";
      }
    },
  }
};
</script>

<template>
  <div class="login-box">
    <h1>RED MARVEL</h1>
    <!-- <h3>REGISTER FORM</h3> -->
    <form>
      <div class="user-box">
        <input type="text" name="" required="" v-model="email" />
        <label>Email</label>
      </div>
      <div class="user-box">
        <input type="password" name="" required="" v-model="password" />
        <label>Password</label>
      </div>
      <a href="#" type="submit" v-on:click.prevent="register">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Register Now
      </a>
    </form>
    <div class="to-login">
      Allready have an account?
      <router-link to="/login" ><a>Login Now</a></router-link>
    </div>
  </div>
</template>

<style>


.to-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
}

.to-login a {
     font-size: 17px;
     margin-left: 5px;
}
.login-box h3 {
  padding: 0;
  color: #d83c3c;
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
}
</style>
