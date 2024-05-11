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
  address?: Address
  token: string
}

export class Address {

  street: string | null = null
  city: string | null = null
  state: string | null = null
  zipCode: string | null = null
  country: string | null = null

  constructor() {
  }

  equals(address: Address) {
    return (this.street === address.street)
      && (this.city === address.city)
      && (this.state === address.state)
      && (this.zipCode === address.zipCode)
      && (this.country === address.country);
  }

  static empty() {
    return new Address();
  }
}
