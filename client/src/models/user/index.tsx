import { AdminRoleType, UserStatus, UserTargetType } from "../../common/enum";
import { BaseModel } from "../common";

export interface User extends BaseModel {
  email: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  firstNameKata: string;
  lastNameKata: string;
  kataUserName: string;
  phone: string;
  companyName: string;
  companyNamePhonetic: string;
  postCode: string;
  note: string;
  roleType: AdminRoleType;
  targetType: UserTargetType;
  userStatus: UserStatus;
}
