<template>
  <div v-loading="loading" class="add-container">
    <div class="form-wrapper">
      <div class="form-item">
        <div class="form-item-label">创建时间：</div>
        <el-date-picker
          v-model="shijian"
          format="YYYY-MM-DD hh:mm:ss"
          type="datetime"
          placeholder="Pick a day"
        />
        <el-checkbox v-model="fixedShijian" label="固定" border />
      </div>
      <div class="form-item">
        <div class="form-item-label">所在仓库：</div>
        <el-select v-model="cangku" filterable placeholder="请选择仓库">
          <el-option
            v-for="item in warehouseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="form-item">
        <div class="form-item-label">重量：</div>
        <el-input
          @keyup.enter="handleWeightEnter"
          v-model="weight"
          placeholder="请输入重量"
        />
        <el-checkbox v-model="fixedZhongliang" label="固定" border />
      </div>
      <div class="form-item">
        <div class="form-item-label">识别码：</div>
        <el-select
          v-model="code"
          filterable
          remote
          reserve-keyword
          placeholder="请选择识别码"
          remote-show-suffix
          :remote-method="codeRemoteMethod"
          :loading="codeLoading"
        >
          <el-option
            v-for="item in codeList"
            :key="item.id"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </div>
      <div class="form-item">
        <div class="form-item-label">入库码：</div>
        <el-input
          @keyup.enter="handleScodeEnter"
          v-model="scode"
          placeholder="请输入重量"
          id="scode"
        />
      </div>
      <div class="form-item">
        <div class="form-item-label">美国境内单号：</div>
        <el-input
          @keyup.enter="handleNumberEnter"
          v-model="number"
          placeholder="请输入重量"
          id="number"
        />
        <div class="form-tips">单号已入库</div>
      </div>
      <div class="form-item">
        <div class="form-item-label">备注(选填)：</div>
        <el-input v-model="kf_message" placeholder="前台客服留言" />
        <div class="form-tips">单号已入库</div>
      </div>
    </div>
    <el-table :data="goodsList">
      <el-table-column label="SKU" width="150">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.sku"
            @keyup.enter="handleSkuEnter(row, $index)"
            :id="$index + '_sku'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品牌" width="150">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.brand"
            @keyup.enter="handleAutoFoucs"
            :id="$index + '_brand'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="货号" width="150">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.no"
            @keyup.enter="handleAutoFoucs"
            :id="$index + '_no'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品名" width="150">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.title"
            @keyup.enter="handleAutoFoucs"
            :id="$index + '_title'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="150">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.spec"
            @keyup.enter="handleAutoFoucs"
            :id="$index + '_spec'"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="150">
        <template #default="{ row }">
          <el-input v-model="row.category"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="原产地" width="150">
        <template #default="{ row }">
          <el-input v-model="row.source_area"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="150">
        <template #default="{ row }">
          <el-input v-model="row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="倍数" width="150">
        <template #default="{ row }">
          <el-input v-model="row.bs"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="350" align="center">
        <template #default="{ $index }">
          <el-button
            v-if="$index === 0"
            @click="handleAddItem"
            type="primary"
            size="default"
            >增加</el-button
          >
          <el-button
            v-if="goodsList.length > 1"
            @click="handleRemoveItem($index)"
            type="warning"
            size="default"
            >减少</el-button
          >
          <el-button
            @click="handleCopyItem($index)"
            type="success"
            size="default"
            >复制</el-button
          >
          <el-button
            @click="handleSaveItem($index)"
            type="primary"
            size="default"
            >保存</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="submit-wrapper">
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script setup name="StorageAdd">
import { reactive, toRefs, nextTick, onMounted } from 'vue'
import storageService from '@/api/storage-service'
import warehouseService from '@/api/warehouse-service'
import useAudioHook from '@/hooks/useAudioHook.js'

const audioHook = useAudioHook()

