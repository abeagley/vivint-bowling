<template>
  <div>
    <div class="row no-gutters">
      <div class="col">
        <div class="form-group mb-0">
          <input type="number"
                 name="attemptOne"
                 placeholder="-"
                 v-validate="modelValidations.attempt"
                 v-model="model.attemptOne"
                 class="form-control"/>
        </div>
      </div>
      <div class="col">
        <div class="form-group mb-0">
          <input type="number"
                 name="attemptTwo"
                 placeholder="-"
                 v-validate="modelValidations.attempt"
                 v-model="model.attemptTwo"
                 class="form-control"/>
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col text-center tally-score">0</div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vee-validate'

export default {
  computed: {
    ...mapFields(['attemptOne', 'attemptTwo'])
  },

  data () {
    return {
      model: {
        attemptOne: this.scoreSheet.scores[this.scoreIndex].attemptOne,
        attemptTwo: this.scoreSheet.scores[this.scoreIndex].attemptTwo
      },

      modelValidations: {
        attempt: {
          required: true,
          max: 10,
          min: 0,
          numeric: true
        }
      }
    }
  },

  props: {
    scoreSheet: {
      required: true,
      type: Object
    },

    scoreIndex: {
      required: true,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
