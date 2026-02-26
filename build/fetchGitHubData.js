"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentRepos = fetchRecentRepos;
exports.fetchGitHubData = fetchGitHubData;
function getStatus(pushedAt) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const lastPush = new Date(pushedAt);
    return lastPush >= sixMonthsAgo
        ? { label: "ACTIVE", color: "a6e3a1" }
        : { label: "MAINTENANCE", color: "f9e2af" };
}
function getRepoLanguages(languagesUrl, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            "User-Agent": "Frostplexx-Profile-Readme",
        };
        if (token)
            headers["Authorization"] = `Bearer ${token}`;
        const res = yield fetch(languagesUrl, { headers });
        if (!res.ok)
            return [];
        const data = (yield res.json());
        return Object.keys(data).slice(0, 2);
    });
}
function fetchRecentRepos() {
    return __awaiter(this, arguments, void 0, function* (count = 5, token) {
        const owner = "Frostplexx";
        const headers = {
            "User-Agent": "Frostplexx-Profile-Readme",
        };
        if (token)
            headers["Authorization"] = `Bearer ${token}`;
        const response = yield fetch(`https://api.github.com/users/${owner}/repos?type=owner&sort=pushed&direction=desc&per_page=100`, { headers });
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const repos = (yield response.json());
        const filtered = repos
            .filter((r) => !r.fork && !r.archived && r.name !== owner)
            .slice(0, count);
        const rows = yield Promise.all(filtered.map((repo) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const langs = yield getRepoLanguages(repo.languages_url, token);
            const { label, color } = getStatus(repo.pushed_at);
            const desc = (_a = repo.description) !== null && _a !== void 0 ? _a : "No description";
            const badge = `<img src="https://img.shields.io/badge/${label}-${color}?style=flat-square&logoColor=1e1e2e" alt="${label}">`;
            const langCells = langs.map((l) => `<code>${l}</code>`).join(" ");
            return `    <tr><td><a href="${repo.html_url}">${repo.name}</a></td><td>${desc}</td><td>${langCells}</td><td>${badge}</td></tr>`;
        })));
        return rows.join("\n");
    });
}
function fetchGitHubData(repos) {
    return __awaiter(this, void 0, void 0, function* () {
        const owner = "Frostplexx";
        const list = yield Promise.all(repos.map((repo) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (!response.ok) {
                return response.json();
            }
            const data = yield response.json();
            //Extract the data we want
            const { html_url: url, full_name: name, stargazers_count: stars, forks_count: forks, description: desc, } = data;
            return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
        })));
        return `<ul>${list.join("")}\n<li>More coming soon :D.</li></ul>`;
    });
}
