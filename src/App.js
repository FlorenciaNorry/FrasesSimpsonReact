import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Frase from "./components/Frase";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner.js";

function App() {
  const [personaje, setPersonaje] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    setCargando(true);
    const respuesta = await fetch(
      "https://thesimpsonsquoteapi.glitch.me/quotes"
    );
    const resultado = await respuesta.json();
    console.log(resultado[0]);
    //guardar los datos en el state
    setTimeout(() => {
      setPersonaje(resultado[0]);
      setCargando(false);
    }, 3000);
  };

  //(condicion logica)?(loque quiero que haga si es true la condicion logica):(lo que quiero que suceda si es falso)
  //creo una variable para guardar el componente que quiero mostrar
  const mostrarComponente =
    cargando === true ? (
      <Spinner></Spinner>
    ) : (
      <Frase personaje={personaje}></Frase>
    );

  return (
    <section className="container my-5 d-flex flex-column align-items-center">
      {/* process.env.PUBLIC_URL sirve para tener acceso a los archivos de public */}
      <img
        src={process.env.PUBLIC_URL + "lossimpsons.png"}
        alt="logo de los simpsons"
        className="w-75 my-4"
      />
      <Button variant="warning" onClick={() => consultarAPI()}>
        Obtener Frase
      </Button>
      {mostrarComponente}
    </section>
  );
}

export default App;
