<template>
<div class="section">
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col text-right">
        <button class="btn btn-primary">CREATE GAME</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Table :loading="false"
               :table-columns="tableColumns"
               :table-data="[]"
               title="Game List"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Table from '@/pages/layout/components/Table'

export default {
  components: { Table },

  data () {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'url',
          label: 'Url'
        },
        {
          prop: 'createdAt',
          label: 'Created'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
