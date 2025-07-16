import { DOMParser } from "xmldom";
import { gpx } from "@tmcw/togeojson";

export const extraerCoordenadasDesdeGPX = async (url) => {
  try {
    const respuesta = await fetch(url);
    const textoGPX = await respuesta.text();

    const xml = new DOMParser().parseFromString(textoGPX, "text/xml");
    const geojson = gpx(xml);

    const coordenadas = [];

    geojson.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type === "LineString") {
        feature.geometry.coordinates.forEach((coord) => {
          // Invertir de [lon, lat] si es necesario
          coordenadas.push(coord); // [lon, lat]
        });
      }
    });

    return coordenadas;
  } catch (error) {
    console.error("Error al leer el archivo GPX:", error);
    return [];
  }
};
