<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpenSystem-headingOne">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpenSystem-collapseOne"
        aria-expanded="false"
        aria-controls="panelsStayOpenSystem-collapseOne"
      >
        Значение инпутов в каждом раунде
      </button>
    </h2>
    <!---->
    <div
      id="panelsStayOpenSystem-collapseOne"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpenSystem-headingOne"
    >
      <!--ууууу-->
      <div class="accordion-body text-white">
        <div>Количество: {{ systems.rounds.length }}</div>
        <!--          @keyup="$emit(`inputRoundinputs`, systems.rounds)"
          @click="$emit(`inputRoundinputs`, systems.rounds)"-->
        <div
          v-for="i in systems.rounds.length"
          :key="i"
          class="border border-info"
          style="margin-bottom: 5px; padding: 5px"
        >
          <label for="exampleColorInput" class="form-label text-light"
            >Раунд {{ i }}</label
          >
          <button
            type="button"
            style="font-size: 0.7rem"
            class="btn btn-outline-info text-light btn-sm"
            data-bs-toggle="offcanvas"
            :data-bs-target="`#offcanvasRound` + String(i)"
            :aria-controls="`offcanvasRound` + String(i)"
          >
            Данные для данного раунда
          </button>
          <DeletePut
            :index="i - 1"
            :type="`раунд`"
            @delete_put="DeleteRound(i - 1)"
          ></DeletePut>
        </div>

        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            class="btn btn-outline-primary rounded-0"
            style="font-size: 0.7rem"
            @click="AddNewRoundInput()"
          >
            Добавить
          </button>
          <!--
          <button
            type="button"
            class="btn btn-danger"
            style="font-size: 0.7rem"
            @click="$emit(`removeRoundInput`)"
          >
            Удалить
          </button>-->
        </div>
        <p></p>
        <button class="btn btn-primary btn-sm">Применить настройки</button>
      </div>
      <!--ууууу-->
    </div>
    <!---->
  </div>

  <div
    v-for="i in systems.rounds.length"
    :key="i"
    
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    data-bs-scroll="true"
    :id="`offcanvasRound` + i"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header text-light">
      <h5 id="offcanvasRightLabel">Раунд {{ i }}</h5>

      <button
        type="button"
        class="btn-close text-reset btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body text-white">
      <h6>Входные данные для раунда:</h6>
      <div
        v-for="j in systems.rounds[i - 1].roundInputs.length"
        :key="j"
        class="border border-info"
        style="margin-bottom: 7px; padding: 7px"
      >
        <label for="exampleFormControlTextarea1" class="form-label"
          >Имя</label
        >

        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          v-model="systems.rounds[i - 1].roundInputs[j - 1].attributes.name"
        >
          <option
            v-for="jj in allcontrols.length"
            :key="jj"
            :value="allcontrols[jj - 1].attributes.name"
          >
            <!--v-if="allcontrols[j].attributes != undefined"-->
            <div>{{ allcontrols[jj - 1].attributes.name }}</div>
          </option>
          <option
            v-for="jj in allcontrols_without_attributes.length"
            :key="jj"
            :value="allcontrols_without_attributes[jj - 1].name"
          >
            <!--v-if="allcontrols[j].attributes != undefined"-->
            <div>{{ allcontrols_without_attributes[jj - 1].name }}</div>
          </option>
          <!--
          <option
            v-for="j in allcontrols.length"
            :key="j"
            :value="allcontrols[j - 1].name"
          >
            {{ allcontrols[j - 1].name }}
          </option> -->
        </select>
        <label for="exampleFormControlTextarea1" class="form-label"
          >Тип</label
        >
        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          v-model="systems.rounds[i - 1].roundInputs[j - 1].attributes.type"
        >
          <option value="число">число</option>
          <option value="текст">текст</option>
          <option value="json">JSON</option>
          <option value="массив_чисел">массив чисел</option>
          <option value="массив_текста">массив текста</option>
        </select>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Значение в данном раунде</label
          >
          <textarea
            class="form-control text-gray"
            id="exampleFormControlTextarea1"
            rows="8"
            v-model="systems.rounds[i - 1].roundInputs[j - 1].attributes.value"
            style="font-family: Consolas; font-size: 0.8rem"
          ></textarea>
        </div>
        <p></p>
        <DeletePut
          :index="i - 1"
          :type="`раунд`"
          @delete_put="DeleteInput(i - 1, j - 1)"
        ></DeletePut>
      </div>
      <div class="btn-group btn-group-sm" role="group" aria-label="...">
        <button
          type="button"
          class="btn btn-outline-primary rounded-0"
          style="font-size: 0.7rem"
          @click="AddInput(i - 1)"
        >
          Добавить
        </button>
      </div>
      <hr/>
      <h6>Правильные выходные данные, чтобы перейти на следующий раунд:</h6>
      <div
        v-for="j in systems.rounds[i - 1].roundOutputs.length"
        :key="j"
        class="border border-info"
        style="margin-bottom: 7px; padding: 7px"
      >
        <label for="exampleFormControlTextarea1" class="form-label"
          >Имя</label
        >

        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          v-model="systems.rounds[i - 1].roundOutputs[j - 1].attributes.name"
        >
          <option
            v-for="jj in allcontrolsOutputs.length"
            :key="jj"
            :value="allcontrolsOutputs[jj - 1].attributes.name"
          >
            <!--v-if="allcontrols[j].attributes != undefined"-->
            <div>{{ allcontrolsOutputs[jj - 1].attributes.name }}</div>
          </option>
          <option
            v-for="jj in allcontrolsOutputs_without_attributes.length"
            :key="jj"
            :value="allcontrolsOutputs_without_attributes[jj - 1].name"
          >
            <!--v-if="allcontrols[j].attributes != undefined"-->
            <div>{{ allcontrolsOutputs_without_attributes[jj - 1].name }}</div>
          </option>
          <!--
          <option
            v-for="j in allcontrolsOutputs.length"
            :key="j"
            :value="allcontrolsOutputs[j - 1].name"
          >
            {{ allcontrolsOutputs[j - 1].name }}
          </option> -->
        </select>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label text-gray"
            >Ответ</label
          >
          <textarea
            class="form-control text-gray"
            id="exampleFormControlTextarea1"
            rows="8"
            v-model="systems.rounds[i - 1].roundOutputs[j - 1].attributes.value"
            style="font-family: Consolas; font-size: 0.8rem"
          ></textarea>
        </div>
        <p></p>
        <DeletePut
          :index="i - 1"
          :type="`раунд`"
          @delete_put="DeleteOutput(i - 1, j - 1)"
        ></DeletePut>
      </div>
      <div class="btn-group btn-group-sm" role="group" aria-label="...">
        <button
          type="button"
          class="btn btn-outline-primary rounded-0"
          style="font-size: 0.7rem"
          @click="AddOutput(i - 1)"
        >
          Добавить
        </button>
        <!--
              <button
                type="button"
                class="btn btn-outline-danger rounded-0"
                style="font-size: 0.7rem"
                @click="RemoveOutput(i - 1)"
              >
                Удалить
              </button>-->
      </div>
    </div>
  </div>


