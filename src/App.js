import React from 'react';
import './App.css';
import {initialState} from "./initial-state";
import {setReactComponent} from "./dispatcher";
import VehicleList from "./vehicleList";
import VehicleForm from "./vehicleForm";
import {getVehiclesServiceAction} from "./services/vehicleCRUDService";

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        setReactComponent(this);
        (async () => {
            await getVehiclesServiceAction();
        })();
    }

    render () {
        const { formData, vehiclesDisplay, vehicles } = this.state;

        return (
            <div className="App">
              <header className="App-header">
                  Junk Tracker 3000
              </header>
              <aside>
                  <VehicleForm formData={formData} />
              </aside>
              <section>
                  <VehicleList vehiclesDisplay={vehiclesDisplay} vehicles={vehicles} />
              </section>
            </div>
        );
    }
}

export default App;
