export interface User{
    name:string;
    email:string;
    roles?:Role[]
}

export interface Role{
    id:number,
    name:string
}