import { Model } from "./model.model";

export interface Car {
    carId: number;
    modelId: Model;
    carRegistration: string;
    pricePerDay: number;
}
