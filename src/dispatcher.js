import {sedan, coupe, minivan, motorcycle} from "./initial-state";

let reactComponent;

export function setReactComponent (rc) {
    reactComponent = rc;
}

export function dispatch (action, updatedState) {
    const properties = [];

    switch(action) {
        case 'addVehicleServiceAction':
            // Store raw data as an object for lookups based on ID.
            const newVehicleState = updatedState.reduce((state, update) => {
                if (update.id) {
                    const {id, type, nickname, mileage, wheels, doors, engineStatus, seatStatus = '', registrationID} = update;

                    state[id] = {
                      type,
                      registrationID,
                      nickname,
                      mileage,
                      wheels,
                      doors,
                      engineStatus,
                      seatStatus
                    }
                }

                return state;
            }, {})
            const updatedVehicles = {
                ...reactComponent.state.vehicles,
                ...newVehicleState
            }
            properties.push({
                vehicles: updatedVehicles
            });

            // Store display data as an array to facilitate iterations during renders.
            properties.push({'vehiclesDisplay': rawVehiclesToDisplayData(updatedVehicles)});

            // Reset the 'add-a-vehicle' form.
            properties.push({
                formData: {
                    ...sedan,
                }
            });
            break;
        case 'getVehiclesServiceAction':
            // TODO - Make this DRY with the next case below.
            const vehiclesState = updatedState.reduce((state, update) => {
                if (update.id) {
                    const {id, type, nickname, mileage, wheels, doors, engineStatus, seatStatus = '', registrationID} = update;

                    state[id] = {
                      type,
                      registrationID,
                      nickname,
                      mileage,
                      wheels,
                      doors,
                      engineStatus,
                      seatStatus
                    }
                }

                return state;
            }, {})
            // Store raw data as an object for lookups based on ID.
            properties.push({
                vehicles: vehiclesState
            });

            // Store display data as an array to facilitate iterations during renders.
            properties.push({'vehiclesDisplay': rawVehiclesToDisplayData(vehiclesState)});
            break;
        case 'addType':
            let specificVehicle;
            switch (updatedState) {
                case 'sedan':
                    specificVehicle = sedan;
                    break;
                case 'coupe':
                    specificVehicle = coupe;
                    break;
                case 'minivan':
                    specificVehicle = minivan;
                    break;
                case 'motorcycle':
                    specificVehicle = motorcycle;
                    break;
                default:
                    break;
            }
            properties.push({
                formData: {
                    ...specificVehicle,
                }
            });
            break;
        case 'addNickname':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    nickname: updatedState
                }
            });
            break;
        case 'addMileage':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    mileage: updatedState
                }
            });
            break;
        case 'addWheelCount':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    wheelCount: updatedState
                }
            });
            break;
        case 'addDoorCount':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    doorCount: updatedState
                }
            });
            break;
        case 'addEngineStatus':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    engineStatus: updatedState
                }
            });
            break;
        case 'addSeatStatus':
            properties.push({
                formData: {
                    ...reactComponent.state.formData,
                    seatStatus: updatedState
                }
            });
            break;
        case 'deleteVehicleServiceAction':
            const updatedVehicleState = {
                ...reactComponent.state.vehicles
            };
            delete updatedVehicleState[updatedState];

            properties.push({
                vehicles: updatedVehicleState
            });

            properties.push({'vehiclesDisplay': rawVehiclesToDisplayData(updatedVehicleState)});
            break;
        default:
            break;
    }

    properties.forEach((property, i) => {
        const entries = Object.entries(property);

        reactComponent.setState({
            [entries[0][0]]: entries[0][1]
        });
    });
}

function rawVehiclesToDisplayData (vehiclesState) {
    return Object.keys(vehiclesState).map(key => {
        const vehicle = vehiclesState[key];
        const mileageRating = vehicle.mileage < 10000 ? 'low' : vehicle.mileage >= 10000 && vehicle.mileage < 100000 ? 'medium' : 'high';

        return [key, vehicle.type, vehicle.nickname, vehicle.registrationID, mileageRating, false, false];
    });
}