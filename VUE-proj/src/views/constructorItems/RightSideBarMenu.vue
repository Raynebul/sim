<template>
  <ul
    class="navbar-rightbar nav nav-tabs fw-bold"
    id="myTab"
    role="tablist"
    style="
      color: white;
      text-decoration: none; /* no underline */
      font-size: 0.8rem;
      margin-left: -0.5rem !important;
      margin-top: -0.5rem !important;
      border: 0;
    "
  >
    <li
      class="nav-item"
      role="presentation"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Редактирование свойств элемента"
    >
      <button
        class="nav-link active rounded-0"
        id="style-tab"
        data-bs-toggle="tab"
        data-bs-target="#style"
        type="button"
        role="tab"
        aria-controls="style"
        aria-selected="true"
      >
        <i class="bi bi-brush-fill"></i>
      </button>
    </li>
    <li
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Дерево элементов"
      class="nav-item"
      role="presentation"
    >
      <button
        class="nav-link rounded-0"
        id="list-tab"
        data-bs-toggle="tab"
        data-bs-target="#list"
        type="button"
        role="tab"
        aria-controls="list"
        aria-selected="false"
      >
        <i class="bi bi-list-columns-reverse"></i>
      </button>
    </li>
    <li
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Функции и данные к ним"
      class="nav-item"
      role="presentation"
    >
      <button
        class="nav-link rounded-0"
        id="inputs-tab"
        data-bs-toggle="tab"
        data-bs-target="#inputs"
        type="button"
        role="tab"
        aria-controls="inputs"
        aria-selected="false"
      >
        <i class="bi bi-0-circle"></i>
      </button>
    </li>
    <li
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Редактирование полотна"
      class="nav-item"
      role="presentation"
    >
      <button
        class="nav-link rounded-0"
        id="canvas-tab"
        data-bs-toggle="tab"
        data-bs-target="#canvas"
        type="button"
        role="tab"
        aria-controls="canvas"
        aria-selected="false"
      >
        <i class="bi bi-bounding-box"></i>
      </button>
    </li>
    <!--
    <li class="nav-item" role="presentation">
      <button
        class="nav-link rounded-0"
        id="tree-tab"
        data-bs-toggle="tab"
        data-bs-target="#tree"
        type="button"
        role="tab"
        aria-controls="tree"
        aria-selected="false"
      >
        <i class="bi bi-diagram-3-fill"></i>
      </button>
    </li>-->
    <!--
    <ul
      class="nav nav-tabs ms-auto"
      style="
        text-decoration: none; /* no underline */
        font-size: 0.8rem;
        border: 0;
      "
    >
      <li class="nav-item" role="presentation">
        <button
          type="button"
          class="nav-link rounded-0 save-button"
          id="liveToastBtn"
        >
          
          <i class="bi bi-floppy-fill save-btn"></i>
        </button>
      </li>
    </ul>-->
  </ul>
</template>

<script></script>

<style>
.save-btn {
  color: rgb(0, 166, 255);
}

.save-btn:hover {
  color: white;
}

.navbar-rightbar .nav-link {
  color: #fff;
}

.save-button {
  border-color: transparent !important;
}
</style>
