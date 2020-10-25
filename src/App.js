import React, { useEffect } from "react";

import "./styles.css";
import api from "services/api";
import { useState } from "react";

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
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, repositoryCreated.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((r) => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