</template>

<script setup>
import DeletePut from "./DeletePut.vue";
</script>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
  },
  data(props, context) {
    //console.log(props.UI.buttons);

    let systems;
    let sinputs = [];
    let allcontrols = [];
    let allcontrolsOutputs = [];
    let allcontrolsOutputs_without_attributes = [];
    systems = props.UI.settings;
    /*
    for (let i = 0; i < systems.rounds.length; i++) {
      systems.rounds[i]["roundOutputs"] = [];
    }*/
    // console.log("Системы еще", props.UI.systems);
    let saveTableinputs = [];
    // Все контролы для allcontrols
    allcontrols = this.PushInputControls(props.UI.structure, []);
    let allcontrols_without_attributes = [];
    let length = allcontrols.length;
    for (let i = 0; i < length; i++) {
      if (allcontrols[i].attributes === undefined) {
        allcontrols_without_attributes.push(allcontrols[i]);
        allcontrols.splice(i, 1);
        i--;
        length--;
      }
    }
    allcontrolsOutputs = allcontrols;
    this.UI.inputs.forEach(function (i) {
      allcontrols_without_attributes.push(i);
    });
    this.UI.inputs.forEach(function (i) {
      allcontrolsOutputs_without_attributes.push(i);
    });
    return {
      systems,
      sinputs,
      allcontrols,
      allcontrols_without_attributes,
      allcontrolsOutputs,
      allcontrolsOutputs_without_attributes,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
    AddInput(i) {
      this.systems.rounds[i]["roundInputs"].push({
        attributes: {
          name: "",
          type: "текст",
          value: "",
        },
      });
    },
    RemoveInput(i) {
      this.systems.rounds[i]["roundInputs"].slice(-1);
    },
    AddOutput(i) {
      this.systems.rounds[i]["roundOutputs"].push({
        attributes: {
          name: "",
          value: "",
        },
      });
    },
    RemoveOutput(i) {
      this.systems.rounds[i]["roundOutputs"].slice(-1);
    },
    SaveInputs(j) {
      //this.systems.rounds[j]["roundInputs"] = this.sinputs;
      this.$emit(`inputRoundinputs`, this.systems.rounds);
    },
    PushInputControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (
          structure[i].type == "textarea" ||
          structure[i].type == "card" ||
          structure[i].type == "textinput" ||
          structure[i].type == "2Dcomponent" ||
          structure[i].type == "button"
        ) {
          arrayOfInputControls.push(structure[i]);
        }
        if (
          structure[i].type == "staticTable" ||
          structure[i].type == "dynamicTable"
        ) {
          arrayOfInputControls.push(structure[i]);
          for (let j = 0; j < structure[i].attributes.blocks.length; j++) {
            arrayOfInputControls.push(structure[i].attributes.blocks[j]);
          }
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          arrayOfInputControls_new = this.PushInputControls(
            structure[i].structure,
            arrayOfInputControls
          );
        }
      }
      return arrayOfInputControls_new;
    },
    AddNewRoundInput() {
      this.systems.rounds.push({
        name: "",
        roundInputs: [],
        roundOutputs: [],
      });
    },
    DeleteRound(i) {
      //console.log("1 2 3 4 5 6 7 8 9 0")
      this.systems.rounds.splice(i, 1);
    },
    DeleteInput(i, j) {
      this.systems.rounds[i].roundInputs.splice(j, 1);
    },
    DeleteOutput(i, j) {
      this.systems.rounds[i].roundOutputs.splice(j, 1);
    },
  },
  //emits: ["newValue"],
};
</script>
