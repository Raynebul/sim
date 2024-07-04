<template>
  <div
    class=""
    style="margin-top: 15%; margin-left: 45%"
    v-if="script_loaded === false"
  >
    <button class="btn btn-primary btn-lg" @click="LoadScript">
      Запустить скрипт
    </button>
  </div>
  <div v-else class="" style="margin-top: 15%;">
    <div class="alert alert-success" role="alert" style="padding-left: 25%">
      <div class="mainpage-text animated-text">
        <h4 class="alert-heading">
          Скрипт был запущен! База Данных обновлена!
        </h4>
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
      script_loaded: false,
    };
  },
  mounted() {
    axios({
      method: "get",
      url: this.sim_backend_url + "/script",
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then((response) => {
      this.script_loaded = response.data.script_loaded;
      //this.script_loaded = true;
    }); 
  },
  methods: {
    LoadScript() {
      if (this.script_loaded === false) {
        axios({
          method: "post",
          url: this.sim_backend_url + "/script",
          data: {},
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
            console.log(response.data.trainers);
            console.log(response.data.script_loaded);
            //console.log(response.data.users);
            //console.log(response.data.roles);
            //console.log(response.data.metadatas_);
            this.script_loaded = true;
          });
      }
    },
  },
};
</script>

<style>
.main-text {
}
.animated-text {
  position: relative;
  animation: textmove 1s;
}

@keyframes textmove {
  from {
    top: -40px;
  }
  to {
    top: 0px;
  }
}

.mainpage-text {
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    /*  top: -200px; */
    opacity: 0;
  }
  to {
    /*   top: 0px; */
    opacity: 1;
  }
}
</style>
