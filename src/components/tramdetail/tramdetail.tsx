import type {Departure} from "../../types/rmv.ts";
import "./tramdetail.css"
import {Timer} from "../timer/timer.tsx";

export function TramDetail({departure, position}:{ departure: Departure, position:number}) {

    return (
        <div className="detail">
            <div className="tram-detail">
                <div>
                    {departure.direction}
                </div>
                {position === 0 &&
                    <Timer endTime={Date.parse(departure.rtDate + "T" + departure.rtTime)} />
                }
            </div>
            <div>
                {departure.Messages?.Message.map((message, index) => {
                        if (position === 0) {
                            return (
                                <div key={index} className="alert-message">
                                    <div>
                                        <i className="pi pi-exclamation-triangle" style={{ color: 'var(--red-500)', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <div className="alert-head">
                                        {message.head}
                                    </div>
                                    <div className="alert-lead">{message.lead}</div>
                                </div>
                            )
                        }
                    }
                )}
            </div>
        </div>
    );
}