/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalCommand,
  LexicalNode, MergeableNode,
  NodeKey,
  SerializedLexicalNode,
} from '@meogic/lexical';

import {useLexicalComposerContext} from '@meogic/lexical-react/LexicalComposerContext';
import {useLexicalNodeSelection} from '@meogic/lexical-react/useLexicalNodeSelection';
import {mergeRegister} from '@meogic/lexical-utils';
import {
  $applyNodeReplacement,
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from '@meogic/lexical';
import * as React from 'react';
import {useCallback, useEffect} from 'react';

export type SerializedHorizontalRuleNode = SerializedLexicalNode;

export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> =
  createCommand('INSERT_HORIZONTAL_RULE_COMMAND');

function HorizontalRuleComponent({nodeKey, count}: {nodeKey: NodeKey, count: number}) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isHorizontalRuleNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const hrElem = editor.getElementByKey(nodeKey);

          if (event.target === hrElem) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

  useEffect(() => {
    const hrElem = editor.getElementByKey(nodeKey);
    if (hrElem !== null) {
      hrElem.className = isSelected ? 'selected' : '';
    }
  }, [editor, isSelected, nodeKey]);

  const hrArray = Array.from({ length: count }, (_, index) => index);
  return <React.Fragment>
    {hrArray.map((_, index) => (
        <hr key={index} />
    ))}
  </React.Fragment>;
}

export class HorizontalRuleNode extends DecoratorNode<JSX.Element> implements MergeableNode<HorizontalRuleNode>{
  static getType(): string {
    return 'horizontalrule';
  }

  static clone(node: HorizontalRuleNode): HorizontalRuleNode {
    return new HorizontalRuleNode(node.__key, node.__count);
  }

  static importJSON(
    serializedNode: SerializedHorizontalRuleNode,
  ): HorizontalRuleNode {
    return $createHorizontalRuleNode();
  }

  static importDOM(): DOMConversionMap | null {
    return {
      hr: () => ({
        conversion: convertHorizontalRuleElement,
        priority: 0,
      }),
    };
  }

  __count: number

  setCount(count: number){
    const self = this.getWritable()
    self.__count = count
  }

  getCount(): number {
    const self = this.getLatest()
    return self.__count
  }

  constructor(key?: NodeKey, count?: number) {
    super(key);
    if (count === undefined) {
      this.__count = 1;
    } else {
      this.__count = count;
    }

  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'horizontalrule',
      version: 1,
    };
  }

  exportDOM(): DOMExportOutput {
    return {element: document.createElement('hr')};
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  getTextContent(): string {
    return '\n';
  }

  isInline(): false {
    return false;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    console.log('decorate')
    return <HorizontalRuleComponent nodeKey={this.__key} count={this.__count} />;
  }

  mergeWithSibling(target: HorizontalRuleNode): HorizontalRuleNode {
    const writableSelf = this.getWritable();
    writableSelf.__count = this.getCount() + target.getCount()
    target.remove();
    return writableSelf;
  }
}

function convertHorizontalRuleElement(): DOMConversionOutput {
  return {node: $createHorizontalRuleNode()};
}

export function $createHorizontalRuleNode(): HorizontalRuleNode {
  return $applyNodeReplacement(new HorizontalRuleNode());
}

export function $isHorizontalRuleNode(
  node: LexicalNode | null | undefined,
): node is HorizontalRuleNode {
  return node instanceof HorizontalRuleNode;
}
