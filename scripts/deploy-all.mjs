#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { accessSync, constants, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const appsDir = resolve(projectRoot, "apps");
const webDir = resolve(appsDir, "web");
const serverDir = resolve(appsDir, "server");

const writeOut = (message) => {
	process.stdout.write(`${message}\n`);
};

const writeErr = (message) => {
	process.stderr.write(`${message}\n`);
};

const exitWithError = (message) => {
	writeErr(message);
	process.exit(1);
};

const ensureFileReadable = (path) => {
	try {
		accessSync(path, constants.R_OK);
	} catch (error) {
		console.log(error)
		exitWithError(`Cannot read file: ${path}`);
	}
};

const verifyEnvValue = ({ filePath, key }) => {
	ensureFileReadable(filePath);
	const fileContent = readFileSync(filePath, "utf8");
	const lines = fileContent.split(/\r?\n/);
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (line.length === 0 || line.startsWith("#")) {
			continue;
		}
		if (!line.startsWith(`${key}=`)) {
			continue;
		}
		const value = line.slice(key.length + 1).trim();
		if (value.length === 0) {
			exitWithError(`${key} in ${filePath} cannot be empty`);
		}
		return value;
	}
	exitWithError(`Missing ${key} in ${filePath}`);
};

const extractCorsOrigin = (filePath) => {
	ensureFileReadable(filePath);
	const fileContent = readFileSync(filePath, "utf8");
	const withoutBlockComments = fileContent.replace(/\/\*[\s\S]*?\*\//gu, "");
	const withoutLineComments = withoutBlockComments.replace(/^[\t\f \v]*\/\/.*$/gmu, "");
	let parsed;
	try {
		parsed = JSON.parse(withoutLineComments);
	} catch (error) {
		exitWithError(`Failed to parse ${filePath}: ${(error && error.message) || error}`);
	}
	if (parsed === null || typeof parsed !== "object") {
		exitWithError(`Unexpected config shape in ${filePath}`);
	}
	const { vars } = parsed;
	if (vars === undefined || vars === null || typeof vars !== "object") {
		exitWithError(`Missing vars object in ${filePath}`);
	}
	const value = vars.CORS_ORIGIN;
	if (typeof value !== "string") {
		exitWithError(`CORS_ORIGIN must be a string in ${filePath}`);
	}
	const trimmed = value.trim();
	if (trimmed.length === 0 || trimmed.includes("your-domain")) {
		exitWithError(`CORS_ORIGIN in ${filePath} is invalid`);
	}
	return trimmed;
};

const runCommand = ({ command, args, cwd }) => {
	writeOut(`Running command: ${command} ${args.join(" ")} (cwd: ${cwd})`);
	const result = spawnSync(command, args, {
		cwd,
		stdio: "inherit",
		shell: false,
	});
	if (result.status !== 0) {
		exitWithError(`${command} failed with exit code ${result.status}`);
	}
};

const webEnvPath = resolve(webDir, ".env.production");
const webServerUrl = verifyEnvValue({
	filePath: webEnvPath,
	key: "VITE_SERVER_URL",
});

writeOut(`Found web VITE_SERVER_URL=${webServerUrl}`);

runCommand({
	command: "pnpm",
	args: ["run", "deploy"],
	cwd: webDir,
});

const corsOrigin = extractCorsOrigin(resolve(serverDir, "wrangler.jsonc"));

writeOut(`Found server CORS_ORIGIN=${corsOrigin}`);

runCommand({
	command: "pnpm",
	args: ["run", "deploy"],
	cwd: serverDir,
});

writeOut("Reminder: run 'pnpm run sync:secrets' inside the server directory afterward.");
