<template>
  <div
    class="container text-dark m-0 d-flex flex-column"
    :style="`padding: 0;`"
  >
    <!-- width:  + UI.canvas.w + `px; height: ` + UI.canvas.h + `px;`-->
    <div v-if="settings.roundSystem === true">
      <nav aria-label="...">
        <ul class="pagination pagination-sm">
          <li
            class="page-item"
            aria-current="page"
            v-for="i in settings.rounds.length"
            :key="i"
          >
            <span
              v-bind:class="{
                'page-link': round !== i,
                'page-link active': round === i,
              }"
              >{{ i }}</span
            >
          </li>
        </ul>
      </nav>
    </div>
    <div v-if="status === `develop`">
      <div
        class=""
        @click.self="close_menu()"
        :style="
          `
          border: 1px dashed black;
          position: relative;
          width: ` +
          canvas.w +
          `px; height: ` +
          canvas.h +
          `px; ` +
          `background: linear-gradient(-90deg, rgba(0, 0, 0, .05) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .05) 1px, transparent 1px); background-size: 10px 10px, 10px 10px`
        "
      >
        <div
          v-if="addingFile === true"
          class="spinner-border position-absolute"
          role="status"
        >
          <span class="visually-hidden">Загрузка...</span>
        </div>
        <ConstructorComponent
          @delete_element="delete_element"
          @close_menu="close_menu"
          :chosen_id_="chosen_id_"
          @inputAttributes="inputAttributes"
          @runCode="RunCode"
          @choose_element="choose_element"
          @updateList="updateList"
          :selected_id="selected_id"
          v-for="i in UI.length"
          :status="status"
          :element="UI[i - 1]"
          :key="reloads[i - 1]"
        ></ConstructorComponent>
      </div>
      <!--:key="element.id"-->
      <!--
      <ConstructorComponent
        @delete_element="delete_element"
        @close_menu="close_menu"
        :chosen_id_="chosen_id_"
        @inputAttributes="inputAttributes"
        @runCode="RunCode"
        @choose_element="choose_element"
        @updateList="updateList"
        :selected_id="selected_id"
        v-for="element in UI"
        :status="status"
        :element="element"
        :key="element"
      ></ConstructorComponent> -->
    </div>

    <div v-else class="d-flex flex-column">
      <div
        :style="
          `
          position: relative;
          width: ` +
          canvas.w +
          `px; height: ` +
          canvas.h +
          `px;`
        "
      >
        <ConstructorComponent
          @inputAttributes="inputAttributes"
          @runCode="RunCode"
          @updateList="updateList"
          v-for="i in UI.length"
          :status="status"
          :element="UI[i - 1]"
          :key="reloads[i - 1]"
        ></ConstructorComponent>
      </div>
    </div>
    <div
      class="d-flex flex-row-reverse"
      v-if="
        settings.roundSystem === true &&
        roundFlag === 2 &&
        round !== settings.rounds.length
      "
    >
      <button
        class="btn btn-success btn-lg"
        @click="$emit('readInputsFromNextRound', round)"
      >
        Следующий раунд
      </button>
    </div>
    <div
      class="d-flex flex-row-reverse"
      v-if="
        settings.roundSystem === true &&
        roundFlag === 2 &&
        round === settings.rounds.length
      "
    >
      <button class="btn btn-success btn-lg">Конец!</button>
    </div>
    <!--<button class="btn btn-success button-constructor" @click="RenderStructure()"  style="width: 6rem">Тестовая</button>-->
  </div>
</template>

<script setup>
import ConstructorComponent from "./ConstructorComponent.vue";
import DraggableDiv from "./TestComponents/DraggableDiv.vue";
</script>

<style>
@import "vue-draggable-resizable/style.css";
.border-constructor {
  /*border-color: gray;
       border-style: dashed;
       border-width: 2px; */
  /*margin: 10px;*/
}

.button-constructor {
  /*margin: 10px;*/
}

.dragArea {
  min-height: 100px;
  outline: 1px dashed rgb(32, 32, 32);
}

.selected_component {
  /*min-height: 50px;*/
  outline: 2px solid rgb(0, 123, 255);
  background-color: rgb(110, 239, 239) !important;
  z-index: 100;
  opacity: 0.4;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.selected_component_color {
  background-color: rgb(110, 239, 239) !important;
}

.chosen_component_color {
  outline: 2px solid rgb(0, 123, 255);
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>

<script>
export default {
  props: {
    UI: {
      type: Array,
      required: true,
    },
    canvas: {
      type: Object,
      required: true,
    },
    reload: {
      type: Number,
      required: true,
    },
    round: {
      type: Object,
      required: true,
    },
    roundFlag: {
      type: Object,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
    },
    selected_id: {
      type: Number,
    },
    chosen_id_: {
      type: Number,
      default: 0,
    },
    reloads: {
      type: Array,
    },
    addingFile: {
      type: Boolean,
    },
  },
  display: "Nested",
  data(props) {
    let list = props.UIl;
    return {
      list,
      /*
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false, */
    };
  },
  methods: {
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    Change(event) {
      const { moved, added } = event;

      if (moved) console.log("moved", moved);
      if (added) console.log("added", added, added.element);
    },
    choose_element(element) {
      this.$emit("choose_element", element);
    },
    close_menu() {
      console.log("228 228");
      this.$emit(`close_menu`);
    },
    checkMove() {},
    updateList(newList) {
      this.$emit("updateList", newList);
    },
    updateListPlace() {
      this.$emit("updateListPlace");
    },
    inputAttributes(attributes, element_id) {
      this.$emit("inputAttributes", attributes, element_id);
    },
    RunCode(functionNumber, buttonNumber) {
      this.$emit(`runCode`, functionNumber, buttonNumber);
    },
  },
  /*
  components: {
    draggable: VueDraggableNext,
  },*/
};
</script>
