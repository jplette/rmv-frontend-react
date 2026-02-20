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
    fetch("http://localhost:8080/next-departures")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: DepartureBoard) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading departures...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const departures = data?.Departure || [];
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
      <h2>Next Departures</h2>
      {departures.length === 0 ? (
        <p>No departures found.</p>
      ) : (
          <div className="departures-container">
            { directions.map((direction) => (
                <div className="departures">
                <TramDirection departures={departuresByDirection.get(direction) || []} direction={direction} key={direction} />
                </div>
            ))}
          </div>
      )}
    </div>
  );
}