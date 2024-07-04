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
  <div style="font-size: 0.7rem">Столбцы</div>
  <input
    class="form-control form-control-sm text-gray"
    type="number"
    placeholder="Столбцы"
    aria-label=".form-control-sm example"
    v-model="columns"
  />
  <div style="font-size: 0.7rem">Строки</div>
  <input
    class="form-control form-control-sm text-gray"
    type="number"
    placeholder="Строки"
    aria-label=".form-control-sm example"
    v-model="rows"
  />
  <button
    style="font-size: 0.7rem"
    type="button"
    class="btn btn-outline-primary btn-sm rounded-0"
    @click="SaveStaticTable()"
  >
    Сохранить изменения
  </button>
  <div class="form-check">
    <input
      class="form-check-input text-gray"
      type="checkbox"
      value=""
      id="flexCheckDefault"
      v-model="attributes.edit"
    />
    <label class="form-check-label" for="flexCheckDefault"
      >Редактировать таблицу
    </label>
  </div>
  Добавить блок данных:
  <div class="border border-success" style="margin-bottom: 5px; padding: 5px">
    <div class="input-group input-group-sm">
      <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
        >x1</span
      >
      <input
        class="form-control form-control-sm text-gray"
        type="number"
        placeholder="x1"
        aria-label=".form-control-sm example"
        v-model="x_start"
      />
    </div>
    <div class="input-group input-group-sm">
      <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
        >y1</span
      >
      <input
        class="form-control form-control-sm text-gray"
        type="number"
        placeholder="y1"
        aria-label=".form-control-sm example"
        v-model="y_start"
      />
    </div>
    <div class="input-group input-group-sm">
      <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
        >x2</span
      >
      <input
        class="form-control form-control-sm text-gray"
        type="number"
        placeholder="x2"
        aria-label=".form-control-sm example"
        v-model="x_end"
      />
    </div>
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
        >y2</span
      >
      <input
        class="form-control form-control-sm text-gray"
        type="number"
        placeholder="y2"
        aria-label=".form-control-sm example"
        v-model="y_end"
      />
    </div>
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
      @click="CreateBlockInStaticTable()"
    >
      Добавить блок
    </button>
  </div>

  <div>Все блоки таблицы:</div>
  <div
    v-for="j in attributes.blocks.length"
    :key="j"
    class="border border-info"
    style="margin-bottom: 5px; padding: 5px"
  >
    <div class="input-group input-group-sm">
      <span class="input-group-text text-gray" id="basic-addon1">Имя</span>
      <input
        v-model="attributes.blocks[j - 1].name"
        @keyup="$emit(`inputRightTableInputs`, tables)"
        class="form-control form-control-sm text-gray"
        type="text"
      />
    </div>
    <div style="font-size: 0.7rem">
      Тип: {{ attributes.blocks[j - 1].type }}
    </div>
    <div style="font-size: 0.7rem">
      Диапазон: ({{ attributes.blocks[j - 1].x_start }},
      {{ attributes.blocks[j - 1].y_start }}), ({{
        attributes.blocks[j - 1].x_end
      }}, {{ attributes.blocks[j - 1].y_end }})
    </div>
    <div class="form-check">
      <input
        @click="$emit(`inputRightTableInputs`, tables)"
        v-model="attributes.blocks[j - 1].willBeEdited"
        class="form-check-input checkbox-gray"
        type="checkbox"
        value=""
        id="flexCheckChecked"
      />
      <label class="form-check-label" for="flexCheckChecked">
        Будет ли редактироваться в тренажере?
      </label>
    </div>
    <div v-if="attributes.blocks[j - 1].type === `json_ready`">
      <div
        v-for="k in attributes.blocks[j - 1].y_end -
        attributes.blocks[j - 1].y_start"
        :key="k"
      >
        <div
          v-for="d in attributes.blocks[j - 1].x_end -
          attributes.blocks[j - 1].x_start +
          1"
          :key="d"
        >
          <div style="font-size: 0.7rem">
            Диапазон: ({{ attributes.blocks[j - 1].y_start + k }},
            {{ attributes.blocks[j - 1].x_start + d - 1 }})
          </div>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            v-model="attributes.blocks[j - 1].inputType[k - 1][d - 1]"
          >
            <option value="текст">Текст</option>
            <option value="число">Число</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>
      </div>
    </div>

    <button
      class="btn btn-sm btn-outline-danger rounded-0"
      style="font-size: 0.7rem"
      @click="DeleteStaticTableBlock(j - 1)"
    >
      Удалить
    </button>
    <button
      class="btn btn-outline-sm text-light rounded-0"
      style="font-size: 0.7rem; background-color: rgba(255, 0, 255, 0.67)"
      @click="AddColor(j - 1)"
    >
      Колоризация
    </button>
    <div
      v-if="attributes.blocks[j - 1].color_block !== undefined"
      class="border border-success"
      style="margin-bottom: 2px; padding: 2px"
    >
      <label for="exampleColorInput" class="form-label"
        >Выбор цвета блока</label
      >
      <input
        type="color"
        class="form-control form-control-color"
        id="exampleColorInput"
        v-model="attributes.blocks[j - 1].color_block.color"
        title="Choose your color"
      />
      <!--
            <label for="exampleColorInput" class="form-label"
              >Выбор input</label
            >
            
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              v-model="attributes.blocks[j - 1].color_block.value"
            >
              <option
                v-for="j in allcontrols.length"
                :key="j"
                :value="allcontrols[j - 1].name"
              >
                {{ allcontrols[j - 1].name }}
              </option>
            </select>-->
    </div>
    <!--
          <button
            class="btn btn-sm text-light"
            style="font-size: 0.7rem; background-color: rgba(0, 191, 255, 0.67)"
            @click="$emit(`inputRightTableInputs`, tables)"
          ></button>-->
  </div>
  <!--
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>-->
  <!-- -->
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
    inputs: {
      type: Array,
      required: true,
    },
    list_index: {
      type: Number,
    },
  },
  watch: {
    list_index: {
      handler(newVal, oldVal) {
        if(this.list_index !== 0  && this.list_index !== undefined) {
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

    let allcontrols = [];
    props.inputs.forEach(function (i) {
      allcontrols.push(i);
    });
    let columns = attributes.columns;
    let rows = attributes.rows;
    let name = attributes.name;
    let error_ = false;
    let error_name = "";
    return {
      attributes,
      x_start: 0,
      y_start: 0,
      x_end: 0,
      y_end: 0,
      columns,
      rows,
      table_type: "json_ready",
      allcontrols,
      name,
      error_,
      error_name,
    };
  },
  methods: {
    DeleteElement() {
      this.$emit("delete_element", this.element);
    },
    SaveStaticTable() {
      this.attributes.columns = this.columns;
      this.attributes.rows = this.rows;
      this.attributes.inputs.length = this.columns * this.rows;
      for (let j = 0; j < this.columns * this.rows; j++) {
        this.attributes.inputs[j] = " ";
      }
    },
    AddColor(i) {
      //console.log();
      this.attributes.blocks[i]["color_block"] = {
        color: "#c73838",
        value: "",
      };
    },
    //#region Функции для статической таблицы
    CreateBlockInStaticTable() {
      let block = {
        name: String(this.element.id),
        x_start: this.x_start,
        y_start: this.y_start,
        x_end: this.x_end,
        y_end: this.y_end,
        value: [],
        field: [],
        inputType: [],
        type: this.table_type,
      };
      if (block.type === "json_ready") {
        for (let j = this.x_start - 1; j <= this.x_end - 1; j++) {
          block.field.push(
            this.attributes.inputs[
              (this.y_start - 1) * this.attributes.columns + j
            ]
          );
        }
        for (let i = this.y_start; i <= this.y_end - 1; i++) {
          let inputRow = {};
          for (let j = this.x_start - 1; j <= this.x_end - 1; j++) {
            inputRow[block.field[j - this.x_start + 1]] =
              this.attributes.inputs[i * this.attributes.columns + j];
          }
          block.value.push(inputRow);
        }

        for (let i = this.y_start; i <= this.y_end - 1; i++) {
          let inputStringIsText = [];
          for (let j = this.x_start - 1; j <= this.x_end - 1; j++) {
            inputStringIsText.push("текст");
          }
          block.inputType.push(inputStringIsText);
        }
        this.attributes.blocks.push(block);
      }
      if (block.type === "массив_текста" || block.type === "массив_чисел") {
        let Matrix = [];
        for (let i = this.y_start - 1; i <= this.y_end - 1; i++) {
          let inputRow = [];
          for (let j = this.x_start - 1; j <= this.x_end - 1; j++) {
            console.log(2);
            if (block.type === "массив_текста") {
              inputRow.push(
                this.attributes.inputs[i * this.attributes.columns + j]
              );
            }
            if (block.type === "массив_чисел") {
              inputRow.push(
                parseInt(
                  this.attributes.inputs[i * this.attributes.columns + j]
                )
              );
            }
          }
          Matrix.push(inputRow);
        }
        block.value = Matrix;
        this.attributes.blocks.push(block);
        console.log("Матрица -", Matrix);
      }
    },
    PutInputInStaticTableBlock(j1, j2) {
      console.log("Координаты -", "x:", j2, "y:", j1);
      /*
      for (
        let i = 0;
        i < this.UI.controls.staticTables[tableIndex].blocks.length;
        i++
      ) {
        if (
          this.UI.controls.staticTables[tableIndex].blocks[i].x_start <= j2 &&
          j2 <= this.UI.controls.staticTables[tableIndex].blocks[i].x_end &&
          this.UI.controls.staticTables[tableIndex].blocks[i].y_start <= j1 &&
          j1 <= this.UI.controls.staticTables[tableIndex].blocks[i].y_end
        ) {
          let yStart =
            this.UI.controls.staticTables[tableIndex].blocks[i].y_start;
          let yEnd = this.UI.controls.staticTables[tableIndex].blocks[i].y_end;
          let xStart =
            this.UI.controls.staticTables[tableIndex].blocks[i].x_start;
          let xEnd = this.UI.controls.staticTables[tableIndex].blocks[i].x_end;
          let field = this.UI.controls.staticTables[tableIndex].blocks[i].field;
          let tableInput =
            this.UI.controls.staticTables[tableIndex].inputs[
              (j1 - 1) * this.UI.controls.staticTables[tableIndex].columns +
                (j2 - 1)
            ];
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ===
            "json_ready"
          ) {
            console.log("Текущее -", tableInput);
            console.log(j1, yStart);
            console.log(
              this.UI.controls.staticTables[tableIndex].blocks[i].value[
                j1 - 1 - yStart
              ][field[j2 - xStart]]
            );
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - 1 - yStart
            ][field[j2 - xStart]] = tableInput;
            console.log(
              "Другое - ",
              this.UI.controls.staticTables[tableIndex].blocks[i].value[
                j1 - 1 - yStart
              ][field[j2 - xStart]]
            );
            console.log(
              "Все блоки -",
              this.UI.controls.staticTables[tableIndex].blocks
            );
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_текста"
          ) {
            console.log(tableInput);
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = tableInput;
            console.log(
              "новый блок -",
              this.UI.controls.staticTables[tableIndex].blocks[i]
            );
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_чисел"
          ) {
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = parseInt(tableInput);
          }
        }
      } */
    },

    DeleteStaticTableBlock(blockIndex) {
      this.attributes.blocks.splice(blockIndex, 1);
    },

    InputStaticTableInputs(i, j) {
      //this.UI.controls.staticTables = tables;
      //console.log(j, i);
      this.PutInputInStaticTableBlock(i + 1, j + 1);

      //console.log(this.UI.controls.staticTables);
    },
    /*
    СhangeInputTypeInBlockStaticTable(blockIndex, i, j, type) {
      //console.log("тип -", type);
      this.attributes.blocks[
        blockIndex
      ].inputTypeIsText[i][j] = type;
    }, */
    /*
    InputBlocKStaticTable(tableIndex, blockIndex, block) {
      this.UI.controls.staticTables[tableIndex].blocks[blockIndex] = block;
    },*/
    BlocksInputs(table, block) {
      let new_block = {};
      if (block.type == "массив_чисел" || block.type == "массив_текста") {
        for (let i = 0; i < block.value.length; i++) {
          for (let j = 0; j < block.value[i].length; j++) {
            [table, new_block] = this.PushBlockInputsInStaticTableInputs(
              table,
              block,
              i,
              j
            );
            //console.log("block", new_block)
          }
        }
      }
      return [table, new_block];
    },
    PushBlockInputsInStaticTableInputs(table, block, j1, j2) {
      let cell = block.value[j1][j2];
      let our_block = block;
      table.attributes.inputs[
        (j1 + our_block.y_start - 1) * table.attributes.columns +
          j2 +
          our_block.x_start -
          1
      ] = String(cell);
      //console.log(cell);
      return [table, block];
    },
    NewName() {
      this.$emit("newName", this.name);
      this.error_ = false;
    },
    //#endregion
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
