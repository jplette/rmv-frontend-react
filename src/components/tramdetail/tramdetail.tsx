import {createMs} from "enhanced-ms"
import {useEffect, useState} from "react";
import type {Departure} from "../../types/rmv.ts";
import "./tramdetail.css"

export function TramDetail({departure, position}:{ departure: Departure, position:number}) {

    const [timer, setTimer] = useState("")

    useEffect(() => {
        const departureTime = Date.parse(departure.rtDate + "T" + departure.rtTime);
        const ms = createMs({language: "de"})

        const updateTimer = () => {
            const duration = departureTime - Date.now();
            if (duration > 0) {
                setTimer(ms(duration, {extends: "short" }) || "");
            } else {
                setTimer("");
            }

        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [departure]);

    return (
        <div className="detail">
            <div className="tram-detail">
                <div>
                    {departure.direction}
                </div>
                <div className="timer">
                    {position === 0 ? timer : ""}
                </div>
            </div>
            <div>
                {departure.Messages?.Message.map((message, index) => {
                        if (position === 0) {
                            return (
                                <div key={index}>
                                    <div>{message.head}</div>
                                    <div>{message.lead}</div>
                                </div>
                            )
                        }
                    }
                )}
            </div>
        </div>
    );
}