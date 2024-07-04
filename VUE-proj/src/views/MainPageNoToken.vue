<template>
  <!---->
  <div class="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 ms-1 me-0 pt-3">
    <div class="col" v-for="trainer in trainers" :key="trainer.id">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">{{ trainer.IDtext }}</h5>
          <p class="card-text"></p>
        </div>
        <div class="card-footer">
          <a
            :href="sim_frontend_url + `/run/` + trainer.IDtext"
            class="btn btn-secondary btn-sm  me-2"
            >Запустить</a
          >
          <a
            :href="sim_frontend_url + `/edit/` + trainer.IDtext"
            class="btn btn-secondary btn-sm"
            >Редактировать</a
          >
        </div>
      </div>
    </div>
    <div v-if="trainers.length === 0"><h4>Пока нет тренажёров</h4></div>
  </div>
</template>

<script setup>
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      trainers: [],
    };
  },
  mounted() {
    axios({
      method: "get",
      url: this.sim_backend_url + `/trainers`,
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then((response) => {
      this.trainers = response.data.trainers;
    });
  },
};
</script>

<style></style>
