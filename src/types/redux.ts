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
