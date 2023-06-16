/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const fs = require('fs-extra');

const packages = {
  '@meogic/lexical-clipboard': 'lexical-clipboard',
  '@meogic/lexical-code': 'lexical-code',
  '@meogic/lexical-dragon': 'lexical-dragon',
  '@meogic/lexical-file': 'lexical-file',
  '@meogic/lexical-hashtag': 'lexical-hashtag',
  '@meogic/lexical-headless': 'lexical-headless',
  '@meogic/lexical-history': 'lexical-history',
  '@meogic/lexical-html': 'lexical-html',
  '@meogic/lexical-link': 'lexical-link',
  '@meogic/lexical-list': 'lexical-list',
  '@meogic/lexical-mark': 'lexical-mark',
  '@meogic/lexical-markdown': 'lexical-markdown',
  '@meogic/lexical-offset': 'lexical-offset',
  '@meogic/lexical-overflow': 'lexical-overflow',
  '@meogic/lexical-plain-text': 'lexical-plain-text',
  '@meogic/lexical-react': 'lexical-react',
  '@meogic/lexical-rich-text': 'lexical-rich-text',
  '@meogic/lexical-selection': 'lexical-selection',
  '@meogic/lexical-table': 'lexical-table',
  '@meogic/lexical-text': 'lexical-text',
  '@meogic/lexical-utils': 'lexical-utils',
  '@meogic/lexical-yjs': 'lexical-yjs',
  '@meogic/lexical': 'lexical',
  'lexical-playground': 'lexical-playground',
  shared: 'shared',
};

function updateVersion() {
  // get version from monorepo package.json version
  const basePackageJSON = fs.readJsonSync(`./package.json`);
  const version = basePackageJSON.version;
  // update individual packages
  Object.values(packages).forEach((pkg) => {
    const packageJSON = fs.readJsonSync(`./packages/${pkg}/package.json`);
    packageJSON.version = version;
    updateDependencies(packageJSON, version);
    fs.writeJsonSync(`./packages/${pkg}/package.json`, packageJSON, {
      spaces: 2,
    });
  });
}

function updateDependencies(packageJSON, version) {
  const {dependencies, peerDependencies} = packageJSON;
  if (dependencies !== undefined) {
    Object.keys(dependencies).forEach((dep) => {
      if (packages[dep] !== undefined) {
        dependencies[dep] = version;
      }
    });
  }
  if (peerDependencies !== undefined) {
    Object.keys(peerDependencies).forEach((peerDep) => {
      if (packages[peerDep] !== undefined) {
        peerDependencies[peerDep] = version;
      }
    });
  }
}

updateVersion();
