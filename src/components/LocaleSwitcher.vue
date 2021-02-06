<template>
  <select v-model="currentLocale" @change="localeChanged">
    <option v-for="locale in availableLocales" :key="locale" :value="locale">{{ locale }}</option>
  </select>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data: function () {
    console.log(this.$i18n);
    return {
    //   currentLocale: this.$i18n.locale.toString(),
    //   availableLocales: this.$i18n.availableLocales
    availableLocales:['hi','en']
    }
  },
  methods: {
    localeChanged () {
      this.$router.push({
        path: this.$tp(this.$route.path, this.currentLocale, true)
      })
    }
  }
}
</script>