<template>
  <ul
    class="navbar-construct nav nav-tabs fw-bold"
    id="myTab"
    role="tablist"
    style="
      background-color: #23bcdb;
      color: white;
      text-decoration: none; /* no underline */
      height: 40px;
      font-size: 1rem;
      border: 0;
    "
  >
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active rounded-0"
        id="home-tab"
        data-bs-toggle="tab"
        data-bs-target="#home"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true"
        @click="OpenConstructor()"
      >
        <i class="bi bi-tools"></i>
      </button>
    </li>
    <li
      class="nav-item"
      role="presentation"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Готовый UI"
    >
      <button
        class="nav-link rounded-0"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
         @click="OpenTesting()"
      >
        <i class="bi bi-layout-text-window"></i>
      </button>
    </li>
    <li
      class="nav-item"
      role="presentation"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Код"
    >
      <button
        class="nav-link rounded-0"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#contact"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
      >
        <i class="bi bi-code-slash"></i>
      </button>
    </li>
    <li
      class="nav-item"
      role="presentation"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      data-bs-title="Метадата"
      v-if="VITE_TOKEN_MODE === 'token'"
    >
      <button
        class="nav-link rounded-0"
        id="description-tab"
        data-bs-toggle="modal"
        :data-bs-target="`#MetadataEdit`"
      >
        <i class="bi bi-info-circle-fill"></i>
      </button>
    </li>

    <li class="nav-item" role="presentation">
      <a
        class="nav-link rounded-0"
        data-bs-toggle="tooltip"
        href="/documentation/"
        data-bs-placement="bottom"
        data-bs-title="Документация"
      >
        <i class="bi bi-book-fill"></i>
      </a>
    </li>

    <li class="nav-item" role="presentation" style="margin-left: 3rem">
      <button
        class="nav-link rounded-0"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Удалить тренажёр"
        @click="DeleteTrainer()"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link rounded-0"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Очистить настройки"
        @click="DeleteSaves()"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link rounded-0"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Сохранить настройки"
        @click="Save()"
      >
        <i class="bi bi-floppy-fill"></i>
      </button>
    </li>
  </ul>
</template>

<script setup></script>

<script>
export default {
  data() {
    return {
      VITE_TOKEN_MODE: import.meta.env.VITE_TOKEN_MODE,
    }
  },
  methods: {
    Save() {
      this.$emit("save");
    },
    DeleteTrainer() {
      this.$emit("delete_trainer");
    },
    DeleteSaves() {
      this.$emit("delete_saves");
    },
    OpenConstructor() {
      this.$emit("openConstructor")
    },
    OpenTesting() {
      this.$emit("openTesting")
    },

  },
  mounted() {},
};
</script>
