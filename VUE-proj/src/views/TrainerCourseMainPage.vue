<template>
  <main>
    <div class="coursestatus">
      <div class="courseflag">
        <p class="coursenamestyle">{{ TrainerCourse.coursename }}</p>
        <!--<p>Описание курса: {{ course.courseDescription }}</p>-->
        <p>
          Сколько страниц пройдено: {{ progress }} из
          {{ TrainerCourse.number_of_tasks }}
        </p>
        <p>Сложность: {{ TrainerCourse.difficulty }}</p>
      </div>
      <div class="course_bottom">
        <div class="card w-75">
          <div class="card-body">
            <h5 class="card-title">О курсе:</h5>
            {{ TrainerCourse.description }}
          </div>
        </div>

        <div
          class="card text-center"
          style="width: 15rem; height: 11rem; margin-left: 15px; padding: 10px"
        >
          <div clas="card-body">
            <button
              v-if="isAdded == false"
              class="btn btn-primary"
              @click="AddCourseToUser()"
            >
              Начать обучение
            </button>
            <RouterLink
              v-else
              class="btn btn-primary"
              :to="`/trainercourse/` + TrainerCourse.id + `/1`"
            >
              Продолжить курс
            </RouterLink>
            <p>Прогресс</p>
            <div class="progress" v-if="isAdded == true">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                :style="`width: ` + ProgressBar + `%`"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ ProgressBar }}%
              </div>
            </div>

            <!--
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :aria-valuenow="1"
                :aria-valuemin="0"
                :aria-valuemax="2"
              >
                
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>

<script setup>
import "../scss/courseTitle.scss";
//import course_1 from "course_1"
//import { useCourseStore } from "../stores/courseStore";
//import { useRoute } from "vue-router";
import axios from "axios";
import { RouterLink } from "vue-router";
//const route = useRoute();
//const id = route.params.id;
//const courseStore = useCourseStore();
</script>

<script>
//import * as components from "../components/coursePages/index";
export default {
  data() {
    return {
      user: "",
      TrainerCourse: {
        id: 1,
        name: "Курсы по SQL",
        description: "Стандартное описание курса",
        number_of_tasks: 5,
        difficulty: "Легкий",
      },
      TrainerCourseUser: {},
      progress: 0,
      isAdded: false,
    };
  },

  computed: {
    ProgressBar() {
      let procent = 3 / this.TrainerCourse.number_of_tasks;
      procent = procent * 100;
      return procent;
    },
  },

  /* components: {
        ...components,
      },
      props: {
        type: { type: String, required: true },
      }, */
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.user.settings = JSON.parse(this.user.settings);
    console.log("user -", this.user.settings);
    for (let i = 0; i < this.user.settings.trainercourses.length; i++) {
      if (typeof this.user.settings.trainercourses[i].course == "string")
        this.user.settings.trainercourses[i].course = JSON.parse(
          this.user.settings.trainercourses[i].course
        );
    }
    this.TrainerCourseUser = this.user.settings.trainercourses.find(
      (course) => course.id === this.TrainerCourse.id
    );
    /* this.base_url + "/trainercourse/" + this.$route.params.id */
    axios({
      method: "get",
      url: this.base_url + "/trainercourse/" + this.$route.params.id,
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then((response) => {
      this.TrainerCourse = response.data.trainercourse;
      //this.TrainerCourse.course = response.data.course;
      //console.log(response.data.trainercourse);
      //console.log(JSON.parse(this.TrainerCourse.tasks))
      //console.log("Данный тренажёр: ", this.TrainerCourse);
      //console.log(response);
      //console.log(this.trainers);
      this.loaded = true;
      if (
        JSON.stringify(
          this.user.settings.trainercourses.filter(
            (object) => object.id == this.TrainerCourse.id
          )
        ) != "[]"
      ) {
        this.isAdded = true;
        this.progress = this.user.settings.trainercourses.filter(
          (object) => object.id == this.TrainerCourse.id
        )[0].progress;
      }
      /*
        console.log(
          this.user.settings.trainercourses.filter(
            (object) => object.id == this.TrainerCourse.id
          )
        ); */
      //console.log(this.TrainerCourse);
      //console.log(this.isAdded);
    });
  },
  methods: {
    AddCourseToUser() {
      let trainercourse = this.TrainerCourse;
      trainercourse["progress"] = 0;
      axios({
        method: "post",
        url: this.base_url + "/trainercourse/" + this.$route.params.id,
        data: {
          user: this.user,
          trainercourse: trainercourse,
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
          if (response.data.error == false) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //localStorage.setItem("jwt", response.data.token);
            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              this.$router.push(
                "/trainercourse/" + String(this.$route.params.id) + "/1"
              );
              //this.$router.push("/user");
            }
          } else {
            this.error = true;
          }
          console.log("YES!");
          //this.isSaved = true;
        });
    },
  },
};

/*
    Vue.component("coursePage", function (resolve, reject) {
      axios
        .get("../components/coursePages/" + this.$route.params.id + ".html")
        .then((response) => {
          resolve({ template: response.data });
        });
    });
    
    new Vue({
      el: "#pageText",
      data: function () {
        return {
          currentView: "coursePage",
        };
      },
    });
    */
</script>
