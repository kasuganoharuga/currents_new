import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited ${code ?? 1}`));
    });
  });
}

await run("node", ["--experimental-strip-types", "db/migrate.ts"]);

const server = spawn("node", ["server.js"], { stdio: "inherit" });
server.on("exit", (code) => {
  process.exit(code ?? 1);
});
