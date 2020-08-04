# Add this folder to workspace

## Features

The extension adds 4 commands. They add the folder in the active file to the workspace.

It's better than "Add Folder" not to show the folder dialog.

The settings let the user control whether to show each command in the context menu.

## Commands

### Add This Folder to Workspace

Right-click the title menu and select "Add This Folder to Workspace".

It adds the folder in the active file to the workspace by one click.

![operation](https://raw.githubusercontent.com/querykuma/vscode-add-this-folder-to-workspace/master/images/operation.gif)

### Add This Folder to Workspace with Pick

Run the command "Add This Folder to Workspace with Pick".

The user can pick a folder from the upper folders in the active file and adds the folder to the workspace.

![operation2](https://raw.githubusercontent.com/querykuma/vscode-add-this-folder-to-workspace/master/images/operation2.gif)

### Add This Folder to Workspace & Close Others

Right-click the title menu and select "Add This Folder to Workspace & Close Others".

It adds the folder in the active file to the workspace and removes other folders from the workspace.

It is a bit better than "Close Workspace" and "Add This Folder to Workspace".

### Add This Folder to Workspace & Close Others with Pick

Run the command "Add This Folder to Workspace & Close Others with Pick".

The user can pick a folder from the upper folders in the active file, adds the folder to the workspace and removes other folders from the workspace.

It is a bit better than "Close Workspace" and "Add This Folder to Workspace with Pick".

## Settings

* Controls whether to ask for confirmation in the 'Add This Folder to Workspace & Close Others' (`true` by default)

```json
addThisFolderToWorkspace.confirmCloseOthers: true
```

* Controls whether 'Add This Folder to Workspace' is displayed on the context menu (`true` by default)

```json
addThisFolderToWorkspace.showAddThisFolderToWorkspaceInContextMenu: true
```

* Controls whether 'Add This Folder to Workspace with Pick' is displayed on the context menu (`false` by default)

```json
addThisFolderToWorkspace.showAddThisFolderToWorkspaceWithPickInContextMenu: false
```

* Controls whether 'Add This Folder to Workspace & Close Others' is displayed on the context menu (`true` by default)

```json
addThisFolderToWorkspace.showAddThisFolderToWorkspaceCloseOthersInContextMenu: true
```

* Controls whether 'Add This Folder to Workspace & Close Others with Pick' is displayed on the context menu (`false` by default)

```json
addThisFolderToWorkspace.showAddThisFolderToWorkspaceCloseOthersWithPickInContextMenu: false
```

## Installation

You can install the extension from the Visual Studio Marketplace.
