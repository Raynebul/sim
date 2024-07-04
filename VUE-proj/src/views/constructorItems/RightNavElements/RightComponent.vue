<template>
  <div v-if="type_ === `tree`" class="accordion-item">
    <h2
      class="accordion-header"
      :id="'panelsStayOpenButton-heading' + element.id"
    >
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#panelsStayOpenButton-collapse' + element.id"
        aria-expanded="false"
        :aria-controls="'panelsStayOpenButton-collapse' + element.id"
      >
        <div v-if="attributes !== undefined && element.type !== `file`">
          {{ element.type }}: "{{ attributes.name }}"
        </div>
        <div v-if="attributes !== undefined && element.type === `file`">
          {{ element.type }}: "{{ attributes.originalname }}"
        </div>
      </button>
    </h2>
    <div
      :id="'panelsStayOpenButton-collapse' + element.id"
      class="accordion-collapse collapse bg-dark"
      :aria-labelledby="'panelsStayOpenButton-heading' + element.id"
    >
      <div class="accordion-body text-white">
        <rTextarea
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          @newName="NewName"
          :list_index="list_index"
          v-if="element.type == `textarea`"
          :element="element"
        ></rTextarea>
        <rCard
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          @newName="NewName"
          v-if="element.type == `card`"
          :list_index="list_index"
          :element="element"
        ></rCard>
        <rRow
          @delete_element="delete_element"
          @select_component="select_component"
          v-if="element.type == `row`"
          @newName="NewName"
          :inputs="inputs"
          :element="element"
        ></rRow>
        <rColumn
          @delete_element="delete_element"
          @select_component="select_component"
          v-if="element.type == `column`"
          @newName="NewName"
          :inputs="inputs"
          :element="element"
        ></rColumn>
        <rButton
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `button`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rButton>
        <rCheckbox
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `checkbox`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rCheckbox>
        <rTextinput
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `textinput`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rTextinput>
        <rRadioboxes
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `radiobutton`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rRadioboxes>
        <rStaticTable
          @SaveStaticTable="SaveStaticTable"
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `staticTable`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
          :inputs="inputs"
        ></rStaticTable>
        <rDynamicTable
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `dynamicTable`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rDynamicTable>
        <r2Dcomponent
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `2Dcomponent`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></r2Dcomponent>
        <rFile
          @delete_element="delete_element"
          @mouseover="SelectComponent(element.id)"
          v-if="element.type == `file`"
          @newName="NewName"
          :list_index="list_index"
          :element="element"
        ></rFile>
      </div>
    </div>
  </div>
  <div v-else>
    <rTextarea
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `textarea`"
      :element="element"
      :type_="type_"
    ></rTextarea>
    <rCard
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `card`"
      :element="element"
      :type_="type_"
    ></rCard>
    <rRow
      @delete_element="delete_element"
      @select_component="select_component"
      v-if="element.type == `row`"
      :inputs="inputs"
      :element="element"
    ></rRow>
    <rColumn
      @delete_element="delete_element"
      @select_component="select_component"
      v-if="element.type == `column`"
      :inputs="inputs"
      :element="element"
    ></rColumn>
    <rButton
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `button`"
      :type_="type_"
      :element="element"
    ></rButton>
    <rCheckbox
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `checkbox`"
      :type_="type_"
      :element="element"
    ></rCheckbox>
    <rTextinput
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `textinput`"
      :element="element"
      :type_="type_"
    ></rTextinput>
    <rRadioboxes
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `radiobutton`"
      :element="element"
    ></rRadioboxes>
    <rStaticTable
      @SaveStaticTable="SaveStaticTable"
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `staticTable`"
      :element="element"
      :inputs="inputs"
      :type_="type_"
    ></rStaticTable>
    <rDynamicTable
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `dynamicTable`"
      :element="element"
      :type_="type_"
    ></rDynamicTable>
    <r2Dcomponent
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `2Dcomponent`"
      :element="element"
      :type_="type_"
    ></r2Dcomponent>
    <rFile
      @delete_element="delete_element"
      @mouseover="SelectComponent(element.id)"
      v-if="element.type == `file`"
      :element="element"
      :type_="type_"
    ></rFile>
  </div>
</template>

<script setup>
import rTextarea from "./rTextarea.vue";
import rRow from "./rRow.vue";
import rColumn from "./rColumn.vue";
import rCard from "./rCard.vue";
import rButton from "./rButton.vue";
import rTextinput from "./rTextinput.vue";
import rCheckbox from "./rCheckbox.vue";
import rRadioboxes from "./rGroupOfRadioboxes.vue";
import rStaticTable from "./rStaticTable.vue";
import rDynamicTable from "./rDynamicTable.vue";
import r2Dcomponent from "./r2Dcomponent.vue";
import rFile from "./rFile.vue";
</script>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
    type_: {
      type: String,
      default: "tree",
    },
    list_index: {
      type: Number,
    }
  },
  display: "Nested",
  data(props) {
    let attributes = props.element.attributes;
    return {
      attributes,
    };
  },
  methods: {
    SaveStaticTable(i, rows, columns) {
      this.$emit("SaveStaticTable", i, rows, columns);
    },
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    SelectComponent(id) {
      this.$emit("select_component", id);
    },
    select_component(id) {
      this.$emit("select_component", id);
    },
    NewName(name) {
      this.$emit("newName", name, this.element.id)
    }
  },
};
</script>
