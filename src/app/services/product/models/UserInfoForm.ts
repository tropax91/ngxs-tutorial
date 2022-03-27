import { UserInfoData } from "../../profile/UserInfoResult";

export interface UserInfoForm {
    model?: UserInfoData,
    dirty: boolean,
    status: string,
    errors: any
}