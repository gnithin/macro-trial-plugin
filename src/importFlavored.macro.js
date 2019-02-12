const { createMacro } = require('babel-plugin-macros')

module.exports = createMacro(importFlavored)

function importFlavored({ references, state, babel }) {
    references.default.forEach(referencePath => {
        if (referencePath.parentPath.type !== "CallExpression") {
            throw new Error(`importFlavor needs be a CallExpression. For eg:- importFlavor(Login, "./login")`);
        }

        // TODO: Can I support more than 2 arguments?
        var parentArgs = referencePath.parentPath.get("arguments");
        if (parentArgs.length < 0 || parentArgs.length > 2) {
            throw new Error("Illegal number of arguments");
        }

        var componentIdNode = parentArgs[0].node;
        /*
             TODO: Add support for parsing the object-expresion as well
             importFlavored({SomeModule}, "./some-path.js")
        */
        console.log(componentIdNode.type);
        if (componentIdNode.type !== "Identifier") {
            throw new Error("The component Id has to be an identifier or an ObjectProperty");
        }

        var importPathNode = parentArgs[1].node;

        // NOTE: Not really sure if I should do this (what about importing from vars?)
        if (importPathNode.type !== "StringLiteral") {
            throw new Error("The path needs to be a string literal");
        }
        var importPathStr = importPathNode.value;

        // TODO: Modify the import path string
        importPathStr = "./hello.green";
        console.log(importPathStr);
        importPathNode.value = importPathStr;

        // Create the response import
        var importDeclNode = babel.types.ImportDeclaration(
            [babel.types.ImportDefaultSpecifier(componentIdNode)],
            importPathNode
        );

        //var exp = babel.types.CallExpression(babel.types.Identifier("import"), [importPathNode]);
        // babel.types.expressionStatement(importDeclNode)

        console.log(importDeclNode);
        console.log(referencePath.parentPath);
        referencePath.parentPath.parentPath.insertBefore(importDeclNode);
        referencePath.parentPath.parentPath.remove();
        referencePath.parentPath.remove();

        /* Old
        const [firstArgumentPath] = referencePath.parentPath.get('arguments')
        const stringValue = firstArgumentPath.node.value
        const gemmafied = stringValue.split(' ').join('-> 🐶 <-')
        console.log("Reference path type - ", referencePath.parentPath.type)

        const gemmafyFunctionCallPath = firstArgumentPath.parentPath
        const gemmafiedStringLiteralNode = babel.types.stringLiteral(gemmafied)

        gemmafyFunctionCallPath.replaceWith(gemmafiedStringLiteralNode)
        */
    })
}