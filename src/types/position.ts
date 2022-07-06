/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IPosition {
	readonly line: number;
	readonly character: number;
}

export function makePosition(line: number, character: number): IPosition {
	return { line, character, };
}

export function translatePosition(pos: IPosition, change: { lineDelta?: number; characterDelta?: number }): IPosition {
	return makePosition(pos.line + (change.lineDelta ?? 0), pos.character + (change.characterDelta ?? 0));
}