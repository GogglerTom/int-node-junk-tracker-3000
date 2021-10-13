import {dispatch} from "../dispatcher";
import VehicleRegistrationService from "./vehicleRegistrationService";

export async function getVehiclesServiceAction () {
    const response = await fetch('http://localhost:3001/vehicles');
    const vehicles = await response.json();

    dispatch('getVehiclesServiceAction', vehicles);
}

// Not needed, yet.
// export async function getVehicleServiceAction (id) {
//     const vehicle = await fetch(`{id}`);
//
//     dispatch('getVehicleServiceAction', vehicle);
// }

export function addVehicleServiceAction (e, vehicle) {
    e.preventDefault();

    (async () => {
        // TODO - Wrap a try/catch around this in case the API fails to return a valid ID.
        const postReq = await fetch('http://localhost:3001/vehicles', {method: 'POST', mode: "cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(vehicle)});
        const postResponse = await postReq.json();
        const savedVehicle = {
            ...postResponse
        };

        // TODO - Wrap a try/catch for the vehicle registration service in case it fails.
        const registrationID = await VehicleRegistrationService.registerVehicle(savedVehicle);

        const editedData = {registrationID}
        // TODO - Wrap a try/catch for this update in case it fails.
        const putReq = await fetch(`http://localhost:3001/vehicles/${savedVehicle.id}`, { method: 'PUT', mode: "cors", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(editedData) });
        const putResponse = await putReq.json();
        dispatch('addVehicleServiceAction', [putResponse])
    })();
}

export async function updateVehicleServiceAction (vehicle) {
    const putReqResponse = await fetch('', { method: 'PUT', body: vehicle });

    dispatch('updateVehicleServiceAction', putReqResponse);
}

export async function deleteVehicleServiceAction (e, id) {
    e.preventDefault();

    // TODO - Wrap a try/catch for this deletion in case it fails.
    const deleteReq = await fetch(`http://localhost:3001/vehicles/${id}`, { method: 'DELETE', mode: "cors", headers: {'Content-Type': 'application/json'} });
    await deleteReq.json();

    dispatch('deleteVehicleServiceAction', id);
}


