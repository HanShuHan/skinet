export interface RegistryForm {
  userName: string
  email: string
  password: string
  displayName: string
  phoneNumber: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface User {
  email: string
  displayName: string
  phoneNumber: string
  address: Address
  token: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
