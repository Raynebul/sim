<template>
  <hr style="margin: 10px 0 0px 0" />
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button
      @click="DeletePut"
      style="
        font-size: 0.7rem;
        margin-right: 0px;
        margin-top: 0px;
        border-color: transparent !important;
        background-color: transparent;
      "
      class="bi bi-trash-fill btn btn-outline-danger me-md-2"
    ></button>
    <!--      data-bs-toggle="tooltip"
      data-bs-placement="top"
      :data-bstitle="`Удалить ` + type"-->
  </div>
  <!--      data-mdb-toggle="popover"
        title="Popover title"
        data-mdb-content="And here's some amazing content. It's very engaging. Right?"
        data-mdb-trigger="hover"-->
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  data(props, context) {
    //let attributes = props.element.attributes;
    //console.log(inputValue);

    return {
      //attributes,
    };
  },
  methods: {
    DeletePut() {
      this.$emit("delete_put", this.index, this.type);
    },
    Test(test) {
      console.log(test);
    },
  },
  mounted() {},
  //emits: ["newValue"],
};
</script>
