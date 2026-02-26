import * as fs from "fs";
import { parse } from "node-html-parser";
import { fetchRecentRepos } from "./fetchGitHubData";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const README_PATH = "README.md";

async function updateProjectsTable() {
  const current = fs.readFileSync(README_PATH, "utf8");
  const root = parse(current, { comment: true });

  const table = root.querySelector("table#projects");
  if (!table)
    throw new Error('Could not find <table id="projects"> in README.md');

  const tbody = table.querySelector("tbody");
  if (!tbody)
    throw new Error('Could not find <tbody> inside <table id="projects">');

  const rows = await fetchRecentRepos(5, GITHUB_TOKEN);
  tbody.set_content("\n" + rows + "\n  ");

  fs.writeFileSync(README_PATH, root.toString(), "utf8");
  console.log("README.md projects table updated.");
}

updateProjectsTable();
