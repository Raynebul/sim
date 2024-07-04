<template>
  <div class="wrapper">
    <div class="min-vh-100">
      <h4 class="p-3">
        Вы на странице с редактором тренажеров. Зайдите на свою личную страницу,
        чтобы выбрать тренажер. Или другой материал.
      </h4>
    </div>
    <!--
    <div
      class="mainpage-text"
      style="padding-top: 250px; padding-bottom: 300px"
    >
      <h1 class="text-center animated-text main-text"><b>Проект Клио</b></h1>
      <h5 class="text-center text-muted animated-text">
        Конструктор тренажёров
      </h5>
    </div>
    <div>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
        style="padding-top: 50px; padding-bottom: 50px"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="./img/iStock-1188511715.jpg"
              class="d-block w-100"
              alt="..."
              height="500"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 style="text-shadow: 2px 2px black; font: Consolas">
                Онлайн тренажер с упражнениями и курсами по SQL
              </h1>
              <p style="text-shadow: 2px 2px black; font: Consolas">
                Освой SQL - научись создавать собственные базы данных и
                составлять запросы к ним
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="./img/singapore-2064905_1920-1536x863.jpg"
              class="d-block w-100"
              alt="..."
              height="500"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 style="text-shadow: 2px 2px black; font: Consolas">
                Онлайн тренажер с упражнениями и курсами по Конечным Автоматам
              </h1>
              <p style="text-shadow: 2px 2px black; font: Consolas">
                Освой КА - научись создавать собственные КА!
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="./img/origin.jpg"
              class="d-block w-100"
              alt="..."
              height="500"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 style="text-shadow: 2px 2px black; font: Consolas">
                Онлайн тренажер с упражнениями и курсами по Машине Тьюринга
              </h1>
              <p style="text-shadow: 2px 2px black; font: Consolas">
                Освой МТ - научись создавать собственные МТ!
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Предыдущий</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Следующий</span>
        </button>
      </div>
      <h3 class="text-center" style="padding-top: 50px; padding-bottom: 100px">
        Используйте готовые тренажёры или создайте свои собственные
      </h3>
     
    </div>-->
  </div>
</template>

<style>
/*
h1 {
  font-size: 72px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
*/
.wrapper {
  background-color: #f7fbff;
}
.main-text {
  background: -webkit-linear-gradient(#02ffe2, #0f35cd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.animated-text {
  position: relative;
  animation: textmove 1s;
}

@keyframes textmove {
  from {
    top: -40px;
  }
  to {
    top: 0px;
  }
}

.mainpage-text {
  /*-webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  /* -moz-animation: fadein 2s; /* Firefox < 16 */
  /*-ms-animation: fadein 2s; /* Internet Explorer */
  /*-o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    /*  top: -200px; */
    opacity: 0;
  }
  to {
    /*   top: 0px; */
    opacity: 1;
  }
}

/* Firefox < 16 */
/*
@-moz-keyframes fadein {
  from {
    top: -200px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}
*/
/* Safari, Chrome and Opera > 12.1 */
/*
@-webkit-keyframes fadein {
  from {
    top: -200px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}
*/
/* Internet Explorer */
/*
@-ms-keyframes fadein {
  from {
    top: -200px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}
*/
/* Opera < 12.1 */
/*
@-o-keyframes fadein {
  from {
    top: -200px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}
*/
.carousel-caption {
  top: 50%;
  transform: translateY(-50%);
  bottom: initial;
}

.item {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
</style>

<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
</script>

<script>
export default {
  data() {
    //console.log(this.process.env.TOKEN_MODE)
    //console.log(this.process.env.PROJECT_MODE)
    console.log()
    return {
      username: "",
      info: null,
      IsAuth: false,
    };
  },
  /*
  async created() {
    const response = await axios.get(this.base_url + "user");
    console.log(response);
  }, */
};
</script>
