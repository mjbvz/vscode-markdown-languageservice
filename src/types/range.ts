/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { arePositionsEqual, IPosition, isBefore, isPosition, makePosition } from './position';

export interface IRange {
	readonly start: IPosition;
	readonly end: IPosition;
}

export function isRange(thing: any): thing is IRange {
	if (!thing) {
		return false;
	}
	return isPosition((<IRange>thing).start)
		&& isPosition((<IRange>thing.end));
}

export function makeRange(startLine: number, startCharacter: number, endLine: number, endCharacter: number): IRange;
export function makeRange(start: IPosition, end: IPosition): IRange;
export function makeRange(startOrStartLine: IPosition | number, endOrStartCharacter: IPosition | number, endLine?: number, endCharacter?: number): IRange {
	if (typeof startOrStartLine === 'number') {
		return {
			start: makePosition(startOrStartLine, endOrStartCharacter as number),
			end: makePosition(endLine as number, endCharacter as number)
		};
	}
	return { start: startOrStartLine, end: endOrStartCharacter as IPosition };
}

export function areRangesEqual(a: IRange, b: IRange): boolean {
	return arePositionsEqual(a.start, b.start) && arePositionsEqual(a.end, b.end);
}

export function modifyRange(range: IRange, start?: IPosition, end?: IPosition): IRange {
	return {
		start: start ?? range.start,
		end: end ?? range.end,
	};
}

export function rangeContains(range: IRange, other: IPosition | IRange): boolean {
	if (isRange(other)) {
		return rangeContains(range, other.start) && rangeContains(range, other.end);
	}
	return !isBefore(other, range.start) && !isBefore(range.end, other);
}