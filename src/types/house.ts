export interface IHouse {
  _id?: string;
  name: string;
  location: string;
  description: string;
  amount: number;
  district : string;
  landlordId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  rooms: string;
  imageUrl: string[];
  amenities: string[];
}
