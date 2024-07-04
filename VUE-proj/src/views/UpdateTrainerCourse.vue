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
              :disabled="edit === false"
            />
          </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Описание курса</label
            >
            <textarea
              class="form-control"
              placeholder="Введите описание курса"
              id="exampleFormControlTextarea1"
              v-model="TrainerCourse.description"
              rows="8"
              :disabled="edit === false"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Количество заданий в тренажёре</label
            >
            <input
              class="form-control w-25"
              type="number"
              placeholder="Введите количество заданий в курсе"
              aria-label="default input example"
              v-model="TrainerCourse.number_of_tasks"
              :disabled="edit === false"
              @keyup="NumberOfTasks"
              @click="NumberOfTasks"
            />
          </div>

          <div>Тренажёр</div>
          <!---->
          <select
            v-model="TrainerCourse.IDtext"
            class="form-select w-25"
            :disabled="edit === false"
            aria-label="Default select example"
          >
            <option
              v-for="i in Trainers.length"
              :key="i"
              :value="Trainers[i - 1].IDtext"
            >
              {{ Trainers[i - 1].name }}
            </option>
          </select>
          <div>Сложность:</div>
          <select
            class="form-select w-25"
            :disabled="edit === false"
            aria-label="Default select example"
          >
            <option value="Легкая">Лёгкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Сложная">Сложная</option>
          </select>
          <p></p>
          <button class="btn btn-primary btn-sm" @click="EditCourse()">
            Редактировать
          </button>
          <div class="text-end">
            <div class="btn-group">
              <button
                class="btn btn-primary float-right"
                type="button"
                style="margin-top: 15px"
                @click="UpdateTrainerCourse()"
              >
                <!--, $router.push(`/user`)-->
                Обновить Курс
              </button>
              <button
                class="btn btn-danger float-right"
                type="button"
                
                style="margin-top: 15px"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDeleteCourse"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      <div class="card text-dark bg-light w-100 p-3" style="width: 30rem">
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
        <!--
        <nav aria-label="...">
          <ul class="pagination">
            <li
              v-for="j in TrainerCourse.course.tasks.length"
              :key="j"
              class="page-item"
              id="nav-home-tab"
            >
              <a
                class="page-link"
                data-bs-toggle="tab"
                :data-bs-target="`#nav-` + String(j)"
                type="button"
                role="tab"
                :aria-controls="`#nav-` + String(j)"
                aria-selected="true"
              ></a
              >{{ j }}
            </li>
          </ul>
        </nav>
-->
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
                  :placeholder="`Введите описание задания №` + String(i)"
                  id="exampleFormControlTextarea1"
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
                  :placeholder="
                    `Введите правильный ответ задания №` + String(i)
                  "
                  id="exampleFormControlTextarea1"
                  v-model="TrainerCourse.course.tasks[i - 1].right_answer"
                  rows="4"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Параметры инпутов в формате JSON</label
                >
                <textarea
                  class="form-control w-50"
                  :placeholder="`Параметры инпутов задания №` + String(i)"
                  id="exampleFormControlTextarea1"
                  v-model="TrainerCourse.course.tasks[i - 1].inputs"
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
              @click="UpdateTrainerCourse()"
            >
              <!--, $router.push(`/user`)-->
              Обновить Курс
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalDeleteCourse"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Вы точно хотите удалить данный курс?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="btn-group-lg btn-group"
            role="group"
            aria-label="Basic example"
          >
            <button
              style="width: 8rem"
              type="button"
              @click="DeleteCourse()"
              class="btn btn-outline-primary"
            >
              Да
            </button>
            <button
              data-bs-dismiss="modal"
              aria-label="Close"
              style="width: 8rem"
              type="button"
              class="btn btn-primary"
            >
              Нет
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
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
        course: {
          tasks: [],
        },
      },
      Trainers: [],
      outputs: 0,
      edit: false,
      functions: "",
    };
  },
  mounted() {
    //this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(this.base_url + "/createtrainercourse/" + this.$route.params.id)
      .then((response) => {
        this.TrainerCourse = response.data.trainercourse;
        this.TrainerCourse.course = response.data.course;
        /*
        for (let i = 0; i < this.TrainerCourse.course.tasks.length; i++) {
          this.TrainerCourse.course.tasks[i]["inputs"] = "[]";
        } */
        console.log(response.data.trainercourse);
        //console.log(JSON.parse(this.TrainerCourse.tasks))
        console.log("Данный тренажёр: ", this.TrainerCourse);
        //console.log(response);
        //console.log(this.trainers);
        this.loaded = true;
      });

    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.TrainerCourse.author = this.user.username;
    axios.get(this.base_url + "/createtrainercourse").then((response) => {
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
    UpdateTrainerCourse() {
      console.log(this.TrainerCourse);

      axios({
        method: "put",
        url: this.base_url + "/createtrainercourse/" + this.$route.params.id,
        data: {
          trainercourse: this.TrainerCourse,
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
      console.log(this.TrainerCourse.number_of_tasks);
      for (let i = 0; i < this.TrainerCourse.number_of_tasks; i++) {
        this.TrainerCourse.course.tasks.push({
          name: "",
          description: "",
          right_answer: {},
        });
      }
      console.log(this.TrainerCourse.course.tasks);
    },
    EditCourse() {
      this.edit = !this.edit;
    },
    DeleteCourse()
    {
      axios({
        method: "delete",
        url: this.base_url + "/createtrainercourse/" + this.$route.params.id,
        data: {
          trainercourse: this.TrainerCourse,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {})
        .then((response) => {
          this.$router.push("/user");
        });

      //this.$router.push(`/constructor/${this.id}`)
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
