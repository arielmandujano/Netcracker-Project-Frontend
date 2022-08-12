import { Authotiry } from "./authority.model";

export interface JwtDto {
    token: string;
    type: string;
    username: string;
    authorities: Authotiry[];
}
