export enum DataStatus {
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    IDLE = "IDLE",
}

export interface userState {
    error: string | null;
    status: DataStatus;
    user: null | IUser;
}

export interface actionState {
    error: string | null;
    status: DataStatus;
    action: [] | IAction[];
}

export interface IUser {
    _id: string
    username: string
    password: string
    org: IOrg
    location?: string
}

export interface IOrg {
    name: string
    resources: []
    budget: number
}

export interface IAction {
    _id: string
    userAttackId: string
    missile: string
    speed: number
    area: string
    status: string
}
