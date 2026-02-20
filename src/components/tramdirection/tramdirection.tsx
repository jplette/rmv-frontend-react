import {TramDetail} from "../tramdetail/tramdetail.tsx";
import type {Departure} from "../../types/rmv.ts";
import {Card} from "primereact/card";
import "./tramdirection.css"
import {Timeline} from "primereact/timeline";


export function TramDirection({departures, direction}:{ departures: Departure[], direction: string}) {

    const customizedMarker = (item: any) => {
        return (
            <span
                className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                style={{backgroundColor: item.Product[0].icon.backgroundColor.hex}}>
                <i>{item.Product[0].line}</i>
            </span>
        );
    };

    return (
        <div className="direction-container">
            <Card className="direction">
                <h3>{direction}</h3>

                <Timeline value={departures} opposite={(item) => item.time}
                          content={(item) => <TramDetail departure={item} position={departures.indexOf(item)} />}
                          marker={customizedMarker} />

            </Card>
        </div>
    );

}