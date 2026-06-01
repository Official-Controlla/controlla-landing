<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const mapContainer = ref<HTMLElement | null>(null);
let map: maplibregl.Map | null = null;
let animationId: number;

onMounted(() => {
  if (!mapContainer.value) return;

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        earth: {
          type: "geojson",
          data: "/world.geojson",
        },
      },
      projection: { type: "globe" } as any,
      layers: [
        {
          id: "background",
          type: "background",
          paint: {
            "background-color": "rgba(30, 64, 175, 0.15)", // A very subtle deep blue for the water
          },
        },
        {
          id: "countries-fill",
          type: "fill",
          source: "earth",
          paint: {
            "fill-color": "rgba(59, 130, 246, 0.3)",
          },
        },
        {
          id: "countries-line",
          type: "line",
          source: "earth",
          paint: {
            "line-color": "rgba(59, 130, 246, 0.5)",
            "line-width": 1,
          },
        },
      ],
    },
    center: [-106.0756, 28.633], // Chihuahua, MX
    zoom: 2,
    interactive: true,
    dragPan: true,
    scrollZoom: false, // Prevent page scroll hijack
    boxZoom: false,
    dragRotate: true,
    pitchWithRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    attributionControl: false, // Cleaner aesthetic, can add back if needed
  });

  map.on("load", () => {
    // Add the Chihuahua state polygon
    map!.addSource("chihuahua-state", {
      type: "geojson",
      data: "/chihuahua.geojson",
    });

    map!.addLayer({
      id: "chihuahua-state-fill",
      type: "fill",
      source: "chihuahua-state",
      paint: {
        "fill-color": "#3b82f6", // primary-500
        "fill-opacity": 0.3,
      },
    });

    map!.addLayer({
      id: "chihuahua-state-line",
      type: "line",
      source: "chihuahua-state",
      paint: {
        "line-color": "#60a5fa", // primary-400
        "line-width": 2,
        "line-opacity": 0.8
      },
    });

    // Add a point for Chihuahua City
    map!.addSource("chihuahua", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-106.0756, 28.633],
            },
            properties: {},
          },
        ],
      },
    });

    map!.addLayer({
      id: "chihuahua-point",
      type: "circle",
      source: "chihuahua",
      paint: {
        "circle-radius": 6,
        "circle-color": "#2563eb", // primary-600
        "circle-opacity": 1,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    map!.addLayer({
      id: "chihuahua-pulse",
      type: "circle",
      source: "chihuahua",
      paint: {
        "circle-radius": 15,
        "circle-color": "#3b82f6", // primary-500
        "circle-opacity": 0.3,
        "circle-blur": 1,
      },
    });

    // Auto-spin logic
    let lastTime = 0;
    const spinRate = 3; // degrees per second

    const animate = (time: number) => {
      if (!map) return;

      const dt = lastTime === 0 ? 0 : (time - lastTime) / 1000;
      lastTime = time;

      // Only spin if the user is not actively dragging
      if (!map.isZooming() && !map.isDragging()) {
        const center = map.getCenter();
        center.lng -= spinRate * dt;
        map.setCenter(center);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
  });
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div
    ref="mapContainer"
    class="w-full h-full cursor-grab active:cursor-grabbing"
  ></div>
</template>

<style scoped>
/* Ensure map takes full space without white backgrounds */
:deep(.maplibregl-canvas-container) {
  width: 100% !important;
  height: 100% !important;
}
:deep(.maplibregl-map) {
  font-family: inherit;
}
</style>
