import { Role } from "./role.model";

export interface User {
    userId: number;
    roleId: Role;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: string;
    picture: string;
}
