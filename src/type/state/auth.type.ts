import type {USER_ROLE} from "@/type/user/role.type.ts";

export interface AuthState {
    user: null | { id: string; name: string; role: USER_ROLE };
    token: string | null;
}