interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
  languages_url: string;
}

function getStatus(pushedAt: string): { label: string; color: string } {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const lastPush = new Date(pushedAt);
  return lastPush >= sixMonthsAgo
    ? { label: "ACTIVE", color: "a6e3a1" }
    : { label: "MAINTENANCE", color: "f9e2af" };
}

async function getRepoLanguages(
  languagesUrl: string,
  token?: string,
): Promise<string[]> {
  const headers: Record<string, string> = {
    "User-Agent": "Frostplexx-Profile-Readme",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(languagesUrl, { headers });
  if (!res.ok) return [];
  const data = (await res.json()) as Record<string, number>;
  return Object.keys(data).slice(0, 2);
}

export async function fetchRecentRepos(
  count: number = 5,
  token?: string,
): Promise<string> {
  const owner = "Frostplexx";
  const headers: Record<string, string> = {
    "User-Agent": "Frostplexx-Profile-Readme",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(
    `https://api.github.com/users/${owner}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const repos = (await response.json()) as GitHubRepo[];

  const filtered = repos
    .filter((r) => !r.fork && !r.archived && r.name !== owner)
    .slice(0, count);

  const rows = await Promise.all(
    filtered.map(async (repo) => {
      const langs = await getRepoLanguages(repo.languages_url, token);
      const { label, color } = getStatus(repo.pushed_at);
      const desc = repo.description ?? "No description";
      const badge = `<img src="https://img.shields.io/badge/${label}-${color}?style=flat-square&logoColor=1e1e2e" alt="${label}">`;
      const langCells = langs.map((l) => `<code>${l}</code>`).join(" ");
      return `    <tr><td><a href="${repo.html_url}">${repo.name}</a></td><td>${desc}</td><td>${langCells}</td><td>${badge}</td></tr>`;
    }),
  );

  return rows.join("\n");
}

export async function fetchGitHubData(repos: Array<string>) {
  const owner = "Frostplexx";
  const list = await Promise.all(
    repos.map(async (repo) => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
      );

      if (!response.ok) {
        return response.json();
      }

      const data = await response.json();

      //Extract the data we want
      const {
        html_url: url,
        full_name: name,
        stargazers_count: stars,
        forks_count: forks,
        description: desc,
      } = data;

      return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
    }),
  );
  return `<ul>${list.join("")}\n<li>More coming soon :D.</li></ul>`;
}
