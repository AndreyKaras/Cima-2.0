import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDirectory = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build:{
        rolldownOptions:{
            input:{
                main:resolve(rootDirectory, "index.html"),
                tuki:resolve(rootDirectory, "cases/tuki.html"),
                expertBrand:resolve(rootDirectory, "cases/expert-brand.html"),
                b2bCompany:resolve(rootDirectory, "cases/b2b-company.html")
            }
        }
    }
});
