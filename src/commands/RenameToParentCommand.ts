import BaseCommand from './BaseCommand';

export default class RenameToParentCommand extends BaseCommand {
  constructor(context: any) {
    super('granifyUtils.renameToParent', context);
  }

  async execute(uri: any) {
    try {
      const parts = uri.path.split('/');
      const file = parts[parts.length - 1];
      const parent = parts[parts.length - 2];
      const fparts = file.split('.');
      fparts[0] = parent;
      const renamed = fparts.join('.');
      parts[parts.length - 1] = renamed;

      const uri2 = this.vscode.Uri.file(parts.join('/'));

      const we = new this.vscode.WorkspaceEdit();
      if (we.has(uri2)) {
        throw new Error(`File '${renamed}' already exists, could not rename`);
      }

      we.renameFile(uri, uri2, {
        ignoreIfExists: true
      });

      if (await this.vscode.workspace.applyEdit(we)) {
        this.vscode.window.setStatusBarMessage(`Renamed '${file}' to '${renamed}'`);
      } else throw new Error(`Could not rename '${file}' to '${renamed}'`);

    } catch (err) {
      this.error(err);
    }
  }
}