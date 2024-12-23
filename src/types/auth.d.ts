export interface getAuthListRes {
  data: AuthList[]
  msg: string
  state: number
}
export interface AuthList {
  auth_id: number
  icon: string
  auth_name: string
  path: string
  type: number
  auth_pid: number
  auth_pname: string
  keep_alive: number
  component: string
  sort: number
  created_at: string
  updated_at: string
  children: Children[]
}
export interface Children {
  auth_id: number
  icon: string
  auth_name: string
  path: string
  type: number
  auth_pid: number
  auth_pname: string
  keep_alive: number
  component: string
  sort: number
  created_at: string
  updated_at: string
}
