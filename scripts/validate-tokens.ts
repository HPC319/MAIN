import { execSync } from "child_process";
execSync("npm run introspect:tokens", { stdio: "inherit" });
