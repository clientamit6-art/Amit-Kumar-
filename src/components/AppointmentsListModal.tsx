import React, { useEffect, useState } from 'react';
import { X, Calendar, CheckCircle2, Clock, AlertTriangle, MapPin, RefreshCw, User, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Appointment } from '../types/appointment';
import { fetchAppointments } from '../services/appointmentService';

interface AppointmentsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNewClick?: () => void;
}

export const AppointmentsListModal: React.FC<AppointmentsListModalProps> = ({
  isOpen,
  onClose,
  onBookNewClick,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] overflow-hidden my-auto max-h-[90vh] flex flex-col text-[#111111]"
      >
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E5E7EB] bg-[#F7FBF8]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-[#087A5A]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#111111] leading-tight">
                Scheduled Appointments
              </h3>
              <p className="text-[11px] sm:text-xs text-[#5F6368]">
                Secure location verified healthcare & wellness bookings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-[#E5E7EB] text-[#5F6368] transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#5F6368] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
          {appointments.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-[#087A5A]" />
              </div>
              <p className="text-base font-bold text-[#111111]">No appointments booked yet</p>
              <p className="text-xs text-[#5F6368] max-w-sm mx-auto">
                Book a personalized wellness consultation with verified current location.
              </p>
              {onBookNewClick && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookNewClick();
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#087A5A] hover:bg-[#07563F] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Book New Appointment
                </button>
              )}
            </div>
          ) : (
            appointments.map((apt) => {
              const isVerified = apt.locationVerificationStatus === 'verified';
              return (
                <div
                  key={apt.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isVerified
                      ? 'border-[#087A5A]/20 bg-[#F7FBF8]'
                      : 'border-amber-200 bg-amber-50/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB]/80 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#6B7280]">
                        #{apt.id}
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#111111]">
                        {apt.serviceSelected}
                      </h4>
                    </div>
                    <span
                      className={`self-start sm:self-auto text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                        isVerified
                          ? 'bg-[#E8F5EF] text-[#087A5A]'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                          <span>CONFIRMED • LOCATION VERIFIED</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>PENDING MANUAL VERIFICATION</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#4B5563]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                      <span>{apt.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                      <span>{apt.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                      <span>
                        {new Date(apt.appointmentDateTime).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                      <span className="truncate">{apt.serviceAddress}</span>
                    </div>
                  </div>

                  {apt.verificationTimestamp && (
                    <div className="mt-3 pt-2.5 border-t border-[#E5E7EB]/60 flex items-center justify-between text-[11px] text-[#6B7280]">
                      <span>
                        Verified: {new Date(apt.verificationTimestamp).toLocaleDateString('en-IN')}
                      </span>
                      <span>Method: {apt.verificationMethod}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};
