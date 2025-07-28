export interface Train {
  _id: string;
  number: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
}

export interface BookingData {
  _id: string;
  bookingId: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  departureTime: string;
  passengerName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  seatCount: number;
  travelDate: string;
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}