import {defineConfig} from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		include: ["scripts/**/*.test.ts", "tests/**/*.test.ts"],
	},
	plugins: [tsconfigPaths()],
});
