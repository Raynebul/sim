<template>
  <!--<form @keyup="$emit(`inputTableInputs`, tables)">-->
  <table
    :style="style_"
    @click="ChooseElement"
    :class="
      '' +
      SelectClass() +
      SelectedComponent(element.id) +
      ' ' +
      chosen_id_class + ' ' + class_
    "
  >
    <tbody>
      <tr v-for="j in attributes.rows" :key="j">
        <td
          v-for="d in attributes.columns"
          :key="d"
          :class="SelectedComponentColor(element.id)"
        >
          <!---->
          <div v-for="k in attributes.blocks.length" :key="k">
            <div
              v-if="
                attributes.blocks[j - 1].value != [] &&
                attributes.blocks[j - 1].x == d &&
                attributes.blocks[j - 1].y == j
              "
            >
              <table class="table table-bordered" style="margin-bottom: 0">
                <tbody v-if="attributes.blocks[j - 1].type != `json_ready`">
                  <tr
                    v-for="block_i in attributes.blocks[j - 1].value.length"
                    :key="block_i"
                  >
                    <td
                      v-for="block_j in attributes.blocks[j - 1].value[block_i]
                        .length"
                      :key="block_j"
                    >
                      1
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th
                      v-for="block_j in attributes.blocks[j - 1].field.length"
                      :key="block_j"
                    >
                      {{ attributes.blocks[j - 1].field[block_j - 1] }}
                    </th>
                  </tr>
                  <tr
                    v-for="block_i in attributes.blocks[j - 1].value.length"
                    :key="block_i"
                  >
                    <td
                      v-for="block_j in attributes.blocks[j - 1].field.length"
                      :key="block_j"
                    >
                      {{
                        attributes.blocks[j - 1].value[block_i - 1][
                          attributes.blocks[j - 1].field[block_j - 1]
                        ]
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- {{ attributes.inputs[tables[i - 1].columns * (j - 1) + (d - 1)] }}-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--</form>-->
</template>

<script>
import { all } from "axios";
import { ref } from "vue";
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    style_: {
      type: String,
      required: true,
      default: "",
    },
    class_: {
      type: String,
      required: true,
      default: "",
    },
    selected_id: {
      type: Number,
    },
    chosen_id_: {
      type: Number,
    },
    status: {
      type: String,
    },
    chosen_id_class: {
      type: String,
    },
  },
  watch: {
    selected_id: {
      handler(newVal, oldVal) {
        this.SelectedComponent(newVal);
        this.SelectedComponentColor(newVal);
      },
      deep: true,
    },
  },
  data(props, context) {
    let attributes = props.element.attributes;
    let all_blocks_id = [];
    return {
      attributes,
    };
  },
  methods: {
    ChooseElement() {
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
    Test(test) {
      console.log(test);
    },
    SelectedComponent(id) {
      if (this.selected_id === id) {
        return "selected_component";
      } else {
        return " ";
      }
    },
    SelectedComponentColor(id) {
      if (this.selected_id === id) {
        return "selected_component_color";
      } else {
        return " ";
      }
    },
    SelectClass() {
      if (this.status === "preview") {
        return "my-2 me-1 ";
      } else {
        return " ";
      }
    },
  },
  //emits: ["newValue"],
};
</script>
