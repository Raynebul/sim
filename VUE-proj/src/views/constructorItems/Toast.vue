<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    id="toastPlacement"
  >
    <!--fade show-->
    <div
      v-if="this.hideToast == true"
      id="liveToast"
      class="toast fade hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div v-if="color === `green`" class="toast-header bg-success">
        <strong class="me-auto text-white">Успех!</strong>
        <button
          type="button"
          class="btn-close"
          @click="$emit(`hideToast`)"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
      <div v-if="color === `red`" class="toast-header bg-danger">
        <strong class="me-auto text-white">Ошибка!</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
      <div class="toast-body">{{ notificationText }}</div>
    </div>
    <div
      v-else
      id="liveToast"
      class="toast fade show card-appears"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div v-if="color === `green`" class="toast-header bg-success">
        <strong class="me-auto text-white">Успех!</strong>
        <button
          type="button"
          class="btn-close"
          @click="$emit(`hideToast`)"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
      <div v-if="color === `red`" class="toast-header bg-danger">
        <strong class="me-auto text-white">Ошибка!</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
      <div class="toast-body">{{ notificationText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notificationText: {
      type: Object,
      required: true,
      default: () => {},
    },
    color: {
      type: Object,
      required: true,
      default: () => {},
    },
    hideToast: Boolean,
  },
  watch: {
    hideToast: {
      handler(val, oldVal) {
        if (val == false) {
          let timer = 4000;
          setTimeout(() => {
            this.$emit(`hideToast`);
          }, timer);
        }
      },
    }, 
  },
  data(props) {
    //let new_trainers = props.trainers;
    //$('.toast').toast(option)

    return {
      edit: false,
      changeAnimation: false,
    };
  },
  computed: {},
  methods: {
    GetToastClass() {
      if (this.hideToast == false) {
        if (this.changeAnimation == false) {
          return "toast fade show card-appears";
        } else {
          return "toast fade show card-disappears";
        }
      } else {
        return "toast fade hide";
      }
    },
  },
};
</script>

<style>
.card-appears {
  animation: fadein 0.35s;
}

@keyframes fadein {
  from {
    opacity: 0;
    margin-right: -100px;
  }
  to {
    opacity: 1;
    margin-right: 0px;
  }
}
</style>
