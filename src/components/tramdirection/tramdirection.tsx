import {TramDetail} from "../tramdetail/tramdetail.tsx";
import type {Departure} from "../../types/rmv.ts";
import {Card} from "primereact/card";
import "./tramdirection.css"


export function TramDirection({departures, direction}:{ departures: Departure[], direction: string}) {
    return (
        <div className="direction-container">
            <Card className="direction">
                <h3>{direction}</h3>

                {departures.map((departure, index) => (
                    <TramDetail departure={departure} position={index} key={index}/>
                ))}

            </Card>
        </div>
    );
}