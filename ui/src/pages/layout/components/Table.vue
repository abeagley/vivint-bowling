<template>
  <div class="card">
    <div class="card-header">
      {{title}}
    </div>
    <div class="card-body p-0 m-0">
      <div class="row">
        <div class="col datatable-main">
          <el-table class="table-striped"
                    v-loading="loading"
                    :data="tableData"
                    :border="border">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :width="column.width"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
            <slot/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      default: true,
      type: Boolean
    },

    loading: {
      required: true,
      type: Boolean
    },

    tableColumns: {
      required: true,
      type: Array
    },

    tableData: {
      required: true,
      type: Array
    },

    title: {
      default: 'List',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  width: 100% !important;
}

.datatable-top {
  margin-bottom: 1.5rem;
}
</style>
