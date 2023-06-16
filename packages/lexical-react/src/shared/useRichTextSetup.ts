/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {LexicalEditor} from '@meogic/lexical';

import {registerDragonSupport} from '@meogic/lexical-dragon';
import {registerRichText} from '@meogic/lexical-rich-text';
import {mergeRegister} from '@meogic/lexical-utils';
import useLayoutEffect from 'shared/useLayoutEffect';

export function useRichTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(
      registerRichText(editor),
      registerDragonSupport(editor),
    );

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
