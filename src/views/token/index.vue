<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Token令牌" width="310">
        <template slot-scope="scope">
          {{ scope.row.token }}
        </template>
      </el-table-column>
      <el-table-column label="过期时间" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.expiration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="客户端ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.clientId }}
        </template>
      </el-table-column>
      <el-table-column  label="认证模式" class-name="small-padding fixed-width" align="center">
        <template slot-scope="scope">
          {{ scope.row.grantType }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="限流等级" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.limitLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getTokenList } from '@/api/token'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        current: 1,
        size: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTokenList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
