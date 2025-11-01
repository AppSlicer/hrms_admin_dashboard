import type {USER_ROLE} from "@/type/user/role.type.ts";

export interface IUser {
    id: string;
    name: string;
    role: USER_ROLE
}