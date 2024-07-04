<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-top border-gray p-0"
    style="height: 30px; font-size: 0.6rem"
  >
    <div
      class="container-md"
      style="
        height: 30px;
        margin-left: 0;
        margin-right: 0;
        width: 100%;
        max-width: 5000px;
      "
    >
      <!--открыть Левый sidebar-->
      <a
        class="navbar-brand m-0 p-0"
        data-bs-toggle="collapse"
        href="#multiCollapseLeftSidebar"
        role="button"
        aria-expanded="false"
        aria-controls="multiCollapseLeftSidebar"
        ><i
          class="bi bi-layout-sidebar new-icon-style"
          style="margin-left: -5px"
        ></i
      ></a>
      <a
        class="navbar-brand ms-auto"
        data-bs-toggle="collapse"
        href="#multiCollapseRightSidebar"
        role="button"
        aria-expanded="false"
        aria-controls="multiCollapseRightSidebar"
      >
        <i
          class="bi bi-layout-sidebar-reverse new-icon-style"
          style="margin-right: -5px"
        ></i
      ></a>
      <!--margin-right: -5px-->
    </div>
  </nav>
</template>

<style>
.border-gray {
  border-color: rgb(102, 102, 102) !important;
}

.new-icon-style {
  font-size: 0.75em;
  color: rgb(132, 132, 132) !important;
}

.new-icon-style:hover {
  font-size: 0.75em;
  color: rgb(255, 255, 255) !important;
}
</style>

<script></script>
