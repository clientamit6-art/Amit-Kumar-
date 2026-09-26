import { Appointment, LocationVerificationStatus, BookingStatus } from '../types/appointment';

const LOCAL_STORAGE_KEY = 'amit_wellness_appointments_records';

export interface CreateAppointmentInput {
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
  verificationMethod: 'gps_matched' | 'manual_verification_requested' | 'unverified';
}

function getLocalAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading localStorage appointments:', e);
  }
  return [];
}

function saveLocalAppointments(list: Appointment[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving localStorage appointments:', e);
  }
}

export async function createAppointment(input: CreateAppointmentInput): Promise<{
  success: boolean;
  appointment: Appointment;
  message: string;
}> {
  // FINAL BOOKING RULE (Rule 10):
  // The appointment can ONLY become BOOKED / CONFIRMED when locationVerificationStatus === "verified"
  // Otherwise: locationVerificationStatus === "pending" or "failed", and bookingStatus === "PENDING_MANUAL_VERIFICATION"
  const isVerified = input.locationVerificationStatus === 'verified';
  const resolvedBookingStatus: BookingStatus = isVerified
    ? 'CONFIRMED'
    : 'PENDING_MANUAL_VERIFICATION';

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.appointment) {
        // Also sync local storage
        const current = getLocalAppointments();
        saveLocalAppointments([data.appointment, ...current.filter((a) => a.id !== data.appointment.id)]);
        return data;
      }
    }
  } catch (err) {
    console.warn('API appointment submission fallback to local store:', err);
  }

  // Local fallback if API is not available
  const newAppointment: Appointment = {
    id: `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    patientName: input.patientName.trim(),
    phoneNumber: input.phoneNumber.trim(),
    appointmentDateTime: input.appointmentDateTime,
    serviceSelected: input.serviceSelected,
    serviceAddress: input.serviceAddress.trim(),
    addressDetails: input.addressDetails,
    notes: input.notes?.trim(),
    locationVerificationStatus: isVerified ? 'verified' : 'pending',
    verificationTimestamp: new Date().toISOString(),
    verificationMethod: input.verificationMethod,
    bookingStatus: resolvedBookingStatus,
    createdAt: new Date().toISOString(),
  };

  const current = getLocalAppointments();
  saveLocalAppointments([newAppointment, ...current]);

  return {
    success: true,
    appointment: newAppointment,
    message: isVerified
      ? 'Appointment successfully confirmed with verified current location!'
      : 'Appointment submitted and pending manual location verification by our healthcare coordinator.',
  };
}

export async function fetchAppointments(): Promise<Appointment[]> {
  try {
    const res = await fetch('/api/appointments');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.appointments)) {
        return data.appointments;
      }
    }
  } catch {
    // fallback to local
  }
  return getLocalAppointments();
}
