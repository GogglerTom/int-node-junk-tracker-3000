export const vehicle = {
  type:             '',
  nickname:         '',
  mileage:          null,
  wheels:           null,
  doors:            null,
  engineStatus:     'works',
  registrationID:   '',
}

export const sedan = {
  ...vehicle,
  type:             'sedan',
  wheels:           4,
  doors:            4,
}

export const coupe = {
  ...vehicle,
  type:             'coupe',
  wheels:           4,
  doors:            2,
}

export const minivan = {
  ...vehicle,
  type:             'minivan',
  wheels:           4,
  doors:            4,
}

export const motorcycle = {
  ...vehicle,
  type:             'motorcycle',
  wheels:           2,
  seatStatus:       'works',
}
delete motorcycle.doors;

export const initialState = {
  vehicles:         {},
  vehiclesDisplay:  [],
  formData:         {
    ...sedan                  // Display 'Sedan' as the first vehicle type in the UI.
  },
}

export const engineStatuses = ['works', 'fixable', 'junk'];
export const vehicleTypes = ['sedan', 'coupe', 'minivan', 'motorcycle'];
export const seatStatuses = ['works', 'fixable', 'junk'];





