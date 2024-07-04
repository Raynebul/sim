<template>
  <div
    class="tab-pane fade show active"
    id="style"
    role="tabpanel"
    aria-labelledby="style-tab"
  >
    <div
      data-bs-spy="scroll"
      class="scrollbar-rightsidebar min-vh-100"
      style="height: 36rem; overflow: auto; padding-right: 10px"
    >
      <div class="pt-3" v-if="attributes.name !== undefined">
        <div class="text-white h6" style="font-size: 0.9rem">
          Основные свойства
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="basic-addon1">Имя</span>
          <input
            v-model="name"
            @focusout="NewName()"
            v-on:keyup.enter="NewName()"
            class="form-control form-control-sm text-gray"
            type="text"
          />
        </div>
        <div class="text-danger form-label" v-if="error_ === true">
          * {{ error_name }} - такое имя контрола уже есть!
        </div>
      </div>
      <div class="" v-if="attributes.positions !== undefined">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Ширина</span
          >
          <input
            v-model="attributes.positions.w"
            type="number"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Высота</span
          >
          <input
            v-model="attributes.positions.h"
            type="number"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >X</span
          >
          <input
            type="number"
            v-model="attributes.positions.x"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Y</span
          >
          <input
            type="number"
            v-model="attributes.positions.y"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>

      <div v-if="attributes.style !== undefined">
        <div class="text-white h6" style="font-size: 0.9rem">
          Стиль элемента
        </div>
        <div v-if="attributes.class !== undefined">
          <!--v-if="attributes.class !== undefined"-->
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea1"
              class="form-label text-gray"
              >Классы:
            </label>
            <div class="container">
              <div class="row row-cols-auto">
                <div
                  class="col"
                  v-for="i in attributes.class.length"
                  :key="i"
                  style="padding: 0 0 0 0"
                >
                  <div
                    class="card text-white bg-dark"
                    style="border-color: #7d7d7d"
                  >
                    <div
                      class="card-body d-flex"
                      style="padding: 5px 10px 5px 10px"
                    >
                      <div class="pe-1">{{ attributes.class[i - 1] }}</div>
                      <button
                        type="button"
                        class="btn-close btn-sm btn-close-white"
                        aria-label="Close"
                        @click="DeleteClass(i - 1)"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              v-model="typing_class"
              class="form-control text-gray"
              placeholder="класс"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              @click="AddClass()"
              class="btn btn-sm btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Добавить
            </button>
          </div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Right</span
          >
          <input
            v-model="attributes.style.mr"
            type="text"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Left</span
          >
          <input
            v-model="attributes.style.ml"
            type="text"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Top</span
          >
          <input
            type="text"
            v-model="attributes.style.mt"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Bottom</span
          >
          <input
            type="text"
            v-model="attributes.style.mb"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Background-color</span
          >
          <input
            type="text"
            v-model="attributes.style.background_color"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Color</span
          >
          <input
            type="text"
            v-model="attributes.style.color"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div v-if="JSON.stringify(attributes) !== '{}'" class="text-white">
        <div class="text-white h6" style="font-size: 0.9rem">
          Редактирование прочих свойств
        </div>
        <RightComponent
          @delete_element="delete_element"
          @SaveStaticTable="SaveStaticTable"
          :type_="`element`"
          :key="chosen_id.id"
          :inputs="inputs"
          :element="chosen_id"
        ></RightComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import RightComponent from "./RightNavElements/RightComponent.vue";
</script>

<script>
export default {
  props: {
    chosen_id: {
      type: Object,
    },
    inputs: {
      type: Array,
    },
    list_index: {
      type: Number,
    },
  },

  data(props) {
    let attributes = {};
    let typing_class = "";
    let dropdown_string = [];
    let name = "";
    let error_ = false;
    let error_name = "";
    if (props.chosen_id.attributes !== undefined) {
      attributes = props.chosen_id.attributes;
      name = attributes.name;
      if (attributes["class"] !== undefined)
        dropdown_string = attributes["class"];
    }
    //name = props.chosen_id.attributes.name;
    return {
      attributes,
      typing_class,
      dropdown_string,
      name,
      error_,
      error_name,
    };
  },
  computed: {},
  watch: {
    chosen_id: {
      handler(newVal, oldVal) {
        if (newVal.attributes !== undefined) {
          this.attributes = newVal.attributes;
          this.name = this.attributes.name;
          /* */
          if (this.attributes["style"] == undefined && newVal.type !== "file") {
            this.attributes["style"] = {};
            this.attributes["style"] = {
              mb: 0,
              mr: 0,
              mt: 0,
              ml: 0,
              background_color: undefined,
              color: undefined,
            };
          }
          if (this.attributes["class"] == undefined && newVal.type !== "file") {
            this.attributes["class"] = [];
          }
        } else {
          this.attributes = {};
        }
      },
    },
    list_index: {
      handler(newVal, oldVal) {
        console.log("aaaaaaaaaaaaaaaaaaaaa 22222");
        if (this.list_index !== 0 && this.list_index !== undefined) {
          this.error_name = this.name;
          this.error_ = true;
        }
        this.name = this.chosen_id.attributes.name;
      },
      deep: true,
    },
  },
  methods: {
    AddClass() {
      //this.attributes["class"] += " " + this.typing_class;
      this.attributes["class"].push(this.typing_class);
      this.typing_class = "";
      //this.dropdown_string.push(this.typing_class);
      //this.typing_class = " ";
    },
    DeleteClass(i) {
      this.attributes["class"].splice(i, 1);
    },
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    SaveStaticTable(i, rows, columns) {
      this.$emit("SaveStaticTable", i, rows, columns);
    },
    NewName() {
      this.$emit("newName", this.name, this.chosen_id.id);
      this.error_ = false;
    },
  },
};
</script>

<style></style>
