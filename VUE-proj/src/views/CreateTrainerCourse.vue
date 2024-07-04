<template>
  <nav>
    <div
      class="nav nav-tabs navbar-construct"
      id="nav-tab"
      role="tablist"
      style="
        background-color: #870e97;
        color: white;
        text-decoration: none;
        width: 100%; /* no underline */
      "
    >
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
        Описание тренажёра
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
        Задания
      </button>
    </div>
  </nav>

  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div class="card text-dark bg-light w-100 p-3">
        <div class="card-body">
          <h5 class="card-title">Создание курса по тренажёру</h5>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Имя Курса</label
            >
            <input
              class="form-control w-50"
              type="text"
              placeholder="Введите название курса"
              aria-label="default input example"
              v-model="TrainerCourse.name"
            />
          </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Описание курса</label
            >
            <textarea
              class="form-control w-100"
              id="exampleFormControlTextarea1"
              placeholder="Введите описание курса"
              v-model="TrainerCourse.description"
              rows="8"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Количество заданий в тренажёре</label
            >
            <input
              class="form-control w-25"
              type="number"
              placeholder="Введите количеств заданий в курсе"
              aria-label="default input example"
              v-model="TrainerCourse.number_of_tasks"
              @keyup="NumberOfTasks"
              @click="NumberOfTasks"
            />
          </div>

          <div>Тренажёр</div>
          <!---->
          <select class="form-select w-25" aria-label="Default select example">
            <option
              v-for="i in Trainers.length"
              :key="i"
              :value="Trainers[i - 1].IDtext"
            >
              {{ Trainers[i - 1].name }}
            </option>
          </select>
          <div>Сложность:</div>
          <select class="form-select w-25" aria-label="Default select example">
            <option value="Легкая">Лёгкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Сложная">Сложная</option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      <div class="card text-dark bg-light w-100 p-3">
        <h5 class="card-title">Редактирование заданий тренажёра</h5>
        <nav aria-label="..." id="nav-tab" role="tablist">
          <ul class="pagination">
            <li
              class="page-item"
              v-for="j in TrainerCourse.course.tasks.length"
              :key="j"
            >
              <a
                :id="`nav-` + String(j) + `-tab`"
                class="page-link"
                type="button"
                role="tab"
                data-bs-toggle="tab"
                :data-bs-target="`#nav-` + String(j)"
                :aria-controls="`#nav-` + String(j)"
                aria-selected="false"
                >{{ j }}</a
              >
            </li>
          </ul>
        </nav>
        <div class="card-body">
          <div class="tab-content" id="nav-tabContent2">
            <div
              class="tab-pane fade"
              role="tabpanel"
              :aria-labelledby="`nav-` + String(i) + `-tab`"
              :id="`nav-` + String(i)"
              v-for="i in TrainerCourse.course.tasks.length"
              :key="i"
            >
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Имя задания</label
                >
                <input
                  class="form-control w-50"
                  type="text"
                  :placeholder="`Введите название задания №` + String(i)"
                  aria-label="default input example"
                  v-model="TrainerCourse.course.tasks[i - 1].name"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Описание задания</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  :placeholder="`Введите описание задания №` + String(i)"
                  v-model="TrainerCourse.course.tasks[i - 1].description"
                  rows="8"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Правильный ответ в формате JSON</label
                >
                <textarea
                  class="form-control w-50"
                  id="exampleFormControlTextarea1"
                  :placeholder="
                    `Введите правильный ответ задания №` + String(i)
                  "
                  v-model="TrainerCourse.course.tasks[i - 1].right_answer"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="text-end">
            <button
              class="btn btn-primary float-right"
              type="button"
              style="margin-top: 15px"
              @click="CreateTrainerCourse()"
            >
              Создать Курс
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
      TrainerCourse: {
        name: "Курсы по SQL",
        author: "",
        IDtext: "sql",
        description: "Стандартное описание курса",
        number_of_tasks: 0,
        difficulty: "Легкая",
        course: {
          tasks: [],
        },
      },
      Trainers: [],
      //id: "",
      //name: "",
      //description: "",
      // tasks: {},
      outputs: 0,
      functions: "",
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.TrainerCourse.author = this.user.username;
    /* this.base_url + "/createtrainercourse/" */
    let jwt = this.getCookie("jwt");
    axios({
      method: "get",
      url: this.base_url + "/createtrainercourse/",
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.trainers.length; i++) {
        this.Trainers.push({
          IDtext: response.data.trainers[i].IDtext,
          name: response.data.trainers[i].name,
        });
      }
      //console.log(this.trainers);
      this.loaded = true;
    });
  },
  computed: {},
  methods: {
    CreateTrainerCourse() {
      console.log(this.TrainerCourse);
      
      axios({
        method: "post",
        url: this.base_url + "/createtrainercourse",
        data: {
          trainercourse: this.TrainerCourse,
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
          //this.$router.push("/user");
        });

      //this.$router.push(`/constructor/${this.id}`)
    },
    NumberOfTasks() {
      this.TrainerCourse.course.tasks = [];
      for (let i = 0; i < this.TrainerCourse.number_of_tasks; i++) {
        this.TrainerCourse.course.tasks.push({
          name: "",
          description: "",
          right_answer: {},
        });
      }
      console.log(this.TrainerCourse.course.tasks);
    },
    /*
    RightAnswerJSON(i) {
        json_rightanswer = JSON.parse(this.TrainerCourse.tasks.)
    }, */
  },
};
</script>

<style>
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
</style>
