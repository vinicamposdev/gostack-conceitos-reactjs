import React, { useEffect } from "react";

import "./styles.css";
import api from "services/api";
import { useState } from "react";
import { response } from "express";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function getRepositories() {
      const repositoriesFetched = await api.get("repositories");
      setRepositories(repositoriesFetched.data);
    })();
  }, []);

  async function handleAddRepository() {
    const repositoryCreated = await api.post("repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, repositoryCreated.data]);
  }

  async function handleRemoveRepository(id) {
    //await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>
            {repository.title}
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
