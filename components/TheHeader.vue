<template>
  <header class="header">
    <nav class="nav">
      <b-navbar>
        <template #start>

          <b-navbar-dropdown :label="$t('header.info')" >
            <router-link :to="localePath('/info/meet')"><b-navbar-item>{{ $t("header.meets") }}</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Предложения</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Договоренности</b-navbar-item></router-link>
          </b-navbar-dropdown>

          <b-navbar-dropdown label="Финансы">
            <router-link to="/info/meet"><b-navbar-item>Продажа проекта</b-navbar-item></router-link>
            <router-link to="/info/orders"><b-navbar-item>Заказы</b-navbar-item></router-link>
          </b-navbar-dropdown>

        </template>

        <template #end>
          <div class="lang">
            <b-select placeholder="Select a language" v-model="lang">
              <option
                v-for="lang in $i18n.locales"
                :key="lang.code"
                :value="lang">
                {{ lang.name }}
              </option>
            </b-select>
          </div>
          <div class="date">
            <nuxt-link :to="localePath('/')">
              <b-button type="is-success">{{ $t("header.exchange_rates") }}</b-button>
            </nuxt-link>
          </div>
          <div class="date">
            <b-button type="is-dark">{{ date }}</b-button>
          </div>
        </template>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      lang: null,
      date: new Date().toLocaleDateString(),
      nav: [
        {
          group: 'info',
          links: [
            {
              title: 'meets',
              path: '/info/meet'
            }
          ]
        }
      ]
    }
  },
  watch: {
    lang() {
      const lsLang = JSON.parse(localStorage.getItem('lang'))
      if(lsLang && lsLang.code !== this.lang.code) {
        this.$i18n.setLocale(this.lang.code);
        localStorage.setItem('lang',  JSON.stringify(this.lang))
      }
    }
  },
  created() {
    const lsLang = JSON.parse(localStorage.getItem('lang'))
    lsLang ? this.lang = lsLang : null
  }
}
</script>

<style scoped>

</style>
