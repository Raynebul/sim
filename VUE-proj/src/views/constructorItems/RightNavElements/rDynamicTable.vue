<template>
  <div class="input-group input-group-sm mb-3" v-if="type_ === `tree`">
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
  <p>Столбцы</p>
  <input
    class="form-control form-control-sm text-gray"
    type="number"
    placeholder="Столбцы"
    aria-label=".form-control-sm example"
    v-model="columns"
  />
  <p>Строки</p>
  <input
    class="form-control form-control-sm text-gray"
    type="number"
    placeholder="Строки"
    aria-label=".form-control-sm example"
    v-model="rows"
  />
  <button
    type="button"
    class="btn btn-outline-primary btn-sm rounded-0"
    style="font-size: 0.7rem"
    @click="$emit(`saveTable`, element.id, rows, columns)"
  >
    Сохранить изменения
  </button>
  <div>
    Добавить блок данных (это выходные данные)
    <input
      class="form-control form-control-sm text-gray"
      type="number"
      placeholder="x1"
      aria-label=".form-control-sm example"
      v-model="x"
    />
    <input
      class="form-control form-control-sm text-gray"
      type="number"
      placeholder="y1"
      aria-label=".form-control-sm example"
      v-model="y"
    />
    <select
      v-model="table_type"
      class="form-select form-select-sm text-gray"
      aria-label=".form-select-sm example"
    >
      <option value="json_ready">JSON (json)</option>
      <option value="массив_чисел">массив чисел</option>
      <option value="массив_текста">массив текста</option>
    </select>
    <button
      class="btn btn-sm btn-outline-success rounded-0"
      style="font-size: 0.7rem"
      @click="$emit(`createBlockInTable`, element.id, x, y, table_type)"
    >
      Добавить блок
    </button>
  </div>

  <div>Все блоки таблицы:</div>
  <div v-for="ii in attributes.blocks.length" :key="ii">
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text text-gray" id="basic-addon1">Имя</span>
      <input
        v-model="attributes.blocks[ii - 1].name"
        class="form-control form-control-sm text-gray"
        type="text"
      />
    </div>
  </div>
  <!--
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>-->
</template>

<script setup>
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
    let attributes = props.element.attributes;
    let name = attributes.name;
    let error_ = false;
    let error_name = "";
    /*
        for (let i = y_start - 1; i < y_end - 1; i++) {
          for (let j = x_start - 1; j < x_end - 1; j++) {
            inputArray[i][j] = false;
          }
        } */
    return {
      attributes,
      x: 0,
      y: 0,
      columns: 0,
      rows: 0,
      table_type: "json_ready",
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
    NewName() {
      this.$emit("newName", this.name);
      this.error_ = false;
    },
  },
  mounted() {
    //console.log(this.UI);
  },
  //emits: ["newValue"],
};
</script>

<style scoped>
.accordion-body {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>
