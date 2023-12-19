
export async function fetchGitHubData(repos: Array<string>) {
    const owner = "Frostplexx"
    const list = await Promise.all(
        repos.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

            if (!response.ok) {
                return response.json()
            }

            const data = await response.json()

            //Extract the data we want
            const {
                html_url: url,
                full_name: name,
                stargazers_count: stars,
                forks_count: forks,
                description: desc,
            } = data

            return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
        })
    );
    return `<ul>${list.join("")}\n<li>More coming soon :D.</li></ul>`
}
