import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RestaurantInfo {
    hours: string;
    name: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    getRestaurantInfo(): Promise<RestaurantInfo>;
}
