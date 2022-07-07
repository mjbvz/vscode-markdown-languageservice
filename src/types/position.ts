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

export function arePositionsEqual(a: IPosition, b: IPosition): boolean {
	return a.line === b.line && a.character === b.character;
}

export function isPosition(other: any): other is IPosition {
	if (!other) {
		return false;
	}

	const { line, character } = <IPosition>other;
	return typeof line === 'number' && typeof character === 'number';
}

export function translatePosition(pos: IPosition, change: { lineDelta?: number; characterDelta?: number }): IPosition {
	return makePosition(pos.line + (change.lineDelta ?? 0), pos.character + (change.characterDelta ?? 0));
}

export function isBefore(pos: IPosition, other: IPosition): boolean {
	if (pos.line < other.line) {
		return true;
	}
	if (other.line < pos.line) {
		return false;
	}
	return pos.character < other.character;
}

export function isBeforeOrEqual(pos: IPosition, other: IPosition): boolean {
	if (pos.line < other.line) {
		return true;
	}
	if (other.line < pos.line) {
		return false;
	}
	return pos.character <= other.character;
}

export function isAfter(pos: IPosition, other: IPosition): boolean {
	return !isBeforeOrEqual(pos, other);
}