// /src/App.jsx

import './styles/main.scss'; // Importar SASS global
import Router from './router'; // <-- Importación POR DEFECTO: El componente Router

function App() {
    // Usamos el componente Router que ya maneja RouterProvider
    return <Router />; 
}

export default App;