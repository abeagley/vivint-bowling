<template>
  <div class="container-fluid top-nav">
    <div class="row align-items-center justify-content-between no-gutters">
      <div class="col">
        <img src="https://images.vivintcdn.com/global/vivint.com/global/logos/vivint/vivint-logo-primary-r.svg"
             width="219" height="24">
      </div>
      <div class="col text-right">
        <router-link :to="{ name: 'Game List' }">Games</router-link>
        <a href="#" @click.prevent="onLogout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onLogout: {
      required: true,
      type: Function
    }
  }
}
</script>

<style scoped lang="scss">
.top-nav, .top-nav .row  {
  background-color: #FFF;
  height: 60px;
}

.col.text-right {
  a {
    color: #CCC;
    display: inline-block;
    padding: 0 0.8rem;
    text-transform: uppercase;
    text-decoration: none;

    &.active {
      color: darken(#CCC, 25%);
    }
  }
}
</style>
