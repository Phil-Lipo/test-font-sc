export interface IBooking {
    id: String;
    start: string;
    end: String;
    name: String;
    userId: String;
}

export const bookingDefault: IBooking = {
    id: "",
    start: "",
    end: "",
    name: "",
    userId: "",
  }