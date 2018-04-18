<template>
  <div class="layout-container">
    <Header :on-logout="handleLogout"/>
    <div class="main-content" ref="scrollContainer">
      <transition name="slide-left">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import ScrollY from '../../mixins/scroll-y'

export default {
  components: { Header },
  mixins: [ ScrollY ],

  methods: {
    handleLogout () {
      localStorage.clear()
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
.main-content {
  height: 100%;
  overflow: hidden;
  padding: 1rem 0;
  position: relative;
}
</style>
