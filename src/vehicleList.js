import {engineStatuses, vehicleTypes} from "./initial-state";
import {deleteVehicleServiceAction} from "./services/vehicleCRUDService";

export default function VehicleList (props) {
    const {vehiclesDisplay} = props;

    return (
        <div id="VehicleList">
            {Array.isArray(vehiclesDisplay) && !!vehiclesDisplay.length && <ul>
                <li className="header">
                    <label>Vehicle Type:</label>
                    <label>Nickname:</label>
                    <label>Mileage Rating:</label>
                    <label>Registration ID:</label>
                </li>
                {vehiclesDisplay.map((item, i) => {
                    return (
                        <>
                            <li className="display" key={`display${i}`}>
                                <label key={`label0`}>
                                    <input type="text" value={item[1]} onChange={() => {}}/>
                                </label>
                                <label key={`label1`}>
                                    <input type="text" value={item[2]} onChange={() => {}}/>
                                </label>
                                <label key={`label2`}>
                                    <input type="text" value={item[4]} onChange={() => {}}/>
                                </label>
                                <label key={`label3`}>
                                    <input type="text" value={item[3]} onChange={() => {}}/>
                                </label>
                                <button className="" key={`edit${item[0]}`} disabled>Edit</button>
                                <button className="secondary" key={`delete${item[0]}`} onClick={e => deleteVehicleServiceAction(e, item[0])}>X</button>
                            </li>
                            <li className="edit hidden" key={`edit${i}`}>
                                <form>
                                    <select value="" onChange={() => {}}>
                                        {vehicleTypes.map((type, i) => {
                                            return <option value={type} key={i}>{type}</option>;
                                        })}
                                    </select>
                                    <input type="text" value="Lexus" onChange={() => {}}/>
                                    <input type="text" value="72000" onChange={() => {}}/>
                                    <select value="" onChange={() => {}}>
                                        {[2, 3, 4].map((count, i) => {
                                            return <option value={count} key={i} onChange={() => {}}>{count}</option>;
                                        })}
                                    </select>
                                    <select value="" onChange={() => {}}>
                                        {engineStatuses.map((status, i) => {
                                            return <option value={status} key={i}>{status}</option>;
                                        })}
                                    </select>
                                </form>
                            </li>
                        </>
                    )
                })}
            </ul>
            }
        </div>
    )
}