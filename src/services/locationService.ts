import { GeocodedAddress, LocationCoordinates, LocationVerificationResult } from '../types/appointment';

// Calculates distance between two coordinates in meters using Haversine formula
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Mobile-friendly Geolocation requester with clear error typing
export function requestDeviceCoordinates(): Promise<LocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let msg = 'Unable to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission was denied. Please allow location access in your browser settings to verify your address.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location information is currently unavailable. Please check your device GPS.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out. Please try again.';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  });
}

// Convert coordinates to human-readable address
export async function reverseGeocodeCoordinates(lat: number, lng: number): Promise<GeocodedAddress> {
  try {
    const res = await fetch('/api/reverse-geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback directly to public OSM Nominatim if running purely static
  }

  const fallbackUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lng)}&zoom=18&addressdetails=1`;

  const fallbackRes = await fetch(fallbackUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!fallbackRes.ok) {
    throw new Error('Unable to convert location coordinates to address.');
  }

  const data = await fallbackRes.json();
  const addr = data.address || {};
  const formattedRoad = [addr.house_number, addr.road || addr.street].filter(Boolean).join(' ');
  const formattedArea = addr.suburb || addr.neighbourhood || addr.city_district;
  const formattedCity = addr.city || addr.town || addr.village;
  const formattedState = addr.state;
  const formattedPostcode = addr.postcode;
  const formattedCountry = addr.country;

  const parts = [formattedRoad, formattedArea, formattedCity, formattedState, formattedPostcode, formattedCountry].filter(Boolean);

  return {
    displayName: parts.length > 0 ? parts.join(', ') : data.display_name,
    road: formattedRoad,
    suburb: formattedArea,
    city: formattedCity,
    state: formattedState,
    postcode: formattedPostcode,
    country: formattedCountry,
    lat,
    lng,
  };
}

// Geocode address string to coordinates
export async function geocodeAddressString(address: string): Promise<{ lat: number; lng: number; displayName: string }> {
  try {
    const res = await fetch('/api/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }

  const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address.trim()
  )}&limit=1&addressdetails=1`;

  const fallbackRes = await fetch(fallbackUrl);
  if (!fallbackRes.ok) {
    throw new Error('Geocoding service unavailable.');
  }

  const list = await fallbackRes.json();
  if (!list || list.length === 0) {
    throw new Error('Address not found. Please provide more detail (e.g. city, landmark or PIN code).');
  }

  return {
    lat: parseFloat(list[0].lat),
    lng: parseFloat(list[0].lon),
    displayName: list[0].display_name,
  };
}

// Verify matching between GPS coordinates and target address
// Distance threshold: 1000m (accounts for GPS accuracy in buildings/mobile)
export async function verifyLocationMatch(
  gpsCoords: LocationCoordinates,
  targetAddress: string
): Promise<LocationVerificationResult> {
  const timestamp = new Date().toISOString();

  try {
    const res = await fetch('/api/verify-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gpsCoords, targetAddress }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // If backend unavailable, perform client-side matching using geocoding fallback
  }

  try {
    const geocoded = await geocodeAddressString(targetAddress);
    const distanceMeters = calculateDistanceMeters(gpsCoords.lat, gpsCoords.lng, geocoded.lat, geocoded.lng);

    const THRESHOLD = 1000;
    const isMatch = distanceMeters <= THRESHOLD;

    if (isMatch) {
      return {
        verified: true,
        status: 'verified',
        distanceMeters,
        readableAddress: geocoded.displayName,
        timestamp,
        message: 'Your location has been successfully verified.',
      };
    } else {
      // Do NOT reveal exact GPS coordinates to the user (Rule 5 & 6)
      return {
        verified: false,
        status: 'failed',
        distanceMeters,
        readableAddress: geocoded.displayName,
        timestamp,
        message:
          'The entered address does not appear to match your current location. Please use your current location or enter the correct address.',
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Location verification failed. Please try again.';
    return {
      verified: false,
      status: 'failed',
      timestamp,
      message: errorMsg,
    };
  }
}
