import BaseCommand from './BaseCommand';

import CopyFilenameCommand from './CopyFilenameCommand';
import CopyFilenameNoExtCommand from './CopyFilenameNoExtCommand';
import RenameToParentCommand from './RenameToParentCommand';
import CreateWidgetCommand from './CreateWidgetCommand';

export { BaseCommand as BaseCommand };
export default [
  CopyFilenameCommand,
  CopyFilenameNoExtCommand,
  RenameToParentCommand,
  CreateWidgetCommand
];