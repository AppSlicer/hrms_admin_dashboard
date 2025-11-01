import type {IUser} from "@/type/state/user.type.ts";

export interface AuthState {
    user: null | IUser;
    token: string | null;
}