/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as lsp from 'vscode-languageserver-types';
import { MdDocumentSymbolProvider } from './languageFeatures/documentSymbols';
import { ILogger } from './logging';
import { IMdParser } from './parser';
import { MdTableOfContentsProvider } from './tableOfContents';
import { ITextDocument } from './types/textDocument';
import { IMdWorkspace } from './workspace';

// Common
export * from './parser';
export * from './slugify';
export * from './tableOfContents';
export * from './workspace';
export * from './logging';

// Types
export { ILocation } from './types/location';
export { IPosition } from './types/position';
export { IRange } from './types/range';
export { ITextDocument } from './types/textDocument';
export { IUri } from './types/uri';


// Language service

export interface IMdLanguageService {
	provideDocumentSymbols(document: ITextDocument): Promise<lsp.DocumentSymbol[]>;
}

export function createLanguageService(workspace: IMdWorkspace, parser: IMdParser, logger: ILogger): IMdLanguageService {
	const tocProvider = new MdTableOfContentsProvider(parser, workspace, logger);
	const docSymbolProvider = new MdDocumentSymbolProvider(tocProvider, logger);

	return Object.freeze<IMdLanguageService>({
		provideDocumentSymbols(document) {
			return docSymbolProvider.provideDocumentSymbols(document);
		},
	});
}
