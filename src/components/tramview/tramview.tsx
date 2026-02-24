"use client";

import {useEffect, useState} from "react";
import type {Departure, DepartureBoard} from "../../types/rmv.ts";
import {TramDirection} from "../tramdirection/tramdirection.tsx";
import "./tramview.css"

export function TramView() {
    const [data, setData] = useState<DepartureBoard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let timeoutTimer: ReturnType<typeof setTimeout>;

        const fetchData = () => {
            const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL || "";
            fetch(`${baseUrl}/next-departures`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data: DepartureBoard) => {
                    const departures = data?.Departure || [];
                    const now = new Date().getTime();
                    const firstFutureDeparture = departures.find(departure => {
                        const departureTime = Date.parse(departure.date + "T" + departure.time);
                        return departureTime > now;
                    });

                    if (firstFutureDeparture) {
                        const departureTime = Date.parse(firstFutureDeparture.date + "T" + firstFutureDeparture.time);
                        const timeout = Math.max(1000, departureTime - now + 1000); // at least 1s wait, and 1s after departure
                        timeoutTimer = setTimeout(fetchData, timeout);
                    } else if (departures.length > 0) {
                        // If there are departures but all are in the past, refresh in a standard interval (e.g., 60s)
                        timeoutTimer = setTimeout(fetchData, 60000);
                    }
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        };

        fetchData();

        return () => clearTimeout(timeoutTimer);
    }, []);

    if (loading) {
        return <div>Loading departures...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const departuresAll = data?.Departure || [];
    const departures = departuresAll.filter(departure => {
        const departureTime = Date.parse(departure.date + "T" + departure.time);
        const now = new Date().getTime();
        return departureTime > now;
    });

    const directions: string[] = [...new Set(departures.map(item => item.directionFlag))]
        .sort((a, b) => (a ?? "").localeCompare((b ?? "")))
        .filter((a) => a !== undefined);

    const departuresByDirection = new Map<string, Departure[]>();
    for (const direction of directions) {
        if (direction != null) {
            departuresByDirection.set(direction, departures.filter(departure => departure.directionFlag === direction));
        }
    }

    return (
        <div className="tramview">
            {departures.length === 0 ? (
                <p>No departures found.</p>
            ) : (
                <div className="departures-container">
                    {directions.map((direction) => (
                        <div key={direction} className="departures">
                            <TramDirection departures={departuresByDirection.get(direction) || []} direction={direction}
                                           key={direction}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}