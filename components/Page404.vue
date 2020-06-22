<template>
  <div>
    <div class="bgImg404">
      <nuxt-link class="btnBack404" :to="'/'">Volver a Inicio</nuxt-link>
      <nuxt-link to="/">
          <img class="notFound" src="https://image.freepik.com/vector-gratis/concepto-landing-page-fallo-tecnico_23-2148251153.jpg" alt="NotFound404">
      </nuxt-link>
    </div>
  </div>
</template>


<style>
.goToHome{
  color: var(--color-bg);
  width: 100%;
  text-align: center;
  font-size: 1.2em;
}
.notFound {
  width: 90%;
  margin: 0 auto;
}
.btnBack404{
  color: #333;
  display: block;
  font-size: 1.2em;
}
@media (min-width: 680px){
  .notFound {
  width: 70%;
}
.bgImg404{
  margin-left: 0;
}
.goToHome{
  margin-top: 30px;
}
}
</style> 