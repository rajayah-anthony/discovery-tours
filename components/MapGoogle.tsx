"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
    Polyline,
    DirectionsRenderer,
} from "@react-google-maps/api";
import type * as GeoJSON from "geojson";

type MarkerItem = {
    position: [number, number]; // [lat, lng]
    label?: string;
    href?: string;
};

type MapProps = {
    center?: [number, number];
    zoom?: number;
    height?: number | string;
    className?: string;

    markers?: MarkerItem[];
    route?: Array<[number, number]>; // used to build directions
    routeGeoJson?: GeoJSON.FeatureCollection;

    boundsPadding?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    travelMode?: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

    /** 👇 add optional control for visibility */
    showRouteLine?: boolean;
};

const containerStyleFrom = (h: number | string) => ({
    height: typeof h === "number" ? `${h}px` : h,
    width: "100%",
    borderRadius: "0.75rem",
    overflow: "hidden",
});

export default function MapGoogle({
    center = [5.978, 116.075],
    zoom = 12,
    height = 380,
    className = "",
    markers = [],
    route,
    routeGeoJson,
    boundsPadding = 28,
    mapId,
    disableDefaultUI = false,
    travelMode = "DRIVING",
    showRouteLine = false, // 👈 default: hidden
}: MapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const containerStyle = useMemo(() => containerStyleFrom(height), [height]);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey ?? "",
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [activeInfo, setActiveInfo] = useState<number | null>(null);

    // Directions state
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [directionsError, setDirectionsError] = useState<string | null>(null);

    // Build a directions route when data changes
    useEffect(() => {
        if (!isLoaded) return;

        const pts = (route?.length ? route : markers.map((m) => m.position)) ?? [];
        if (pts.length < 2) {
            setDirections(null);
            setDirectionsError(null);
            return;
        }

        const origin = { lat: pts[0][0], lng: pts[0][1] };
        const destination = { lat: pts[pts.length - 1][0], lng: pts[pts.length - 1][1] };
        const waypoints =
            pts.length > 2
                ? pts.slice(1, -1).map(([lat, lng]) => ({ location: { lat, lng }, stopover: false }))
                : [];

        const svc = new google.maps.DirectionsService();
        svc
            .route({
                origin,
                destination,
                waypoints,
                travelMode: google.maps.TravelMode[travelMode],
                optimizeWaypoints: false,
                provideRouteAlternatives: false,
            })
            .then((res) => {
                setDirections(res);
                setDirectionsError(null);
                const map = mapRef.current;
                if (map && res.routes[0]?.bounds) map.fitBounds(res.routes[0].bounds, boundsPadding);
            })
            .catch((err) => {
                setDirections(null);
                setDirectionsError(err?.message ?? "Directions request failed");
            });
    }, [isLoaded, route, markers, travelMode, boundsPadding]);

    // Fit for non-directions overlays (geojson / simple markers)
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isLoaded) return;
        if (directions) return;

        const points: google.maps.LatLngLiteral[] = [];

        if (markers?.length) markers.forEach((m) => points.push({ lat: m.position[0], lng: m.position[1] }));
        if (route?.length) route.forEach((p) => points.push({ lat: p[0], lng: p[1] }));

        if (routeGeoJson?.features?.length) {
            routeGeoJson.features.forEach((f) => {
                const g = f.geometry;
                if (!g) return;
                if (g.type === "Point") {
                    const [lng, lat] = (g.coordinates as number[]) ?? [];
                    if (lat != null && lng != null) points.push({ lat, lng });
                } else if (g.type === "LineString") {
                    (g.coordinates as number[][]).forEach(([lng, lat]) => points.push({ lat, lng }));
                } else if (g.type === "MultiLineString" || g.type === "Polygon") {
                    (g.coordinates as number[][][]).forEach((arr) => arr.forEach(([lng, lat]) => points.push({ lat, lng })));
                } else if (g.type === "MultiPolygon") {
                    (g.coordinates as number[][][][]).forEach((poly) =>
                        poly.forEach((arr) => arr.forEach(([lng, lat]) => points.push({ lat, lng })))
                    );
                }
            });
        }

        if (points.length >= 2) {
            const bounds = new google.maps.LatLngBounds();
            points.forEach((p) => bounds.extend(p));
            map.fitBounds(bounds, boundsPadding);
        } else {
            map.setCenter({ lat: center[0], lng: center[1] });
            map.setZoom(zoom);
        }
    }, [isLoaded, markers, route, routeGeoJson, boundsPadding, center, zoom, directions]);

    // GeoJSON overlay
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isLoaded) return;
        map.data.forEach((feat) => map.data.remove(feat));
        if (routeGeoJson) {
            map.data.addGeoJson(routeGeoJson as any);
            map.data.setStyle({
                strokeColor: "#1D4ED8",
                strokeWeight: 3,
                fillColor: "#3B82F6",
                fillOpacity: 0.15,
            });
        }
    }, [isLoaded, routeGeoJson]);

    if (!apiKey) {
        return (
            <div className={className} style={containerStyle}>
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-600 p-6 text-center">
                    <div>
                        <div className="font-semibold mb-1">Google Maps API key missing</div>
                        <div className="text-sm">
                            Add <code className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to <code className="font-mono">.env.local</code>.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className={className} style={containerStyle}>
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-red-600 p-6 text-center">
                    Failed to load Google Maps.
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={containerStyle}>
            {isLoaded && (
                <GoogleMap
                    center={{ lat: center[0], lng: center[1] }}
                    zoom={zoom}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                    onUnmount={() => {
                        mapRef.current = null;
                    }}
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    options={{
                        mapId,
                        disableDefaultUI,
                        gestureHandling: "greedy",
                        clickableIcons: true,
                    }}
                >
                    {/* 🗺️ Hide or show route */}
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                suppressMarkers: true,
                                suppressPolylines: !showRouteLine, // 👈 this actually hides the line
                                polylineOptions: showRouteLine
                                    ? { strokeColor: "#1D4ED8", strokeOpacity: 0.9, strokeWeight: 4 }
                                    : undefined,
                            }}
                        />
                    )}

                    {/* Fallback straight line (only if showRouteLine=true) */}
                    {!directions && showRouteLine && route?.length ? (
                        <Polyline
                            path={route.map(([lat, lng]) => ({ lat, lng }))}
                            options={{
                                strokeWeight: 4,
                                strokeOpacity: 0.9,
                                strokeColor: "#1D4ED8",
                            }}
                        />
                    ) : null}

                    {/* Markers + InfoWindows */}
                    {markers.map((m, i) => {
                        const pos = { lat: m.position[0], lng: m.position[1] };
                        return (
                            <Marker key={i} position={pos} onClick={() => setActiveInfo(i)}>
                                {activeInfo === i && (m.label || m.href) ? (
                                    <InfoWindow onCloseClick={() => setActiveInfo(null)} position={pos}>
                                        <div style={{ lineHeight: 1.25 }}>
                                            {m.label ? <div style={{ fontWeight: 600 }}>{m.label}</div> : null}
                                            {m.href ? (
                                                <a
                                                    href={m.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: "#2563eb", textDecoration: "underline" }}
                                                >
                                                    Open in Google Maps
                                                </a>
                                            ) : null}
                                        </div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>
                        );
                    })}
                </GoogleMap>
            )}
            {directionsError && (
                <div className="mt-2 text-xs text-slate-500">Showing straight line route (Directions unavailable).</div>
            )}
        </div>
    );
}
