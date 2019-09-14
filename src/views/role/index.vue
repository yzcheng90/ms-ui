<template>
  <div class="app-container">
    <div v-show="showList">
      <div class="filter-container">
        <el-input v-model="listQuery.title" prefix-icon="el-icon-search" placeholder="请输入内容" style="width: 200px;" class="filter-item" />
        <el-button type="primary" size="medium" round @click="search">搜索</el-button>
        <el-button type="primary" size="medium" round @click="showAdd">创建角色</el-button>
      </div>
      <br>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="角色名称" width="200">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column label="备注" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建者" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.createUserId }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
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
    <div v-show="!showList" class="panel panel-default">
      <el-form ref="form" :model="roleEntity" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleEntity.roleName" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roleEntity.remark" type="textarea" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="配置权限">
          <el-transfer
            v-model="permissionValue"
            :titles="['未选择', '已选择']"
            :data="permissionList">
          </el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button  @click="onClear">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import { getPermissionList } from '@/api/permission'

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
      roleEntity: {
        roleName: '',
        remark: ''
      },
      permissionList: [],
      permissionValue: [],
      showList: true,
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
      },
      queryPermission: {
        current: 1,
        size: 1000
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRoleList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    showAdd() {
      this.showList = false
      this.permissionList = []
      getPermissionList(this.queryPermission).then(response => {
        let permissions = response.data.records
        for (let i = 0; i < permissions.length; i++) {
          this.permissionList.push({
            key: permissions[i].id,
            label: permissions[i].permission + '[' + permissions[i].url + ']'
          })
        }
      })
    },
    search() {
      console.log('------1---------------')
    },
    onSubmit() {
      console.log('------1---------------')
    },
    onClear() {
      this.showList = true
    }
  }
}
</script>
