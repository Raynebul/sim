<template>
  <!--<form @keyup="$emit(`inputTableInputs`, tables)">-->
  <table
    @click="ChooseElement"
    :style="style_"
    :class="
      '' +
      SelectClass() +
      SelectedComponent(element.id) +
      ' ' +
      chosen_id_class +
      ' ' +
      class_
    "
  >
    <tbody>
      <tr class="" v-for="i in attributes.rows" :key="i">
        <td
          :class="' ' + SelectedComponent(element.id)"
          v-for="j in attributes.columns"
          :key="j"
          v-bind:style="{
            backgroundColor:
              all_blocks_color[attributes.columns * (i - 1) + (j - 1)],
          }"
        >
          <div v-if="attributes.edit == false">
            <div
              v-if="
                all_blocks_id[attributes.columns * (i - 1) + (j - 1)] == true
              "
            >
              <input
                class="form-control"
                type="text"
                v-model="
                  attributes.inputs[attributes.columns * (i - 1) + (j - 1)]
                "
              />
            </div>
            <div v-else>
              {{ attributes.inputs[attributes.columns * (i - 1) + (j - 1)] }}
            </div>
          </div>
          <div v-else>
            <input
              class="form-control"
              type="text"
              v-model="
                attributes.inputs[attributes.columns * (i - 1) + (j - 1)]
              "
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!--</form>-->
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    selected_id: {
      type: Number,
    },
    status: {
      type: String,
    },
    class_: {
      type: String,
      required: true,
      default: "",
    },
    style_: {
      type: String,
      required: true,
      default: "",
    },
    chosen_id_: {
      type: Number,
    },
    chosen_id_class: {
      type: String,
    },
  },
  data(props) {
    let attributes = props.element.attributes;
    let all_blocks_id = [];
    let all_blocks_color = [];
    //all_blocks_id.push([]);
    //all_blocks_color.push([]);
    for (let j = 0; j < attributes.inputs.length; j++) {
      let flag = false; // проверяет, нету ли ячейки таблицы в блоке
      //let color = "#ffffff";
      let color = " ";
      for (let jj = 0; jj < attributes.blocks.length; jj++) {
        let x_start = attributes.blocks[jj].x_start;
        let x_end = attributes.blocks[jj].x_end;
        let y_start = attributes.blocks[jj].y_start;
        let y_end = attributes.blocks[jj].y_end;
        let columns = attributes.columns;
        let rows = attributes.rows;
        if (attributes.blocks[jj].type != "json_ready") {
          if (
            (y_start - 1) * columns + (x_start - 1) <= j &&
            j <= (y_end - 1) * columns + (x_end - 1) &&
            attributes.blocks[jj].willBeEdited === true &&
            j % rows <= x_end - 1
          ) {
            flag = true;
          }
        } else {
          if (
            y_start * columns + (x_start - 1) <= j &&
            j <= (y_end - 1) * columns + (x_end - 1) &&
            attributes.blocks[jj].willBeEdited === true &&
            j % rows <= x_end - 1
          ) {
            flag = true;
          }
        }
        if (attributes.blocks[jj].color_block != undefined) {
          if (
            (y_start - 1) * columns +
              attributes.blocks[jj].color_block.number ==
            j
          ) {
            color = attributes.blocks[jj].color_block.color;
          }
        }
      }
      all_blocks_id.push(flag);
      all_blocks_color.push(color);
    }
    return {
      attributes,
      all_blocks_id,
      all_blocks_color,
    };
  },
  watch: {
    selected_id: {
      handler(newVal, oldVal) {
        this.SelectedComponent(newVal);
        this.SelectedComponentColor(newVal);
      },
      deep: true,
    },
    attributes: {
      handler(newVal, oldVal) {
        for (let j = 0; j < newVal.inputs.length; j++) {
          let flag = false; // проверяет, нету ли ячейки таблицы в блоке
          //let color = "#ffffff";
          let color = " ";
          for (let jj = 0; jj < newVal.blocks.length; jj++) {
            let x_start = newVal.blocks[jj].x_start;
            let x_end = newVal.blocks[jj].x_end;
            let y_start = newVal.blocks[jj].y_start;
            let y_end = newVal.blocks[jj].y_end;
            let columns = newVal.columns;
            let rows = newVal.rows;

            if (newVal.blocks[jj].type !== "json_ready") {
              //console.log("да что за");
              if (
                (y_start - 1) * columns + (x_start - 1) <= j &&
                j <= (y_end - 1) * columns + (x_end - 1) &&
                j % rows <= x_end - 1
              ) {
                /*
                console.log(
                  "block",
                  -(y_start - 1) + Math.floor(j / columns),
                  x_start - 1 + (j % columns)
                ); */
                /*
                newVal.blocks[jj].value[
                  -(y_start - 1) + Math.floor(j / columns)
                ][x_start - 1 + (j % columns)] = newVal.inputs[j]; */
                if (newVal.blocks[jj].type === "массив_чисел") {
                  newVal.blocks[jj].value[
                    -(y_start - 1) + Math.floor(j / columns)
                  ][x_start - 1 + (j % columns)] = Number(newVal.inputs[j]);
                }
                if (newVal.blocks[jj].type === "массив_текста") {
                  newVal.blocks[jj].value[
                    -(y_start - 1) + Math.floor(j / columns)
                  ][x_start - 1 + (j % columns)] = String(newVal.inputs[j]);
                }
              }
            } else {
              //console.log("да что за");
              if (
                y_start * columns + (x_start - 1) <= j &&
                j <= (y_end - 1) * columns + (x_end - 1) &&
                j % rows <= x_end - 1
              ) {
                /*
                console.log(
                  "block228",
                  -(y_start - 1) + Math.floor(j / columns) - 1,
                  newVal.blocks[jj].field[x_start - 1 + (j % columns)]
                ); */
                newVal.blocks[jj].value[
                  -(y_start - 1) + Math.floor(j / columns) - 1
                ][newVal.blocks[jj].field[x_start - 1 + (j % columns)]] =
                  newVal.inputs[j];
              }
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    ChooseElement() {
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
    Test() {
      console.log("test");
    },
    PutInputInStaticTableBlock(j1, j2) {
      for (let i = 0; i < this.attributes.blocks.length; i++) {
        //console.log("Координаты -", "x:", j2, "y:", j1);
        if (
          this.attributes.blocks[i].x_start <= j2 &&
          j2 <= this.attributes.blocks[i].x_end &&
          this.attributes.blocks[i].y_start <= j1 &&
          j1 <= this.attributes.blocks[i].y_end
        ) {
          let yStart = this.attributes.blocks[i].y_start;
          let yEnd = this.attributes.blocks[i].y_end;
          let xStart = this.attributes.blocks[i].x_start;
          let xEnd = this.attributes.blocks[i].x_end;
          let field = this.attributes.blocks[i].field;
          let tableInput =
            this.attributes.inputs[
              (j1 - 1) * this.attributes.columns + (j2 - 1)
            ];
          if (this.attributes.blocks[i].type === "json_ready") {
            //console.log("Текущее -", tableInput);
            //console.log(j1, yStart);
            /*
            console.log(
              this.element.attributes.blocks[i].value[j1 - 1 - yStart][
                field[j2 - xStart]
              ]
            ); */
            this.attributes.blocks[i].value[j1 - 1 - yStart][
              field[j2 - xStart]
            ] = tableInput;
            /*
            console.log(
              "Другое - ",
              this.attributes.blocks[i].value[j1 - 1 - yStart][
                field[j2 - xStart]
              ]
            );
            console.log("Все блоки -", this.attributes.blocks); */
          }
          if (this.element.attributes.blocks[i].type == "массив_текста") {
            //console.log(tableInput);
            this.attributes.blocks[i].value[j1 - yStart][j2 - xStart] =
              tableInput;
            //console.log("новый блок -", this.attributes.blocks[i]);
          }
          if (this.attributes.blocks[i].type == "массив_чисел") {
            this.attributes.blocks[i].value[j1 - yStart][j2 - xStart] =
              parseInt(tableInput);
          }
        }
      }
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
};
</script>

<!--

<template>
 
    <table
    class="table table-primary table-bordered"
    v-for="i in tables.length"
    :key="i"
  >
    <tbody>
      <tr class="table-primary" v-for="j in tables[i - 1].rows" :key="j">
        <td
          class="table-primary"
          v-for="d in tables[i - 1].columns"
          :key="d"
          v-bind:style="{
            backgroundColor:
              all_blocks_color[i - 1][
                tables[i - 1].columns * (j - 1) + (d - 1)
              ],
          }"
        >
          
          <div v-if="tables[i - 1].edit == false">
            <div
              v-if="
                all_blocks_id[i - 1][
                  tables[i - 1].columns * (j - 1) + (d - 1)
                ] == true
              "
            >
              <input
                class="form-control"
                type="text"
                @keyup="$emit(`inputTableInputs`, tables, i - 1, j - 1, d - 1)"
                v-model="
                  tables[i - 1].inputs[
                    tables[i - 1].columns * (j - 1) + (d - 1)
                  ]
                "
              />
            </div>
            <div v-else>
              {{
                tables[i - 1].inputs[tables[i - 1].columns * (j - 1) + (d - 1)]
              }}
            </div>
          </div>
          <input
            v-else
            class="form-control"
            type="text"
            @keyup="$emit(`inputTableInputs`, tables, i - 1, j - 1, d - 1)"
            v-model="
              tables[i - 1].inputs[tables[i - 1].columns * (j - 1) + (d - 1)]
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import { all } from "axios";
import { ref } from "vue";
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
  },
  data(props, context) {
    let tables = props.UI.controls.staticTables;
    let all_blocks_id = [];
    let all_blocks_color = [];
    for (let i = 0; i < tables.length; i++) {
      all_blocks_id.push([]);
      all_blocks_color.push([]);
      for (
        let j = 0;
        j < props.UI.controls.staticTables[i].inputs.length;
        j++
      ) {
        let flag = false; // проверяет, нету ли ячейки таблицы в блоке
        let color = "#ffffff";
        for (
          let jj = 0;
          jj < props.UI.controls.staticTables[i].blocks.length;
          jj++
        ) {
          let x_start = props.UI.controls.staticTables[i].blocks[jj].x_start;
          let x_end = props.UI.controls.staticTables[i].blocks[jj].x_end;
          let y_start = props.UI.controls.staticTables[i].blocks[jj].y_start;
          let y_end = props.UI.controls.staticTables[i].blocks[jj].y_end;
          let columns = props.UI.controls.staticTables[i].columns;
          if (
            props.UI.controls.staticTables[i].blocks[jj].type != "json_ready"
          ) {
            if (
              (y_start - 1) * columns + (x_start - 1) <= j &&
              j <= (y_end - 1) * columns + (x_end - 1) &&
              tables[i].blocks[jj].willBeEdited === true
            ) {
              flag = true;
            }
          } else {
            if (
              y_start * columns + (x_start - 1) <= j &&
              j <= (y_end - 1) * columns + (x_end - 1) &&
              tables[i].blocks[jj].willBeEdited === true
            ) {
              flag = true;
            }
          }
          if (
            props.UI.controls.staticTables[i].blocks[jj].color_block !=
            undefined
          ) {

            if (
              (y_start - 1) * columns +
                props.UI.controls.staticTables[i].blocks[jj].color_block
                  .number ==
              j
            ) {
              color =
                props.UI.controls.staticTables[i].blocks[jj].color_block.color;
            }
          }
        }
        all_blocks_id[i].push(flag);
        all_blocks_color[i].push(color);
      }
    }
    return {
      tables,
      all_blocks_id,
      all_blocks_color,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
  },
  //emits: ["newValue"],
};
</script>


-->
