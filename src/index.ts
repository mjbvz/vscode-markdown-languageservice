/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from 'vscode-languageserver';
import * as lsp from 'vscode-languageserver-types';
import { MdDocumentSymbolProvider } from './languageFeatures/documentSymbols';
import { MdFoldingProvider } from './languageFeatures/folding';
import { MdSelectionRangeProvider } from './languageFeatures/smartSelect';
import { ILogger } from './logging';
import { IMdParser } from './parser';
import { MdTableOfContentsProvider } from './tableOfContents';
import { ITextDocument } from './types/textDocument';
import { IMdWorkspace } from './workspace';

export { ILogger } from './logging';
export { IMdParser, Token } from './parser';
export { githubSlugifier, ISlugifier } from './slugify';
export { ILocation } from './types/location';
export { IPosition } from './types/position';
export { IRange } from './types/range';
export { ITextDocument } from './types/textDocument';
export { IUri } from './types/uri';
export { IMdWorkspace } from './workspace';



// Language service

export interface IMdLanguageService {
	provideDocumentSymbols(document: ITextDocument, token: CancellationToken): Promise<lsp.DocumentSymbol[]>;

	provideFoldingRanges(document: ITextDocument, token: CancellationToken): Promise<lsp.FoldingRange[]>;

	provideSelectionRanges(document: ITextDocument, positions: lsp.Position[], token: CancellationToken): Promise<lsp.SelectionRange[] | undefined>;
}

export function createLanguageService(workspace: IMdWorkspace, parser: IMdParser, logger: ILogger): IMdLanguageService {
	const tocProvider = new MdTableOfContentsProvider(parser, workspace, logger);
	const docSymbolProvider = new MdDocumentSymbolProvider(tocProvider, logger);
	const smartSelectProvider = new MdSelectionRangeProvider(parser, tocProvider, logger);
	const foldingProvider = new MdFoldingProvider(parser, tocProvider, logger);

	return Object.freeze<IMdLanguageService>({
		provideDocumentSymbols(document, _token) {
			return docSymbolProvider.provideDocumentSymbols(document);
		},
		provideFoldingRanges(document: ITextDocument, token: CancellationToken): Promise<lsp.FoldingRange[]> {
			return foldingProvider.provideFoldingRanges(document, token);
		},
		provideSelectionRanges(document: ITextDocument, positions: lsp.Position[], token: CancellationToken): Promise<lsp.SelectionRange[] | undefined> {
			return smartSelectProvider.provideSelectionRanges(document, positions, token);
		}
	});
}
