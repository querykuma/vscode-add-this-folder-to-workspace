import { ExtensionContext, commands, window, Uri, workspace, InputBoxOptions, QuickPickItem } from 'vscode';

const get_folder = (filepath: string) => {
	const slash = filepath.replace(/\\/gu, "/");
	let folder = slash.replace(/\/[^/]*$/u, "");
	const m = folder.match(/^\/?\w:$/);
	if (m) {
		// root folder
		folder = folder + "/";
	}
	return folder;
};

const is_folder_equal = (folder1: string, folder2: string): boolean => {
	const f1 = folder1.replace(/^\/?(.*)\/?$/u, "$1");
	const f2 = folder2.replace(/^\/?(.*)\/?$/u, "$1");
	return f1.toLowerCase() === f2.toLowerCase();
};

const get_folders = (folder: string): string[] => {
	var folders = [];
	var rest = folder;
	while (true) {

		var m = rest.match(/^((.*)\/[^/]+\/?)$/u);
		if (m) {

			folders.push(m[1]);
			rest = m[2];

		} else {

			m = rest.match(/^(\/?\w:)\/?$/);
			if (m) {
				// root folder, 2 patterns "c:", "c:/"
				folders.push(m[1] + "/");
			}
			return folders;

		}
	}
};

const pick_folder = (folder: string): Promise<string> => new Promise(resolve => {

	const folders = get_folders(folder);

	var quick_pick = window.createQuickPick();
	const items: QuickPickItem[] = folders.map(a => ({
		label: a
	}));
	items.push(
		{
			label: "CANCEL",
			picked: true
		}
	);
	quick_pick.items = items;

	quick_pick.onDidChangeSelection(e => {
		quick_pick.hide();
		resolve(e[0].label);
	});

	quick_pick.onDidHide(e => {
		resolve("CANCEL");
	});

	quick_pick.show();
});

const run = async (pick_folders: boolean) => {
	if (window.activeTextEditor!.document.isUntitled) { return; }
	const filepath = window.activeTextEditor!.document.uri.fsPath;
	if (!filepath) { return; }
	let folder = get_folder(filepath);
	if (pick_folders) {
		folder = await pick_folder(folder);
		if (!folder || folder === "CANCEL") {
			console.log("canceled");
			return;
		}
	}
	const folder_uri = Uri.file(folder);

	// console.log(workspace.workspaceFolders?.map(a => a.uri.path));
	workspace.updateWorkspaceFolders(
		workspace.workspaceFolders ? workspace.workspaceFolders.length : 0,
		null,
		{ uri: folder_uri });

};

const close_others = async (pick_folders: boolean) => {

	if (window.activeTextEditor!.document.isUntitled) { return; }
	const filepath = window.activeTextEditor!.document.uri.fsPath;
	if (!filepath) { return; }
	let folder = get_folder(filepath);
	if (pick_folders) {
		folder = await pick_folder(folder);
		if (!folder || folder === "CANCEL") {
			console.log("canceled");
			return;
		}
	}
	const folder_uri = Uri.file(folder);

	if (workspace.workspaceFolders?.length) {

		if (workspace.workspaceFolders!.length === 1
			&& is_folder_equal(workspace.workspaceFolders![0].uri.path, folder)) { return; }

		if (!pick_folders) {

			var confirm = workspace.getConfiguration("addThisFolderToWorkspace").confirmCloseOthers;

			if (confirm) {

				let options: InputBoxOptions = {
					prompt: "Add This Folder to Workspace & Remove Others from Workspace. OK?",
					value: "YES"
				};
				const answer = await window.showInputBox(options);
				if (!answer) { return; }

			}

		}

	}

	// console.log(workspace.workspaceFolders?.map(a => a.uri.path));
	var ret = workspace.updateWorkspaceFolders(
		0,
		workspace.workspaceFolders ? workspace.workspaceFolders.length : 0,
		{ uri: folder_uri });

	if (ret !== true) {
		throw new Error("ret !== true");
	}
	if (workspace.workspaceFolders!.length !== 1) {
		throw new Error("workspace.workspaceFolders!.length !== 1");
	}

};

export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('add-this-folder-to-workspace.run', () => run(false));
	context.subscriptions.push(disposable);

	disposable = commands.registerCommand('add-this-folder-to-workspace.close-others', () => close_others(false));
	context.subscriptions.push(disposable);

	disposable = commands.registerCommand('add-this-folder-to-workspace.run.pick-folders', () => run(true));
	context.subscriptions.push(disposable);

	disposable = commands.registerCommand('add-this-folder-to-workspace.close-others.pick-folders', () => close_others(true));
	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("deactivate");
}
