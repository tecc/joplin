/* eslint-disable import/prefer-default-export */

// This contains the CodeMirror instance, which needs to be built into a bundle
// using `yarn buildInjectedJs`. This bundle is then loaded from
// NoteEditor.tsx into the webview.
//
// In general, since this file is harder to debug due to the intermediate built
// step, it's better to keep it as light as possible - it shoud just be a light
// wrapper to access CodeMirror functionalities. Anything else should be done
// from NoteEditor.tsx.

import { EditorSettings } from '@joplin/editor/types';
import createEditor from '@joplin/editor/CodeMirror/createEditor';
import { logMessage, postMessage } from './webviewLogger';
import CodeMirrorControl from '@joplin/editor/CodeMirror/CodeMirrorControl';

export function initCodeMirror(
	parentElement: HTMLElement, initialText: string, settings: EditorSettings,
): CodeMirrorControl {
	return createEditor(parentElement, {
		initialText,
		settings,

		onLogMessage: message => {
			logMessage(message);
		},
		onEvent: (event): void => {
			postMessage('onEditorEvent', event);
		},
	});
}

