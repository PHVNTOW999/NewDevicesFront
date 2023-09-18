<template>
  <header class="header">
    <nav class="nav">
      <b-navbar>
        <template #start>

          <b-navbar-dropdown label="Информация">
            <router-link to="/info/meet"><b-navbar-item>Встречи</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

          <b-navbar-dropdown label="Финансы">
            <router-link to="/info/meet"><b-navbar-item>Продажа проекта</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

          <b-navbar-dropdown label="Отчёты">
            <router-link to="/info/meet"><b-navbar-item>Продажа проекта</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

          <b-navbar-dropdown label="Прибыль">
            <router-link to="/info/meet"><b-navbar-item>Продажа проекта</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

          <b-navbar-dropdown label="Другое">
            <router-link to="/info/meet"><b-navbar-item>Продажа проекта</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

        </template>

        <template #end>
          <div class="date">
            <b-button type="is-success">Курсы валют</b-button>
          </div>
          <div class="date">
            <b-button type="is-dark">{{ new Date().toLocaleDateString() }}</b-button>
          </div>
        </template>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>

</style>
