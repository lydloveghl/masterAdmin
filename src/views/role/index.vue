<script lang="ts" setup>
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getRoleList, deleteRoleApi, updateRoleApi, assignAuthApi } from '@/api/role'
import type { roleListType } from '@/types/user'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance } from 'element-plus'
import { getAuthListApi } from '@/api/auth'
import { ElTree } from 'element-plus'
import { get } from 'http'
const router = useRouter()
const searchInfo = ref({
  roleName: '',
})
const roleForm = ref({
  pagenum: 1,
  pagesize: 10,
  role_name: '',
})
const roleListInfo = ref([] as roleListType[])
const get_role_list = async () => {
  const res = await getRoleList(roleForm.value)
  roleListInfo.value = res.data.list
}
get_role_list()
const onSearch = () => {
  roleForm.value.role_name = searchInfo.value.roleName
  get_role_list()
}
const handleSizeChange = (pageSize: number) => {
  roleForm.value.pagesize = pageSize
  get_role_list()
}
const handleCurrentChange = (pagenum: number) => {
  roleForm.value.pagenum = pagenum
  get_role_list()
}
const deleteRole = async (userInfo: any) => {
  const res = await deleteRoleApi(userInfo)
  if (res.data.state !== 200) {
    ElMessage.error(res.data.msg)
    return
  }
  ElMessage.success('删除成功')
  get_role_list()
}
const dialogFormVisible = ref(false)
const upDateRoleForm = ref({
  role_name: '',
  role_desc: '',
})
const updateRoleRule = {
  role_name: { required: true, message: '请编辑角色名称', trigger: 'blur' },
}
const editRole = (row: any) => {
  dialogFormVisible.value = true
  upDateRoleForm.value = row
}
const upDateFormRef = ref<FormInstance>()
const updateRoleInfo = async () => {
  await upDateFormRef.value?.validate(async (valid) => {
    if (!valid) {
      ElMessage.error('请填写正确的信息')
      return
    } else {
      const res = await updateRoleApi(upDateRoleForm.value)
      console.log(res)
      if (res.data.state !== 200) {
        ElMessage.error(res.data.msg)
        return
      } else {
        ElMessage.success('编辑成功')
        dialogFormVisible.value = false
      }
    }
  })
}
const resetUpdateForm = () => {
  upDateFormRef.value?.resetFields()
}
const assignAuthVisible = ref(false)
const assignAuth = (row: any) => {
  assignAuthVisible.value = true
  assignAuthInfo.value.role_name = row.role_name
  assignAuthInfo.value.role_id = row.role_id
  assignAuthInfo.value.auth_ids = row.auth_ids
  assignAuthInfo.value.auth_ids_son = row.auth_ids_son
}
const userAuthList = ref()
const getAuthList = async () => {
  const res = await getAuthListApi()
  userAuthList.value = res.data.data
}
getAuthList()
const assignAuthInfo = ref({
  role_name: '',
  role_id: '',
  auth_ids: '',
  auth_ids_son: '',
})
const treeRef = ref()
const updateAuth = async () => {
  const res = await treeRef.value!.getCheckedNodes()
  console.log(res)
  const auth_ids = [] as number[]
  const auth_ids_son = [] as number[]
  res.forEach((item: any) => {
    if (item.auth_pid !== 0) auth_ids_son.push(item.auth_id)
    if (item.auth_pid !== 0) {
      auth_ids.push(item.auth_id)
      auth_ids.push(item.auth_pid)
    }
  })
  assignAuthInfo.value.auth_ids_son = auth_ids_son.join()
  assignAuthInfo.value.auth_ids = [...new Set(auth_ids)].join()
  const assignAuthRes = await assignAuthApi(assignAuthInfo.value)
  if (assignAuthRes.data.state !== 200) return ElMessage.error(assignAuthRes.data.msg)
  ElMessage.success(assignAuthRes.data.msg)
  assignAuthVisible.value = false
  get_role_list()
}
</script>
<template>
  <div class="roleList">
    <el-card style="width: 100%">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="searchInfo.roleName" placeholder="请输入角色名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :icon="Search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="width: 100%; margin-top: 10px">
      <template #header>
        <div class="card-header">
          <span>
            <el-button :icon="Delete" type="danger">批量删除</el-button>
            <el-button :icon="Plus" type="primary" @click="router.push('/role/create')"
              >添加</el-button
            >
          </span>
        </div>
      </template>
      <el-table :data="roleListInfo" style="width: 100%" border>
        <el-table-column fixed type="selection" />
        <el-table-column prop="role_id" label="角色编号" width="180" align="center" />
        <el-table-column prop="role_name" label="角色名称" width="180" align="center" />
        <el-table-column prop="role_desc" label="角色描述" width="180" align="center" />
        <el-table-column prop="created_at" label="创建于" width="280" align="center" />
        <el-table-column prop="updated_at" label="更新于" width="280" align="center" />
        <el-table-column fixed="right" label="操作" min-width="290" align="center">
          <template #default="{ row }">
            <el-button :icon="Edit" type="primary" plain @click="editRole(row)"></el-button>
            <el-button type="success" @click="assignAuth(row)">分配权限</el-button>
            <el-button :icon="Delete" type="danger" @click="deleteRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="roleForm.pagenum"
        v-model:page-size="roleForm.pagesize"
        :page-sizes="[5, 10, 20, 40]"
        size="default"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="角色编辑" width="700">
      <el-form :model="upDateRoleForm" :rules="updateRoleRule" ref="upDateFormRef">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="upDateRoleForm.role_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色介绍" prop="role_desc">
          <el-input v-model="upDateRoleForm.role_desc"> </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateRoleInfo">立即编辑</el-button>
          <el-button type="primary" @click="resetUpdateForm"> 重置 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="assignAuthVisible" direction="rtl" v-if="assignAuthVisible === true">
      <template #header>
        <h1>分配权限</h1>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="角色名称">
            <el-input v-model="assignAuthInfo.role_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="菜单权限">
            <template #default>
              <el-tree
                style="max-width: 600px"
                :data="userAuthList"
                :props="{ label: 'auth_name', children: 'children' }"
                node-key="auth_id"
                :default-checked-keys="assignAuthInfo.auth_ids_son.split(',')"
                show-checkbox
                :height="208"
                ref="treeRef"
              />
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateAuth">立即分配</el-button
            ><el-button @click="assignAuthVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped></style>
