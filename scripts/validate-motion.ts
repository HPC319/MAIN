import { execSync } from "child_process";
execSync("npm run introspect:motion", { stdio: "inherit" });
