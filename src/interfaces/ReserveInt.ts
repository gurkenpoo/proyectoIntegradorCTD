import { ProductInt } from "./ProductInt";
import { UserInt } from "./UserInt";

export interface ReserveInt {
  id: number;
  product: ProductInt;
  user: UserInt;
  reservedDates: string[];
}
