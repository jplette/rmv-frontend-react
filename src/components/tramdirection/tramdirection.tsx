import {TramDetail} from "../tramdetail/tramdetail.tsx";
import type {Departure} from "../../types/rmv.ts";
import {Card} from "primereact/card";
import "./tramdirection.css"
import {Timeline} from "primereact/timeline";


export function TramDirection({departures, direction}:{ departures: Departure[], direction: string}) {

    const customizedMarker = (item: Departure) => {
        const bgColor = (item.Product
            && item.Product[0]
            && item.Product[0].icon
            && item.Product[0].icon.backgroundColor
            && item.Product[0].icon.backgroundColor.hex) ? item.Product[0].icon.backgroundColor.hex : undefined;

        const line = (item.Product
            && item.Product[0] && item.Product[0].line) ? item.Product[0].line : '';

        return (
            <span
                className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                style={{backgroundColor: bgColor}}>
                <i>{line}</i>
            </span>
        );
    };

    return (
        <div className="direction-container">
            <Card className="direction">
                <div>
                    <h2>{departures.length > 0 ? departures[0].stop : ''}</h2>
                    <h3>Richtung {direction}</h3>
                </div>

                <div className="spacer"></div>
                <Timeline value={departures} opposite={(item) => item.time}
                          content={(item) => <TramDetail departure={item} position={departures.indexOf(item)} />}
                          marker={customizedMarker} />

            </Card>
        </div>
    );

}