/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import path from 'path';
import fs from 'fs';
import {replaceCodePlugin} from 'vite-plugin-replace';
import babel from '@rollup/plugin-babel';

const moduleResolution = [
  {
    find: /lexical$/,
    replacement: path.resolve('../lexical/dist/Lexical.js'),
  },
  {
    find: '@meogic/lexical-clipboard',
    replacement: path.resolve('../lexical-clipboard/dist/LexicalClipboard.js'),
  },
  {
    find: '@meogic/lexical-selection',
    replacement: path.resolve('../lexical-selection/dist/LexicalSelection.js'),
  },
  {
    find: '@meogic/lexical-text',
    replacement: path.resolve('../lexical-text/dist/LexicalText.js'),
  },
  {
    find: '@meogic/lexical-headless',
    replacement: path.resolve('../lexical-headless/dist/LexicalHeadless.js'),
  },
  {
    find: '@meogic/lexical-html',
    replacement: path.resolve('../lexical-html/dist/LexicalHtml.js'),
  },
  {
    find: '@meogic/lexical-hashtag',
    replacement: path.resolve('../lexical-hashtag/dist/LexicalHashtag.js'),
  },
  {
    find: '@meogic/lexical-history',
    replacement: path.resolve('../lexical-history/dist/LexicalHistory.js'),
  },
  {
    find: '@meogic/lexical-list',
    replacement: path.resolve('../lexical-list/dist/LexicalList.js'),
  },
  {
    find: '@meogic/lexical-file',
    replacement: path.resolve('../lexical-file/dist/LexicalFile.js'),
  },
  {
    find: '@meogic/lexical-table',
    replacement: path.resolve('../lexical-table/dist/LexicalTable.js'),
  },
  {
    find: '@meogic/lexical-offset',
    replacement: path.resolve('../lexical-offset/dist/LexicalOffset.js'),
  },
  {
    find: '@meogic/lexical-utils',
    replacement: path.resolve('../lexical-utils/dist/LexicalUtils.js'),
  },
  {
    find: '@meogic/lexical-code',
    replacement: path.resolve('../lexical-code/dist/LexicalCode.js'),
  },
  {
    find: '@meogic/lexical-plain-text',
    replacement: path.resolve('../lexical-plain-text/dist/LexicalPlainText.js'),
  },
  {
    find: '@meogic/lexical-rich-text',
    replacement: path.resolve('../lexical-rich-text/dist/LexicalRichText.js'),
  },
  {
    find: '@meogic/lexical-dragon',
    replacement: path.resolve('../lexical-dragon/dist/LexicalDragon.js'),
  },
  {
    find: '@meogic/lexical-link',
    replacement: path.resolve('../lexical-link/dist/LexicalLink.js'),
  },
  {
    find: '@meogic/lexical-overflow',
    replacement: path.resolve('../lexical-overflow/dist/LexicalOverflow.js'),
  },
  {
    find: '@meogic/lexical-markdown',
    replacement: path.resolve('../lexical-markdown/dist/LexicalMarkdown.js'),
  },
  {
    find: '@meogic/lexical-mark',
    replacement: path.resolve('../lexical-mark/dist/LexicalMark.js'),
  },
  {
    find: '@meogic/lexical-yjs',
    replacement: path.resolve('../lexical-yjs/dist/LexicalYjs.js'),
  },
  {
    find: 'shared',
    replacement: path.resolve('../shared/src'),
  },
];
// Lexical React
[
  'LexicalTreeView',
  'LexicalComposer',
  'LexicalComposerContext',
  'useLexicalIsTextContentEmpty',
  'useLexicalTextEntity',
  'useLexicalSubscription',
  'useLexicalEditable',
  'LexicalContentEditable',
  'LexicalNestedComposer',
  'LexicalHorizontalRuleNode',
  'LexicalHorizontalRulePlugin',
  'LexicalDecoratorBlockNode',
  'LexicalBlockWithAlignableContents',
  'useLexicalNodeSelection',
  'LexicalMarkdownShortcutPlugin',
  'LexicalCharacterLimitPlugin',
  'LexicalHashtagPlugin',
  'LexicalErrorBoundary',
  'LexicalPlainTextPlugin',
  'LexicalRichTextPlugin',
  'LexicalClearEditorPlugin',
  'LexicalClickableLinkPlugin',
  'LexicalCollaborationContext',
  'LexicalCollaborationPlugin',
  'LexicalHistoryPlugin',
  'LexicalTypeaheadMenuPlugin',
  'LexicalNodeMenuPlugin',
  'LexicalContextMenuPlugin',
  'LexicalTablePlugin',
  'LexicalLinkPlugin',
  'LexicalListPlugin',
  'LexicalCheckListPlugin',
  'LexicalAutoFocusPlugin',
  "LexicalTableOfContents",
  'LexicalAutoLinkPlugin',
  'LexicalAutoEmbedPlugin',
  'LexicalOnChangePlugin',
  'LexicalNodeEventPlugin',
  'LexicalTabIndentationPlugin'
].forEach((module) => {
  let resolvedPath = path.resolve(`../lexical-react/dist/${module}.js`);
  moduleResolution.push({
    find: `@meogic/lexical-react/${module}`,
    replacement: resolvedPath,
  });
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: 'true',
        },
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      configFile: false,
      exclude: '/**/node_modules/**',
      extensions: ['jsx', 'js', 'ts', 'tsx', 'mjs'],
      plugins: ['@babel/plugin-transform-flow-strip-types'],
      presets: ['@babel/preset-react'],
    }),
    react(),
  ],
  resolve: {
    alias: moduleResolution,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        split: new URL('./split/index.html', import.meta.url).pathname,
      },
    },
    commonjsOptions: {include: []},
    minify: 'terser',
    terserOptions: {
      compress: {
        toplevel: true,
      }
    },
  },
});
