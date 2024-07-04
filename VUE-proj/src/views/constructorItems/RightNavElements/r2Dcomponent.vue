<template>
  <!--<form @keyup="$emit(`inputRightButton`, input)">-->
  <div class="input-group input-group-sm mb-3" v-if="type_ === `tree`">
    <span class="input-group-text text-gray" id="basic-addon1">Имя</span>
    <input
      v-model="name"
      @focusout="NewName()"
      v-on:keyup.enter="NewName()"
      class="form-control form-control-sm text-gray rounded-0"
      type="text"
    />
  </div>
  <div class="text-danger form-label" v-if="error_ === true">
    * {{ error_name }} - такое имя контрола уже есть!
  </div>
  <hr class="hr w-100" style="margin: 5px 0 5px 0" />
  <div style="font-size: 0.8rem">
    <i class="bi bi-graph-up" style="font-size: 0.75em"></i> Графики:
  </div>
  <div v-for="j in attributes.data.length" :key="j">
    <div class="d-flex">
      <button
        class="btn btn-dark btn-sm rounded-0 w-100"
        type="button"
        style="font-size: 0.7rem"
        data-bs-toggle="offcanvas"
        :data-bs-target="`#offcanvasRight` + String(j - 1)"
        :aria-controls="`offcanvasRight` + String(j - 1)"
      >
        <div class="text-start">
          График №{{ j }}: "{{ attributes.data[j - 1].name }}"
        </div>
      </button>
      <button
        @click="RemoveTrace(j - 1)"
        class="btn btn-dark btn-sm"
        type="button"
        style="font-size: 0.7rem"
      >
        <i class="bi bi-trash3-fill"></i>
      </button>
    </div>

    <RightSideBar2D
      :input="attributes.data[j - 1]"
      :index="j - 1"
      @input2Dcomponent="Input2Dcomponent"
    ></RightSideBar2D>
  </div>
  <hr class="hr w-100" style="margin: 0 0 0 0" />
  <button
    class="btn btn-dark btn-sm rounded-0 w-100"
    type="button"
    style="font-size: 0.7rem"
    data-bs-toggle="offcanvas"
    :data-bs-target="`#offcanvasRight` + `Layout`"
    :aria-controls="`offcanvasRight` + `Layout`"
  >
    <div class="text-start">Макет графиков</div>
  </button>
  <Layout2D
    :layout="attributes.layout"
    @input2DLayout="Input2DLayout"
  ></Layout2D>
  <hr class="hr w-100" style="margin: 0 0 0 0" />
  <button
    class="btn btn-dark btn-sm rounded-0 w-100"
    style="font-size: 0.7rem"
    type="button"
    data-bs-toggle="offcanvas"
    :data-bs-target="`#offcanvasRight` + `Config`"
    :aria-controls="`offcanvasRight` + `Config`"
  >
    <div class="text-start"><i class="bi bi-gear"></i> Конфигурация</div>
  </button>
  <Config2D
    :config="attributes.config"
    @input2DConfig="Input2DConfig"
  ></Config2D>
  <hr class="hr w-100" style="margin: 0 0 5px 0" />
  <div class="btn-group btn-group-sm" role="group" aria-label="...">
    <button
      type="button"
      class="btn btn-outline-primary rounded-0"
      style="font-size: 0.7rem"
      @click="AddTrace()"
    >
      Добавить
    </button>
  </div>
  <!--
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>-->
</template>

<script setup>
import RightSideBar2D from "./PlotlySubComponents/RightSideBar2D.vue";
import Layout2D from "./PlotlySubComponents/Layout2D.vue";
import Config2D from "./PlotlySubComponents/Config2D.vue";
import DeleteElementComponent from "./DeleteElement.vue";
</script>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    type_: {
      type: String,
      default: "tree",
    },
    list_index: {
      type: Number,
    },
  },
  watch: {
    list_index: {
      handler(newVal, oldVal) {
        if (this.list_index !== 0  && this.list_index !== undefined) {
          this.error_name = this.name;
          this.error_ = true;
        }
        this.name = this.element.attributes.name;
      },
      deep: true,
    },
  },
  data(props, context) {
    //console.log(props.UI.controls.buttons);
    let attributes = props.element.attributes;
    let name = attributes.name;
    let error_ = false;
    let error_name = "";
    return {
      attributes,
      name,
      error_,
      error_name,
    };
  },
  methods: {
    DeleteElement() {
      this.$emit("delete_element", this.element);
    },
    Test(test) {
      console.log(test);
    },

    Input2Dcomponent(object, index) {
      this.attributes.data[index] = object;
      //this.$emit("Input2Dcomponent", object, index, i - 1);
    } /*
    Input2DLayout(layout, i) {
      this.$emit("Input2DLayout", layout, i - 1);
    },
    Input2DConfig(config, i) {
      this.$emit("Input2DConfig", config, i - 1);
    }, */,
    AddTrace() {
      let trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: "scatter",
        text: [],
      };
      this.attributes.data.push(trace1);
      //this.$emit("Input2D", this.input[i - 1].data, i - 1);
    },
    RemoveTrace(i) {
      this.attributes.data.splice(i, 1);
      //this.$emit("Input2D", this.input[i - 1].data, i - 1);
    },
    NewName() {
      this.$emit("newName", this.name);
      this.error_ = false;
    },
  },
  //emits: ["newValue"],
};
</script>

<style>
.border-gray {
  border-color: rgb(102, 102, 102) !important;
}

.new-icon-style {
  font-size: 0.75em;
  color: rgb(132, 132, 132) !important;
}

.new-icon-style:hover {
  font-size: 0.75em;
  color: rgb(255, 255, 255) !important;
}
</style>

<style scoped>
.accordion-body {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>
