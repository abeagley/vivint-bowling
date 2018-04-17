<template>
  <div class="auth-container">
    <video autoplay="autoplay" loop="loop" muted="muted" class="bg-video">
      <source src="/videos/bg.mp4" type="video/mp4"/>
    </video>

    <div class="auth-content">
      <div class="container-fluid" ref="scrollContainer">
        <div class="row justify-content-center">
          <div class="col-sm-12 text-center">
            <img src="https://images.vivintcdn.com/global/vivint.com/global/logos/vivint/vivint-logo-primary-r.svg"
                 width="219" height="24">
            <nickname-form :is-loading="loading" :on-submit="submitNickname"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NicknameForm from './components/NicknameForm'
import ScrollY from '../../mixins/scroll-y'
import { mapActions, mapState } from 'vuex'

export default {
  components: { NicknameForm },
  mixins: [ ScrollY ],

  computed: mapState({
    loading: state => state.user.loading
  }),

  methods: {
    ...mapActions([
      'validateNickname'
    ]),

    async submitNickname (nickname) {
      try {
        await this.validateNickname(nickname)
        this.$router.replace({ name: 'Game List' })
      } catch (e) {
        // Would be replaced by something like vue-notify
        alert(`Couldn't log you in: ${e.message}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-video {
  height: auto;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  z-index: 1;
}

.auth-container, .auth-content {
  height: 100%;
  width: 100%;
}

.auth-content {
  position: relative;
  z-index: 2;
}

.container-fluid {
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    .row {
      align-items: center;
      height: 100%;
    }
  }
}
</style>
