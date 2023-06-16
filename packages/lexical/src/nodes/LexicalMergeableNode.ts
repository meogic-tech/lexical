import {LexicalNode} from "../LexicalNode";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export interface MergeableNode<T> {
    mergeWithSibling(target: T): T;
}

export function $isMergeableNode(
    node: unknown | null | undefined,
): node is MergeableNode<unknown> {
    // @ts-ignore
    return ('mergeWithSibling' in node &&
        typeof node.mergeWithSibling === 'function'
    );
}

export type LexicalMergeableNode = MergeableNode<unknown> & LexicalNode
