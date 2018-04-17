<template>
  <div class="card login-card">
    <form>
      <div class="card-header">
        Set Nickname
      </div>
      <div class="card-body">
        <div class="form-group mb-0">
          <label>Nickname</label>
          <input type="text"
                 name="nickname"
                 v-validate="modelValidations.nickname"
                 v-model="model.nickname"
                 class="form-control"/>
          <small class="text-danger" v-show="nickname.invalid">
            {{ getError('nickname') }}
          </small>
        </div>
      </div>
      <div class="card-footer text-center">
        <button type="submit"
                @click.prevent="validate"
                class="btn btn-block btn-fill btn-info btn-wd"
                :disabled="isLoading">
          Let's Bowl!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapFields } from 'vee-validate'

export default {
  computed: {
    ...mapFields(['nickname'])
  },

  props: {
    isLoading: {
      required: true,
      type: Boolean
    },

    onSubmit: {
      required: true,
      type: Function
    }
  },

  data () {
    return {
      model: {
        nickname: ''
      },

      modelValidations: {
        nickname: {
          required: true,
          min: 3
        }
      }
    }
  },

  methods: {
    getError (fieldName) {
      return this.errors.first(fieldName)
    },

    async validate () {
      const isValid = await this.$validator.validateAll()

      if (!isValid) {
        return
      }

      this.onSubmit(this.model.nickname)
    }
  }
}
</script>

<style scoped lang="scss">
.login-card {
  margin: 2rem auto;
  max-width: 375px;
  text-align: left;
}
</style>
