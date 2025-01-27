export interface CreateUserDto {
  /** @default [] */
  roles: number[];
  personalInformation: Person;
  contacts: Contact;
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  password: string;
}

export interface Token {
  /** @default "" */
  token?: string;
}

export interface Session {
  /** @default "" */
  token: string;

  username: string;

  role?: string;

  attempts: number;

  status: string;

  active: boolean;
}

export interface Login {
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  password: string;

  role: string;
}

export interface ChangePassword {
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  oldPassword: string;
  /**
   * @maxLength 16
   * @default ""
   */
  newPassword: string;
}

export interface Person {
  name: Name;
  /** @default 0 */
  gender: string;
}

export interface Contact {
  /** @default "" */
  email: string;
}

export interface Name {
  /** @default "" */
  first: string;
  /** @default "" */
  last: string;
}
