<template>
  <div class="accordion-item">
    <h2
      class="accordion-header"
      :id="'panelsStayOpenGroupRadiobox-heading' + element.id"
    >
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#panelsStayOpenGroupRadiobox-collapse' + element.id"
        aria-expanded="false"
        :aria-controls="'panelsStayOpenGroupRadiobox-collapse' + element.id"
      >
        Группа из радиокнопок "{{ attributes.name }}"
      </button>
    </h2>
    <div
      :id="'panelsStayOpenGroupRadiobox-collapse' + element.id"
      class="accordion-collapse collapse bg-dark"
      :aria-labelledby="'panelsStayOpenGroupRadiobox-heading' + element.id"
    >
      <div class="accordion-body text-white">
        <div class="input-group input-group-sm mb-3">
          <span
            class="input-group-text text-gray"
            id="basic-addon1"
            v-if="type_ !== `tree`"
            >Имя</span
          >
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
        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          v-model="attributes.type"
        >
          <!--v-model="inputValue[i - 1].type"-->
          <option value="число" selected>Число</option>
          <option value="текст">Текст</option>
          <!--<option value="json">JSON</option>
              <option value="массив_чисел">Массив чисел</option>
              <option value="массив_строк">Массив строк</option>-->
        </select>
        <p></p>
        <button
          class="btn btn-sm btn-outline-info"
          @click="$emit(`addRadioboxToGroup`, i - 1)"
        >
          Добавить радиокнопку
        </button>
        <!--
        <DeleteElementComponent
          :element="element"
          @delete_element="DeleteElement"
        ></DeleteElementComponent>-->
        <!--
        <form @keyup="$emit(`inputRightGroupOfRadioboxes`, input)">
          <div
            v-for="j in UI.controls.groupsOfRadioboxes[i - 1].radioboxes.length"
            :key="j"
          >
            <span>{{ j }} Радиокнопка</span>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text text-gray" id="basic-addon1"
                >Имя</span
              >
              <input
                v-model="input[i - 1].radioboxes[j - 1].name"
                class="form-control form-control-sm text-gray"
                type="text"
              />
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text text-gray" id="basic-addon1"
                >Имя</span
              >
              <input
                v-model="input[i - 1].radioboxes[j - 1].value"
                class="form-control form-control-sm text-gray"
                type="text"
              />
            </div>
          </div>
        </form> -->
        <!--
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              v-model="input[i - 1].type"
            >
              <option value="число" selected>Число</option>
              <option value="текст">Текст</option>
            </select>-->
        <!--
              <input
                v-model="input[i - 1].name"
                class="form-control form-control-sm"
                type="text"
              />
    -->
      </div>
    </div>
  </div>
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
    NewName() {
      this.$emit("newName", this.name);
      this.error_ = false;
    },
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
