<template>
  <div class="card" style="width: 40rem; margin-left: auto; margin-right: auto">
    <div class="card-body">
      <h5 class="card-title">Описание</h5>
      <div class="card-text">
        <form @keyup="$emit(`inputTrainerInfo`, name, description)">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Имя тренажёра</label
            >
            <input
              v-if="redact == false"
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="name"
              disabled
            />
            <input
              v-else
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Автор тренажёра</label
            >
            <input
             v-model="author"
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Описание тренажёра</label
            >
            <textarea
              class="form-control"
              v-model="description"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Статус проекта</label
            >
            <select
              v-model="status"
              class="form-select"
              aria-label=".form-select example"
            >
              <!--v-model="inputValue[i - 1].type"-->
              <option value="В разработке" selected>В разработке</option>
              <option value="Создан">Создан</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Дата создания</label
            >
            <input
              v-model="now"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
        </form>
        <button
          v-if="redact == false"
          @click="ChangeRedactOf"
          class="btn btn-secondary"
        >
          Редактировать изменения
        </button>
        <button v-else @click="ChangeRedactOf" class="btn btn-secondary">
          Прекратить редактировать
        </button>
        <button
          class="btn btn-success"
          @click="$emit('saveChanges', name, description, now, status)"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Metadata: {
      type: Object,
      required: true,
    }
  },
  data(props, context) {
    let name = props.Metadata.name;
    let author = props.Metadata.author;
    let description = props.Metadata.description;
    let status = props.Metadata.status;
    var now = props.Metadata.created;
    //var today = new Date();
    //var now = today.toLocaleDateString("ru");
    //now = props.Metadata.created;
    console.log(now);
    return {
      name,
      description,
      author,
      redact: false,
      now,
      status,
    };
  },
  methods: {
    ChangeRedactOf() {
      if (this.redact === false) {
        this.redact = true;
      } else {
        this.redact = false;
      }
    },
  },
  //emits: ["newValue"],
};
</script>
