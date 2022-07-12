<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { mapState, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "Login",
  computed: {
    ...mapState(useMaarvelStore, ["url"]),
    ...mapWritableState(useMaarvelStore, ["isLogin"]),
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post(`${this.url}/login`, {
          email: this.email,
          password: this.password,
        });

        const { access_token } = data;

        localStorage.setItem("access_token", access_token);
        this.isLogin = true;

        this.$router.push("/");

        Swal.fire({
          icon: "success",
          title: `Wellcome`,
          text: "Hope you enjoy",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${error.response.data.message}`,
        });
      } finally {
        (this.email = ""), (this.password = "");
      }
    },

    handleCredentialResponse(response) {
      axios
        .post(`${this.url}/login-google`, {
          credential: response.credential,
        })
        .then((res) => {
          const { access_token, email } = res.data;
          //* set local storage
          localStorage.setItem("access_token", access_token);

          this.isLogin = true;
          this.cek = false;

          this.$router.push("/");

          Swal.fire({
            icon: "success",
            title: `Wellcome ${email}`,
            text: "Hope you enjoy",
            showConfirmButton: false,
            timer: 2000,
          });
        })

        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: `Oops...`,
            text: `${error.response.data.message}`,
          });
        });
    },
  },

  mounted() {
    const cb = this.handleCredentialResponse;
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "1071514386727-40iels1mkp6b5488e40nfjv7lonnu0ir.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
    };
  },
};
</script>

<template>
  <div class="login-box">
    <h1>RED MARVEL</h1>
    <form>
      <div class="user-box">
        <input type="text" name="" required="" v-model="email" />
        <label>Email</label>
      </div>
      <div class="user-box">
        <input type="password" name="" required="" v-model="password" />
        <label>Password</label>
      </div>
      <a href="#" type="submit" v-on:click.prevent="login">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
      </a>
      <a
        id="buttonDiv"
        data-client_id="YOUR_GOOGLE_CLIENT_ID"
        data-login_uri="https://your.domain/your_login_endpoint"
        data-auto_prompt="false"
      ></a>
    </form>
    <div class="to-register">
      Not a member?
      <router-link to="/register"><a>Register Here</a></router-link>
    </div>
  </div>
</template>

<style>
a #buttonDiv {
  margin-top: 20px;
}

.to-register {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  text-align: center;
  font-size: 15px;
}

.to-register a {
  font-size: 17px;
  margin-left: 5px;
}

body {
  margin: 0;
  padding: 0;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  height: 500px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h1 {
  padding: 0;
  color: #d83c3c;
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: flex;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 20px;
  letter-spacing: 4px;
  align-items: center;
  justify-content: center;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