const state = reactive({
  loading: false,
  shijian: new Date().getTime(),
  fixedShijian: false,
  cangku: '',
  warehouseList: [],
  weight: 0.1,
  fixedZhongliang: false,
  codeLoading: false,
  code: '',
  codeList: [],
  scode: '',
  number: '',
  kf_message: '',
  goodsList: [
    {
      sku: '',
      brand: '',
      no: '',
      title: '',
      spec: '',
      category: '',
      source_area: '',
      price: '',
      bs: ''
    }
  ],
  checkNumberInfo: null
})

const {
  loading,
  shijian,
  fixedShijian,
  cangku,
  warehouseList,
  weight,
  fixedZhongliang,
  codeLoading,
  code,
  codeList,
  scode,
  number,
  kf_message,
  goodsList
} = toRefs(state)

const handleWeightEnter = () => {
  if (!state.weight) {
    state.weight = 0.1
  }
  document.getElementById(`scode`).focus()
}

const handleScodeEnter = () => {
  audioHook.successAudio()
  document.getElementById(`number`).focus()
}

const handleNumberEnter = () => {
  // 调用接口查询数据， 成功了展示预报信息并音乐提示，不存在文字提示
  handleAutoFoucs()
}

const codeRemoteMethod = (query) => {
  state.codeLoading = true
  storageService
    .addStorageStorageList({ code: query })
    .then(({ data }) => {
      state.codeList = data
    })
    .finally(() => {
      state.codeLoading = false
    })
}

const handleAutoFoucs = () => {
  nextTick(() => {
    for (let i = 0; i < state.goodsList.length; i++) {
      const item = state.goodsList[i]
      if (!item.sku) {
        document.getElementById(`${i}_sku`).focus()
        break
      } else if (!item.brand) {
        document.getElementById(`${i}_brand`).focus()
        break
      } else if (!item.no) {
        document.getElementById(`${i}_no`).focus()
        break
      } else if (!item.title) {
        document.getElementById(`${i}_title`).focus()
        break
      } else if (!item.spec) {
        document.getElementById(`${i}_spec`).focus()
        break
      }
    }
  })
}

const handleSkuEnter = (row, index) => {
  // 调用接口，当前sku存在，使用接口返回数据赋值，自动创建下一个item， 不存在音乐提示
  // 模拟成功
  if (row.sku === '2') {
    state.goodsList[index] = {
      id: 10665,
      sku: '2',
      brand: '2',
      no: '2',
      title: '2',
      spec: '2',
      category: '2',
      source_area: '',
      images: ''
    }
    handleAddItem()
    handleAutoFoucs()
    // 语音提示当前下标
  } else {
    // 语音提示该sku不存在
    if (row.sku) {
      handleAutoFoucs()
    }
  }

  // sku不存在
}

const handleAddItem = () => {
  state.goodsList.push({
    sku: '',
    brand: '',
    no: '',
    title: '',
    spec: '',
    category: '',
    source_area: '',
    price: '',
    bs: ''
  })
}

const handleRemoveItem = (index) => {
  state.goodsList.splice(index, 1)
}

const handleCopyItem = (index) => {
  const copyItem = JSON.parse(JSON.stringify(state.goodsList[index]))
  state.goodsList.push(copyItem)
}

const handleSaveItem = (index) => {
  console.log(index)
}

const initData = () => {
  state.loading = true
  warehouseService
    .addWarehouseWarehouseList({ pageNo: 1, pageSize: 50 })
    .then(({ data }) => {
      state.warehouseList = data
    })
    .finally(() => {
      state.loading = false
    })
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.add-container {
  padding: 20px;

  .form-wrapper {
    .form-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .form-item-label {
        width: 100px;
        text-align: right;
      }

      .form-tips {
        padding-left: 10px;
      }
    }
  }

  .submit-wrapper {
    padding: 20px 0;
  }
}
</style>

<style lang="scss">
.add-container {
  .form-item {
    .el-input {
      width: 200px;
    }

    .el-checkbox {
      margin-left: 10px;
    }
  }
}
</style>
