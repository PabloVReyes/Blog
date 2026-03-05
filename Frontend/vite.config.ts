import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execSync } from "child_process";

function getGitInfo() {
    try {
        const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
        const commitDate = execSync("git log -1 --format=%cd --date=short")
            .toString()
            .trim();

        return {
            commitHash,
            commitDate,
        };
    } catch {
        return {
            commitHash: "unknown",
            commitDate: "unknown",
        };
    }
}

const git = getGitInfo();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    define: {
        __COMMIT_HASH__: JSON.stringify(git.commitHash),
        __COMMIT_DATE__: JSON.stringify(git.commitDate),
    },
})
