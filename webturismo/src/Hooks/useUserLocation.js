import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lng, lat]); // ORS requiere [lng, lat]
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error.message);
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización");
    }
  }, []);

  return userLocation;
};

export default useUserLocation;
