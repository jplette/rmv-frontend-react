import { useEffect, useState } from "react";
import "./clock.css";

export function Clock() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            {time}
        </div>
    );
}
