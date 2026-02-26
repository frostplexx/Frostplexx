"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fs = __importStar(require("fs"));
const node_html_parser_1 = require("node-html-parser");
const fetchGitHubData_1 = require("./fetchGitHubData");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const README_PATH = "README.md";
function updateProjectsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const current = fs.readFileSync(README_PATH, "utf8");
        const root = (0, node_html_parser_1.parse)(current, { comment: true });
        const table = root.querySelector("table#projects");
        if (!table)
            throw new Error('Could not find <table id="projects"> in README.md');
        const tbody = table.querySelector("tbody");
        if (!tbody)
            throw new Error('Could not find <tbody> inside <table id="projects">');
        const rows = yield (0, fetchGitHubData_1.fetchRecentRepos)(5, GITHUB_TOKEN);
        tbody.set_content("\n" + rows + "\n  ");
        fs.writeFileSync(README_PATH, root.toString(), "utf8");
        console.log("README.md projects table updated.");
    });
}
updateProjectsTable();
