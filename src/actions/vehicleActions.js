import {dispatch} from "../dispatcher";


// function editVehicleAction (id, nickName, mileage, wheels, doors, seatStatus) {}

export function addType (e) {
  dispatch('addType', e.target.value);
}

export function addNickname (e) {
  dispatch('addNickname', e.target.value);
}

export function addMileage (e) {
  dispatch('addMileage', e.target.value.replace(/\D/,'')|0);
}

export function addWheelCount (e) {
  dispatch('addWheelCount', e.target.value|0);
}

export function addDoorCount (e) {
  dispatch('addDoorCount', e.target.value|0);
}

export function addEngineStatus (e) {
  dispatch('addEngineStatus', e.target.value);
}

export function addSeatStatus (e) {
  dispatch('addSeatStatus', e.target.value);
}