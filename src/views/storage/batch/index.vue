<template>
  <div class="batch-container">
    <div class="form-item">
      <di class="form-item-label">所在仓库：</di>
      <el-select v-model="value" placeholder="Select" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="form-item">
      <di class="form-item-label">生成数量：</di>
      <el-input v-model="input" placeholder="Please input" />
    </div>
    <div class="submit-wrapper">
      <el-button type="primary">立即提交</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="ID" />
      <el-table-column fixed prop="date" label="仓库标识" />
      <el-table-column fixed prop="date" label="生成数量" />
      <el-table-column fixed prop="date" label="起始值(包含)" />
      <el-table-column fixed prop="date" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup name="StorageBatch">
import { reactive, toRefs } from 'vue'

const state = reactive({
  value: '',
  tableData: []
})

const { value, tableData } = toRefs(state)
</script>

<style lang="scss">
.batch-container {
  padding: 20px;

  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .submit-wrapper {
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss">
.batch-container {
  padding: 20px;

  .form-item {
    .el-input {
      width: 200px;
    }
  }
}
</style>
