// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	function getName(uri: any) {
		const parts = uri.toString().split('/');
		return parts[parts.length - 1];
	}

	context.subscriptions.push(vscode.commands.registerCommand('granifyUtils.copyFilenameNoExt', function (uri) {
		try {
			const name = getName(uri);
			const parts = name.split('.');
			const noExt = parts[0];

			vscode.env.clipboard.writeText(noExt);
			vscode.window.setStatusBarMessage(`Copied '${noExt}' to the clipboard.`);
		} catch (err) {
			vscode.window.showErrorMessage(err.message);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('granifyUtils.copyFilename', function (uri) {
		try {
			const name = getName(uri);

			vscode.env.clipboard.writeText(name);
			vscode.window.setStatusBarMessage(`Copied '${name}' to the clipboard.`);
		} catch (err) {
			vscode.window.showErrorMessage(err.message);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('granifyUtils.renameToParent', async function (uri) {
		try {
			const parts = uri.path.split('/');
			const file = parts[parts.length - 1];
			const parent = parts[parts.length - 2];
			const fparts = file.split('.');
			fparts[0] = parent;
			const renamed = fparts.join('.');
			parts[parts.length - 1] = renamed;

			const uri2 = vscode.Uri.file(parts.join('/'));

			const we = new vscode.WorkspaceEdit();
			if (we.has(uri2)) {
				throw new Error(`File '${renamed}' already exists, could not rename`);
			}

			we.renameFile(uri, uri2, {
				ignoreIfExists: true
			});

			if (await vscode.workspace.applyEdit(we)) {
				vscode.window.setStatusBarMessage(`Renamed '${file}' to '${renamed}'`);
			} else throw new Error(`Could not rename '${file}' to '${renamed}'`);

		} catch (err) {
			vscode.window.showErrorMessage(err.message);
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
