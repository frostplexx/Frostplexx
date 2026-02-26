import * as fs from "fs";
import { fetchRecentRepos } from "./fetchGitHubData";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function generateReadme() {
  const projectsTable = await fetchRecentRepos(5, GITHUB_TOKEN);

  const readme = `<div align="center">

<!-- Header -->
<!-- <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,25,27&height=120&section=header&text=frostplexx&fontSize=40&fontColor=cdd6f4&fontAlignY=55&animation=fadeIn" /> -->


<!-- Brainfuck greeting decoded: "Hi" -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Maple+Mono&pause=3000&color=CBA6F7&center=true&vCenter=true&width=435&lines=-%5B-------%3E%2B%3C%5D%3E-.--%5B--%3E%2B%2B%2B%3C%5D%3E.++%F0%9F%91%8B" alt="Typing SVG" /></a>

<!-- Badges -->
<p>
  <a href="https://frostplexx.neocities.org">
    <img src="https://img.shields.io/badge/website-1e1e2e?style=for-the-badge&logo=firefox&logoColor=cba6f7" alt="Website">
  </a>
  <a href="https://github.com/frostplexx">
    <img src="https://img.shields.io/badge/github-1e1e2e?style=for-the-badge&logo=github&logoColor=cba6f7" alt="GitHub">
  </a>
  <a href="https://discordapp.com/users/336806197158215682">
    <img src="https://img.shields.io/badge/discord-1e1e2e?style=for-the-badge&logo=discord&logoColor=cba6f7" alt="Discord">
  </a>
  <img src="https://komarev.com/ghpvc/?username=Frostplexx&style=for-the-badge&color=1e1e2e&label=VISITORS&labelColor=313244" alt="Profile Views">
</p>

<br/>


</div>

---

<div align="center">

### \`cat about.txt\`

</div>

\`\`\`
> Developer, tinkerer, open-source enthusiast
> Based in UTC+01:00
> Building tools for macOS, obsidian, and the terminal
> "Look! A ladder! Maybe it leads to heaven, or a sandwich!"
\`\`\`

---

<div align="center">

### \`ls -la ~/languages/\`

</div>

<div align="center">

![Swift](https://img.shields.io/badge/Swift-1e1e2e?style=for-the-badge&logo=swift&logoColor=fab387)
![Rust](https://img.shields.io/badge/Rust-1e1e2e?style=for-the-badge&logo=rust&logoColor=e8b683)
![TypeScript](https://img.shields.io/badge/TypeScript-1e1e2e?style=for-the-badge&logo=typescript&logoColor=89b4fa)
![Nix](https://img.shields.io/badge/Nix-1e1e2e?style=for-the-badge&logo=nixos&logoColor=89dceb)
![Shell](https://img.shields.io/badge/Shell-1e1e2e?style=for-the-badge&logo=gnubash&logoColor=a6e3a1)

</div>

---

<div align="center">

### \`ls -la ~/projects/\`

</div>

${projectsTable}

---

<div align="center">

### \`git log --stat\`

<a href="https://github.com/Frostplexx/Frostplexx#gh-dark-mode-only">
  <img src="https://github-readme-stats.vercel.app/api?username=Frostplexx&show_icons=true&hide_border=true&include_all_commits=true&card_width=500&custom_title=Open%20Source%20Stats&title_color=cba6f7&text_color=cdd6f4&icon_color=89b4fa&bg_color=1e1e2e&hide=contribs&show=reviews,prs_merged,prs_merged_percentage#gh-dark-mode-only" alt="GitHub Stats Dark" />
</a>

<a href="https://github.com/Frostplexx/Frostplexx#gh-light-mode-only">
  <img src="https://github-readme-stats.vercel.app/api?username=Frostplexx&show_icons=true&hide_border=true&include_all_commits=true&card_width=500&custom_title=Open%20Source%20Stats&title_color=8839ef&text_color=4c4f69&icon_color=1e66f5&bg_color=eff1f5&hide=contribs&show=reviews,prs_merged,prs_merged_percentage#gh-light-mode-only" alt="GitHub Stats Light" />
</a>

<a href="https://github.com/Frostplexx/Frostplexx#gh-dark-mode-only">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Frostplexx&layout=compact&hide_border=true&card_width=500&title_color=cba6f7&text_color=cdd6f4&bg_color=1e1e2e&langs_count=6#gh-dark-mode-only" alt="Top Languages Dark" />
</a>

<a href="https://github.com/Frostplexx/Frostplexx#gh-light-mode-only">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Frostplexx&layout=compact&hide_border=true&card_width=500&title_color=8839ef&text_color=4c4f69&bg_color=eff1f5&langs_count=6#gh-light-mode-only" alt="Top Languages Light" />
</a>

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:89b4fa,50:89dceb,100:74c7ec&section=footer" />

</div>
`;

  fs.writeFile("README.md", readme, (error) => {
    if (error) throw new Error(`Something went wrong: ${error}.`);
    console.log(`README.md successfully generated.`);
  });
}

generateReadme();
