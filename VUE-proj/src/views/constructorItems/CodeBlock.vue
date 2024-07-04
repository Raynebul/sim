<template>
  <Codemirror
    v-model="code_"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="NewCode($event)"
  />
  <!--@change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"-->
</template>

<style>
.cm-editor {
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  /*border: 1px solid gray; */
}
.cm-editor.cm-focused {
  border-left: 1px solid blue;
  border-right: 1px solid blue;
  /* border: 1px solid blue; */
}
</style>

<script setup>
import { shallowRef, ref } from "vue";
import { Codemirror } from "vue-codemirror";
//import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
</script>

<script>
export default {
  props: {
    code: {
      type: String,
    },
  },
  components: {
    Codemirror,
  },
  data(props) {
    //const code = ref(`console.log('Hello, world!')`)
    let code_ = props.code;
    const extensions = [python(), oneDark];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state;
      const ranges = state.selection.ranges;
      const selected = ranges.reduce(
        (r, range) => r + range.to - range.from,
        0
      );
      const cursor = ranges[0].anchor;
      const length = state.doc.length;
      const lines = state.doc.lines;
      // more state info ...
      // return ...
    };

    return {
      code_,
      extensions,
      handleReady,
      log: console.log,
    };
  },
  methods: {
    NewCode(change) {
      this.$emit("functionCode", change);
    },
  },
};
</script>
