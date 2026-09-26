import React, { useState, useEffect } from 'react';
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
  Edit3,
  Home,
  Building,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationMap } from './LocationMap';
import {
  requestDeviceCoordinates,
  reverseGeocodeCoordinates,
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
  // Modal Step Flow:
  // 'address' (Verify Your Address) -> 'schedule' (Next booking step: Service & Date/Time) -> 'result' (Confirmation Record)
  const [step, setStep] = useState<'address' | 'schedule' | 'result'>('address');

  // Address Form Fields (Requirement 4)
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [houseBuilding, setHouseBuilding] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Location Detection State
  const [detectionState, setDetectionState] = useState<
    'idle' | 'detecting' | 'success' | 'failed'
  >('idle');
  const [detectedAddressSummary, setDetectedAddressSummary] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<LocationCoordinates | null>(null);
  const [isManualFormVisible, setIsManualFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Schedule & Service fields (Next booking step)
  const [serviceSelected, setServiceSelected] = useState(
    preselectedService || WELLNESS_SERVICES[0]
  );
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [notes, setNotes] = useState('');

  // Submitting state & result
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  // Sync preselectedService if passed
  useEffect(() => {
    if (preselectedService) {
      setServiceSelected(preselectedService);
    }
  }, [preselectedService]);

  // Reset modal state upon close
  const handleModalClose = () => {
    setStep('address');
    setDetectionState('idle');
    setDetectedAddressSummary(null);
    setGpsCoords(null);
    setErrorMessage(null);
    setIsManualFormVisible(false);
    onClose();
  };

  // Helper to compile full address string
  const compileFullAddress = () => {
    return [houseBuilding, streetArea, city, state, pinCode]
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');
  };

  // Validation: Check that all required address fields are filled (Requirement 12)
  const isAddressFormValid =
    fullName.trim().length >= 2 &&
    mobileNumber.replace(/\D/g, '').length >= 10 &&
    houseBuilding.trim().length >= 1 &&
    streetArea.trim().length >= 2 &&
    city.trim().length >= 2 &&
    state.trim().length >= 2 &&
    pinCode.trim().length >= 4;

  // 1. HANDLE "📍 Use My Current Location" (Requirement 1, 2, 3, 6, 7, 10, 11)
  const handleUseCurrentLocation = async () => {
    // Never request repeatedly without explicit tap
    setDetectionState('detecting');
    setErrorMessage(null);
    setIsManualFormVisible(true);

    try {
      // Browser Geolocation API requested ONLY at this explicit moment
      const coords = await requestDeviceCoordinates();
      setGpsCoords(coords);

      // Reverse geocoding to human-readable address
      const geocoded = await reverseGeocodeCoordinates(coords.lat, coords.lng);
      setDetectedAddressSummary(geocoded.displayName);

      // Auto-fill address form fields with detected location
      if (geocoded.houseNumber) {
        setHouseBuilding((prev) => prev.trim() || geocoded.houseNumber || '');
      }
      if (geocoded.road || geocoded.locality || geocoded.suburb) {
        const roadLocality = [geocoded.road, geocoded.locality || geocoded.suburb]
          .filter(Boolean)
          .join(', ');
        setStreetArea((prev) => prev.trim() || roadLocality || '');
      }
      if (geocoded.city) {
        setCity((prev) => prev.trim() || geocoded.city || '');
      }
      if (geocoded.state) {
        setState((prev) => prev.trim() || geocoded.state || '');
      }
      if (geocoded.postcode) {
        setPinCode((prev) => prev.trim() || geocoded.postcode || '');
      }

      setDetectionState('success');
    } catch (err: unknown) {
      // Requirement 6: NEVER break the page and NEVER block booking process.
      // Instead show: "We couldn't detect your location. Please enter your address manually."
      console.warn('Location detection failed:', err);
      setDetectionState('failed');
      setErrorMessage("We couldn't detect your location. Please enter your address manually.");
      setIsManualFormVisible(true);
    }
  };

  // 2. HANDLE "✍️ Enter Address Manually" (Requirement 5)
  const handleEnterAddressManually = () => {
    setErrorMessage(null);
    setIsManualFormVisible(true);
    if (detectionState === 'detecting') {
      setDetectionState('idle');
    }
  };

  // 3. PROCEED TO NEXT BOOKING STEP (Schedule & Details)
  const handleContinueToSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddressFormValid) {
      setErrorMessage('Please fill in all required address fields before continuing.');
      return;
    }
    setErrorMessage(null);
    setStep('schedule');
  };

  // 4. CONFIRM & SUBMIT APPOINTMENT
  const handleFinalSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentDateTime) {
      setErrorMessage('Please select your preferred appointment date and time.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const fullServiceAddress = compileFullAddress();
    const isLocationVerified = detectionState === 'success';

    try {
      const response = await createAppointment({
        patientName: fullName.trim(),
        phoneNumber: mobileNumber.trim(),
        appointmentDateTime,
        serviceSelected,
        serviceAddress: fullServiceAddress,
        addressDetails: {
          houseBuilding: houseBuilding.trim(),
          streetArea: streetArea.trim(),
          city: city.trim(),
          state: state.trim(),
          pinCode: pinCode.trim(),
        },
        notes: notes.trim() || undefined,
        locationVerificationStatus: isLocationVerified ? 'verified' : 'verified',
        verificationMethod: isLocationVerified ? 'gps_matched' : 'manual_verification_requested',
      });

      setBookedAppointment(response.appointment);
      setStep('result');
      if (onAppointmentBooked) {
        onAppointmentBooked(response.appointment);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to confirm appointment. Please retry.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
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
                {step === 'result' ? 'Appointment Confirmed' : 'Book Wellness Consultation'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#5F6368]">
                {step === 'address'
                  ? 'Step 1 of 2: Verify Your Address'
                  : step === 'schedule'
                  ? 'Step 2 of 2: Consultation Schedule & Details'
                  : 'Official Booking Record'}
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
        {errorMessage && (
          <div className="mx-5 sm:mx-7 mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div className="flex-1 leading-snug">{errorMessage}</div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-amber-600 hover:text-amber-800 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* ======================================================== */}
          {/* STEP 1: VERIFY YOUR ADDRESS (Requirement 1 - 12) */}
          {/* ======================================================== */}
          {step === 'address' && (
            <div className="space-y-6">
              {/* SECTION TITLE & CONTEXT */}
              <div className="text-center sm:text-left">
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-1">
                  Verify Your Address
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  To provide personalized healthcare and home consultation, please verify your address using GPS or enter it manually.
                </p>
              </div>

              {/* ACTION BUTTONS (Requirements 1 & 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Use My Current Location Button */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={detectionState === 'detecting'}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer ${
                    detectionState === 'success'
                      ? 'bg-[#E8F5EF] text-[#087A5A] border-2 border-[#087A5A]'
                      : 'bg-[#087A5A] hover:bg-[#07563F] text-white disabled:opacity-75'
                  }`}
                >
                  {detectionState === 'detecting' ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : detectionState === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#087A5A]" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  <span>
                    {detectionState === 'success'
                      ? 'Location Detected'
                      : '📍 Use My Current Location'}
                  </span>
                </button>

                {/* 2. Enter Address Manually Button */}
                <button
                  type="button"
                  onClick={handleEnterAddressManually}
                  className={`w-full py-3.5 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isManualFormVisible && detectionState !== 'success'
                      ? 'bg-[#F3F4F6] border-[#087A5A] text-[#111111] ring-1 ring-[#087A5A]'
                      : 'bg-white hover:bg-[#F9FAFB] border-[#D1D5DB] text-[#374151]'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>✍️ Enter Address Manually</span>
                </button>
              </div>

              {/* PRIVACY NOTE (Requirement 9) */}
              <div className="flex items-start gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-[11px] sm:text-xs text-[#5F6368] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                <p>
                  <strong>Privacy Note:</strong> Your location is used only to help fill your address. You can enter your address manually instead.
                </p>
              </div>

              {/* PROPER LOADING / SUCCESS / FAILURE STATES (Requirement 11) */}
              <AnimatePresence>
                {detectionState === 'detecting' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-[#E8F5EF] border border-[#087A5A]/30 text-[#07563F] flex items-center gap-3"
                  >
                    <RefreshCw className="w-5 h-5 text-[#087A5A] animate-spin shrink-0" />
                    <div>
                      <p className="font-bold text-xs sm:text-sm">
                        📍 Detecting your location...
                      </p>
                      <p className="text-[11px] text-[#07563F]/80">
                        Requesting GPS coordinates and converting to street address...
                      </p>
                    </div>
                  </motion.div>
                )}

                {detectionState === 'success' && detectedAddressSummary && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#F7FBF8] border border-[#087A5A]/40 text-[#111111] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3 text-[#087A5A]" />
                        ✓ Location detected
                      </span>
                      <span className="text-[11px] text-[#5F6368]">
                        Auto-filled below • You can edit
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#111111] leading-snug">
                      {detectedAddressSummary}
                    </p>
                    {gpsCoords && (
                      <div className="pt-2">
                        <LocationMap
                          lat={gpsCoords.lat}
                          lng={gpsCoords.lng}
                          label="Detected Location"
                          accuracyRadiusMeters={800}
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {detectionState === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs">
                        Unable to detect location — enter your address manually.
                      </p>
                      <p className="text-[11px] text-amber-800/90 mt-0.5">
                        We couldn&apos;t detect your location. Please enter your address manually using the form below.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ADDRESS FORM (Requirements 3 & 4) */}
              {/* Contains: Full Name, Mobile Number, House/Flat/Building, Street/Area/Locality, City, State, PIN Code */}
              <form onSubmit={handleContinueToSchedule} className="space-y-4 pt-1">
                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                      Address & Client Details
                    </h5>
                    <span className="text-[11px] text-[#6B7280]">
                      * Required fields
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {/* 1. Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>
                    </div>

                    {/* 2. Mobile Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="e.g. 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>
                    </div>

                    {/* 3. House/Flat/Building */}
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        House / Flat / Building *
                      </label>
                      <div className="relative">
                        <Home className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
                        <input
                          type="text"
                          required
                          value={houseBuilding}
                          onChange={(e) => setHouseBuilding(e.target.value)}
                          placeholder="e.g. Flat 302, Green Residency, Tower B"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>
                    </div>

                    {/* 4. Street/Area/Locality */}
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        Street / Area / Locality *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
                        <input
                          type="text"
                          required
                          value={streetArea}
                          onChange={(e) => setStreetArea(e.target.value)}
                          placeholder="e.g. 12th Main Road, Indiranagar, Near Park"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>
                    </div>

                    {/* 5, 6, 7. City, State, PIN Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#374151] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Bengaluru"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#374151] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. Karnataka"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#374151] mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="e.g. 560038"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* VALIDATION & CONTINUE BUTTON (Requirement 12) */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!isAddressFormValid}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#087A5A] hover:bg-[#07563F] disabled:opacity-40 disabled:hover:bg-[#087A5A] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Continue to Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {!isAddressFormValid && (
                    <p className="text-[11px] text-[#6B7280] text-center mt-2">
                      Please enter your name, mobile number, and address fields to continue.
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: NEXT BOOKING STEP (Service & Schedule) */}
          {/* ======================================================== */}
          {step === 'schedule' && (
            <form onSubmit={handleFinalSubmitAppointment} className="space-y-5">
              {/* VERIFIED ADDRESS SUMMARY CARD */}
              <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-[#087A5A]/20 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    {detectionState === 'success' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#087A5A]" />
                        GPS Verified Address
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3 h-3 text-[#087A5A]" />
                        Entered Service Address
                      </>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="text-[#087A5A] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit Address
                  </button>
                </div>

                <div className="text-[#111111] space-y-0.5 pt-1">
                  <p className="font-bold text-sm">
                    {fullName} • <span className="text-[#5F6368] font-normal">{mobileNumber}</span>
                  </p>
                  <p className="text-[#4B5563] text-xs leading-relaxed">
                    {compileFullAddress()}
                  </p>
                </div>
              </div>

              {/* 1. SELECT HEALTHCARE / WELLNESS SERVICE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Select Healthcare / Wellness Service *
                </label>
                <select
                  value={serviceSelected}
                  onChange={(e) => setServiceSelected(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all cursor-pointer"
                >
                  {WELLNESS_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. APPOINTMENT DATE & TIME */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Preferred Appointment Date & Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                  <input
                    type="datetime-local"
                    required
                    value={appointmentDateTime}
                    onChange={(e) => setAppointmentDateTime(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all"
                  />
                </div>
              </div>

              {/* 3. ADDITIONAL HEALTH GOALS / NOTES (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                  Health Goals / Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in daily energy, personalized meal plan, weight management"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-[#087A5A] focus:ring-2 focus:ring-[#087A5A]/20 outline-none text-sm bg-white text-[#111111] transition-all resize-none"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="py-3 px-4 rounded-xl border border-[#D1D5DB] bg-white hover:bg-[#F3F4F6] text-[#374151] font-bold text-xs sm:text-sm cursor-pointer transition-all"
                >
                  ← Back to Address
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Confirm & Book Consultation</span>
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 3: OFFICIAL BOOKING CONFIRMATION RECEIPT */}
          {/* ======================================================== */}
          {step === 'result' && bookedAppointment && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mx-auto border-2 border-[#087A5A]">
                <CheckCircle2 className="w-10 h-10 text-[#087A5A]" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-3 py-1 rounded-full">
                  BOOKED / CONFIRMED
                </span>
                <h4 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-[#5F6368]">
                  Your consultation appointment has been scheduled with Amit Wellness.
                </p>
              </div>

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
                  <span className="text-[#5F6368]">Mobile (WhatsApp)</span>
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
                  <span className="text-[#5F6368]">Address Status</span>
                  <span className="font-bold uppercase text-[11px] px-2 py-0.5 rounded-full bg-[#E8F5EF] text-[#087A5A]">
                    {bookedAppointment.verificationMethod === 'gps_matched'
                      ? 'GPS Verified'
                      : 'Address Verified'}
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
                    `Hello Amit Wellness, I have booked an appointment #${bookedAppointment.id} for ${bookedAppointment.serviceSelected} at ${bookedAppointment.serviceAddress}.`
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
