import { FURNITURE_TYPE_ENUM } from "@/constants";

export type PriceCalculation = {
  leg: number;
  price: number;
} & (RectangleCalculation | CircularCalculation);

export interface RectangleCalculation {
  type:
    | FURNITURE_TYPE_ENUM.LONG
    | FURNITURE_TYPE_ENUM.GATE
    | FURNITURE_TYPE_ENUM.TEA;
  width: number;
  length: number;
}

export interface CircularCalculation {
  type: FURNITURE_TYPE_ENUM.ROUND;
  diameterLong: number;
  diameterSmall: number;
}
