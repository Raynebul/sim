<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    :id="`MetadataEdit`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="editMetadata === false" class="modal-content rounded-0">
        <div
          class="modal-header border-bottom"
          :style="BorderStyleType(Metadata.type)"
        >
          <div>
            <h5 class="modal-title" id="exampleModalLabel">
              {{ Metadata.name }}
            </h5>
            <div class="text-muted text-start" style="font-size: 0.8rem">
              Тип: {{ Metadata.type }}
            </div>
            <div class="text-muted text-start" style="font-size: 0.8rem">
              Автор: {{ Metadata.author }}
            </div>
          </div>

          <button
            type="button"
            class="btn-close mb-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="text-center"
          v-if="Metadata.cover != undefined && Metadata.cover != ``"
        >
          <img
            style="max-width: 12rem; max-height: 12rem"
            :src="Metadata.cover"
            class="img-thumbnail"
            alt="..."
          />
        </div>
        <div class="modal-body">
          <h6 class="text-muted">Описание</h6>
          <div>{{ Metadata.description }}</div>
        </div>
        <div class="modal-body ms-auto">
          <button
            @click="EditMetadata"
            style=""
            class="btn btn-sm btn-primary rounded-0"
          >
            Редактировать метаданные
          </button>
        </div>
        <div
          class="modal-footer border-top"
          :style="BorderStyleType(Metadata.type)"
        >
          <div
            class="btn btn-danger btn-sm rounded-0"
            style="margin-right: auto"
          >
            Удалить
          </div>
          <div
            v-if="Metadata.type === `Тренажёр`"
            class="btn-group btn-group-sm rounded-0"
            role="group"
            aria-label="Basic example"
          >
            <!--
                        <button @click="EditMetadata" style="max-width: 7rem"
                            class="btn btn-primary rounded-0">Редактировать
                            метаданные</button>-->
            <a
              style=""
              :href="sim_frontend_url + `/edit/` + Metadata.id"
              type="button"
              class="btn btn-secondary rounded-0"
              v-if="user.username === Metadata.author"
            >
              Редактировать материал
            </a>
            <a
              style=""
              :href="sim_frontend_url + `/run/` + Metadata.id"
              type="button"
              class="btn btn-secondary rounded-0 py-auto"
            >
              <div class="align-middle my-auto">Запустить</div>
            </a>
          </div>
        </div>
      </div>
      <div v-else class="modal-content rounded-0">
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Имя тренажёра</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="metadata_copy.name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Автор материала</label
            >
            <input
              v-model="metadata_copy.author"
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Тип материала</label
            >
            <input
              v-model="metadata_copy.type"
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              disabled
            />
          </div>
          <div
            class="text-center"
            v-if="metadata_copy.cover != undefined && metadata_copy.cover != ``"
          >
            <img
              style="max-width: 12rem; max-height: 12rem"
              :src="metadata_copy.cover"
              class="img-thumbnail"
              alt="..."
            />
          </div>
          <div class="mb-3">
            <label for="formFileSm" class="form-label">Обложка материала</label>
            <input
              @change="onFileChange"
              type="file"
              name="img"
              accept="image/x-png,image/gif,image/jpeg"
              class="form-control form-control-sm"
              id="formFileSm"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Описание материала</label
            >
            <textarea
              class="form-control"
              v-model="metadata_copy.description"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Статус материала</label
            >
            <select
              v-model="metadata_copy.status"
              class="form-select"
              aria-label=".form-select example"
            >
              <!--v-model="inputValue[i - 1].type"-->
              <option value="В разработке">В разработке</option>
              <option value="Создан">Создан</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Дата создания</label
            >
            <input
              v-model="metadata_copy.created"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div
          class="modal-footer border-top"
          :style="BorderStyleType(metadata_copy.type)"
        >
          <div
            class="btn btn-danger btn-sm rounded-0"
            style="margin-right: auto"
          >
            Удалить
          </div>
          <div
            class="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
          >
            <button
              @click="EditMetadata"
              style=""
              class="btn btn-primary rounded-0"
            >
              Отменить изменения
            </button>
            <button
              @click="SaveMetadata"
              style=""
              type="button"
              class="btn btn-secondary rounded-0"
            >
              Сохранить изменения
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
  props: {
    Metadata: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data(props) {
    let metadata_copy = {};
    for (let key in props.Metadata) {
      metadata_copy[key] = props.Metadata[key];
    }
    metadata_copy["type"] = "Тренажёр";
    //console.log("o", metadata_copy)
    return {
      what: 1,
      editMetadata: false,
      metadata_copy: metadata_copy,
    };
  },
  mounted() {
    for (let key in this.Metadata) {
      this.metadata_copy[key] = this.Metadata[key];
    }
    this.metadata_copy["cover"] = this.Metadata["cover"];
    this.metadata_copy["type"] = "Тренажёр";
    console.log("o", this.metadata_copy, this.Metadata);
  },
  methods: {
    BorderStyleType(type) {
      switch (type) {
        case "Тренажёр": {
          return "border-color: #0dffe3 !important;";
        }
        case "Задача": {
          return "border-color : #0d9aff!important; ";
        }
        case "Вопрос": {
          return "border-color: #b90ff7 !important;  ";
        }
        default: {
          return "border-color: #878787 !important;";
        }
      }
    },
    EditMetadata() {
      this.editMetadata = !this.editMetadata;
      for (let key in this.metadata_copy) {
        //if (this.Metadata[key] === undefined) {
        // this.metadata_copy[key] = "";
        //}
        this.metadata_copy[key] = this.Metadata[key];
      }
    },
    SaveMetadata() {
      let name = this.metadata_copy["name"];
      let metadata_put = JSON.stringify(this.metadata_copy);
      console.log(name, metadata_put);
      axios({
        method: "put",
        url: this.base_backend_url + "/user/material",
        data: {
          id: this.id,
          metadata: metadata_put,
          name: name,
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
          let new_metadata_ = JSON.parse(response.data.metadata);
          let new_name = new_metadata_["name"];
          this.$emit(`saveMetadata`, new_metadata_, new_name);
          this.editMetadata = !this.editMetadata;
        });
    },
    onFileSelected(event) {
      console.log(event);
      this.metadata_copy["cover"] = event.target.files[0];
      const fd = new FormData();
      fd.append(
        "image",
        this.metadata_copy["cover"],
        this.metadata_copy["cover"].name
      );
    },
    onFileChange(event) {
      var file = event.target.files[0];
      this.createImage(file);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (event) => {
        this.metadata_copy["cover"] = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (item) {
      item.image = false;
    },
  },
};
</script>
