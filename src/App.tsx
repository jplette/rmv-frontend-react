import 'primereact/resources/themes/lara-dark-blue/theme.css'
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import './App.css'
import {TramView} from "./components/tramview/tramview.tsx";

function App() {

  return (
    <div className="layout-wrapper">
        <main>
        <TramView />
        </main>
    </div>
  )
}

export default App
