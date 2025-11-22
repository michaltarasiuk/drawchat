import path from "node:path";

/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  "*.{cjs,mjs,ts,tsx}": buildEslintCommand,
};
export default lintStagedConfig;

/** @type {import('lint-staged').Configuration} */
function buildEslintCommand(filenames) {
  return `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;
}
