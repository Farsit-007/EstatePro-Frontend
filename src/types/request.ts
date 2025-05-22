import { IHouse } from "./house";
import { IUser } from "./user";

export interface TRequest {
  _id: string;
  houseId: IHouse;
  tenantId: IUser;
  status: "pending" | "approved" | "rejected";
  requirement: string;
  moveInDate: string;
  rentalDuration: string;
  landlordPhone: string | null;
  paymentStatus: "Paid" | "Pending" | "Failed" | null;
}
