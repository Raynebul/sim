<template>
  <vue-draggable-resizable
    :x="attributes.positions.x"
    :y="attributes.positions.y"
    :w="attributes.positions.w"
    :h="attributes.positions.h"
    :ref="`draggableContainer` + element.id"
    :disableUserSelect="true"
    :parent="true"
    :resizable="false"
    :draggable="draggable"
    @click="SetCoords()"
    @mousedown="choose_element(element)"
    :class="MenuForChosen()"
    :style="StyleForDraggable()"
  >
    <!--choose_element(element);-->
    <!--@mousedown="choose_element(element)"-->
    <!---->
    <div
      :class="DevelopClass() + ` ` + `draggable-container` + ' '"
      :style="ref_style"
    >
      <!--@mousedown="dragMouseDown"-->
      <!--@choose_element="choose_element"-->
      <MenuForChosenComponent
        @close_menu="CloseMenu()"
        @delete_element="DeleteElement()"
        :type="element.type"
        v-if="menu_ === true"
      ></MenuForChosenComponent>
      <!--
      <Row
        v-if="element.type == `row`"
        :chosen_id_="chosen_id_"
        :chosen_id_class="''"
        :element="element"
        :status="status"
        :selected_id="selected_id"
        :style_="SelectStyle()"
        @delete_element="delete_element"
        @close_menu="close_menu"
        @runCode="RunCode"
        @inputAttributes="inputAttributes"
        @updateListPlace="updateListPlace"
      ></Row>-->
      <Textarea
        v-if="element.type == `textarea`"
        :chosen_id_class="''"
        :element="element"
        :status="status"
        :class_="SelectAttributesClass()"
        :style_="SelectStyle()"
        :selected_id="selected_id"
        @inputAttributes="inputAttributes"
      ></Textarea>
      <Textinput
        v-if="element.type == `textinput`"
        :chosen_id_class="''"
        :element="element"
        :class_="SelectAttributesClass()"
        :style_="SelectStyle()"
        :status="status"
        :selected_id="selected_id"
      ></Textinput>
      <!--
      <Column
        v-if="element.type == `column`"
        @choose_element="choose_element"
        :chosen_id_="chosen_id_"
        :chosen_id_class="''"
        :element="element"
        :status="status"
        :style_="SelectStyle()"
        :selected_id="selected_id"
        @delete_element="delete_element"
        @close_menu="close_menu"
        @runCode="RunCode"
        @inputAttributes="inputAttributes"
        @updateListPlace="updateListPlace"
      ></Column>-->
      <Button
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        @runCode="RunCode"
        :selected_id="selected_id"
        :status="status"
        :style_="SelectStyle()"
        v-if="element.type == `button`"
        :element="element"
      ></Button>
      <Checkbox
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `checkbox`"
        :element="element"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></Checkbox>
      <Radiobutton
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `radiobutton`"
        :element="element"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></Radiobutton>
      <StaticTable
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `staticTable`"
        :element="element"
        :status="status"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></StaticTable>
      <DynamicTable
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `dynamicTable`"
        :element="element"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></DynamicTable>
      <Card
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `card`"
        :status="status"
        :element="element"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></Card>
      <File
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `file` && status === `develop`"
        :status="status"
        :element="element"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></File>
      <!-- && status == `develop`-->
      <c2Dcomponent
        :chosen_id_class="''"
        :class_="SelectAttributesClass()"
        v-if="element.type == `2Dcomponent`"
        :element="element"
        :status="status"
        :style_="SelectStyle()"
        :selected_id="selected_id"
      ></c2Dcomponent>
    </div>
  </vue-draggable-resizable>
</template>

<script setup>
import Textarea from "./TestComponents/Textarea.vue";
import Textinput from "./TestComponents/Textinput.vue";
import Button from "./TestComponents/Button.vue";
import Radiobutton from "./TestComponents/Radiobutton.vue";
import Checkbox from "./TestComponents/Checkbox.vue";
import StaticTable from "./TestComponents/StaticTable.vue";
import DynamicTable from "./TestComponents/DynamicTable.vue";
import Card from "./TestComponents/Card.vue";
import File from "./TestComponents/File.vue";
import c2Dcomponent from "./TestComponents/2Dcomponent.vue";

import MenuForChosenComponent from "./TestComponents/MenuForChosenComponent.vue";
import { ref } from "vue";
</script>

