import {useEffect, useState} from "react";
import {createMs} from "enhanced-ms";
import "./timer.css"

export function Timer({endTime}:{ endTime: number}) {
    const [timer, setTimer] = useState("")

    useEffect(() => {
        const ms = createMs({language: "de"})

        const updateTimer = () => {
            const duration = endTime - Date.now();
            if (duration > 0) {
                setTimer(ms(duration, {extends: "short" }) || "");
            } else {
                setTimer("");
            }

        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endTime]);
    return (
        <div className="glow">
            <div className="timer p-2 border-round border-radius-20 shadow-3">
                <span className="text">{timer}</span>
            </div>
        </div>
        )
}