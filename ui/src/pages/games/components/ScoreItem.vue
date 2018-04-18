<template>
  <div>
    <div class="row no-gutters">
      <div class="col">
        <div class="form-group mb-0">
          <input type="number"
                 name="attemptOne"
                 max="10"
                 min="0"
                 placeholder="-"
                 @change="checkChanges('attemptOne')"
                 v-validate="modelValidations.attempt"
                 v-model="model.attemptOne"
                 class="form-control"/>
        </div>
      </div>
      <div class="col">
        <div class="form-group mb-0">
          <input type="number"
                 name="attemptTwo"
                 max="10"
                 min="0"
                 placeholder="-"
                 @change="checkChanges('attemptTwo')"
                 v-validate="modelValidations.attempt"
                 v-model="model.attemptTwo"
                 class="form-control"/>
        </div>
      </div>
      <div class="col" v-if="scoreIndex === 9">
        <div class="form-group mb-0">
          <input type="number"
                 name="finalAttempt"
                 max="10"
                 min="0"
                 placeholder="-"
                 @change="checkChanges('finalAttempt')"
                 v-validate="modelValidations.attempt"
                 v-model="model.finalAttempt"
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
    ...mapFields(['attemptOne', 'attemptTwo', 'finalAttempt'])
  },

  data () {
    return {
      model: {
        attemptOne: this.scoreSheet.scores[this.scoreIndex].attemptOne,
        attemptTwo: this.scoreSheet.scores[this.scoreIndex].attemptTwo,
        finalAttempt: this.scoreSheet.scores[this.scoreIndex].finalAttempt
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

  methods: {
    async checkChanges (propName) {
      const result = await this.$validator.validate(propName, this.model[propName])

      if (!result) {
        return
      }

      this.onUpdateScore(this.scoreSheet, this.scoreIndex, Object.assign({}, this.scoreSheet.scores[this.scoreIndex], {
        [propName]: parseInt(this.model[propName], 10)
      }))
    }
  },

  props: {
    onUpdateScore: {
      required: true,
      type: Function
    },

    scoreSheet: {
      required: true,
      type: Object
    },

    scoreIndex: {
      required: true,
      type: Number
    }
  },

  watch: {
    scoreSheet (val, _old) {
      // Let the battle of the packets commence
      this.model = {
        attemptOne: val.scores[this.scoreIndex].attemptOne,
        attemptTwo: val.scores[this.scoreIndex].attemptTwo,
        finalAttempt: val.scores[this.scoreIndex].finalAttempt
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
