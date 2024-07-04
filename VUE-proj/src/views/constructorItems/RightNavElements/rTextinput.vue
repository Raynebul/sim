<template>
  <!--<form>-->
  <div class="input-group input-group-sm mb-3" v-if="type_ == `tree`">
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
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text text-gray" id="basic-addon1">textname</span>
    <input
      v-model="attributes.textname"
      class="form-control form-control-sm text-gray"
      type="text"
    />
  </div>
  <!--v-model="inputValue[i - 1].name"-->
  <label class="form-label">Тип данных</label>
  <select
    class="form-select form-select-sm text-gray"
    aria-label=".form-select-sm example"
    v-model="attributes.type"
  >
    <!--v-model="inputValue[i - 1].type"-->
    <option value="число" selected>Число</option>
    <option value="текст">Текст</option>
    <option value="массив_чисел">Массив чисел</option>
    <option value="массив_строк">Массив строк</option>
  </select>
  <!--
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>-->
  <!--</form>-->
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
  data(props, context) {
    let attributes = props.element.attributes;
    //console.log(inputValue);
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
  watch: {
    list_index: {
      handler(newVal, oldVal) {
        if (this.list_index !== 0 && this.list_index !== undefined) {
          this.error_name = this.name;
          this.error_ = true;
        }
        this.name = this.element.attributes.name;
      },
      deep: true,
    },
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
  mounted() {},
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
