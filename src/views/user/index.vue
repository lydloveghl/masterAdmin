<script lang="ts" setup>
import { Search, ArrowDown, ArrowUp, Delete, Plus, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userListApi } from '@/api/user'
import { useRouter } from 'vue-router'
import type { userRes } from '@/types/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { delUserApi } from '@/api/user'
const router = useRouter()
const isShow = ref(false)
const formData = ref({
  pagenum: 1,
  pagesize: 10,
  username: '',
  mobile: '',
  role_name: '',
  created_at: '',
  updated_at: '',
})
const userList = ref([] as userRes[])
const allPage = ref()
const getUserList = async () => {
  const res = await userListApi(formData.value)
  console.log(res)
  allPage.value = res.data.total
  userList.value = res.data.list as unknown as userRes[]
}
getUserList()
const handleSizeChange = (val: number) => {
  formData.value.pagesize = val
  getUserList()
}
const handleCurrentChange = (val: number) => {
  formData.value.pagenum = val
  getUserList()
}
const resetForm = () => {
  formData.value = {
    pagenum: 1,
    pagesize: 10,
    username: '',
    mobile: '',
    role_name: '',
    created_at: '',
    updated_at: '',
  }
  getUserList()
}
const deleteUser = async (userInfo: userRes) => {
  const res = await ElMessageBox.confirm('确认删除该用户?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch((error) => error)
  if (res === 'cancel') return
  const result = await delUserApi(userInfo)
  if (result.data.state !== 200) {
    ElMessage.error(result.data.msg)
    return
  }
  ElMessage.success('删除成功')
  getUserList()
}
const dialogFormVisible = ref(false)
const formLabelWidth = '90px'
const editUserInfo = ref({
  username: '',
  password: '',
  mobile: '',
  avatar: '',
})
const editUserVisible = ref(false)
</script>
<template>
  <div>
    <el-card>
      <el-form :inline="true" class="searchForm">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" clearable v-model="formData.username" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" clearable v-model="formData.mobile" />
        </el-form-item>
        <el-form-item label="角色名" v-if="isShow">
          <el-input placeholder="请输入角色名" clearable v-model="formData.role_name" />
        </el-form-item>
        <el-form-item label="创建于" v-if="isShow">
          <el-date-picker
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="到"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
            v-model="formData.created_at"
          />
        </el-form-item>
        <el-form-item label="更新于" v-if="isShow">
          <el-date-picker
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="到"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
            v-model="formData.updated_at"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getUserList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button link key="primary" type="primary" @click="isShow = !isShow">
            {{ isShow ? '收起' : '展开' }}<el-icon v-if="!isShow"><ArrowDown /></el-icon
            ><el-icon v-else><ArrowUp /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="danger" :icon="Delete">批量删除</el-button>
          <el-button type="primary" :icon="Plus" @click="router.push('user/create')"
            >添加</el-button
          >
        </div>
      </template>
      <el-table :data="userList" style="width: 100%" max-height="250px" :border="true" fit="true">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column prop="user_id" label="编号" width="200" align="center" />
        <el-table-column prop="role_name" label="所属角色" width="200" align="center" />
        <el-table-column prop="avatar" label="头像" width="200" align="center">
          <template #default="{ row }">
            <el-avatar :src="row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="200" align="center" />
        <el-table-column prop="mobile" label="手机号" width="120" align="center" />
        <el-table-column prop="state" label="登录" width="120" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.state"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建于" width="200" align="center" />
        <el-table-column prop="updated_at" label="更新于" width="200" align="center" />
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="editUserVisible = true"
              plain
            ></el-button>
            <el-button type="success" size="small">分配角色</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="deleteUser(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="formData.pagenum"
        v-model:page-size="formData.pagesize"
        :page-sizes="[5, 10, 20, 50]"
        size="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog v-model="editUserVisible" title="用户编辑" width="800" draggable>
      <el-form :model="editUserInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editUserInfo.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="editUserInfo.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="editUserInfo.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <!--           <template v-slot="{ row }">
            <el-avatar shape="square" :size="50" :src="row.avatar" />
          </template> -->
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">立即编辑</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 重置 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
div {
  .searchForm {
    background-color: #fff;
    padding: 20px;
    .demo-form-inline .el-input {
      --el-input-width: 220px;
    }

    .demo-form-inline .el-select {
      --el-select-width: 220px;
    }
  }
}
.el-pagination {
  margin-top: 30px;
  align-items: center;
  justify-content: center;
}
</style>
