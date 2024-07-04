<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapseFour"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapseFour"
      >
        Настройки inputs, functions, outputs
      </button>
    </h2>
    <div
      id="panelsStayOpen-collapseFour"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpen-headingFour"
    >
      <div class="accordion-body text-white">
        <div v-if="editPuts == false">
          <div class="mb-3">
            <label for="exampleInputEmail1 text-gray" class="form-label"
              >Кол-во inputs</label
            >
            <input
              class="form-control form-control-sm text-gray"
              type="text"
              v-model="inputCount"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1 text-gray" class="form-label"
              >Кол-во functions</label
            >
            <input
              class="form-control form-control-sm text-gray"
              type="text"
              v-model="functionCount"
              disabled
            />
          </div>
        </div>
        <div v-else>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Кол-во inputs</label
            >
            <input
              class="form-control form-control-sm text-gray"
              type="text"
              v-model="inputCount"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Кол-во functions</label
            >
            <input
              class="form-control form-control-sm"
              type="text"
              v-model="functionCount"
            />
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="editPuts"
          />
          <label class="form-check-label" for="flexCheckDefault"
            >Редактировать
          </label>
        </div>
        <button
          class="btn btn-sm btn-primary"
          @click="$emit(`savePuts`, inputCount, functionCount)"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
  },
  data(props, context) {
    console.log(props.UI.buttons);
    let inputCount = props.UI.inputs.length;
    let functionCount = props.UI.functions.length;
    return {
      inputCount,
      functionCount,
      editPuts: false,
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
