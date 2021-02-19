import axios from "axios";
import React from "react";

const App = () => {
  const [user, setUser] = React.useState();
  const [senha, setSenha] = React.useState();
  function handleClick(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        user: user,
        senha: senha,
      })
      .then(function (response) {
        const token = response.data.token;
        localStorage.setItem("token", token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function logado(event) {
    event.preventDefault();
    axios
      .get("http://localhost:4000/clientes", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  return (
    <div>
      <label>Username :</label>
      <input
        name="login"
        onChange={(event) => setUser(event.target.value)}
        id="login"
      ></input>
      <label>Senha </label>
      <input
        name="senha"
        onChange={(event) => setSenha(event.target.value)}
        id="senha"
      ></input>
      <button type="submit" style={{ margin: 5 }} onClick={handleClick}>
        Enviar
      </button>
      <button onClick={logado}>Logado?</button>
    </div>
  );
};
export default App;
