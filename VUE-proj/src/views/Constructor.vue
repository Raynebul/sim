<template>
  <nav>
    <ul
      class="navbar-construct nav nav-tabs"
      id="nav-tab"
      role="tablist"
      style="
        width: 30rem;
        margin-left: auto;
        margin-right: auto;
        margin-top: 3rem;
        background-color: #6ce6ff;
        color: white;
        text-decoration: none; /* no underline */
      "
    >
      <!--
      <button
        class="nav-link active"
        id="nav-home-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-home"
        type="button"
        role="tab"
        aria-controls="nav-home"
        aria-selected="true"
      >
        ID
      </button>
      <button
        class="nav-link"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="false"
      >
        Данные
      </button> -->
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-home"
          type="button"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          ID
        </button>
      </li>
      <!--
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-profile"
          type="button"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="true"
        >
          Данные
        </button>
      </li>-->
    </ul>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div
        class="card text-dark bg-light"
        style="
          width: 30rem;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 5rem;
        "
      >
        <div class="card-body">
          <h5 class="card-title">Создание нового тренажёра</h5>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >ID тренажёра</label
            >
            <input
              class="form-control"
              type="text"
              placeholder="Введите id тренажёра"
              aria-label="default input example"
              v-model="id"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Название тренажёра</label
            >
            <input
              class="form-control"
              type="text"
              placeholder="Введите название тренажёра"
              aria-label="default input example"
              v-model="name"
            />
          </div>
          <div class="text-end">
            <button
              class="btn btn-primary float-right"
              type="button"
              style="margin-top: 15px"
              @click="CreateTrainer()"
            >
              Создать тренажёр
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      user: "",
      date: "",
      id: "",
      name: "",
    };
  },
  mounted() {
    let date = new Date();
    //this.user = JSON.parse(localStorage.getItem("user")).username;
    this.date = date.toLocaleDateString("ru");
    //console.log(this.user, this.date);
  },
  async created() {
    let date = new Date();
    this.date = date.toLocaleDateString("ru");
    if (import.meta.env.VITE_TOKEN_MODE === "token") {
      let jwt = this.getCookie("jwt");
      const response = await axios.get(this.base_backend_url + "/user", {
        headers: {
          Authorization: jwt,
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
      });
      this.user = response.data.user;
    }
    if (import.meta.env.VITE_TOKEN_MODE === "no-token") {
      this.user = { username: "user-no-token"};
    }
  },
  computed: {},
  methods: {
    CreateTrainer() {
      axios({
        method: "post",
        url: this.base_url + "/edit",
        data: {
          IDtext: this.id,
          name: this.name,
          author: this.user,
          date: this.date,
        },
        headers: {
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {})
        .then((response) => {
          //this.$router.push(`/constructor/${this.id}`)
        });
      let metadata_ = {
        id: this.id,
        name: this.name,
        author: this.user.username,
        description: "",
        cover: "",
        created: this.date,
        status: "В разработке",
        type: "Тренажёр",
      };

      axios({
        method: "post",
        url: this.base_backend_url + "/metadata",
        data: {
          IDtext: this.id,
          name: this.name,
          metadata_: JSON.stringify(metadata_),
        },
        headers: {
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {})
        .then((response) => {
          //this.$router.push(`/constructor/${this.id}`)
        });
      this.$router.push(`/edit/${this.id}`);
    },
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  },
};
</script>

<style scoped>
.block {
  color: black;
}

.square {
  width: 5rem;
  height: 3rem;
  background-color: aqua;
}

.navbar-construct .nav-link {
  color: #fff;
}

.navbar-construct .nav-link.active {
  color: rgb(83, 82, 99);
}
</style>
