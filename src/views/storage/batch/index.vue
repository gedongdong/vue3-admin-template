<template>
  <div v-loading="loading" class="batch-container">
    <div class="form-item">
      <div class="form-item-label">所在仓库：</div>
      <el-select v-model="wid" placeholder="Select" size="large">
        <el-option
          v-for="item in warehouseList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="form-item">
      <div class="form-item-label">生成数量：</div>
      <el-input v-model="num" placeholder="Please input" />
    </div>
    <div class="submit-wrapper">
      <el-button type="primary">立即提交</el-button>
    </div>
    <el-table :data="sorderScodeList" border height="500" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="wname" label="仓库标识" />
      <el-table-column prop="num" label="生成数量" />
      <el-table-column prop="start_value" label="起始值(包含)" />
      <el-table-column prop="end_value" label="结束值(包含)" />
      <el-table-column prop="create_at" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <div class="printer-wrapper">
            <svg-icon
              name="printer"
              class="printer-icon"
              :class="{ 'active-printer-icon': row.is_print }"
            />
            <div v-if="row.is_print">{{ row.is_print_text }}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <Pagination
        :total="total"
        v-model:page="listQuery.page"
        v-model:limit="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup name="StorageBatch">
import { reactive, toRefs, onMounted } from 'vue'
import warehouseService from '@/api/warehouse-service'
import storageService from '@/api/storage-service'

const state = reactive({
  loading: false,
  wid: '',
  num: '',
  warehouseList: [],
  sorderScodeList: [],
  listQuery: {
    page: 1,
    limit: 20
  },
  total: 0
})

const { loading, wid, num, warehouseList, sorderScodeList, listQuery, total } =
  toRefs(state)

const getList = () => {
  state.loading = true
  storageService
    .addStorageSorderScodeList({
      pageNo: state.listQuery.page,
      pageSize: state.listQuery.limit
    })
    .then(({ total, data }) => {
      state.total = total
      state.sorderScodeList = data
    })
    .finally(() => {
      state.loading = false
    })
}

const initData = () => {
  state.loading = true
  warehouseService
    .addWarehouseWarehouseList({ pageNo: 1, pageSize: 50 })
    .then(({ data }) => {
      state.warehouseList = data
      storageService
        .addStorageSorderScodeList({
          pageNo: state.listQuery.page,
          pageSize: state.listQuery.limit
        })
        .then(({ total, data }) => {
          state.total = total
          state.sorderScodeList = data
        })
        .finally(() => {
          state.loading = false
        })
    })
    .catch(() => {
      state.loading = false
    })
}
onMounted(() => {
  initData()
})
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

  .printer-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    .printer-icon {
      margin-right: 10px;

      &.active-printer-icon {
        color: #409eff;
      }
    }
  }

  .pagination-wrapper {
    padding: 20px 0;
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
