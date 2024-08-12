import { Linter } from "eslint";
import configEslint from ".";
import { readFile } from "fs/promises";

describe("eslint rule", async () => {
    const linter = new Linter();

    const [
        contentValideCodeFile,
        contentInvalideCodeFile,
    ] = await Promise.all([
        readFile("scripts/code/valide.ts", "utf-8"),
        readFile("scripts/code/invalide.ts", "utf-8"),
    ]);

    it("all rules exist", () => {
        expect(() => linter.verify("\n", configEslint)).not.toThrowError()
    });

    it("fix code", async () => {
        const {output, messages} = linter.verifyAndFix(contentInvalideCodeFile, configEslint)
        
        expect(messages.every(message => !message.fatal));        
        
        expect(output).toBe(contentValideCodeFile);

        const {output: confirmOutput} = linter.verifyAndFix(contentValideCodeFile, configEslint);

        expect(confirmOutput).toBe(contentValideCodeFile);
    });
    
});