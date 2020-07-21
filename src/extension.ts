import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const get_folder = (filepath: string) => {
		const slash = filepath.replace(/\\/gu, "/");
		const folder = slash.replace(/^(.*)\/.*$/u, "$1");
		return folder;
	};

	let disposable = vscode.commands.registerCommand('add-this-folder-to-workspace.run', () => {
		if (vscode.window.activeTextEditor!.document.isUntitled) { return; }
		const filepath = vscode.window.activeTextEditor!.document.uri.fsPath;
		if (!filepath) { return; }
		const folder = get_folder(filepath);
		const folder_uri = vscode.Uri.file(folder);
		vscode.workspace.updateWorkspaceFolders(
			vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0,
			null,
			{ uri: folder_uri });
	});

	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() { }
