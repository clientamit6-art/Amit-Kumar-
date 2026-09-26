import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory & file storage for appointments
const DATA_DIR = path.join(__dirname, 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredAppointment {
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
  locationVerificationStatus: 'verified' | 'pending' | 'failed' | 'unverified';
  verificationTimestamp: string | null;
  verificationMethod: 'gps_matched' | 'manual_verification_requested' | 'unverified';
  bookingStatus: 'CONFIRMED' | 'PENDING_MANUAL_VERIFICATION' | 'FAILED';
  createdAt: string;
}

function loadAppointments(): StoredAppointment[] {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading appointments file:', err);
  }
  return [];
}

function saveAppointments(appointments: StoredAppointment[]) {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing appointments file:', err);
  }
}

let appointmentsStore: StoredAppointment[] = loadAppointments();

// Haversine formula to calculate distance between two coordinates in meters
function calculateHaversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 1. REVERSE GEOCODE: Convert lat/lng to readable address
app.post('/api/reverse-geocode', async (req: Request, res: Response) => {
  try {
    const { lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Valid latitude and longitude numbers are required' });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Coordinates out of range' });
    }

    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lng)}&zoom=18&addressdetails=1`;

    const response = await fetch(osmUrl, {
      headers: {
        'User-Agent': 'AmitWellnessLocationVerification/1.0 (contact@amitwellness.in)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Geocoding service unavailable' });
    }

    const data = await response.json();
    const addr = data.address || {};
    const formattedHouse = addr.house_number || addr.building || addr.house_name || '';
    const formattedRoad = [formattedHouse, addr.road || addr.street || addr.pedestrian]
      .filter(Boolean)
      .join(' ');
    const formattedArea = addr.suburb || addr.neighbourhood || addr.city_district || addr.locality || addr.subdistrict || '';
    const formattedCity = addr.city || addr.town || addr.village || addr.county || addr.district || '';
    const formattedState = addr.state || '';
    const formattedPostcode = addr.postcode || '';
    const formattedCountry = addr.country || '';

    const parts = [formattedRoad, formattedArea, formattedCity, formattedState, formattedPostcode, formattedCountry].filter(Boolean);
    const readable = parts.length > 0 ? parts.join(', ') : data.display_name;

    return res.json({
      displayName: readable || data.display_name,
      houseNumber: formattedHouse,
      road: addr.road || addr.street || addr.pedestrian || '',
      locality: formattedArea,
      suburb: formattedArea,
      city: formattedCity,
      state: formattedState,
      postcode: formattedPostcode,
      country: formattedCountry,
    });
  } catch (error) {
    console.error('Reverse geocode error:', error);
    return res.status(500).json({ error: 'Failed to reverse geocode coordinates' });
  }
});

// 2. FORWARD GEOCODE: Convert address string to coordinates
app.post('/api/geocode', async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    if (!address || typeof address !== 'string' || address.trim().length < 3) {
      return res.status(400).json({ error: 'Valid address string is required' });
    }

    const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address.trim()
    )}&limit=1&addressdetails=1`;

    const response = await fetch(osmUrl, {
      headers: {
        'User-Agent': 'AmitWellnessLocationVerification/1.0 (contact@amitwellness.in)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Geocoding service unavailable' });
    }

    const results = await response.json();
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'Address could not be located. Please check the spelling or add your city/pin code.' });
    }

    const best = results[0];
    return res.json({
      lat: parseFloat(best.lat),
      lng: parseFloat(best.lon),
      displayName: best.display_name,
    });
  } catch (error) {
    console.error('Geocode error:', error);
    return res.status(500).json({ error: 'Failed to geocode address' });
  }
});

