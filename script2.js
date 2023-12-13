// Obter informações sobre o repositório
const owner = "lcadriano20";
const token = "";

// Obter informações sobre todos os repositórios do usuário

function getRepositoriesByUser() {
    fetch(`https://api.github.com/users/${owner}/repos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(repos => {
          // Iterar sobre todos os repositórios e obter informações
          repos.forEach(repo => {


            console.log(repo)
            const emptyRepositoryNames = []
            const repositoryNames = repo.name

            emptyRepositoryNames.push(repositoryNames)

            addDataOnHTML(emptyRepositoryNames)

      
            // Clonar o código do repositório
            fetch(`https://api.github.com/repos/${owner}/${repo.name}/zipball`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
              .then(response => response.blob())
              .then(zipBlob => {
                  console.log(zipBlob)
              })
              .catch(error => console.error(`Erro ao clonar o código do repositório ${repo.name}:`, error));
          });
        })
        .catch(error => console.error("Erro ao obter informações dos repositórios:", error));
      
}
const addDataOnHTML = (repositories) => {
  const repositoriesContainer = document.querySelector('#repositoriesContainer')


  repositories.forEach((repository) => {
    const projectsName = repository;

    let p = document.createElement('p');
    p.textContent = projectsName;

    repositoriesContainer.appendChild(p);

  });
};





getRepositoriesByUser()