<script>
export default {
  name: "ConstructorComponent",
  props: {
    element: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      //required: true,
    },
    selected_id: {
      type: Number,
      default: 0,
    },
    chosen_id_: {
      type: Number,
      required: true,
      default: 0,
    },
    reload: {
      type: Number,
    }
  },
  data(props) {
    let attributes = props.element.attributes;
    let ref_drag = {};
    let draggable = true;
    if (props.status === "preview") {
      draggable = false;
    }
    return {
      attributes: attributes,
      menu_: false,
      ref_drag,
      ref_style: "width: 100%; height: 100%;",
      draggable,
    };
  },
  mounted() {
    this.ref_drag = this.$refs["draggableContainer" + this.element.id];
  },
  watch: {
    element: {
      handler(newVal, oldVal) {
        this.SelectStyle();
        this.SelectAttributesClass();
      },
      deep: true,
    },
    element_watched: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal.type === `2Dcomponent`) {
            if (
              (newVal.attributes.positions.h !==
                oldVal.attributes.positions.h ||
                newVal.attributes.positions.w !==
                  oldVal.attributes.positions.w) &&
              (newVal.attributes.positions.h !==
                newVal.attributes.layout.height ||
                newVal.attributes.positions.w !==
                  newVal.attributes.layout.width)
            ) {
              this.attributes.layout["height"] = newVal.attributes.positions.h;
              this.attributes.layout["width"] = newVal.attributes.positions.w;
            }
            if (
              (newVal.attributes.layout.height !==
                oldVal.attributes.layout.height ||
                newVal.attributes.layout.width !==
                  oldVal.attributes.layout.width) &&
              (newVal.attributes.positions.h !==
                newVal.attributes.layout.height ||
                newVal.attributes.positions.w !==
                  newVal.attributes.layout.width)
            ) {
              //console.log("wjehwe");
              this.attributes.positions["h"] = newVal.attributes.layout.height;
              this.attributes.positions["w"] = newVal.attributes.layout.width;
            }
          }
        }
      },
      deep: true,
    },
    chosen_id_: {
      handler(newVal, oldVal) {
        //this.SelectStyle();
        this.MenuForChosen();
      },
      deep: true,
    },

    ref_drag: {
      handler(newVal, oldVal) {
        //console.log("wjewjew")
        /*
        console.log(
          this.element.id,
          this.element.type,
          newVal.left,
          newVal.top
        ); */
        /*
        if (
          newVal.left !== oldVal.left ||
          newVal.right !== oldVal.right ||
          newVal.top !== oldVal.top ||
          newVal.bottom !== oldVal.bottom
        ) {
          console.log(newVal.left, this.element.type)
          if (newVal.left >= 900) {
            console.log(newVal.left, newVal.right, newVal.top, newVal.bottom);
          }
          //console.log(this.attributes.positions)
        } */
      },
      deep: true,
    },
  },
  methods: {
    updateListPlace() {
      this.$emit("updateListPlace");
    },
    SetCoords() {
      //console.log("ПРОВЕРКА!!!!!");
      this.attributes.positions.x = this.ref_drag.left;
      this.attributes.positions.y = this.ref_drag.top;
    },
    Test() {
      console.log(true);
    },
    inputAttributes(attributes, element_id) {
      this.$emit("inputAttributes", attributes, element_id);
    },
    RunCode(functionNumber, buttonNumber) {
      this.$emit(`runCode`, functionNumber, buttonNumber);
    },
    choose_element(element) {
      this.$emit("choose_element", element);
    },
    SelectedComponent() {
      if (this.selected_id === this.element.id) {
        return "selected_component";
      } else {
        return " ";
      }
    },
    SelectedComponentColor() {
      if (this.selected_id === this.element.id) {
        return "selected_component_color";
      } else {
        return " ";
      }
    },
    SelectStyle() {
      if (this.element.attributes !== undefined) {
        if (this.element.attributes["style"] !== undefined) {
          let style_line = "";
          for (let object in this.element.attributes.style) {
            let style_object = "";
            switch (object) {
              case "mb": {
                style_object = "margin-bottom";
                break;
              }
              case "mt": {
                style_object = "margin-top";
                break;
              }
              case "mr": {
                style_object = "margin-right";
                break;
              }
              case "ml": {
                style_object = "margin-left";
                break;
              }
              case "background_color": {
                style_object = "background-color";
                break;
              }
              default: {
                style_object = object;
                break;
              }
            }
            if (
              style_object === "margin-bottom" ||
              style_object === "margin-top" ||
              style_object === "margin-right" ||
              style_object === "margin-left"
            ) {
              style_line +=
                style_object +
                ": " +
                this.element.attributes.style[object] +
                "px" +
                "; ";
            }
            if (
              style_object === "background-color" ||
              style_object === "color"
            ) {
              style_line +=
                style_object +
                ": " +
                this.element.attributes.style[object] +
                "; ";
            }
          }
          return style_line;
        } else {
          return " ";
        }
      }
    },
    SelectAttributesClass() {
      if (this.element.attributes !== undefined) {
        if (this.element.attributes["class"] !== undefined) {
          let class_string = "";
          for (let object in this.element.attributes["class"]) {
            class_string += this.element.attributes["class"][object] + " ";
          }
          return class_string;
        }
        return "";
      }
      return "";
    },
    StyleForDraggable() {
      if (this.status === "develop") {
        return "";
      } else {
        return "border: none;";
      }
    },
    DevelopClass() {
      if (this.element.type == "row") {
        if (this.status == `develop`) {
          return "row border-constructor develop-row-class";
        } else {
          return "row";
        }
      }
      if (this.element.type == "column") {
        if (this.status == `develop`) {
          return "col border-constructor develop-column-class";
        } else {
          return "col";
        }
      }
      return " ";
    },
    MenuForChosen() {
      if (this.chosen_id_ === this.element.id) {
        this.menu_ = true;
        return "chosen_component_color";
      } else {
        this.menu_ = false;
        return " ";
      }
    },
    CloseMenu() {
      console.log(111122);
      this.$emit(`close_menu`);
      this.menu_ = false;
    },
    close_menu() {
      this.$emit(`close_menu`);
    },
    DeleteElement() {
      this.$emit("delete_element", this.element);
    },
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    getOffsets() {
      return [
        this.$refs[`draggableContainer` + this.element.id].offsetTop,
        this.$refs[`draggableContainer` + this.element.id].offsetLeft,
      ];
    },
  },
  computed: {
    /*
    ref_drag_: function () {
      return JSON.parse(JSON.stringify(this.ref_drag));
    }, */
    element_watched: function () {
      return JSON.parse(JSON.stringify(this.element));
    },
  },
};
</script>

<style>
.draggable-container {
  position: absolute;
  z-index: 9;
}
.draggable-header {
  z-index: 10;
}
</style>
