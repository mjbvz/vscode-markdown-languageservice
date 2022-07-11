/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPosition } from './position';
import { IRange, makeRange } from './range';

/**
 * Minimal version of `vscode.TextDocument`.
 */
export interface ITextDocument {
	readonly uri: string;
	readonly version: number;
	readonly lineCount: number;

	getText(range?: IRange): string;
	positionAt(offset: number): IPosition;
}

export function getLine(doc: ITextDocument, line: number): string {
	return doc.getText(makeRange(line, 0, line, Number.MAX_VALUE)).replace(/\r?\n$/, '');
}
