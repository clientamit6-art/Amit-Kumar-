import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Calendar,
  Clock,
  User,
  Phone,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationMap } from './LocationMap';
import {
  requestDeviceCoordinates,
  reverseGeocodeCoordinates,
  geocodeAddressString,
  verifyLocationMatch,
} from '../services/locationService';
import { createAppointment } from '../services/appointmentService';
import { Appointment, LocationCoordinates } from '../types/appointment';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

const WELLNESS_SERVICES = [
  'Personal Nutrition & Wellness Consultation',
  'Home Wellness & Diet Assessment',
  'Body Composition & Weight Management',
  'Active Fitness & Sports Nutrition Guidance',
  'Preventive Lifestyle & Habit Coaching',
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onAppointmentBooked,
}) => {
  // Step state: 'details' -> 'verify_choice' -> 'gps_detect' -> 'manual_entry' -> 'matching' -> 'confirmed' | 'pending_manual'
  const [step, setStep] = useState<
    'details' | 'verify_choice' | 'gps_detect' | 'manual_entry' | 'matching' | 'result'
  >('details');

  // Form Fields
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [serviceSelected, setServiceSelected] = useState(
    preselectedService || WELLNESS_SERVICES[0]
  );
  const [serviceAddress, setServiceAddress] = useState('');
  const [manualInputAddress, setManualInputAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Location Verification State
  const [gpsCoords, setGpsCoords] = useState<LocationCoordinates | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [geocodedManualCoords, setGeocodedManualCoords] = useState<{
    lat: number;
    lng: number;
    displayName: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [locationVerificationStatus, setLocationVerificationStatus] = useState<
    'verified' | 'pending' | 'failed' | 'unverified'
  >('unverified');
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [verificationTimestamp, setVerificationTimestamp] = useState<string | null>(null);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  // Reset modal state
  const handleModalClose = () => {
    setStep('details');
    setErrorNotice(null);
    onClose();
  };

  // STEP 1: Proceed from Details to Location Verification
  const handleProceedToVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorNotice('Please enter the patient / client full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setErrorNotice('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!appointmentDateTime) {
      setErrorNotice('Please select your preferred appointment date and time.');
      return;
    }
    if (!serviceAddress.trim()) {
      setErrorNotice('Please enter the service destination address.');
      return;
    }

    setErrorNotice(null);
    setManualInputAddress(serviceAddress);
    setStep('verify_choice');
  };

  // STEP 3: Handle "Use Current Location"
  const handleUseCurrentLocation = async () => {
    setLoading(true);
    setErrorNotice(null);
    try {
      // 1. Request browser geolocation permission and get coordinates
      const coords = await requestDeviceCoordinates();
      setGpsCoords(coords);

      // 2. Convert coordinates into readable address using geocoding service
      const geocoded = await reverseGeocodeCoordinates(coords.lat, coords.lng);
      setDetectedAddress(geocoded.displayName);
      setStep('gps_detect');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Unable to retrieve your current location. Please verify your browser permissions.';
      setErrorNotice(msg);
      setLocationVerificationStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  // STEP 4: Handle "Enter Address Manually"
  const handleOpenManualEntry = () => {
    setErrorNotice(null);
    setStep('manual_entry');
  };

  // Geocode manually entered address and preview on map
  const handleGeocodeManualAddress = async () => {
    if (!manualInputAddress.trim() || manualInputAddress.trim().length < 4) {
      setErrorNotice('Please enter a complete address with street, locality, and city.');
      return;
    }

    setLoading(true);
    setErrorNotice(null);
    try {
      const result = await geocodeAddressString(manualInputAddress);
      setGeocodedManualCoords(result);
      setServiceAddress(result.displayName);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Address could not be located. Please check the spelling or add your city.';
      setErrorNotice(msg);
    } finally {
      setLoading(false);
    }
  };

  // Confirm Manual Address & Trigger Matching with GPS
  const handleConfirmManualLocation = async () => {
    if (!geocodedManualCoords) {
      setErrorNotice('Please locate your address first to preview on the map.');
      return;
    }

    setLoading(true);
    setErrorNotice(null);

    try {
      // Request device coordinates if not captured yet to compare
      let currentGps = gpsCoords;
      if (!currentGps) {
        try {
          currentGps = await requestDeviceCoordinates();
          setGpsCoords(currentGps);
        } catch {
          // GPS unavailable when verifying manually entered address
          setLocationVerificationStatus('failed');
          setErrorNotice(
            'Unable to verify your current location. Browser location permission is required to match your entered address.'
          );
          setLoading(false);
          return;
        }
      }

      // Perform matching between GPS and entered address
      await executeLocationMatching(currentGps, geocodedManualCoords.displayName);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Location matching encountered an error.';
      setErrorNotice(msg);
    } finally {
      setLoading(false);
    }
  };

  // Execute matching between GPS and target address (500m - 1000m threshold)
  const executeLocationMatching = async (
    coords: LocationCoordinates,
    addressToMatch: string
  ) => {
    setLoading(true);
    setErrorNotice(null);
    setStep('matching');

    try {
      const matchResult = await verifyLocationMatch(coords, addressToMatch);
      setVerificationTimestamp(matchResult.timestamp);
      setVerificationMessage(matchResult.message);

      if (matchResult.verified) {
        // Location Verified (Distance <= 1000m)
        setLocationVerificationStatus('verified');
        setServiceAddress(matchResult.readableAddress || addressToMatch);
      } else {
        // Location Verification Failed (Distance > 1000m or mismatch)
        // Rule 5: Do NOT reveal exact GPS coordinates to the user.
        setLocationVerificationStatus('failed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Location verification failed.';
      setLocationVerificationStatus('failed');
      setVerificationMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // User confirms detected GPS address
  const handleConfirmGpsAddress = async () => {
    if (!gpsCoords || !detectedAddress) return;
    setServiceAddress(detectedAddress);
    await executeLocationMatching(gpsCoords, detectedAddress);
  };

  // FINAL CONFIRMATION / CREATION OF APPOINTMENT
  // Enforces Rule 10: Appointment can only become BOOKED / CONFIRMED when locationVerificationStatus === "verified"
  const handleFinalSubmitAppointment = async (isManualRequest = false) => {
    setLoading(true);
    setErrorNotice(null);

    const statusToSubmit = isManualRequest ? 'pending' : locationVerificationStatus;

    try {
      const response = await createAppointment({
        patientName,
        phoneNumber,
        appointmentDateTime,
        serviceSelected,
        serviceAddress,
        notes,
        locationVerificationStatus: statusToSubmit,
        verificationMethod: isManualRequest
          ? 'manual_verification_requested'
          : 'gps_matched',
      });

      setBookedAppointment(response.appointment);
      setStep('result');
      if (onAppointmentBooked) {
        onAppointmentBooked(response.appointment);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to finalize appointment.';
      setErrorNotice(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#111111]"
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E5E7EB] bg-[#F7FBF8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-[#087A5A]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#111111] leading-tight">
                {step === 'result' ? 'Appointment Status' : 'Book Wellness Consultation'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#5F6368]">
                {step === 'details'
                  ? 'Step 1 of 2: Patient & Service Information'
                  : step === 'result'
                  ? 'Official Booking Record'
                  : 'Step 2 of 2: Secure Location Verification'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleModalClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#5F6368] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ERROR / FEEDBACK NOTICE */}
        {errorNotice && (
          <div className="mx-5 sm:mx-7 mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <div className="flex-1 leading-snug">{errorNotice}</div>
            <button
              type="button"
              onClick={() => setErrorNotice(null)}
              className="text-red-500 hover:text-red-700 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* ======================================================== */}
          {/* STEP 1: APPOINTMENT DETAILS FORM */}
          {/* ======================================================== */}
          {step === 'details' && (
            <form onSubmit={handleProceedToVerification} className="space-y-4">
              <div className="bg-[#E8F5EF]/60 border border-[#087A5A]/15 rounded-2xl p-4 text-xs text-[#07563F] leading-relaxed">
                <p className="font-semibold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#087A5A]" />
                  Direct Consultation with Amit Wellness
                </p>
                Provide your details for in-person or home wellness guidance. Current location verification is required before confirmation.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Patient / Client Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                    Appointment Date & Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                    <input
                      type="datetime-local"
                      required
                      value={appointmentDateTime}
                      onChange={(e) => setAppointmentDateTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Select Healthcare / Wellness Service *
                </label>
                <select
                  value={serviceSelected}
                  onChange={(e) => setServiceSelected(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white"
                >
                  {WELLNESS_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Service Address (Home / Clinic / Workplace) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                  <textarea
                    rows={2}
                    required
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="Enter complete street address, apartment/house no., area, and city"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Additional Health Goals / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in daily energy, digestive nutrition, weight loss"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm transition-all bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Continue to Location Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2: VERIFY YOUR LOCATION SELECTION SCREEN */}
          {/* ======================================================== */}
          {step === 'verify_choice' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mx-auto border-2 border-[#087A5A]/20 shadow-xs">
                <MapPin className="w-8 h-8 text-[#087A5A]" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-2">
                  Verify Your Location
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-md mx-auto">
                  To provide home/nearby healthcare services, please verify your current location.
                </p>
              </div>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 text-left space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-[#4B5563]">
                  <ShieldCheck className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                  <p>
                    <strong>Your location is used only to confirm</strong> that the appointment address matches your current location.
                  </p>
                </div>
                <div className="text-[11px] text-[#6B7280] italic pl-6 border-l-2 border-[#087A5A]/30">
                  Privacy note: Location access is used only for appointment verification and requires your permission.
                </div>
              </div>

              {/* Two Choice Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#087A5A] hover:bg-[#07563F] disabled:opacity-60 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  <span>Use Current Location</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenManualEntry}
                  className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#D1D5DB] text-[#111111] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Enter Address Manually</span>
                </button>
              </div>

              {/* Fallback button if user has GPS restrictions */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => handleFinalSubmitAppointment(true)}
                  className="text-xs text-[#5F6368] hover:text-[#087A5A] underline font-medium cursor-pointer"
                >
                  GPS restricted? Request Manual Verification instead
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: GPS DETECTED CONFIRMATION SCREEN */}
          {/* ======================================================== */}
          {step === 'gps_detect' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#E8F5EF] text-[#07563F]">
                <CheckCircle2 className="w-6 h-6 text-[#087A5A] shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Device GPS Coordinates Acquired</p>
                  <p className="text-[11px] text-[#07563F]/80">Converted to verified street address via geocoding service.</p>
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 bg-[#F9FAFB] space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                  Detected Address
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#111111] leading-snug pt-1">
                  {detectedAddress || 'Locating address...'}
                </p>
              </div>

              {gpsCoords && (
                <LocationMap
                  lat={gpsCoords.lat}
                  lng={gpsCoords.lng}
                  label="Your Current Position"
                  accuracyRadiusMeters={800}
                />
              )}

              <div className="text-center pt-1">
                <p className="font-bold text-base sm:text-lg text-[#111111] mb-4">
                  Is this your current location?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmGpsAddress}
                    disabled={loading}
                    className="py-3 px-5 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                    <span>Yes, Continue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('manual_entry')}
                    className="py-3 px-5 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#D1D5DB] text-[#374151] font-bold text-sm transition-all cursor-pointer"
                  >
                    Change Location
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: MANUAL ADDRESS ENTRY & MAP DISPLAY */}
          {/* ======================================================== */}
          {step === 'manual_entry' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#111111] mb-1">
                  Enter Service Address
                </h4>
                <p className="text-xs sm:text-sm text-[#5F6368]">
                  Enter your address, view it on the map, and confirm your location for anti-fraud verification.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                  Service Address *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualInputAddress}
                    onChange={(e) => setManualInputAddress(e.target.value)}
                    placeholder="Enter street, area, city, and PIN code"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleGeocodeManualAddress}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    <span>Locate</span>
                  </button>
                </div>
              </div>

              {geocodedManualCoords && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#E8F5EF]/60 rounded-xl border border-[#087A5A]/20 text-xs text-[#07563F]">
                    <span className="font-bold">Geocoded Location: </span>
                    {geocodedManualCoords.displayName}
                  </div>

                  <LocationMap
                    lat={geocodedManualCoords.lat}
                    lng={geocodedManualCoords.lng}
                    label={geocodedManualCoords.displayName}
                    accuracyRadiusMeters={800}
                  />

                  <div className="p-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] text-center space-y-3">
                    <p className="text-sm font-bold text-[#111111]">
                      Please confirm that this is your current location.
                    </p>
                    <p className="text-[11px] text-[#5F6368]">
                      Your browser will verify that your device is within the 1 km threshold radius of this address.
                    </p>

                    <button
                      type="button"
                      onClick={handleConfirmManualLocation}
                      disabled={loading}
                      className="w-full py-3 px-5 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                      <span>Confirm & Match Location</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setStep('verify_choice')}
                  className="text-[#5F6368] hover:text-[#111111] underline cursor-pointer"
                >
                  ← Back to verification choices
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalSubmitAppointment(true)}
                  className="text-[#087A5A] font-semibold hover:underline cursor-pointer"
                >
                  Request Manual Verification
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 5: MATCHING & VERIFICATION STATUS RESULT */}
          {/* ======================================================== */}
          {step === 'matching' && (
            <div className="space-y-6 text-center py-2">
              {locationVerificationStatus === 'verified' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mx-auto border-2 border-[#087A5A]">
                    <CheckCircle2 className="w-10 h-10 text-[#087A5A]" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-extrabold text-[#087A5A] tracking-tight mb-2">
                      ✓ Location Verified
                    </h4>
                    <p className="text-base text-[#111111] font-semibold">
                      Your location has been successfully verified.
                    </p>
                    <p className="text-xs text-[#5F6368] mt-1">
                      GPS proximity match confirmed within standard accuracy threshold.
                    </p>
                  </div>

                  <div className="bg-[#F7FBF8] border border-[#087A5A]/20 rounded-2xl p-4 text-left text-xs space-y-2">
                    <p className="text-[#374151]">
                      <strong>Verified Service Address:</strong>
                    </p>
                    <p className="text-[#111111] font-medium leading-snug">
                      {serviceAddress}
                    </p>
                    {verificationTimestamp && (
                      <p className="text-[11px] text-[#6B7280]">
                        Timestamp: {new Date(verificationTimestamp).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>

                  {/* Anti-fraud disclaimer (Rule 6) */}
                  <p className="text-[11px] text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                    Note: GPS verification confirms that the device was near the provided location at the time of booking. It does not certify legal residence or property ownership.
                  </p>

                  <button
                    type="button"
                    onClick={() => handleFinalSubmitAppointment(false)}
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                    <span>Continue to Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border-2 border-red-300">
                    <AlertTriangle className="w-9 h-9 text-red-600" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-extrabold text-red-600 tracking-tight mb-2">
                      Location verification failed
                    </h4>
                    <p className="text-sm sm:text-base text-[#374151] leading-relaxed max-w-md mx-auto">
                      The entered address does not appear to match your current location. Please use your current location or enter the correct address.
                    </p>
                  </div>

                  <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 text-xs text-red-800 text-left space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-red-600" />
                      Anti-Fraud Distance Check
                    </p>
                    <p>
                      Our verification system detected that your device is located outside the 1 km threshold radius of the specified address.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('verify_choice')}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Use Current Location or Re-verify</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFinalSubmitAppointment(true)}
                      className="w-full py-3 px-6 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#D1D5DB] text-[#374151] font-bold text-sm cursor-pointer"
                    >
                      Request Manual Verification
                    </button>
                  </div>

                  <p className="text-[11px] text-[#6B7280]">
                    Manual verification will send your appointment into a pending state instead of automatically confirming it.
                  </p>
                </>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 6: FINAL BOOKED / PENDING CONFIRMATION RECEIPT */}
          {/* ======================================================== */}
          {step === 'result' && bookedAppointment && (
            <div className="space-y-6 text-center">
              {bookedAppointment.bookingStatus === 'CONFIRMED' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mx-auto border-2 border-[#087A5A]">
                    <FileCheck2 className="w-10 h-10 text-[#087A5A]" />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-3 py-1 rounded-full">
                      BOOKED / CONFIRMED
                    </span>
                    <h4 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
                      Appointment Confirmed!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5F6368]">
                      Your location was securely verified. Your consultation is officially scheduled.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-300">
                    <Clock className="w-10 h-10 text-amber-600" />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      STATUS: PENDING MANUAL VERIFICATION
                    </span>
                    <h4 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
                      Request Submitted
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5F6368]">
                      Our healthcare coordinator will call you to manually verify your location before home service.
                    </p>
                  </div>
                </>
              )}

              {/* Booking Summary Card */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Appointment ID</span>
                  <span className="font-mono font-bold text-[#111111]">
                    {bookedAppointment.id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Patient Name</span>
                  <span className="font-semibold text-[#111111]">
                    {bookedAppointment.patientName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Phone (WhatsApp)</span>
                  <span className="font-semibold text-[#111111]">
                    {bookedAppointment.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Service</span>
                  <span className="font-semibold text-[#087A5A]">
                    {bookedAppointment.serviceSelected}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Date & Time</span>
                  <span className="font-semibold text-[#111111]">
                    {new Date(bookedAppointment.appointmentDateTime).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#5F6368]">Location Status</span>
                  <span
                    className={`font-bold uppercase text-[11px] px-2 py-0.5 rounded-full ${
                      bookedAppointment.locationVerificationStatus === 'verified'
                        ? 'bg-[#E8F5EF] text-[#087A5A]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {bookedAppointment.locationVerificationStatus}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-[#5F6368] block text-[11px]">Service Destination:</span>
                  <span className="font-medium text-[#111111] text-xs">
                    {bookedAppointment.serviceAddress}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Share or Done */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/916398331007?text=${encodeURIComponent(
                    `Hello Amit Wellness, I have booked appointment #${bookedAppointment.id} for ${bookedAppointment.serviceSelected}. Location verification status: ${bookedAppointment.locationVerificationStatus}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#D1D5DB] text-[#111111] font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
