import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const get_folder = (filepath: string) => {
		const slash = filepath.replace(/\\/gu, "/");
		let folder = slash.replace(/\/[^/]*$/u, "");
		const m = folder.match(/^\/?\w:$/);
		if (m) {
			// top folder
			folder = folder + "/";
		}
		return folder;
	};

	const is_folder_equal = (folder1: string, folder2: string): boolean => {
		const f1 = folder1.replace(/^\/?(.*)\/?$/u, "$1");
		const f2 = folder2.replace(/^\/?(.*)\/?$/u, "$1");
		return f1.toLowerCase() === f2.toLowerCase();
	};

	let disposable = vscode.commands.registerCommand('add-this-folder-to-workspace.run', () => {
		if (vscode.window.activeTextEditor!.document.isUntitled) { return; }
		const filepath = vscode.window.activeTextEditor!.document.uri.fsPath;
		if (!filepath) { return; }
		const folder = get_folder(filepath);
		const folder_uri = vscode.Uri.file(folder);

		// console.log(vscode.workspace.workspaceFolders?.map(a => a.uri.path));
		vscode.workspace.updateWorkspaceFolders(
			vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0,
			null,
			{ uri: folder_uri });

	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('add-this-folder-to-workspace.close-others', async () => {
		if (vscode.window.activeTextEditor!.document.isUntitled) { return; }
		const filepath = vscode.window.activeTextEditor!.document.uri.fsPath;
		if (!filepath) { return; }
		const folder = get_folder(filepath);
		const folder_uri = vscode.Uri.file(folder);

		if (vscode.workspace.workspaceFolders?.length) {

			if (vscode.workspace.workspaceFolders!.length === 1
				&& is_folder_equal(vscode.workspace.workspaceFolders![0].uri.path, folder)) { return; }

			var confirm = vscode.workspace.getConfiguration("addThisFolderToWorkspace").confirm.CloseOthers;

			if (confirm) {

				let options: vscode.InputBoxOptions = {
					prompt: "Add This Folder to Workspace & Remove Others from Workspace. OK?",
					value: "YES"
				};
				const answer = await vscode.window.showInputBox(options);
				if (!answer) { return; }

			}

		}

		// console.log(vscode.workspace.workspaceFolders?.map(a => a.uri.path));
		var ret = vscode.workspace.updateWorkspaceFolders(
			0,
			vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0,
			{ uri: folder_uri });

		if (ret !== true) {
			throw new Error("ret !== true");
		}
		if (vscode.workspace.workspaceFolders!.length !== 1) {
			throw new Error("vscode.workspace.workspaceFolders!.length !== 1");
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("deactivate");
}
