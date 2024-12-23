export interface apiType<T> {
  state: number
  message: string
  data?: T
  total?: T
  list?: T
}
export interface loginData {
  avatar: string
  mobile: string
  role_name: string
  token: string
  username: string
}
export interface loginType {
  username: string
  password: string
}
export interface userListType {
  pagenum: number
  pagesize: number
  username: string
  mobile: string
  role_name: string
  created_at: string
  updated_at: string
}
export interface userRes {
  role_id: number
  role_name: string
  state: number
  avatar: string
  wx_state: number
  user_id: number
  email: string
  username: string
  passwd_question: string
  passwd_answer: string
  sex: string
  mobile: string
  created_at: string
  updated_at: string
  last_time: string
  auth_ids: string
}
export interface userAddType {
  username: string
  password: string
  mobile: string
}

export interface roleListType {
  role_id: number
  role_name: string
  action_list: string
  role_desc: string
  created_at: string
  updated_at: string
  auth_ids: string
  auth_ids_son: string
}
export interface roleListRes {
  msg: string
  state: number
  total: number
  list: roleListType[]
}
export interface roleCreateRes {
  data: null
  msg: string
  state: number
}
