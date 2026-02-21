import 'primereact/resources/themes/lara-dark-blue/theme.css'
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';
import './App.css'
import {TramView} from "./components/tramview/tramview.tsx";
import {Clock} from "./components/clock/clock.tsx";

function App() {

  return (
    <div className="layout-wrapper">
        <header>
            <div>
                <h2>Abfahrt</h2>
            </div>
            <div>
                <Clock />
            </div>
        </header>
        <main>
        <TramView />
        </main>
    </div>
  )
}

export default App
