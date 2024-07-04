<template>
  <th scope="row">{{ user.id }}</th>
  <td>{{ user.username }}</td>
  <td class="text-muted">{{ user.email }}</td>
  <td>{{ user.active }}</td>
  <td>
    <button
      v-if="user.active == `false`"
      class="btn btn-success"
      @click="ActivateUser()"
    >
      Активировать
    </button>
    <button v-else class="btn btn-danger" @click="ActivateUser()">
      Деактивировать
    </button>
  </td>
  <td><button class="btn btn-danger" @click="DeleteUser()">Удалить</button></td>
  <td>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      :data-bs-target="`#exampleModalUser` + user.id"
    >
      Страница
    </button>
  </td>

  <div
    class="modal fade"
    :id="`exampleModalUser` + user.id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Информация о пользователе
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Атрибут</th>
                <th scope="col">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">id</th>
                <td>{{ user.id }}</td>
              </tr>
              <tr>
                <th scope="row">username</th>
                <td>{{ user.username }}</td>
              </tr>
              <tr>
                <th scope="row">email</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th scope="row">password</th>
                <td>{{ user.password }}</td>
              </tr>
              <tr>
                <th scope="row">Имя</th>
                <td>{{ user.first_name }}</td>
              </tr>
              <tr>
                <th scope="row">Фамилия</th>
                <td>{{ user.last_name }}</td>
              </tr>
              <tr>
                <th scope="row">Отчество</th>
                <td>{{ user.patronymic }}</td>
              </tr>
              <tr>
                <th scope="row">status</th>
                <td>{{ user.status }}</td>
              </tr>
              <tr>
                <th scope="row">Телефон</th>
                <td>{{ user.telephone }}</td>
              </tr>
              <tr>
                <th scope="row">Активен?</th>
                <td>{{ user.active }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    ActivateUser() {
      this.$emit("activate", this.user);
    },
    DeleteUser() {
      this.$emit("delete", this.user);
    },
  },
};
</script>
