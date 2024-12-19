export interface apiType<T> {
  state: number
  message: string
  data: T
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
