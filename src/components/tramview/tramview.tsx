"use client";

import { useEffect, useState } from "react";
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
      fetch("http://localhost:8080/next-departures")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: DepartureBoard) => {
          const firstElement = data && data.Departure && data?.Departure[0] ? data?.Departure[0] : null;

          if (firstElement) {
            const departureTime = Date.parse(firstElement.rtDate + "T" + firstElement.rtTime);
            const now = new Date().getTime();
            const timeout = Math.max(0, departureTime - now);
            timeoutTimer = setTimeout(fetchData, timeout);
            console.log("Set next refresh in " + timeout + "ms");
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
  console.log("FOUND ALL:" + departuresAll.length);
  const departures = departuresAll.filter(departure => {
    const departureTime = Date.parse(departure.rtDate + "T" + departure.rtTime);
    console.log("DEP " + departureTime, "NOW " + new Date().getTime(), departureTime > new Date().getTime());
    const shouldFilter = departureTime > new Date().getTime();
    console.log("Should filter", shouldFilter);
    return shouldFilter;
  });
  console.log("FOUND FILTERED:" + departures.length);
  const directions: string[] = [...new Set(departures.map(item => item.directionFlag))]
      .sort((a,b) => (a ?? "").localeCompare((b ?? "")))
      .filter((a) => a !== undefined);

  const departuresByDirection = new Map<string, Departure[]>();
  for (const direction of directions) {
    if (direction != null) {
      departuresByDirection.set(direction, departures.filter(departure => departure.directionFlag === direction));
    }
  }

  return (
    <div className="tramview">
      <h2>Abfahrt</h2>
      {departures.length === 0 ? (
        <p>No departures found.</p>
      ) : (
          <div className="departures-container">
            { directions.map((direction) => (
                <div key={direction} className="departures">
                <TramDirection departures={departuresByDirection.get(direction) || []} direction={direction} key={direction} />
                </div>
            ))}
          </div>
      )}
    </div>
  );
}