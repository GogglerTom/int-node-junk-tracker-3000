import {vehicleTypes, engineStatuses, seatStatuses} from './initial-state';
import {addType, addNickname, addWheelCount, addDoorCount, addEngineStatus, addSeatStatus, addMileage} from "./actions/vehicleActions";
import {addVehicleServiceAction} from "./services/vehicleCRUDService";

export default function VehicleForm (props) {
    const {formData} = props;
    const {type, nickname, mileage, wheels, doors, engineStatus, seatStatus} = formData || {};
    const wheelsArray = type === 'coupe' ? [0, 1, 2] : [0, 1, 2, 3, 4]

    return (
        <form id="VehicleForm">
            <h3>Add a Vehicle</h3>
            <label>
                Vehicle Type:
                <select value={type} onChange={addType}>
                    {vehicleTypes.map((vehicleType, i) => {
                        return <option value={vehicleType} key={`type${i}`}>{vehicleType}</option>;
                    })}
                </select>
            </label>
            <label>
                Nickname:
                <input type="text" value={nickname} onChange={addNickname} />
            </label>
            <label>
                Mileage:
                <input type="text" value={mileage || ''} onChange={addMileage} />
            </label>
            <label>
                Wheel Count:
                <select value={wheels} onChange={addWheelCount}>
                    {[0,1,2,3,4].map((count, i) => {
                        return <option value={count} key={`wheelCount${i}`}>{count}</option>;
                    })}
                </select>
            </label>
            {type !== 'motorcycle' && <label>
                Doors Count:
                <select value={doors} onChange={addDoorCount}>
                    {wheelsArray.map((count, i) => {
                        return <option value={count} key={`doorCount${i}`}>{count}</option>;
                    })}
                </select>
            </label>}
            <label>
                Engine Status:
                <select value={engineStatus} onChange={addEngineStatus}>
                    {engineStatuses.map((status, i) => {
                        return <option value={status} key={`engineStatus${i}`}>{status}</option>;
                    })}
                </select>
            </label>
            {type === 'motorcycle' && <label>
                Seat Status:
                <select value={seatStatus} onChange={addSeatStatus}>
                    {seatStatuses.map((status, i) => {
                        return <option value={status} key={`engineStatus${i}`}>{status}</option>;
                    })}
                </select>
            </label>
            }
            <button onClick={e => addVehicleServiceAction(e, formData)}>Save</button>
        </form>
    );
}
