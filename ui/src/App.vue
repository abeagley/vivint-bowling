<template>
  <router-view/>
</template>

<script>
</script>

<style lang="scss">
body, html {
  background-color: #f4f3ef;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

a {
  transition: color 0.2s linear;
}

.layout-container, .page-container, .section {
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container, .container-fluid {
  position: relative;
}

.slide-left-enter-active {
  animation: slide-left 500ms;
  z-index: 2;
}

.slide-left-leave-active {
  animation: slide-left 500ms reverse;
  z-index: 1;
}

@keyframes slide-left {
  0% {
    opacity: 0;
    position: absolute;
    transform: translate3d(-300%, 0, 0);
  }

  100% {
    opacity: 1;
    position: absolute;
    transform: translate3d(0, 0, 0);
  }
}
</style>
