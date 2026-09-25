export type ReservationState = {
  pickup?: string;
  pickupAddress?: string;
  pickupLat?: number;
  pickupLng?: number;

  destination?: string;
  destinationAddress?: string;
  destinationLat?: number;
  destinationLng?: number;

  date?: string;
  time?: string;
  passengerCount?: number;
};