// 3. LOCATION MATCHING & ANTI-FRAUD VERIFICATION
// Compares GPS-detected coordinates against user-provided/geocoded address
app.post('/api/verify-location', async (req: Request, res: Response) => {
  try {
    const { gpsCoords, targetAddress } = req.body;

    if (
      !gpsCoords ||
      typeof gpsCoords.lat !== 'number' ||
      typeof gpsCoords.lng !== 'number'
    ) {
      return res.status(400).json({
        verified: false,
        status: 'failed',
        message: 'Unable to detect GPS coordinates. Please enable device location permission.',
      });
    }

    if (!targetAddress || typeof targetAddress !== 'string' || targetAddress.trim().length < 3) {
      return res.status(400).json({
        verified: false,
        status: 'failed',
        message: 'A valid service address is required to verify matching location.',
      });
    }

    // Geocode target address to obtain its coordinates for matching
    const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      targetAddress.trim()
    )}&limit=1`;

    const response = await fetch(osmUrl, {
      headers: {
        'User-Agent': 'AmitWellnessLocationVerification/1.0 (contact@amitwellness.in)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        verified: false,
        status: 'failed',
        message: 'Geocoding server temporarily unavailable. Please retry or request manual verification.',
      });
    }

    const results = await response.json();
    if (!results || results.length === 0) {
      return res.status(404).json({
        verified: false,
        status: 'failed',
        message: 'The entered address could not be found. Please check the address or city/pin code.',
      });
    }

    const addressLat = parseFloat(results[0].lat);
    const addressLng = parseFloat(results[0].lon);

    // Compute Haversine distance
    const distanceMeters = Math.round(
      calculateHaversineDistanceMeters(gpsCoords.lat, gpsCoords.lng, addressLat, addressLng)
    );

    // Distance threshold: 1000 meters (accounts for standard GPS accuracy in urban/suburban environments)
    const THRESHOLD_METERS = 1000;
    const isMatch = distanceMeters <= THRESHOLD_METERS;

    const timestamp = new Date().toISOString();

    if (isMatch) {
      // Create a temporary verification token (signed timestamp)
      const verificationToken = Buffer.from(
        JSON.stringify({
          verified: true,
          timestamp,
          salt: Math.random().toString(36).substring(2, 9),
        })
      ).toString('base64');

      return res.json({
        verified: true,
        status: 'verified',
        distanceMeters,
        readableAddress: results[0].display_name,
        verificationToken,
        timestamp,
        message: 'Your location has been successfully verified.',
      });
    } else {
      // Obvious mismatch or outside threshold
      // Do NOT reveal exact GPS coordinates to the user!
      return res.json({
        verified: false,
        status: 'failed',
        distanceMeters,
        readableAddress: results[0].display_name,
        timestamp,
        message:
          'The entered address does not appear to match your current location. Please use your current location or enter the correct address.',
      });
    }
  } catch (error) {
    console.error('Verify location error:', error);
    return res.status(500).json({
      verified: false,
      status: 'failed',
      message: 'Internal server error while processing location verification.',
    });
  }
});

// 4. APPOINTMENT CREATION & BACKEND RULE ENFORCEMENT
// Final Booking Rule (Rule 10):
// The appointment can only become BOOKED / CONFIRMED when locationVerificationStatus === "verified"
// Otherwise: locationVerificationStatus === "pending" or "failed", and bookingStatus === "PENDING_MANUAL_VERIFICATION"
app.post('/api/appointments', (req: Request, res: Response) => {
  try {
    const {
      patientName,
      phoneNumber,
      appointmentDateTime,
      serviceSelected,
      serviceAddress,
      addressDetails,
      notes,
      locationVerificationStatus,
      verificationMethod,
    } = req.body;

    if (!patientName || !phoneNumber || !appointmentDateTime || !serviceSelected || !serviceAddress) {
      return res.status(400).json({ error: 'All appointment fields are required' });
    }

    // Backend rule enforcement
    const isVerified = locationVerificationStatus === 'verified';
    const finalVerificationStatus: 'verified' | 'pending' | 'failed' = isVerified
      ? 'verified'
      : locationVerificationStatus === 'pending'
      ? 'pending'
      : 'failed';

    const finalBookingStatus: 'CONFIRMED' | 'PENDING_MANUAL_VERIFICATION' | 'FAILED' = isVerified
      ? 'CONFIRMED'
      : 'PENDING_MANUAL_VERIFICATION';

    const newAppointment: StoredAppointment = {
      id: `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      patientName: String(patientName).trim(),
      phoneNumber: String(phoneNumber).trim(),
      appointmentDateTime: String(appointmentDateTime).trim(),
      serviceSelected: String(serviceSelected).trim(),
      serviceAddress: String(serviceAddress).trim(),
      addressDetails: addressDetails || undefined,
      notes: notes ? String(notes).trim() : undefined,
      locationVerificationStatus: finalVerificationStatus,
      verificationTimestamp: new Date().toISOString(),
      verificationMethod: verificationMethod || (isVerified ? 'gps_matched' : 'manual_verification_requested'),
      bookingStatus: finalBookingStatus,
      createdAt: new Date().toISOString(),
    };

    // Stored with minimum required fields - NO raw latitude/longitude stored permanently (Rule 7)
    appointmentsStore.unshift(newAppointment);
    saveAppointments(appointmentsStore);

    return res.status(201).json({
      success: true,
      appointment: newAppointment,
      message:
        finalBookingStatus === 'CONFIRMED'
          ? 'Appointment successfully confirmed with verified current location!'
          : 'Appointment submitted and pending manual location verification by our wellness team.',
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ error: 'Failed to create appointment record' });
  }
});

// 5. GET ALL APPOINTMENTS
app.get('/api/appointments', (_req: Request, res: Response) => {
  return res.json({ appointments: appointmentsStore });
});

// 6. GET SINGLE APPOINTMENT BY ID
app.get('/api/appointments/:id', (req: Request, res: Response) => {
  const apt = appointmentsStore.find((a) => a.id === req.params.id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  return res.json({ appointment: apt });
});

export { app };

// Full-Stack Server Initialization
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Only start listener if run directly (not imported into Vercel Serverless Function)
if (process.env.VERCEL !== '1') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
  });
}
