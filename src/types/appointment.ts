export type LocationVerificationStatus = 'verified' | 'pending' | 'failed' | 'unverified';

export type BookingStatus = 'CONFIRMED' | 'PENDING_MANUAL_VERIFICATION' | 'FAILED';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface GeocodedAddress {
  displayName: string;
  houseNumber?: string;
  road?: string;
  locality?: string;
  suburb?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface AddressFormFields {
  fullName: string;
  mobileNumber: string;
  houseBuilding: string;
  streetArea: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  appointmentDateTime: string;
  serviceSelected: string;
  serviceAddress: string;
  addressDetails?: {
    houseBuilding?: string;
    streetArea?: string;
    city?: string;
    state?: string;
    pinCode?: string;
  };
  notes?: string;
  locationVerificationStatus: LocationVerificationStatus;
  verificationTimestamp: string | null;
  verificationMethod: 'gps_matched' | 'manual_verification_requested' | 'unverified';
  bookingStatus: BookingStatus;
  distanceMeters?: number;
  createdAt: string;
}

export interface LocationVerificationResult {
  verified: boolean;
  status: LocationVerificationStatus;
  message: string;
  readableAddress?: string;
  distanceMeters?: number;
  verificationToken?: string;
  timestamp: string;
}
