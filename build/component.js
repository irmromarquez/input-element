(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  window.__bbvaWebComponentsGS = window.__bbvaWebComponentsGS || {};
  window.__bbvaWebComponentsGS.BbvaCoreMeta = window.__bbvaWebComponentsGS.BbvaCoreMeta || {};
  const globalMeta = window.__bbvaWebComponentsGS.BbvaCoreMeta;
  globalMeta.types = globalMeta.types || {};
  globalMeta.metaId = globalMeta.metaId || Math.random().toString(36).substr(2, 10);
  /**
  `BbvaCoreMeta` is based on Polymer's `iron-meta`, and it is a generic class you can use for sharing information across the
  DOM tree. It uses [monostate pattern](http://c2.com/cgi/wiki?MonostatePattern)
  such that any instance of it has access to the shared information.
  You can use `BbvaCoreMeta` to share whatever you want.

  The `BbvaCoreMeta` instances contain your actual data.
  The only requirement is that you create them before you try to access them.
  */

  class BbvaCoreMeta {
    constructor(options) {
      this.type = options && options.type || 'default';
      this.key = options && options.key;

      if (options && 'value' in options) {
        this.value = options.value;
      }
    }

    static get types() {
      return globalMeta.types;
    }

    static get metaId() {
      return globalMeta.metaId;
    }
    /**
     * Returns value of instance key and type
     */


    get value() {
      const {
        type
      } = this;
      const key = this._key || this.key;
      this._key = undefined;

      if (type && key) {
        return globalMeta.types[type] && globalMeta.types[type][key];
      }

      return undefined;
    }
    /**
     * Sets value to instance type and key
     * @param {*} key Value to set
     */


    set value(value) {
      let {
        type
      } = this;
      const {
        key
      } = this;

      if (type && key) {
        globalMeta.types[type] = globalMeta.types[type] || {};
        type = globalMeta.types[type];

        if (value === null) {
          delete type[key];
        } else {
          type[key] = value;
        }
      }
    }
    /**
     * Returns list of keys of instance type
     */


    get list() {
      const {
        type
      } = this;

      if (type) {
        const itemsType = globalMeta.types[type];

        if (itemsType) {
          return Object.keys(itemsType).map(itemType => itemsType[itemType], this);
        }

        return [];
      }

      return undefined;
    }
    /**
     * Returns value of provided key
     * @param {*} key
     */


    byKey(key) {
      this._key = key;
      return this.value;
    }

  }

  /* eslint-disable no-console */

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  let CustomStyleInterface;

  if (window.ShadyCSS && window.ShadyCSS.CustomStyleInterface) {
    CustomStyleInterface = window.ShadyCSS.CustomStyleInterface;
  } else {
    CustomStyleInterface = undefined;
    console.warn('CustomStyleInterface shim not detected. Be sure to add ShadyCSS CustomStyleInterface to your app when running on browsers without native Shadow DOM!');
  }
  /**
   * Custom element for defining styles in the main document that can take
   * advantage of [shady DOM](https://github.com/webcomponents/shadycss) shims
   * for style encapsulation and custom properties.
   *
   * - Document styles defined in a `<bbva-core-custom-style>` are shimmed to ensure they
   *   do not leak into local DOM when running on browsers without native
   *   Shadow DOM.
   * - Custom properties can be defined in a `<bbva-core-custom-style>`. Use the `html` selector
   *   to define custom properties that apply to all custom elements.
   *
   * To use:
   *
   * - Place a `<bbva-core-custom-style>` element in the main document, wrapping an inline `<style>` tag that
   *   contains the CSS rules you want to shim.
   *
   * <bbva-core-custom-style>
   *   <style>
   *     html {
   *       --custom-color: blue;
   *       --custom-mixin: {
   *         font-weight: bold;
   *         color: red;
   *       };
   *     }
   *   </style>
   * </bbva-core-custom-style>
   * ```
   *
   * @customElement bbva-core-custom-style
   * @polymer
   * @LitElement
   */


  class BbvaCoreCustomStyle extends HTMLElement {
    constructor() {
      super();

      if (CustomStyleInterface) {
        this._style = null;
        CustomStyleInterface.addCustomStyle(this);
      }
    }
    /**
     * Returns the light-DOM `<style>` child this element wraps.
     *
     * @export
     * @return {HTMLStyleElement} This element's light-DOM `<style>`
     */


    getStyle() {
      if (this._style) {
        return this._style;
      }

      const style =
      /** @type {HTMLStyleElement} */
      this.querySelector('style');

      if (!style) {
        return null;
      }

      this._style = style;
      /*
      HTML Imports styling the main document are deprecated in Chrome
      https://crbug.com/523952
       If this element is not in the main document, then it must be in an HTML Import document.
      In that case, move the custom style to the main document.
       The ordering of `<bbva-core-custom-style>` should stay the same as when loaded by HTML Imports, but there may be odd
      cases of ordering w.r.t the main document styles.
      */

      if (this.ownerDocument !== window.document) {
        window.document.head.appendChild(this);
      }

      return this._style;
    }

  }

  if (!customElements.get('bbva-core-custom-style')) {
    customElements.define('bbva-core-custom-style', BbvaCoreCustomStyle);
  }

  /* eslint-disable babel/no-unused-expressions */

  if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
    console.warn('ScopingShim not detected. Be sure to add ShadyCSS ScopingShim to your app!');
  }
  const setDocumentCustomStyles = styles => {
    const customStyles = document.createElement('template');
    customStyles.setAttribute('style', 'display: none;');
    customStyles.innerHTML = `
  <bbva-core-custom-style>
    <style>
      ${styles.cssText}
    </style>
  </bbva-core-custom-style>
  `;
    document.head.appendChild(customStyles.content);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * True if the custom elements polyfill is in use.
   */
  const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
  /**
   * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
   * `container`.
   */

  const removeNodes = (container, start, end = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.removeChild(start);
      start = n;
    }
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */
  const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
  /**
   * An expression marker used text-positions, multi-binding attributes, and
   * attributes with markup-like text values.
   */

  const nodeMarker = `<!--${marker}-->`;
  const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
  /**
   * Suffix appended to all bound attribute names.
   */

  const boundAttributeSuffix = '$lit$';
  /**
   * An updatable Template that tracks the location of dynamic parts.
   */

  class Template {
    constructor(result, element) {
      this.parts = [];
      this.element = element;
      const nodesToRemove = [];
      const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

      const walker = document.createTreeWalker(element.content, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      let lastPartIndex = 0;
      let index = -1;
      let partIndex = 0;
      const {
        strings,
        values: {
          length
        }
      } = result;

      while (partIndex < length) {
        const node = walker.nextNode();

        if (node === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          continue;
        }

        index++;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              const attributes = node.attributes;
              const {
                length
              } = attributes; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondence between part index and attribute index.

              let count = 0;

              for (let i = 0; i < length; i++) {
                if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                const stringForPart = strings[partIndex]; // Find the attribute name

                const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // All bound attributes have had a suffix added in
                // TemplateResult#getHTML to opt out of special attribute
                // handling. To look up the attribute value we also need to add
                // the suffix.

                const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                const attributeValue = node.getAttribute(attributeLookupName);
                node.removeAttribute(attributeLookupName);
                const statics = attributeValue.split(markerRegex);
                this.parts.push({
                  type: 'attribute',
                  index,
                  name,
                  strings: statics
                });
                partIndex += statics.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              stack.push(node);
              walker.currentNode = node.content;
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            const data = node.data;

            if (data.indexOf(marker) >= 0) {
              const parent = node.parentNode;
              const strings = data.split(markerRegex);
              const lastIndex = strings.length - 1; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (let i = 0; i < lastIndex; i++) {
                let insert;
                let s = strings[i];

                if (s === '') {
                  insert = createMarker();
                } else {
                  const match = lastAttributeNameRegex.exec(s);

                  if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                    s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                  }

                  insert = document.createTextNode(s);
                }

                parent.insertBefore(insert, node);
                this.parts.push({
                  type: 'node',
                  index: ++index
                });
              } // If there's no text, we must insert a comment to mark our place.
              // Else, we can trust it will stick around after cloning.


              if (strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = strings[lastIndex];
              } // We have a part for each match found


              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.data === marker) {
              const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * The previousSibling is already the start of a previous part

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;
                parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;
              this.parts.push({
                type: 'node',
                index
              }); // If we don't have a nextSibling, keep this node so we have an end.
              // Else, we can remove it to save future costs.

              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              let i = -1;

              while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                this.parts.push({
                  type: 'node',
                  index: -1
                });
                partIndex++;
              }
            }
          }
      } // Remove text binding nodes after the walk to not disturb the TreeWalker


      for (const n of nodesToRemove) {
        n.parentNode.removeChild(n);
      }
    }

  }

  const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
  };

  const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
  // small manual size-savings.

  const createMarker = () => document.createComment('');
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#elements-attributes
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-characters
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
   * space character except " ".
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */

  const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const walkerNodeFilter = 133
  /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
  ;
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1,
   * removed 4 nodes)
   */

  function removeNodesFromTemplate(template, nodesToRemove) {
    const {
      element: {
        content
      },
      parts
    } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;

    while (walker.nextNode()) {
      nodeIndex++;
      const node = walker.currentNode; // End removal if stepped past the removing node

      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      } // A node to remove was found in the template


      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node); // Track node we're removing

        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      } // When removing, increment count by which to adjust subsequent part indices


      if (currentRemovingNode !== null) {
        removeCount++;
      }

      while (part !== undefined && part.index === nodeIndex) {
        // If part is in a removed node deactivate it by setting index to -1 or
        // adjust the index as needed.
        part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }

    nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
  }

  const countNodes = node => {
    let count = node.nodeType === 11
    /* Node.DOCUMENT_FRAGMENT_NODE */
    ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

    while (walker.nextNode()) {
      count++;
    }

    return count;
  };

  const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
      const part = parts[i];

      if (isTemplatePartActive(part)) {
        return i;
      }
    }

    return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */


  function insertNodeIntoTemplate(template, node, refNode = null) {
    const {
      element: {
        content
      },
      parts
    } = template; // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.

    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }

    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;

    while (walker.nextNode()) {
      walkerIndex++;
      const walkerNode = walker.currentNode;

      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }

      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        // If we've inserted the node, simply adjust all subsequent parts
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }

          return;
        }

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const directives = new WeakMap();
  const isDirective = o => {
    return typeof o === 'function' && directives.has(o);
  };

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  const noChange = {};
  /**
   * A sentinel value that signals a NodePart to fully clear its content.
   */

  const nothing = {};

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */

  class TemplateInstance {
    constructor(template, processor, options) {
      this.__parts = [];
      this.template = template;
      this.processor = processor;
      this.options = options;
    }

    update(values) {
      let i = 0;

      for (const part of this.__parts) {
        if (part !== undefined) {
          part.setValue(values[i]);
        }

        i++;
      }

      for (const part of this.__parts) {
        if (part !== undefined) {
          part.commit();
        }
      }
    }

    _clone() {
      // There are a number of steps in the lifecycle of a template instance's
      // DOM fragment:
      //  1. Clone - create the instance fragment
      //  2. Adopt - adopt into the main document
      //  3. Process - find part markers and create parts
      //  4. Upgrade - upgrade custom elements
      //  5. Update - set node, attribute, property, etc., values
      //  6. Connect - connect to the document. Optional and outside of this
      //     method.
      //
      // We have a few constraints on the ordering of these steps:
      //  * We need to upgrade before updating, so that property values will pass
      //    through any property setters.
      //  * We would like to process before upgrading so that we're sure that the
      //    cloned fragment is inert and not disturbed by self-modifying DOM.
      //  * We want custom elements to upgrade even in disconnected fragments.
      //
      // Given these constraints, with full custom elements support we would
      // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
      //
      // But Safari does not implement CustomElementRegistry#upgrade, so we
      // can not implement that order and still have upgrade-before-update and
      // upgrade disconnected fragments. So we instead sacrifice the
      // process-before-upgrade constraint, since in Custom Elements v1 elements
      // must not modify their light DOM in the constructor. We still have issues
      // when co-existing with CEv0 elements like Polymer 1, and with polyfills
      // that don't strictly adhere to the no-modification rule because shadow
      // DOM, which may be created in the constructor, is emulated by being placed
      // in the light DOM.
      //
      // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
      // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
      // in one step.
      //
      // The Custom Elements v1 polyfill supports upgrade(), so the order when
      // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
      // Connect.
      const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
      const stack = [];
      const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

      const walker = document.createTreeWalker(fragment, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false);
      let partIndex = 0;
      let nodeIndex = 0;
      let part;
      let node = walker.nextNode(); // Loop through all the nodes and parts of a template

      while (partIndex < parts.length) {
        part = parts[partIndex];

        if (!isTemplatePartActive(part)) {
          this.__parts.push(undefined);

          partIndex++;
          continue;
        } // Progress the tree walker until we find our next part's node.
        // Note that multiple parts may share the same node (attribute parts
        // on a single element), so this loop may not run at all.


        while (nodeIndex < part.index) {
          nodeIndex++;

          if (node.nodeName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }

          if ((node = walker.nextNode()) === null) {
            // We've exhausted the content inside a nested template element.
            // Because we still have parts (the outer for-loop), we know:
            // - There is a template in the stack
            // - The walker will find a nextNode outside the template
            walker.currentNode = stack.pop();
            node = walker.nextNode();
          }
        } // We've arrived at our part's node.


        if (part.type === 'node') {
          const part = this.processor.handleTextExpression(this.options);
          part.insertAfterNode(node.previousSibling);

          this.__parts.push(part);
        } else {
          this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
        }

        partIndex++;
      }

      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }

      return fragment;
    }

  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Our TrustedTypePolicy for HTML which is declared using the html template
   * tag function.
   *
   * That HTML is a developer-authored constant, and is parsed with innerHTML
   * before any untrusted expressions have been mixed in. Therefor it is
   * considered safe by construction.
   */

  const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
    createHTML: s => s
  });
  const commentMarker = ` ${marker} `;
  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */

  class TemplateResult {
    constructor(strings, values, type, processor) {
      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */


    getHTML() {
      const l = this.strings.length - 1;
      let html = '';
      let isCommentBinding = false;

      for (let i = 0; i < l; i++) {
        const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
        // into the template source before it's parsed by the browser's HTML
        // parser. The marker type is based on whether the expression is in an
        // attribute, text, or comment position.
        //   * For node-position bindings we insert a comment with the marker
        //     sentinel as its text content, like <!--{{lit-guid}}-->.
        //   * For attribute bindings we insert just the marker sentinel for the
        //     first binding, so that we support unquoted attribute bindings.
        //     Subsequent bindings can use a comment marker because multi-binding
        //     attributes must be quoted.
        //   * For comment bindings we insert just the marker sentinel so we don't
        //     close the comment.
        //
        // The following code scans the template source, but is *not* an HTML
        // parser. We don't need to track the tree structure of the HTML, only
        // whether a binding is inside a comment, and if not, if it appears to be
        // the first binding in an attribute.

        const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
        // comment close. Because <-- can appear in an attribute value there can
        // be false positives.

        isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
        // expression. This can match "name=value" like structures in text,
        // comments, and attribute values, so there can be false-positives.

        const attributeMatch = lastAttributeNameRegex.exec(s);

        if (attributeMatch === null) {
          // We're only in this branch if we don't have a attribute-like
          // preceding sequence. For comments, this guards against unusual
          // attribute values like <div foo="<!--${'bar'}">. Cases like
          // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
          // below.
          html += s + (isCommentBinding ? commentMarker : nodeMarker);
        } else {
          // For attributes we use just a marker sentinel, and also append a
          // $lit$ suffix to the name to opt-out of attribute-specific parsing
          // that IE and Edge do for style and certain SVG attributes.
          html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
        }
      }

      html += this.strings[l];
      return html;
    }

    getTemplateElement() {
      const template = document.createElement('template');
      let value = this.getHTML();

      if (policy !== undefined) {
        // this is secure because `this.strings` is a TemplateStringsArray.
        // TODO: validate this when
        // https://github.com/tc39/proposal-array-is-template-object is
        // implemented.
        value = policy.createHTML(value);
      }

      template.innerHTML = value;
      return template;
    }

  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isPrimitive = value => {
    return value === null || !(typeof value === 'object' || typeof value === 'function');
  };
  const isIterable = value => {
    return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(value && value[Symbol.iterator]);
  };
  /**
   * Writes attribute values to the DOM for a group of AttributeParts bound to a
   * single attribute. The value is only set once even if there are multiple parts
   * for an attribute.
   */

  class AttributeCommitter {
    constructor(element, name, strings) {
      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];

      for (let i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */


    _createPart() {
      return new AttributePart(this);
    }

    _getValue() {
      const strings = this.strings;
      const l = strings.length - 1;
      const parts = this.parts; // If we're assigning an attribute via syntax like:
      //    attr="${foo}"  or  attr=${foo}
      // but not
      //    attr="${foo} ${bar}" or attr="${foo} baz"
      // then we don't want to coerce the attribute value into one long
      // string. Instead we want to just return the value itself directly,
      // so that sanitizeDOMValue can get the actual value rather than
      // String(value)
      // The exception is if v is an array, in which case we do want to smash
      // it together into a string without calling String() on the array.
      //
      // This also allows trusted values (when using TrustedTypes) being
      // assigned to DOM sinks without being stringified in the process.

      if (l === 1 && strings[0] === '' && strings[1] === '') {
        const v = parts[0].value;

        if (typeof v === 'symbol') {
          return String(v);
        }

        if (typeof v === 'string' || !isIterable(v)) {
          return v;
        }
      }

      let text = '';

      for (let i = 0; i < l; i++) {
        text += strings[i];
        const part = parts[i];

        if (part !== undefined) {
          const v = part.value;

          if (isPrimitive(v) || !isIterable(v)) {
            text += typeof v === 'string' ? v : String(v);
          } else {
            for (const t of v) {
              text += typeof t === 'string' ? t : String(t);
            }
          }
        }
      }

      text += strings[l];
      return text;
    }

    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    }

  }
  /**
   * A Part that controls all or part of an attribute value.
   */

  class AttributePart {
    constructor(committer) {
      this.value = undefined;
      this.committer = committer;
    }

    setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value; // If the value is a not a directive, dirty the committer so that it'll
        // call setAttribute. If the value is a directive, it'll dirty the
        // committer if it calls setValue().

        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    }

    commit() {
      while (isDirective(this.value)) {
        const directive = this.value;
        this.value = noChange;
        directive(this);
      }

      if (this.value === noChange) {
        return;
      }

      this.committer.commit();
    }

  }
  /**
   * A Part that controls a location within a Node tree. Like a Range, NodePart
   * has start and end locations and can set and update the Nodes between those
   * locations.
   *
   * NodeParts support several value types: primitives, Nodes, TemplateResults,
   * as well as arrays and iterables of those types.
   */

  class NodePart {
    constructor(options) {
      this.value = undefined;
      this.__pendingValue = undefined;
      this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    appendIntoPart(part) {
      part.__insert(this.startNode = createMarker());

      part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    insertAfterPart(ref) {
      ref.__insert(this.startNode = createMarker());

      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    }

    setValue(value) {
      this.__pendingValue = value;
    }

    commit() {
      if (this.startNode.parentNode === null) {
        return;
      }

      while (isDirective(this.__pendingValue)) {
        const directive = this.__pendingValue;
        this.__pendingValue = noChange;
        directive(this);
      }

      const value = this.__pendingValue;

      if (value === noChange) {
        return;
      }

      if (isPrimitive(value)) {
        if (value !== this.value) {
          this.__commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this.__commitTemplateResult(value);
      } else if (value instanceof Node) {
        this.__commitNode(value);
      } else if (isIterable(value)) {
        this.__commitIterable(value);
      } else if (value === nothing) {
        this.value = nothing;
        this.clear();
      } else {
        // Fallback, will render the string representation
        this.__commitText(value);
      }
    }

    __insert(node) {
      this.endNode.parentNode.insertBefore(node, this.endNode);
    }

    __commitNode(value) {
      if (this.value === value) {
        return;
      }

      this.clear();

      this.__insert(value);

      this.value = value;
    }

    __commitText(value) {
      const node = this.startNode.nextSibling;
      value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
      // it can't be implicitly converted - i.e. it's a symbol.

      const valueAsString = typeof value === 'string' ? value : String(value);

      if (node === this.endNode.previousSibling && node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          // If we only have a single text node between the markers, we can just
          // set its value, rather than replacing it.
          // TODO(justinfagnani): Can we just check if this.value is primitive?
          node.data = valueAsString;
        } else {
        this.__commitNode(document.createTextNode(valueAsString));
      }

      this.value = value;
    }

    __commitTemplateResult(value) {
      const template = this.options.templateFactory(value);

      if (this.value instanceof TemplateInstance && this.value.template === template) {
        this.value.update(value.values);
      } else {
        // Make sure we propagate the template processor from the TemplateResult
        // so that we use its syntax extension, etc. The template factory comes
        // from the render function options so that it can control template
        // caching and preprocessing.
        const instance = new TemplateInstance(template, value.processor, this.options);

        const fragment = instance._clone();

        instance.update(value.values);

        this.__commitNode(fragment);

        this.value = instance;
      }
    }

    __commitIterable(value) {
      // For an Iterable, we create a new InstancePart per item, then set its
      // value to the item. This is a little bit of overhead for every item in
      // an Iterable, but it lets us recurse easily and efficiently update Arrays
      // of TemplateResults that will be commonly returned from expressions like:
      // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
      // If _value is an array, then the previous render was of an
      // iterable and _value will contain the NodeParts from the previous
      // render. If _value is not an array, clear this part and make a new
      // array for NodeParts.
      if (!Array.isArray(this.value)) {
        this.value = [];
        this.clear();
      } // Lets us keep track of how many items we stamped so we can clear leftover
      // items from a previous render


      const itemParts = this.value;
      let partIndex = 0;
      let itemPart;

      for (const item of value) {
        // Try to reuse an existing part
        itemPart = itemParts[partIndex]; // If no existing part, create a new one

        if (itemPart === undefined) {
          itemPart = new NodePart(this.options);
          itemParts.push(itemPart);

          if (partIndex === 0) {
            itemPart.appendIntoPart(this);
          } else {
            itemPart.insertAfterPart(itemParts[partIndex - 1]);
          }
        }

        itemPart.setValue(item);
        itemPart.commit();
        partIndex++;
      }

      if (partIndex < itemParts.length) {
        // Truncate the parts array so _value reflects the current state
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    }

    clear(startNode = this.startNode) {
      removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }

  }
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */

  class BooleanAttributePart {
    constructor(element, name, strings) {
      this.value = undefined;
      this.__pendingValue = undefined;

      if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
        throw new Error('Boolean attributes can only contain a single expression');
      }

      this.element = element;
      this.name = name;
      this.strings = strings;
    }

    setValue(value) {
      this.__pendingValue = value;
    }

    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive = this.__pendingValue;
        this.__pendingValue = noChange;
        directive(this);
      }

      if (this.__pendingValue === noChange) {
        return;
      }

      const value = !!this.__pendingValue;

      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, '');
        } else {
          this.element.removeAttribute(this.name);
        }

        this.value = value;
      }

      this.__pendingValue = noChange;
    }

  }
  /**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */

  class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
      super(element, name, strings);
      this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
    }

    _createPart() {
      return new PropertyPart(this);
    }

    _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }

      return super._getValue();
    }

    commit() {
      if (this.dirty) {
        this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

        this.element[this.name] = this._getValue();
      }
    }

  }
  class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
  // from the options object, then options are supported. If not, then the third
  // argument to add/removeEventListener is interpreted as the boolean capture
  // value so we should only pass the `capture` property.

  let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
  // blocks right into the body of a module

  (() => {
    try {
      const options = {
        get capture() {
          eventOptionsSupported = true;
          return false;
        }

      }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

      window.removeEventListener('test', options, options);
    } catch (_e) {// event options not supported
    }
  })();

  class EventPart {
    constructor(element, eventName, eventContext) {
      this.value = undefined;
      this.__pendingValue = undefined;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;

      this.__boundHandleEvent = e => this.handleEvent(e);
    }

    setValue(value) {
      this.__pendingValue = value;
    }

    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive = this.__pendingValue;
        this.__pendingValue = noChange;
        directive(this);
      }

      if (this.__pendingValue === noChange) {
        return;
      }

      const newListener = this.__pendingValue;
      const oldListener = this.value;
      const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
      const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

      if (shouldRemoveListener) {
        this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
      }

      if (shouldAddListener) {
        this.__options = getOptions(newListener);
        this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
      }

      this.value = newListener;
      this.__pendingValue = noChange;
    }

    handleEvent(event) {
      if (typeof this.value === 'function') {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    }

  } // We copy options because of the inconsistent behavior of browsers when reading
  // the third argument of add/removeEventListener. IE11 doesn't support options
  // at all. Chrome 41 only reads `capture` if the argument is an object.

  const getOptions = o => o && (eventOptionsSupported ? {
    capture: o.capture,
    passive: o.passive,
    once: o.once
  } : o.capture);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * The default TemplateFactory which caches Templates keyed on
   * result.type and result.strings.
   */

  function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);

    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(result.type, templateCache);
    }

    let template = templateCache.stringsArray.get(result.strings);

    if (template !== undefined) {
      return template;
    } // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content


    const key = result.strings.join(marker); // Check if we already have a Template for this key

    template = templateCache.keyString.get(key);

    if (template === undefined) {
      // If we have not seen this key before, create a new Template
      template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

      templateCache.keyString.set(key, template);
    } // Cache all future queries for this TemplateStringsArray


    templateCache.stringsArray.set(result.strings, template);
    return template;
  }
  const templateCaches = new Map();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const parts = new WeakMap();
  /**
   * Renders a template result or other value to a container.
   *
   * To update a container with new values, reevaluate the template literal and
   * call `render` with the new result.
   *
   * @param result Any value renderable by NodePart - typically a TemplateResult
   *     created by evaluating a template tag like `html` or `svg`.
   * @param container A DOM parent to render to. The entire contents are either
   *     replaced, or efficiently updated if the same result type was previous
   *     rendered there.
   * @param options RenderOptions for the entire render tree rendered to this
   *     container. Render options must *not* change between renders to the same
   *     container, as those changes will not effect previously rendered DOM.
   */

  const render = (result, container, options) => {
    let part = parts.get(container);

    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({
        templateFactory
      }, options)));
      part.appendInto(container);
    }

    part.setValue(result);
    part.commit();
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Creates Parts when a template is instantiated.
   */

  class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
      const prefix = name[0];

      if (prefix === '.') {
        const committer = new PropertyCommitter(element, name.slice(1), strings);
        return committer.parts;
      }

      if (prefix === '@') {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }

      if (prefix === '?') {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }

      const committer = new AttributeCommitter(element, name, strings);
      return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */


    handleTextExpression(options) {
      return new NodePart(options);
    }

  }
  const defaultTemplateProcessor = new DefaultTemplateProcessor();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // This line will be used in regexes to search for lit-html usage.
  // TODO(justinfagnani): inject version number at build time

  if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
  }
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */


  const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

  let compatibleShadyCSSVersion = true;

  if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
  }
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */


  const shadyTemplateFactory = scopeName => result => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);

    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(cacheKey, templateCache);
    }

    let template = templateCache.stringsArray.get(result.strings);

    if (template !== undefined) {
      return template;
    }

    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);

    if (template === undefined) {
      const element = result.getTemplateElement();

      if (compatibleShadyCSSVersion) {
        window.ShadyCSS.prepareTemplateDom(element, scopeName);
      }

      template = new Template(result, element);
      templateCache.keyString.set(key, template);
    }

    templateCache.stringsArray.set(result.strings, template);
    return template;
  };
  const TEMPLATE_TYPES = ['html', 'svg'];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */

  const removeStylesFromLitTemplates = scopeName => {
    TEMPLATE_TYPES.forEach(type => {
      const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

      if (templates !== undefined) {
        templates.keyString.forEach(template => {
          const {
            element: {
              content
            }
          } = template; // IE 11 doesn't support the iterable param Set constructor

          const styles = new Set();
          Array.from(content.querySelectorAll('style')).forEach(s => {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };

  const shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered
   * output.
   */

  const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.

    const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

    const styles = renderedDOM.querySelectorAll('style');
    const {
      length
    } = styles; // If there are no styles, skip unnecessary work

    if (length === 0) {
      // Ensure prepareTemplateStyles is called to support adding
      // styles via `prepareAdoptedCssText` since that requires that
      // `prepareTemplateStyles` is called.
      //
      // ShadyCSS will only update styles containing @apply in the template
      // given to `prepareTemplateStyles`. If no lit Template was given,
      // ShadyCSS will not be able to update uses of @apply in any relevant
      // template. However, this is not a problem because we only create the
      // template for the purpose of supporting `prepareAdoptedCssText`,
      // which doesn't support @apply at all.
      window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
      return;
    }

    const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.

    for (let i = 0; i < length; i++) {
      const style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    } // Remove styles from nested templates in this scope.


    removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
    // `template`.

    const content = templateElement.content;

    if (!!template) {
      insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    } else {
      content.insertBefore(condensedStyle, content.firstChild);
    } // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).


    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');

    if (window.ShadyCSS.nativeShadow && style !== null) {
      // When in native Shadow DOM, ensure the style created by ShadyCSS is
      // included in initially rendered output (`renderedDOM`).
      renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    } else if (!!template) {
      // When no style is left in the template, parts will be broken as a
      // result. To fix this, we put back the style node ShadyCSS removed
      // and then tell lit to remove that node from the template.
      // There can be no style in the template in 2 cases (1) when Shady DOM
      // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
      // is in use ShadyCSS removes the style if it contains no content.
      // NOTE, ShadyCSS creates its own style so we can safely add/remove
      // `condensedStyle` here.
      content.insertBefore(condensedStyle, content.firstChild);
      const removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };
  /**
   * Extension to the standard `render` method which supports rendering
   * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
   * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
   * or when the webcomponentsjs
   * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
   *
   * Adds a `scopeName` option which is used to scope element DOM and stylesheets
   * when native ShadowDOM is unavailable. The `scopeName` will be added to
   * the class attribute of all rendered DOM. In addition, any style elements will
   * be automatically re-written with this `scopeName` selector and moved out
   * of the rendered DOM and into the document `<head>`.
   *
   * It is common to use this render method in conjunction with a custom element
   * which renders a shadowRoot. When this is done, typically the element's
   * `localName` should be used as the `scopeName`.
   *
   * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
   * custom properties (needed only on older browsers like IE11) and a shim for
   * a deprecated feature called `@apply` that supports applying a set of css
   * custom properties to a given location.
   *
   * Usage considerations:
   *
   * * Part values in `<style>` elements are only applied the first time a given
   * `scopeName` renders. Subsequent changes to parts in style elements will have
   * no effect. Because of this, parts in style elements should only be used for
   * values that will never change, for example parts that set scope-wide theme
   * values or parts which render shared style elements.
   *
   * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
   * custom element's `constructor` is not supported. Instead rendering should
   * either done asynchronously, for example at microtask timing (for example
   * `Promise.resolve()`), or be deferred until the first time the element's
   * `connectedCallback` runs.
   *
   * Usage considerations when using shimmed custom properties or `@apply`:
   *
   * * Whenever any dynamic changes are made which affect
   * css custom properties, `ShadyCSS.styleElement(element)` must be called
   * to update the element. There are two cases when this is needed:
   * (1) the element is connected to a new parent, (2) a class is added to the
   * element that causes it to match different custom properties.
   * To address the first case when rendering a custom element, `styleElement`
   * should be called in the element's `connectedCallback`.
   *
   * * Shimmed custom properties may only be defined either for an entire
   * shadowRoot (for example, in a `:host` rule) or via a rule that directly
   * matches an element with a shadowRoot. In other words, instead of flowing from
   * parent to child as do native css custom properties, shimmed custom properties
   * flow only from shadowRoots to nested shadowRoots.
   *
   * * When using `@apply` mixing css shorthand property names with
   * non-shorthand names (for example `border` and `border-width`) is not
   * supported.
   */


  const render$1 = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
      throw new Error('The `scopeName` option is required.');
    }

    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
    /* Node.DOCUMENT_FRAGMENT_NODE */
    && !!container.host; // Handle first render to a scope specially...

    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.

    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({
      templateFactory: shadyTemplateFactory(scopeName)
    }, options)); // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.

    if (firstScopeRender) {
      const part = parts.get(renderContainer);
      parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
      // that should apply to `renderContainer` even if the rendered value is
      // not a TemplateInstance. However, it will only insert scoped styles
      // into the document if `prepareTemplateStyles` has already been called
      // for the given scope name.

      const template = part.value instanceof TemplateInstance ? part.value.template : undefined;
      prepareTemplateStyles(scopeName, renderContainer, template);
      removeNodes(container, container.firstChild);
      container.appendChild(renderContainer);
      parts.set(container, part);
    } // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.


    if (!hasRendered && needsScoping) {
      window.ShadyCSS.styleElement(container.host);
    }
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var _a;
  /**
   * Use this module if you want to create your own base class extending
   * [[UpdatingElement]].
   * @packageDocumentation
   */

  /*
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */


  window.JSCompiler_renameProperty = (prop, _obj) => prop;

  const defaultConverter = {
    toAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value ? '' : null;

        case Object:
        case Array:
          // if the value is `null` or `undefined` pass this through
          // to allow removing/no change behavior.
          return value == null ? value : JSON.stringify(value);
      }

      return value;
    },

    fromAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;

        case Number:
          return value === null ? null : Number(value);

        case Object:
        case Array:
          // Type assert to adhere to Bazel's "must type assert JSON parse" rule.
          return JSON.parse(value);
      }

      return value;
    }

  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */

  const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
  };
  const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
  };
  const STATE_HAS_UPDATED = 1;
  const STATE_UPDATE_REQUESTED = 1 << 2;
  const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
  const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
  /**
   * The Closure JS Compiler doesn't currently have good support for static
   * property semantics where "this" is dynamic (e.g.
   * https://github.com/google/closure-compiler/issues/3177 and others) so we use
   * this hack to bypass any rewriting by the compiler.
   */

  const finalized = 'finalized';
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   * @noInheritDoc
   */

  class UpdatingElement extends HTMLElement {
    constructor() {
      super();
      this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */


    static get observedAttributes() {
      // note: piggy backing on this to ensure we're finalized.
      this.finalize();
      const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays

      this._classProperties.forEach((v, p) => {
        const attr = this._attributeNameForProperty(p, v);

        if (attr !== undefined) {
          this._attributeToPropertyMap.set(attr, p);

          attributes.push(attr);
        }
      });

      return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */

    /** @nocollapse */


    static _ensureClassProperties() {
      // ensure private storage for property declarations.
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
        this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

        const superProperties = Object.getPrototypeOf(this)._classProperties;

        if (superProperties !== undefined) {
          superProperties.forEach((v, k) => this._classProperties.set(k, v));
        }
      }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */


    static createProperty(name, options = defaultPropertyDeclaration) {
      // Note, since this can be called by the `@property` decorator which
      // is called before `finalize`, we ensure storage exists for property
      // metadata.
      this._ensureClassProperties();

      this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
      // it would be lost otherwise and that would never be the user's intention;
      // Instead, we expect users to call `requestUpdate` themselves from
      // user-defined accessors. Note that if the super has an accessor we will
      // still overwrite it


      if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
        return;
      }

      const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
      const descriptor = this.getPropertyDescriptor(name, key, options);

      if (descriptor !== undefined) {
        Object.defineProperty(this.prototype, name, descriptor);
      }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */


    static getPropertyDescriptor(name, key, options) {
      return {
        // tslint:disable-next-line:no-any no symbol in index
        get() {
          return this[key];
        },

        set(value) {
          const oldValue = this[name];
          this[key] = value;
          this.requestUpdateInternal(name, oldValue, options);
        },

        configurable: true,
        enumerable: true
      };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */


    static getPropertyOptions(name) {
      return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */


    static finalize() {
      // finalize any superclasses
      const superCtor = Object.getPrototypeOf(this);

      if (!superCtor.hasOwnProperty(finalized)) {
        superCtor.finalize();
      }

      this[finalized] = true;

      this._ensureClassProperties(); // initialize Map populated in observedAttributes


      this._attributeToPropertyMap = new Map(); // make any properties
      // Note, only process "own" properties since this element will inherit
      // any properties defined on the superClass, and finalization ensures
      // the entire prototype chain is finalized.

      if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
        const props = this.properties; // support symbols in properties (IE11 does not support this)

        const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

        for (const p of propKeys) {
          // note, use of `any` is due to TypeSript lack of support for symbol in
          // index types
          // tslint:disable-next-line:no-any no symbol in index
          this.createProperty(p, props[p]);
        }
      }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */


    static _attributeNameForProperty(name, options) {
      const attribute = options.attribute;
      return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */


    static _valueHasChanged(value, old, hasChanged = notEqual) {
      return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */


    static _propertyValueFromAttribute(value, options) {
      const type = options.type;
      const converter = options.converter || defaultConverter;
      const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
      return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */


    static _propertyValueToAttribute(value, options) {
      if (options.reflect === undefined) {
        return;
      }

      const type = options.type;
      const converter = options.converter;
      const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
      return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */


    initialize() {
      this._updateState = 0;
      this._updatePromise = new Promise(res => this._enableUpdatingResolver = res);
      this._changedProperties = new Map();

      this._saveInstanceProperties(); // ensures first update will be caught by an early access of
      // `updateComplete`


      this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */


    _saveInstanceProperties() {
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this.constructor._classProperties.forEach((_v, p) => {
        if (this.hasOwnProperty(p)) {
          const value = this[p];
          delete this[p];

          if (!this._instanceProperties) {
            this._instanceProperties = new Map();
          }

          this._instanceProperties.set(p, value);
        }
      });
    }
    /**
     * Applies previously saved instance properties.
     */


    _applyInstanceProperties() {
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      // tslint:disable-next-line:no-any
      this._instanceProperties.forEach((v, p) => this[p] = v);

      this._instanceProperties = undefined;
    }

    connectedCallback() {
      // Ensure first connection completes an update. Updates cannot complete
      // before connection.
      this.enableUpdating();
    }

    enableUpdating() {
      if (this._enableUpdatingResolver !== undefined) {
        this._enableUpdatingResolver();

        this._enableUpdatingResolver = undefined;
      }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */


    disconnectedCallback() {}
    /**
     * Synchronizes property values when attributes change.
     */


    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
      const ctor = this.constructor;

      const attr = ctor._attributeNameForProperty(name, options);

      if (attr !== undefined) {
        const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


        if (attrValue === undefined) {
          return;
        } // Track if the property is being reflected to avoid
        // setting the property again via `attributeChangedCallback`. Note:
        // 1. this takes advantage of the fact that the callback is synchronous.
        // 2. will behave incorrectly if multiple attributes are in the reaction
        // stack at time of calling. However, since we process attributes
        // in `update` this should not be possible (or an extreme corner case
        // that we'd like to discover).
        // mark state reflecting


        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

        if (attrValue == null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, attrValue);
        } // mark state not reflecting


        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
      }
    }

    _attributeToProperty(name, value) {
      // Use tracking info to avoid deserializing attribute value if it was
      // just set from a property setter.
      if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
        return;
      }

      const ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
      // the type; it has issues with tracking types through statics
      // tslint:disable-next-line:no-unnecessary-type-assertion

      const propName = ctor._attributeToPropertyMap.get(name);

      if (propName !== undefined) {
        const options = ctor.getPropertyOptions(propName); // mark state reflecting

        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
        this[propName] = // tslint:disable-next-line:no-any
        ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
      }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */


    requestUpdateInternal(name, oldValue, options) {
      let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

      if (name !== undefined) {
        const ctor = this.constructor;
        options = options || ctor.getPropertyOptions(name);

        if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
          if (!this._changedProperties.has(name)) {
            this._changedProperties.set(name, oldValue);
          } // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `_reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.


          if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
            if (this._reflectingProperties === undefined) {
              this._reflectingProperties = new Map();
            }

            this._reflectingProperties.set(name, options);
          }
        } else {
          // Abort the request if the property should not be considered changed.
          shouldRequestUpdate = false;
        }
      }

      if (!this._hasRequestedUpdate && shouldRequestUpdate) {
        this._updatePromise = this._enqueueUpdate();
      }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */


    requestUpdate(name, oldValue) {
      this.requestUpdateInternal(name, oldValue);
      return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */


    async _enqueueUpdate() {
      this._updateState = this._updateState | STATE_UPDATE_REQUESTED;

      try {
        // Ensure any previous update has resolved before updating.
        // This `await` also ensures that property changes are batched.
        await this._updatePromise;
      } catch (e) {// Ignore any previous errors. We only care that the previous cycle is
        // done. Any error should have been handled in the previous update.
      }

      const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
      // enable coordinating updates with a scheduler. Note, the result is
      // checked to avoid delaying an additional microtask unless we need to.

      if (result != null) {
        await result;
      }

      return !this._hasRequestedUpdate;
    }

    get _hasRequestedUpdate() {
      return this._updateState & STATE_UPDATE_REQUESTED;
    }

    get hasUpdated() {
      return this._updateState & STATE_HAS_UPDATED;
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */


    performUpdate() {
      // Abort any update if one is not pending when this is called.
      // This can happen if `performUpdate` is called early to "flush"
      // the update.
      if (!this._hasRequestedUpdate) {
        return;
      } // Mixin instance properties once, if they exist.


      if (this._instanceProperties) {
        this._applyInstanceProperties();
      }

      let shouldUpdate = false;
      const changedProperties = this._changedProperties;

      try {
        shouldUpdate = this.shouldUpdate(changedProperties);

        if (shouldUpdate) {
          this.update(changedProperties);
        } else {
          this._markUpdated();
        }
      } catch (e) {
        // Prevent `firstUpdated` and `updated` from running when there's an
        // update exception.
        shouldUpdate = false; // Ensure element can accept additional updates after an exception.

        this._markUpdated();

        throw e;
      }

      if (shouldUpdate) {
        if (!(this._updateState & STATE_HAS_UPDATED)) {
          this._updateState = this._updateState | STATE_HAS_UPDATED;
          this.firstUpdated(changedProperties);
        }

        this.updated(changedProperties);
      }
    }

    _markUpdated() {
      this._changedProperties = new Map();
      this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */


    get updateComplete() {
      return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     * @deprecated Override `getUpdateComplete()` instead for forward
     *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
     */


    _getUpdateComplete() {
      return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async getUpdateComplete() {
     *       await super.getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */


    getUpdateComplete() {
      return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */


    shouldUpdate(_changedProperties) {
      return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */


    update(_changedProperties) {
      if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
        // Use forEach so this works even if for/of loops are compiled to for
        // loops expecting arrays
        this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

        this._reflectingProperties = undefined;
      }

      this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */


    updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */


    firstUpdated(_changedProperties) {}

  }
  _a = finalized;
  /**
   * Marks class as having finished creating properties.
   */

  UpdatingElement[_a] = true;

  /**
  @license
  Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
  http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
  found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
  part of the polymer project is also subject to an additional IP rights grant
  found at http://polymer.github.io/PATENTS.txt
  */

  /**
   * Whether the current browser supports `adoptedStyleSheets`.
   */
  const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
  const constructionToken = Symbol();
  class CSSResult {
    constructor(cssText, safeToken) {
      if (safeToken !== constructionToken) {
        throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
      }

      this.cssText = cssText;
    } // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.


    get styleSheet() {
      if (this._styleSheet === undefined) {
        // Note, if `supportsAdoptingStyleSheets` is true then we assume
        // CSSStyleSheet is constructable.
        if (supportsAdoptingStyleSheets) {
          this._styleSheet = new CSSStyleSheet();

          this._styleSheet.replaceSync(this.cssText);
        } else {
          this._styleSheet = null;
        }
      }

      return this._styleSheet;
    }

    toString() {
      return this.cssText;
    }

  }
  /**
   * Wrap a value for interpolation in a [[`css`]] tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */

  const unsafeCSS = value => {
    return new CSSResult(String(value), constructionToken);
  };

  const textFromCSSResult = value => {
    if (value instanceof CSSResult) {
      return value.cssText;
    } else if (typeof value === 'number') {
      return value;
    } else {
      throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
  };
  /**
   * Template tag which which can be used with LitElement's [[LitElement.styles |
   * `styles`]] property to set element styles. For security reasons, only literal
   * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
   * may be used inside a template string part.
   */


  const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // This line will be used in regexes to search for LitElement usage.
  // TODO(justinfagnani): inject version number at build time

  (window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.5.1');
  /**
   * Sentinal value used to avoid calling lit-html's render function when
   * subclasses do not implement `render`
   */

  const renderNotImplemented = {};
  /**
   * Base element class that manages element properties and attributes, and
   * renders a lit-html template.
   *
   * To define a component, subclass `LitElement` and implement a
   * `render` method to provide the component's template. Define properties
   * using the [[`properties`]] property or the [[`property`]] decorator.
   */

  class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
      return this.styles;
    }
    /** @nocollapse */


    static _getUniqueStyles() {
      // Only gather styles once per class
      if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
        return;
      } // Take care not to call `this.getStyles()` multiple times since this
      // generates new CSSResults each time.
      // TODO(sorvell): Since we do not cache CSSResults by input, any
      // shared styles will generate new stylesheet objects, which is wasteful.
      // This should be addressed when a browser ships constructable
      // stylesheets.


      const userStyles = this.getStyles();

      if (Array.isArray(userStyles)) {
        // De-duplicate styles preserving the _last_ instance in the set.
        // This is a performance optimization to avoid duplicated styles that can
        // occur especially when composing via subclassing.
        // The last item is kept to try to preserve the cascade order with the
        // assumption that it's most important that last added styles override
        // previous styles.
        const addStyles = (styles, set) => styles.reduceRight((set, s) => // Note: On IE set.add() does not return the set
        Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set); // Array.from does not work on Set in IE, otherwise return
        // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


        const set = addStyles(userStyles, new Set());
        const styles = [];
        set.forEach(v => styles.unshift(v));
        this._styles = styles;
      } else {
        this._styles = userStyles === undefined ? [] : [userStyles];
      } // Ensure that there are no invalid CSSStyleSheet instances here. They are
      // invalid in two conditions.
      // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
      //     this is impossible to check except via .replaceSync or use
      // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
      //     false)


      this._styles = this._styles.map(s => {
        if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
          // Flatten the cssText from the passed constructible stylesheet (or
          // undetectable non-constructible stylesheet). The user might have
          // expected to update their stylesheets over time, but the alternative
          // is a crash.
          const cssText = Array.prototype.slice.call(s.cssRules).reduce((css, rule) => css + rule.cssText, '');
          return unsafeCSS(cssText);
        }

        return s;
      });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */


    initialize() {
      super.initialize();

      this.constructor._getUniqueStyles();

      this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
      // element's getRootNode(). While this could be done, we're choosing not to
      // support this now since it would require different logic around de-duping.

      if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
        this.adoptStyles();
      }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */


    createRenderRoot() {
      return this.attachShadow(this.constructor.shadowRootOptions);
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */


    adoptStyles() {
      const styles = this.constructor._styles;

      if (styles.length === 0) {
        return;
      } // There are three separate cases here based on Shadow DOM support.
      // (1) shadowRoot polyfilled: use ShadyCSS
      // (2) shadowRoot.adoptedStyleSheets available: use it
      // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
      // rendering


      if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
      } else if (supportsAdoptingStyleSheets) {
        this.renderRoot.adoptedStyleSheets = styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
      } else {
        // This must be done after rendering so the actual style insertion is done
        // in `update`.
        this._needsShimAdoptedStyleSheets = true;
      }
    }

    connectedCallback() {
      super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
      // connected after first update.

      if (this.hasUpdated && window.ShadyCSS !== undefined) {
        window.ShadyCSS.styleElement(this);
      }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */


    update(changedProperties) {
      // Setting properties in `render` should not trigger an update. Since
      // updates are allowed after super.update, it's important to call `render`
      // before that.
      const templateResult = this.render();
      super.update(changedProperties); // If render is not implemented by the component, don't call lit-html render

      if (templateResult !== renderNotImplemented) {
        this.constructor.render(templateResult, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        });
      } // When native Shadow DOM is used but adoptedStyles are not supported,
      // insert styling after rendering to ensure adoptedStyles have highest
      // priority.


      if (this._needsShimAdoptedStyleSheets) {
        this._needsShimAdoptedStyleSheets = false;

        this.constructor._styles.forEach(s => {
          const style = document.createElement('style');
          style.textContent = s.cssText;
          this.renderRoot.appendChild(style);
        });
      }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */


    render() {
      return renderNotImplemented;
    }

  }
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See updating-element.ts for more information.
   */

  LitElement['finalized'] = true;
  /**
   * Reference to the underlying library method used to render the element's
   * DOM. By default, points to the `render` method from lit-html's shady-render
   * module.
   *
   * **Most users will never need to touch this property.**
   *
   * This  property should not be confused with the `render` instance method,
   * which should be overridden to define a template for the element.
   *
   * Advanced users creating a new base class based on LitElement can override
   * this property to point to a custom render method with a signature that
   * matches [shady-render's `render`
   * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
   *
   * @nocollapse
   */

  LitElement.render = render$1;
  /** @nocollapse */

  LitElement.shadowRootOptions = {
    mode: 'open'
  };

  const meta = new BbvaCoreMeta({
    type: 'sharedStyles'
  });
  const getComponentSharedStyles = id => {
    const sharedStyles = meta.byKey(id);

    if (sharedStyles) {
      const onlyCSSResult = sharedStyles.filter(cssResultObject => cssResultObject.cssText);
      const onlyUnsafeCssResult = unsafeCSS(onlyCSSResult.join(''));
      return css`
      ${onlyUnsafeCssResult}
    `;
    }

    return css``;
  };

  setDocumentCustomStyles(css`
  /* Light */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Light.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Light.woff)
        format('woff');
    font-style: normal;
    font-weight: 300;
    font-display: fallback;
  }

  /* Book */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Book.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Book.woff)
        format('woff');
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
  }

  /* Book Italic */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-BookItalic.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-BookItalic.woff)
        format('woff');
    font-style: italic;
    font-weight: 400;
    font-display: fallback;
  }

  /* Medium */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Medium.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Medium.woff)
        format('woff');
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
  }

  /* Medium Italic */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-MediumItalic.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-MediumItalic.woff)
        format('woff');
    font-style: italic;
    font-weight: 500;
    font-display: fallback;
  }

  /* Regular */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Regular.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Regular.woff)
        format('woff');
    font-style: normal;
    font-weight: 450;
    font-display: fallback;
  }

  /* Bold */
  @font-face {
    font-family: 'Benton Sans';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Bold.woff2)
        format('woff2'),
      url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/benton/BentonSansBBVA-Bold.woff)
        format('woff');
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
  }

  /* Tiempos */
  @font-face {
    font-family: 'Tiempos';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/tiempos/TiemposText-Regular.woff2)
      format('woff2');
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'Tiempos';
    src: url(https://bbva-experience-foundations.s3-eu-west-1.amazonaws.com/fonts/tiempos/TiemposText-RegularItalic.woff2)
      format('woff2');
    font-style: italic;
    font-weight: normal;
    font-display: fallback;
  }
`);

  const colors = {
    primaryCore: '#004481',
    // dark background
    primaryCoreDarkened: '#072146',
    primaryCoreLightened: '#ffffff',
    // light background
    primaryCoreDark: '#043263',
    primaryCoreLight: '#1464A5',
    // medium background
    primaryMedium: '#1973B8',
    primaryMediumLight: '#49A5E6',
    primarySubdued: '#5BBEFF',
    primarySubduedLight: '#D4EDFC',
    primaryVariant: '#2DCCCD',
    primaryVariantDark: '#028484',
    primaryVariantDarkened: '#006C6C',
    primaryVariantMedium: '#02A5A5',
    primaryVariantLight: '#5AC4C4',
    primaryVariantLightened: '#EAF9FA',
    secondary600: '#121212',
    secondary500: '#666666',
    secondary400: '#BDBDBD',
    secondary300: '#D3D3D3',
    secondary200: '#E9E9E9',
    secondary100: '#F4F4F4',
    tertiaryType1: '#DA3851',
    tertiaryType1Dark: '#B92A45',
    tertiaryType1Medium: '#C0475E',
    tertiaryType1Light: '#E77D8E',
    tertiaryType1Lightened: '#F4C3CA',
    tertiaryType2: '#F7893B',
    tertiaryType2Dark: '#C65302',
    tertiaryType2Medium: '#D8732C',
    tertiaryType2Light: '#FAB27F',
    tertiaryType2Lightened: '#FDE7D8',
    tertiaryType3: '#F8CD51',
    tertiaryType3Dark: '#9C6C01',
    tertiaryType3Medium: '#C49735',
    tertiaryType3Light: '#FADE8E',
    tertiaryType3Lightened: '#FEF5DC',
    tertiaryType4: '#D8BE75',
    tertiaryType4Dark: '#8E7022',
    tertiaryType4Medium: '#B79E5E',
    tertiaryType4Light: '#E6D5A5',
    tertiaryType4Lightened: '#F3EBD5',
    tertiaryType5: '#F35E61',
    tertiaryType5Dark: '#CB353A',
    tertiaryType5Medium: '#D44B50',
    tertiaryType5Light: '#F59799',
    tertiaryType5Lightened: '#FCDFDF',
    tertiaryType6: '#48AE64',
    tertiaryType6Dark: '#277A3E',
    tertiaryType6Medium: '#388D4F',
    tertiaryType6Light: '#88CA9A',
    tertiaryType6Lightened: '#D9EFE0',
    tertiaryType7: '#F78BE8',
    tertiaryType7Dark: '#AD53A1',
    tertiaryType7Medium: '#C569B9',
    tertiaryType7Light: '#FAB3F0',
    tertiaryType7Lightened: '#FDDCF8',
    tertiaryType8: '#8F7AE5',
    tertiaryType8Dark: '#6754B8',
    tertiaryType8Medium: '#7C6AC7',
    tertiaryType8Light: '#B6A8EE',
    tertiaryType8Lightened: '#DDD7F7'
  };

  const ambients = {
    light: `${colors.primaryCoreLightened}`,
    // white
    light100: `${colors.secondary100}`,
    // grey 100
    dark: `${colors.primaryCore}`,
    // core blue
    dark100: `${colors.primaryMedium}`,
    // medium blue
    dark200: `${colors.primaryCoreLight}`,
    // light blue
    dark300: `${colors.primaryCoreDark}`,
    // dark blue
    dark400: `${colors.primaryCoreDarkened}` // navy

  };

  const typography = {
    type9XLarge: '4.25rem',
    // 68px
    type8XLarge: '3rem',
    // 48px
    type7XLarge: '2.5rem',
    // 40px
    type6XLarge: '2.25rem',
    // 36px
    type5XLarge: '2rem',
    // 32px
    type4XLarge: '1.625rem',
    // 26px
    type3XLarge: '1.5rem',
    // 24px
    type2XLarge: '1.375rem',
    // 22px
    typeXLarge: '1.25rem',
    // 20px
    typeLarge: '1.125rem',
    // 18px
    typeMedium: '1rem',
    // 16px
    typeSmall: '0.9375rem',
    // 15px
    typeXSmall: '0.875rem',
    // 14px
    type2XSmall: '0.8125rem',
    // 13px
    type3XSmall: '0.75rem',
    // 12px
    type4XSmall: '0.625rem',
    // 10px
    typeQuoteLarge: '2.25rem',
    // 36px
    typeQuoteMedium: '1.625rem',
    // 26px
    typeQuote: '1.125rem',
    // 18px
    typeLink: '0.9375rem',
    // 15px
    type6XLBreakpointXS: '2rem',
    // 32px
    type6XLBreakpointSM: '4.25rem',
    // 68px
    type5XLBreakpointXS: '2rem',
    // 32px
    type5XLBreakpointSM: '3rem',
    // 48px
    type4XLBreakpointXS: '1.625rem',
    // 26px
    type4XLBreakpointSM: '2.5rem',
    // 40px
    type3XLBreakpointXS: '1.5rem',
    // 24px
    type3XLBreakpointSM: '2.25rem',
    // 36px
    type2XLBreakpointXS: '1.375rem',
    // 22px
    type2XLBreakpointSM: '1.625rem',
    // 26px
    typeXLBreakpointXS: '1.25rem',
    // 20px
    typeXLBreakpointSM: '1.375rem',
    // 22px
    typeLBreakpointXS: '1.125rem',
    // 18px
    typeLBreakpointSM: '1.25rem',
    // 20px
    typeMBreakpointXS: '1rem',
    // 16px
    typeMBreakpointSM: '1.125rem',
    // 18px
    typeSBreakpointXS: '0.9375rem',
    // 15px
    typeSBreakpointSM: '0.9375rem',
    // 15px
    typeXSBreakpointXS: '0.875rem',
    // 14px
    typeXSBreakpointSM: '0.8125rem',
    // 13px
    type2XSBreakpointXS: '0.75rem',
    // 12px
    type2XSBreakpointSM: '0.75rem',
    // 12px
    type3XSBreakpointXS: '0.625rem',
    // 10px
    type3XSBreakpointSM: '0.625rem',
    // 10px
    type3XLSecondaryBreakpointXS: '1.625rem',
    // 26px
    type3XLSecondaryBreakpointSM: '2.25rem' // 36px

  };

  const lineHeight = {
    type9XLarge: '4.5rem',
    // 72px
    type8XLarge: '3.5rem',
    // 56px
    type7XLarge: '3rem',
    // 48px
    type6XLarge: '2.5rem',
    // 40px
    type5XLarge: '2.5rem',
    // 40px
    type4XLarge: '2rem',
    // 32px
    type3XLarge: '2rem',
    // 32px
    type2XLarge: '2rem',
    // 32px
    typeXLarge: '1.5rem',
    // 24px
    typeLarge: '1.5rem',
    // 24px
    typeMedium: '1.5rem',
    // 24px
    typeSmall: '1.5rem',
    // 24px
    typeXSmall: '1.5rem',
    // 24px
    type2XSmall: '1.5rem',
    // 24px
    type3XSmall: '1rem',
    // 16px
    type4XSmall: '1rem',
    // 16px
    typeQuoteLarge: '3rem',
    // 48px
    typeQuoteMedium: '2rem',
    // 32px
    typeQuote: '1.5rem',
    // 24px
    typeLink: '1rem',
    // 16px
    type6XLBreakpointXS: '1.25',
    // 40px // 2.5rem // 1.25
    type6XLBreakpointSM: '1.0588242',
    // 72px // 4.5rem // 1.0588242
    type5XLBreakpointXS: '1.25',
    // 40px // 2.5rem // 1.25
    type5XLBreakpointSM: '1.1666668',
    // 56px // 3.5rem // 1.1666668
    type4XLBreakpointXS: '1.2307700',
    // 32px // 2rem // 1.2307700
    type4XLBreakpointSM: '1.2',
    // 48px // 3rem // 1.2
    type3XLBreakpointXS: '1.3333333',
    // 32px //2rem // 1.3333333
    type3XLBreakpointSM: '1.1111121',
    // 40px // 2.5rem // 1.1111121
    type2XLBreakpointXS: '1.4545458',
    // 32px // 2rem // 1.4545458
    type2XLBreakpointSM: '1.2307700',
    // 32px // 2rem // 1.2307700
    typeXLBreakpointXS: '1.2',
    // 24px //1.5rem // 1.2
    typeXLBreakpointSM: '1.4545458',
    // 32px // 2rem // 1.4545458
    typeLBreakpointXS: '1.3333333',
    // 24px // 1.5rem // 1.3333333
    typeLBreakpointSM: '1.6',
    // 32px // 2rem // 1.6
    typeMBreakpointXS: '1.5',
    // 24px // 1.5rem // 1.6
    typeMBreakpointSM: '1.3333333',
    // 24px // 1.5rem // 1.3333333
    typeSBreakpointXS: '1.6',
    // 24px // 1.5rem // 1.6
    typeSBreakpointSM: '1.6',
    // 24px // 1.5rem // 1.6
    typeSTightBreakpointXS: '1.0666668',
    // 16px // 1rem // 1.0666668
    typeSTightBreakpointSM: '1.6',
    // 24px // 1.5rem // 1.6
    typeXSBreakpointXS: '1.7142888',
    // 24px // 1.5rem // 1.7142888
    typeXSBreakpointSM: '1.2307700',
    // 16px // 1rem // 1.2307700
    typeXSTightBreakpointXS: '1.1428580',
    // 16px // 1rem // 1.1428580
    typeXSTightBreakpointSM: '1.2307700',
    // 16px // 1rem // 1.2307700
    type2XSBreakpointXS: '2',
    // 24px // 1.5rem // 2
    type2XSBreakpointSM: '1.3333333',
    // 16px // 1rem // 1.3333333
    type2XSTightBreakpointXS: '1.3333333',
    // 16px // 1rem // 1.3333333
    type2XSTightBreakpointSM: '1.3333333',
    // 16px // 1rem // 1.3333333
    type3XSBreakpointXS: '1.6',
    // 16px // 1rem // 1.6
    type3XSBreakpointSM: '1.6',
    // 16px // 1rem // 1.6
    type3XLSecondaryBreakpointXS: '1.2307700',
    // 32px // 2rem // 1.2307700
    type3XLSecondaryBreakpointSM: '1.3333333' // 48px // 3rem // 1.3333333

  };

  const grid = {
    spacer: '8',
    gutter: 32,
    margin: 16,
    breakpoints: {
      xs: {
        max: 599,
        columns: 4
      },
      sm: {
        min: 600,
        columns: 8
      },
      md: {
        min: 992,
        columns: 12,
        maxWidth: 960
      },
      lg: {
        min: 1200,
        columns: 12,
        maxWidth: 1176
      }
    }
  };

  const borderRadius = {
    small: '1px',
    medium: '2px',
    large: '4px'
  };

  const fontFacePrimary = {
    fontFamily: '"Benton Sans"',
    light: {
      fontWeight: 300,
      fontStyle: 'normal'
    },
    book: {
      fontWeight: 400,
      fontStyle: 'normal'
    },
    bookItalic: {
      fontWeight: 400,
      fontStyle: 'italic'
    },
    medium: {
      fontWeight: 500,
      fontStyle: 'normal'
    },
    mediumItalic: {
      fontWeight: 500,
      fontStyle: 'italic'
    },
    regular: {
      fontWeight: 600,
      fontStyle: 'normal'
    },
    bold: {
      fontWeight: 700,
      fontStyle: 'normal'
    }
  };

  const fontFaceSecondary = {
    fontFamily: '"Tiempos"',
    regular: {
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    regularItalic: {
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  };

  const boxShadow = {
    type1: '0 1px 3px 0 rgba(18, 18, 18, .2)',
    // #121212 20% opacity
    type2: '0 1px 3px 0 rgba(18, 18, 18, .3)' // #121212 30% opacity

  };

  const statusColors = {
    success: colors.tertiaryType6Dark,
    successDark: colors.tertiaryType6,
    warning: colors.tertiaryType2Dark,
    warningDark: colors.tertiaryType2,
    error: colors.tertiaryType1Dark,
    errorDark: colors.tertiaryType1,
    pending: colors.primaryCore,
    off: colors.secondary500,
    finance: colors.primaryVariantDark
  };

  const typographyCollection = {
    type6XLBold: {
      xs: {},
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type6XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type6XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      }
    },
    type5XLBold: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type5XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type5XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type5XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type5XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      }
    },
    type4XLBold: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type4XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type4XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type4XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type4XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      }
    },
    type3XLBook: {
      xs: {},
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type3XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    type3XLMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type3XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type3XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type3XLBold: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type3XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      },
      sm: {}
    },
    type2XLBook: {
      xs: {},
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type2XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    type2XLMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type2XLBold: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type2XLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.type2XLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      }
    },
    typeXLBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeXLMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeXLBold: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bold.fontWeight}`,
        lineHeight: `${lineHeight.typeXLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bold.fontStyle}`
      }
    },
    typeLBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {}
    },
    typeLMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeLBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeLBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeLBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeLBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeMBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeMBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeMBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeMBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeMBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeMMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeMBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeMBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeMBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeMBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeSBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeSBookItalic: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      }
    },
    typeSMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeSMediumItalic: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.mediumItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.mediumItalic.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.mediumItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.mediumItalic.fontStyle}`
      }
    },
    typeSBookTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeSBookItalicTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      }
    },
    typeSMediumTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeSMediumItalicTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.mediumItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.mediumItalic.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.mediumItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.mediumItalic.fontStyle}`
      }
    },
    typeXSBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeXSBookItalic: {
      xs: {},
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeXSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      }
    },
    typeXSMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    typeXSBookTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.typeXSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    typeXSBookItalicTight: {
      xs: {},
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.bookItalic.fontWeight}`,
        lineHeight: `${lineHeight.typeXSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.bookItalic.fontStyle}`
      }
    },
    typeXSMediumTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.typeXSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.typeXSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type2XSBook: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type2XSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type2XSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    type2XSMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type2XSBookTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type2XSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.book.fontWeight}`,
        lineHeight: `${lineHeight.type2XSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.book.fontStyle}`
      }
    },
    type2XSMediumTight: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XSTightBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type2XSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type2XSTightBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type3XSMedium: {
      xs: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XSBreakpointXS}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type3XSBreakpointXS}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFacePrimaryFontFamily, ${fontFacePrimary.fontFamily})`,
        fontSize: `${typography.type3XSBreakpointSM}`,
        fontWeight: `${fontFacePrimary.medium.fontWeight}`,
        lineHeight: `${lineHeight.type3XSBreakpointSM}`,
        fontStyle: `${fontFacePrimary.medium.fontStyle}`
      }
    },
    type3XLSecondaryRegularItalic: {
      xs: {
        fontFamily: `var(--fontFaceSecondaryFontFamily, ${fontFaceSecondary.fontFamily})`,
        fontSize: `${typography.type3XLSecondaryBreakpointXS}`,
        fontWeight: `${fontFaceSecondary.regularItalic.fontWeight}`,
        lineHeight: `${lineHeight.type3XLSecondaryBreakpointXS}`,
        fontStyle: `${fontFaceSecondary.regularItalic.fontStyle}`
      },
      sm: {
        fontFamily: `var(--fontFaceSecondaryFontFamily, ${fontFaceSecondary.fontFamily})`,
        fontSize: `${typography.type3XLSecondaryBreakpointSM}`,
        fontWeight: `${fontFaceSecondary.regularItalic.fontWeight}`,
        lineHeight: `${lineHeight.type3XLSecondaryBreakpointSM}`,
        fontStyle: `${fontFaceSecondary.regularItalic.fontStyle}`
      }
    }
  };

  /* eslint-disable no-else-return */

  function shadyStyleDocument(mq) {
    /* istanbul ignore if */
    if (mq.matches) {
      window.ShadyCSS.styleDocument();
    }
  }
  /* istanbul ignore if  */


  if (window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && !window.ShadyCSS.nativeCss) {
    const mqXs = window.matchMedia(`screen and (max-width: ${grid.breakpoints.xs.max / 16}rem)`);
    const mqSm = window.matchMedia(`screen and (min-width: ${grid.breakpoints.sm.min / 16}rem) and (max-width: ${(grid.breakpoints.md.min - 1) / 16}rem)`);
    const mqMd = window.matchMedia(`screen and (min-width: ${grid.breakpoints.md.min / 16}rem) and (max-width: ${(grid.breakpoints.lg.min - 1) / 16}rem)`);
    const mqLg = window.matchMedia(`screen and (min-width: ${grid.breakpoints.lg.min / 16}rem)`); // MediaQueryList.addListener() alias for EventTarget.addEventListener(), for backwards compatibility purposes.

    mqXs.addListener(shadyStyleDocument);
    mqSm.addListener(shadyStyleDocument);
    mqMd.addListener(shadyStyleDocument);
    mqLg.addListener(shadyStyleDocument);
  } // - - - - - - - - Private - - - - - - - -  -

  setDocumentCustomStyles(css`
  :root {
    /* Core (BBVA Core Blue)
    /* ---------------------------------------------- */
    --colorsPrimaryCore: ${unsafeCSS(colors.primaryCore)};
    --colorsPrimaryCoreDarkened: ${unsafeCSS(colors.primaryCoreDarkened)};
    --colorsPrimaryCoreLightened: ${unsafeCSS(colors.primaryCoreLightened)};
    --colorsPrimaryCoreDark: ${unsafeCSS(colors.primaryCoreDark)};
    --colorsPrimaryCoreLight: ${unsafeCSS(colors.primaryCoreLight)};

    /* Medium (BBVA Medium Blue)
    /* ---------------------------------------------- */
    --colorsPrimaryMedium: ${unsafeCSS(colors.primaryMedium)};
    --colorsPrimaryMediumLight: ${unsafeCSS(colors.primaryMediumLight)};

    /* Subdued (BBVA Sky Blue)
    /* ---------------------------------------------- */
    --colorsPrimarySubdued: ${unsafeCSS(colors.primarySubdued)};
    --colorsPrimarySubduedLight: ${unsafeCSS(colors.primarySubduedLight)};

    /* Variant (BBVA Aqua Blue)
    /* ---------------------------------------------- */
    --colorsPrimaryVariant: ${unsafeCSS(colors.primaryVariant)};
    --colorsPrimaryVariantDark: ${unsafeCSS(colors.primaryVariantDark)};
    --colorsPrimaryVariantDarkened: ${unsafeCSS(colors.primaryVariantDarkened)};
    --colorsPrimaryVariantMedium: ${unsafeCSS(colors.primaryVariantMedium)};
    --colorsPrimaryVariantLight: ${unsafeCSS(colors.primaryVariantLight)};
    --colorsPrimaryVariantLightened: ${unsafeCSS(colors.primaryVariantLightened)};

    /* Secondary (BBVA Secondary)
    /* ---------------------------------------------- */
    --colorsSecondary600: ${unsafeCSS(colors.secondary600)};
    --colorsSecondary500: ${unsafeCSS(colors.secondary500)};
    --colorsSecondary400: ${unsafeCSS(colors.secondary400)};
    --colorsSecondary300: ${unsafeCSS(colors.secondary300)};
    --colorsSecondary200: ${unsafeCSS(colors.secondary200)};
    --colorsSecondary100: ${unsafeCSS(colors.secondary100)};

    /* Tertiary (BBVA Tertiary)
    /* ---------------------------------------------- */
    /* Type 1 (BBVA Red)
    /* ---------------------------------------------- */
    --colorsTertiaryType1: ${unsafeCSS(colors.tertiaryType1)};
    --colorsTertiaryType1Dark: ${unsafeCSS(colors.tertiaryType1Dark)};
    --colorsTertiaryType1Medium: ${unsafeCSS(colors.tertiaryType1Medium)};
    --colorsTertiaryType1Light: ${unsafeCSS(colors.tertiaryType1Light)};
    --colorsTertiaryType1Lightened: ${unsafeCSS(colors.tertiaryType1Lightened)};

    /* Type 2 (BBVA Orange)
    /* ---------------------------------------------- */
    --colorsTertiaryType2: ${unsafeCSS(colors.tertiaryType2)};
    --colorsTertiaryType2Dark: ${unsafeCSS(colors.tertiaryType2Dark)};
    --colorsTertiaryType2Medium: ${unsafeCSS(colors.tertiaryType2Medium)};
    --colorsTertiaryType2Light: ${unsafeCSS(colors.tertiaryType2Light)};
    --colorsTertiaryType2Lightened: ${unsafeCSS(colors.tertiaryType2Lightened)};

    /* Type 3 (BBVA Yellow)
    /* ---------------------------------------------- */
    --colorsTertiaryType3: ${unsafeCSS(colors.tertiaryType3)};
    --colorsTertiaryType3Dark: ${unsafeCSS(colors.tertiaryType3Dark)};
    --colorsTertiaryType3Medium: ${unsafeCSS(colors.tertiaryType3Medium)};
    --colorsTertiaryType3Light: ${unsafeCSS(colors.tertiaryType3Light)};
    --colorsTertiaryType3Lightened: ${unsafeCSS(colors.tertiaryType3Lightened)};

    /* Type 4 (BBVA Sand)
    /* ---------------------------------------------- */
    --colorsTertiaryType4: ${unsafeCSS(colors.tertiaryType4)};
    --colorsTertiaryType4Dark: ${unsafeCSS(colors.tertiaryType4Dark)};
    --colorsTertiaryType4Medium: ${unsafeCSS(colors.tertiaryType4Medium)};
    --colorsTertiaryType4Light: ${unsafeCSS(colors.tertiaryType4Light)};
    --colorsTertiaryType4Lightened: ${unsafeCSS(colors.tertiaryType4Lightened)};

    /* Type 5 (BBVA Coral)
    /* ---------------------------------------------- */
    --colorsTertiaryType5: ${unsafeCSS(colors.tertiaryType5)};
    --colorsTertiaryType5Dark: ${unsafeCSS(colors.tertiaryType5Dark)};
    --colorsTertiaryType5Medium: ${unsafeCSS(colors.tertiaryType5Medium)};
    --colorsTertiaryType5Light: ${unsafeCSS(colors.tertiaryType5Light)};
    --colorsTertiaryType5Lightened: ${unsafeCSS(colors.tertiaryType5Lightened)};

    /* Type 6 (BBVA Green)
    /* ---------------------------------------------- */
    --colorsTertiaryType6: ${unsafeCSS(colors.tertiaryType6)};
    --colorsTertiaryType6Dark: ${unsafeCSS(colors.tertiaryType6Dark)};
    --colorsTertiaryType6Medium: ${unsafeCSS(colors.tertiaryType6Medium)};
    --colorsTertiaryType6Light: ${unsafeCSS(colors.tertiaryType6Light)};
    --colorsTertiaryType6Lightened: ${unsafeCSS(colors.tertiaryType6Lightened)};

    /* Type 7 (BBVA Pink)
    /* ---------------------------------------------- */
    --colorsTertiaryType7: ${unsafeCSS(colors.tertiaryType7)};
    --colorsTertiaryType7Dark: ${unsafeCSS(colors.tertiaryType7Dark)};
    --colorsTertiaryType7Medium: ${unsafeCSS(colors.tertiaryType7Medium)};
    --colorsTertiaryType7Light: ${unsafeCSS(colors.tertiaryType7Light)};
    --colorsTertiaryType7Lightened: ${unsafeCSS(colors.tertiaryType7Lightened)};

    /* Type 8 (BBVA Purple)
    /* ---------------------------------------------- */
    --colorsTertiaryType8: ${unsafeCSS(colors.tertiaryType8)};
    --colorsTertiaryType8Dark: ${unsafeCSS(colors.tertiaryType8Dark)};
    --colorsTertiaryType8Medium: ${unsafeCSS(colors.tertiaryType8Medium)};
    --colorsTertiaryType8Light: ${unsafeCSS(colors.tertiaryType8Light)};
    --colorsTertiaryType8Lightened: ${unsafeCSS(colors.tertiaryType8Lightened)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --ambientsLight: ${unsafeCSS(ambients.light)};
    --ambientsLight100: ${unsafeCSS(ambients.light100)};
    --ambientsDark: ${unsafeCSS(ambients.dark)};
    --ambientsDark100: ${unsafeCSS(ambients.dark100)};
    --ambientsDark200: ${unsafeCSS(ambients.dark200)};
    --ambientsDark300: ${unsafeCSS(ambients.dark300)};
    --ambientsDark400: ${unsafeCSS(ambients.dark400)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --typographyType9XLarge: ${unsafeCSS(typography.type9XLarge)};
    --typographyType8XLarge: ${unsafeCSS(typography.type8XLarge)};
    --typographyType7XLarge: ${unsafeCSS(typography.type7XLarge)};
    --typographyType6XLarge: ${unsafeCSS(typography.type6XLarge)};
    --typographyType5XLarge: ${unsafeCSS(typography.type5XLarge)};
    --typographyType4XLarge: ${unsafeCSS(typography.type4XLarge)};
    --typographyType3XLarge: ${unsafeCSS(typography.type3XLarge)};
    --typographyType2XLarge: ${unsafeCSS(typography.type2XLarge)};
    --typographyTypeXLarge: ${unsafeCSS(typography.typeXLarge)};
    --typographyTypeLarge: ${unsafeCSS(typography.typeLarge)};
    --typographyTypeMedium: ${unsafeCSS(typography.typeMedium)};
    --typographyTypeSmall: ${unsafeCSS(typography.typeSmall)};
    --typographyTypeXSmall: ${unsafeCSS(typography.typeXSmall)};
    --typographyType2XSmall: ${unsafeCSS(typography.type2XSmall)};
    --typographyType3XSmall: ${unsafeCSS(typography.type3XSmall)};
    --typographyType4XSmall: ${unsafeCSS(typography.type4XSmall)};
    --typographyTypeQuoteLarge: ${unsafeCSS(typography.typeQuoteLarge)};
    --typographyTypeQuoteMedium: ${unsafeCSS(typography.typeQuoteMedium)};
    --typographyTypeQuote: ${unsafeCSS(typography.typeQuote)};
    --typographyTypeLink: ${unsafeCSS(typography.typeLink)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --lineHeightType9XLarge: ${unsafeCSS(lineHeight.type9XLarge)};
    --lineHeightType8XLarge: ${unsafeCSS(lineHeight.type8XLarge)};
    --lineHeightType7XLarge: ${unsafeCSS(lineHeight.type7XLarge)};
    --lineHeightType6XLarge: ${unsafeCSS(lineHeight.type6XLarge)};
    --lineHeightType5XLarge: ${unsafeCSS(lineHeight.type5XLarge)};
    --lineHeightType4XLarge: ${unsafeCSS(lineHeight.type4XLarge)};
    --lineHeightType3XLarge: ${unsafeCSS(lineHeight.type3XLarge)};
    --lineHeightType2XLarge: ${unsafeCSS(lineHeight.type2XLarge)};
    --lineHeightTypeXLarge: ${unsafeCSS(lineHeight.typeXLarge)};
    --lineHeightTypeLarge: ${unsafeCSS(lineHeight.typeLarge)};
    --lineHeightTypeMedium: ${unsafeCSS(lineHeight.typeMedium)};
    --lineHeightTypeSmall: ${unsafeCSS(lineHeight.typeSmall)};
    --lineHeightTypeXSmall: ${unsafeCSS(lineHeight.typeXSmall)};
    --lineHeightType2XSmall: ${unsafeCSS(lineHeight.type2XSmall)};
    --lineHeightType3XSmall: ${unsafeCSS(lineHeight.type3XSmall)};
    --lineHeightType4XSmall: ${unsafeCSS(lineHeight.type4XSmall)};
    --lineHeightTypeQuoteLarge: ${unsafeCSS(lineHeight.typeQuoteLarge)};
    --lineHeightTypeQuoteMedium: ${unsafeCSS(lineHeight.typeQuoteMedium)};
    --lineHeightTypeQuote: ${unsafeCSS(lineHeight.typeQuote)};
    --lineHeightTypeLink: ${unsafeCSS(lineHeight.typeLink)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --gridSpacer: ${unsafeCSS(grid.spacer)};
    --gridGutter: ${unsafeCSS(grid.gutter)};
    --gridMargin: ${unsafeCSS(grid.margin)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --borderRadiusSmall: ${unsafeCSS(borderRadius.small)};
    --borderRadiusMedium: ${unsafeCSS(borderRadius.medium)};
    --borderRadiusLarge: ${unsafeCSS(borderRadius.large)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --boxShadowType1: ${unsafeCSS(boxShadow.type1)};
    --boxShadowType2: ${unsafeCSS(boxShadow.type2)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --statusColorsSuccess: ${unsafeCSS(statusColors.success)};
    --statusColorsSuccessDark: ${unsafeCSS(statusColors.successDark)};
    --statusColorsWarning: ${unsafeCSS(statusColors.warning)};
    --statusColorsWarningDark: ${unsafeCSS(statusColors.warningDark)};
    --statusColorsError: ${unsafeCSS(statusColors.error)};
    --statusColorsErrorDark: ${unsafeCSS(statusColors.errorDark)};
    --statusColorsPending: ${unsafeCSS(statusColors.pending)};
    --statusColorsOff: ${unsafeCSS(statusColors.off)};
    --statusColorsFinance: ${unsafeCSS(statusColors.finance)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --fontFacePrimaryFontFamily: ${unsafeCSS(fontFacePrimary.fontFamily)};

    --fontFacePrimaryLightFontWeight: ${unsafeCSS(fontFacePrimary.light.fontWeight)};
    --fontFacePrimaryLightFontStyle: ${unsafeCSS(fontFacePrimary.light.fontStyle)};

    --fontFacePrimaryBookFontWeight: ${unsafeCSS(fontFacePrimary.book.fontWeight)};
    --fontFacePrimaryBookFontStyle: ${unsafeCSS(fontFacePrimary.book.fontStyle)};

    --fontFacePrimaryBookItalicFontWeight: ${unsafeCSS(fontFacePrimary.bookItalic.fontWeight)};
    --fontFacePrimaryBookItalicFontStyle: ${unsafeCSS(fontFacePrimary.bookItalic.fontStyle)};

    --fontFacePrimaryMediumFontWeight: ${unsafeCSS(fontFacePrimary.medium.fontWeight)};
    --fontFacePrimaryMediumFontStyle: ${unsafeCSS(fontFacePrimary.medium.fontStyle)};

    --fontFacePrimaryMediumItalicFontWeight: ${unsafeCSS(fontFacePrimary.mediumItalic.fontWeight)};
    --fontFacePrimaryMediumItalicFontStyle: ${unsafeCSS(fontFacePrimary.mediumItalic.fontStyle)};

    --fontFacePrimaryRegularFontWeight: ${unsafeCSS(fontFacePrimary.regular.fontWeight)};
    --fontFacePrimaryRegularFontStyle: ${unsafeCSS(fontFacePrimary.regular.fontStyle)};

    --fontFacePrimaryBoldFontWeight: ${unsafeCSS(fontFacePrimary.bold.fontWeight)};
    --fontFacePrimaryBoldFontStyle: ${unsafeCSS(fontFacePrimary.bold.fontStyle)};
  }
`);

  setDocumentCustomStyles(css`
  :root {
    --fontFaceSecondaryFontFamily: ${unsafeCSS(fontFaceSecondary.fontFamily)};

    --fontFaceSecondaryRegularFontWeight: ${unsafeCSS(fontFaceSecondary.regular.fontWeight)};
    --fontFaceSecondaryRegularFontStyle: ${unsafeCSS(fontFaceSecondary.regular.fontStyle)};

    --fontFaceSecondaryRegularItalicFontWeight: ${unsafeCSS(fontFaceSecondary.regularItalic.fontWeight)};
    --fontFaceSecondaryRegularItalicFontStyle: ${unsafeCSS(fontFaceSecondary.regularItalic.fontStyle)};
  }
`);

  /**
  The basic rules and guidelines (the How) that effect everything else in the design system.
  */

  setDocumentCustomStyles(css`
  :root {
    font: normal medium/1.25 'Benton Sans', sans-serif;
  }
`);

  setDocumentCustomStyles(css`
  #iframeBody {
    margin: 0;
  }
`);

  /* eslint-disable no-unused-vars */
  var styles = css`:host * {
  box-sizing: border-box;
}
:host button {
  background-color: var(--primary-color, #29434e);
  display: inline-block;
  border: none;
  color: var(--text-color, #fff);
  font-family: var(--font-family, sans-serif);
  font-size: 17px;
  padding: 1em 1em;
  text-decoration: none;
}
:host button:hover {
  background-color: var(--secondary-color, #546e7a);
}
:host button:active {
  position: relative;
  top: 1px;
}
:host input {
  width: var(--input-width, 100vw);
}
:host .selected {
  box-shadow: inset 0px -5px 0px 0px var(--third-color, #819ca9);
}
`;

  var bootstrap = css`@charset "UTF-8";
/*!
 * Bootstrap v5.0.0-beta3 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors
 * Copyright 2011-2021 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
:root {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

@media (prefers-reduced-motion: no-preference) {
  :root {
    scroll-behavior: smooth;
  }
}

body {
  margin: 0;
  font-family: var(--bs-font-sans-serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

hr {
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}

hr:not([size]) {
  height: 1px;
}

h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

h1, .h1 {
  font-size: calc(1.375rem + 1.5vw);
}
@media (min-width: 1200px) {
  h1, .h1 {
    font-size: 2.5rem;
  }
}

h2, .h2 {
  font-size: calc(1.325rem + 0.9vw);
}
@media (min-width: 1200px) {
  h2, .h2 {
    font-size: 2rem;
  }
}

h3, .h3 {
  font-size: calc(1.3rem + 0.6vw);
}
@media (min-width: 1200px) {
  h3, .h3 {
    font-size: 1.75rem;
  }
}

h4, .h4 {
  font-size: calc(1.275rem + 0.3vw);
}
@media (min-width: 1200px) {
  h4, .h4 {
    font-size: 1.5rem;
  }
}

h5, .h5 {
  font-size: 1.25rem;
}

h6, .h6 {
  font-size: 1rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

abbr[title],
abbr[data-bs-original-title] {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  cursor: help;
  -webkit-text-decoration-skip-ink: none;
  text-decoration-skip-ink: none;
}

address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}

ol,
ul {
  padding-left: 2rem;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

dt {
  font-weight: 700;
}

dd {
  margin-bottom: 0.5rem;
  margin-left: 0;
}

blockquote {
  margin: 0 0 1rem;
}

b,
strong {
  font-weight: bolder;
}

small, .small {
  font-size: 0.875em;
}

mark, .mark {
  padding: 0.2em;
  background-color: #fcf8e3;
}

sub,
sup {
  position: relative;
  font-size: 0.75em;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

a {
  color: #0d6efd;
  text-decoration: underline;
}
a:hover {
  color: #0a58ca;
}

a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}

pre,
code,
kbd,
samp {
  font-family: var(--bs-font-monospace);
  font-size: 1em;
  direction: ltr /* rtl:ignore */;
  unicode-bidi: bidi-override;
}

pre {
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 0.875em;
}
pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;
}

code {
  font-size: 0.875em;
  color: #d63384;
  word-wrap: break-word;
}
a > code {
  color: inherit;
}

kbd {
  padding: 0.2rem 0.4rem;
  font-size: 0.875em;
  color: #fff;
  background-color: #212529;
  border-radius: 0.2rem;
}
kbd kbd {
  padding: 0;
  font-size: 1em;
  font-weight: 700;
}

figure {
  margin: 0 0 1rem;
}

img,
svg {
  vertical-align: middle;
}

table {
  caption-side: bottom;
  border-collapse: collapse;
}

caption {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #6c757d;
  text-align: left;
}

th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}

thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

label {
  display: inline-block;
}

button {
  border-radius: 0;
}

button:focus:not(:focus-visible) {
  outline: 0;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
select {
  text-transform: none;
}

[role=button] {
  cursor: pointer;
}

select {
  word-wrap: normal;
}
select:disabled {
  opacity: 1;
}

[list]::-webkit-calendar-picker-indicator {
  display: none;
}

button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}
button:not(:disabled),
[type=button]:not(:disabled),
[type=reset]:not(:disabled),
[type=submit]:not(:disabled) {
  cursor: pointer;
}

::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

textarea {
  resize: vertical;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: calc(1.275rem + 0.3vw);
  line-height: inherit;
}
@media (min-width: 1200px) {
  legend {
    font-size: 1.5rem;
  }
}
legend + * {
  clear: left;
}

::-webkit-datetime-edit-fields-wrapper,
::-webkit-datetime-edit-text,
::-webkit-datetime-edit-minute,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-year-field {
  padding: 0;
}

::-webkit-inner-spin-button {
  height: auto;
}

[type=search] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}

/* rtl:raw:
[type="tel"],
[type="url"],
[type="email"],
[type="number"] {
  direction: ltr;
}
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-color-swatch-wrapper {
  padding: 0;
}

::file-selector-button {
  font: inherit;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

output {
  display: inline-block;
}

iframe {
  border: 0;
}

summary {
  display: list-item;
  cursor: pointer;
}

progress {
  vertical-align: baseline;
}

[hidden] {
  display: none !important;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}

.display-1 {
  font-size: calc(1.625rem + 4.5vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-1 {
    font-size: 5rem;
  }
}

.display-2 {
  font-size: calc(1.575rem + 3.9vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-2 {
    font-size: 4.5rem;
  }
}

.display-3 {
  font-size: calc(1.525rem + 3.3vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-3 {
    font-size: 4rem;
  }
}

.display-4 {
  font-size: calc(1.475rem + 2.7vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-4 {
    font-size: 3.5rem;
  }
}

.display-5 {
  font-size: calc(1.425rem + 2.1vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-5 {
    font-size: 3rem;
  }
}

.display-6 {
  font-size: calc(1.375rem + 1.5vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-6 {
    font-size: 2.5rem;
  }
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.list-inline {
  padding-left: 0;
  list-style: none;
}

.list-inline-item {
  display: inline-block;
}
.list-inline-item:not(:last-child) {
  margin-right: 0.5rem;
}

.initialism {
  font-size: 0.875em;
  text-transform: uppercase;
}

.blockquote {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
.blockquote > :last-child {
  margin-bottom: 0;
}

.blockquote-footer {
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.875em;
  color: #6c757d;
}
.blockquote-footer::before {
  content: "— ";
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  max-width: 100%;
  height: auto;
}

.figure {
  display: inline-block;
}

.figure-img {
  margin-bottom: 0.5rem;
  line-height: 1;
}

.figure-caption {
  font-size: 0.875em;
  color: #6c757d;
}

.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container-sm, .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-md, .container-sm, .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-lg, .container-md, .container-sm, .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1140px;
  }
}
@media (min-width: 1400px) {
  .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1320px;
  }
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) / 2);
  padding-left: calc(var(--bs-gutter-x) / 2);
  margin-top: var(--bs-gutter-y);
}

.col {
  flex: 1 0 0%;
}

.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}

.row-cols-1 > * {
  flex: 0 0 auto;
  width: 100%;
}

.row-cols-2 > * {
  flex: 0 0 auto;
  width: 50%;
}

.row-cols-3 > * {
  flex: 0 0 auto;
  width: 33.3333333333%;
}

.row-cols-4 > * {
  flex: 0 0 auto;
  width: 25%;
}

.row-cols-5 > * {
  flex: 0 0 auto;
  width: 20%;
}

.row-cols-6 > * {
  flex: 0 0 auto;
  width: 16.6666666667%;
}

.col-auto {
  flex: 0 0 auto;
  width: auto;
}

.col-1 {
  flex: 0 0 auto;
  width: 8.3333333333%;
}

.col-2 {
  flex: 0 0 auto;
  width: 16.6666666667%;
}

.col-3 {
  flex: 0 0 auto;
  width: 25%;
}

.col-4 {
  flex: 0 0 auto;
  width: 33.3333333333%;
}

.col-5 {
  flex: 0 0 auto;
  width: 41.6666666667%;
}

.col-6 {
  flex: 0 0 auto;
  width: 50%;
}

.col-7 {
  flex: 0 0 auto;
  width: 58.3333333333%;
}

.col-8 {
  flex: 0 0 auto;
  width: 66.6666666667%;
}

.col-9 {
  flex: 0 0 auto;
  width: 75%;
}

.col-10 {
  flex: 0 0 auto;
  width: 83.3333333333%;
}

.col-11 {
  flex: 0 0 auto;
  width: 91.6666666667%;
}

.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

.offset-1 {
  margin-left: 8.3333333333%;
}

.offset-2 {
  margin-left: 16.6666666667%;
}

.offset-3 {
  margin-left: 25%;
}

.offset-4 {
  margin-left: 33.3333333333%;
}

.offset-5 {
  margin-left: 41.6666666667%;
}

.offset-6 {
  margin-left: 50%;
}

.offset-7 {
  margin-left: 58.3333333333%;
}

.offset-8 {
  margin-left: 66.6666666667%;
}

.offset-9 {
  margin-left: 75%;
}

.offset-10 {
  margin-left: 83.3333333333%;
}

.offset-11 {
  margin-left: 91.6666666667%;
}

.g-0,
.gx-0 {
  --bs-gutter-x: 0;
}

.g-0,
.gy-0 {
  --bs-gutter-y: 0;
}

.g-1,
.gx-1 {
  --bs-gutter-x: 0.25rem;
}

.g-1,
.gy-1 {
  --bs-gutter-y: 0.25rem;
}

.g-2,
.gx-2 {
  --bs-gutter-x: 0.5rem;
}

.g-2,
.gy-2 {
  --bs-gutter-y: 0.5rem;
}

.g-3,
.gx-3 {
  --bs-gutter-x: 1rem;
}

.g-3,
.gy-3 {
  --bs-gutter-y: 1rem;
}

.g-4,
.gx-4 {
  --bs-gutter-x: 1.5rem;
}

.g-4,
.gy-4 {
  --bs-gutter-y: 1.5rem;
}

.g-5,
.gx-5 {
  --bs-gutter-x: 3rem;
}

.g-5,
.gy-5 {
  --bs-gutter-y: 3rem;
}

@media (min-width: 576px) {
  .col-sm {
    flex: 1 0 0%;
  }

  .row-cols-sm-auto > * {
    flex: 0 0 auto;
    width: auto;
  }

  .row-cols-sm-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }

  .row-cols-sm-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }

  .row-cols-sm-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .row-cols-sm-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }

  .row-cols-sm-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }

  .row-cols-sm-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-sm-auto {
    flex: 0 0 auto;
    width: auto;
  }

  .col-sm-1 {
    flex: 0 0 auto;
    width: 8.3333333333%;
  }

  .col-sm-2 {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-sm-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-sm-4 {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .col-sm-5 {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }

  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-sm-7 {
    flex: 0 0 auto;
    width: 58.3333333333%;
  }

  .col-sm-8 {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }

  .col-sm-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-sm-10 {
    flex: 0 0 auto;
    width: 83.3333333333%;
  }

  .col-sm-11 {
    flex: 0 0 auto;
    width: 91.6666666667%;
  }

  .col-sm-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .offset-sm-0 {
    margin-left: 0;
  }

  .offset-sm-1 {
    margin-left: 8.3333333333%;
  }

  .offset-sm-2 {
    margin-left: 16.6666666667%;
  }

  .offset-sm-3 {
    margin-left: 25%;
  }

  .offset-sm-4 {
    margin-left: 33.3333333333%;
  }

  .offset-sm-5 {
    margin-left: 41.6666666667%;
  }

  .offset-sm-6 {
    margin-left: 50%;
  }

  .offset-sm-7 {
    margin-left: 58.3333333333%;
  }

  .offset-sm-8 {
    margin-left: 66.6666666667%;
  }

  .offset-sm-9 {
    margin-left: 75%;
  }

  .offset-sm-10 {
    margin-left: 83.3333333333%;
  }

  .offset-sm-11 {
    margin-left: 91.6666666667%;
  }

  .g-sm-0,
.gx-sm-0 {
    --bs-gutter-x: 0;
  }

  .g-sm-0,
.gy-sm-0 {
    --bs-gutter-y: 0;
  }

  .g-sm-1,
.gx-sm-1 {
    --bs-gutter-x: 0.25rem;
  }

  .g-sm-1,
.gy-sm-1 {
    --bs-gutter-y: 0.25rem;
  }

  .g-sm-2,
.gx-sm-2 {
    --bs-gutter-x: 0.5rem;
  }

  .g-sm-2,
.gy-sm-2 {
    --bs-gutter-y: 0.5rem;
  }

  .g-sm-3,
.gx-sm-3 {
    --bs-gutter-x: 1rem;
  }

  .g-sm-3,
.gy-sm-3 {
    --bs-gutter-y: 1rem;
  }

  .g-sm-4,
.gx-sm-4 {
    --bs-gutter-x: 1.5rem;
  }

  .g-sm-4,
.gy-sm-4 {
    --bs-gutter-y: 1.5rem;
  }

  .g-sm-5,
.gx-sm-5 {
    --bs-gutter-x: 3rem;
  }

  .g-sm-5,
.gy-sm-5 {
    --bs-gutter-y: 3rem;
  }
}
@media (min-width: 768px) {
  .col-md {
    flex: 1 0 0%;
  }

  .row-cols-md-auto > * {
    flex: 0 0 auto;
    width: auto;
  }

  .row-cols-md-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }

  .row-cols-md-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }

  .row-cols-md-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .row-cols-md-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }

  .row-cols-md-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }

  .row-cols-md-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-md-auto {
    flex: 0 0 auto;
    width: auto;
  }

  .col-md-1 {
    flex: 0 0 auto;
    width: 8.3333333333%;
  }

  .col-md-2 {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-md-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-md-4 {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .col-md-5 {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }

  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-md-7 {
    flex: 0 0 auto;
    width: 58.3333333333%;
  }

  .col-md-8 {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }

  .col-md-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-md-10 {
    flex: 0 0 auto;
    width: 83.3333333333%;
  }

  .col-md-11 {
    flex: 0 0 auto;
    width: 91.6666666667%;
  }

  .col-md-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .offset-md-0 {
    margin-left: 0;
  }

  .offset-md-1 {
    margin-left: 8.3333333333%;
  }

  .offset-md-2 {
    margin-left: 16.6666666667%;
  }

  .offset-md-3 {
    margin-left: 25%;
  }

  .offset-md-4 {
    margin-left: 33.3333333333%;
  }

  .offset-md-5 {
    margin-left: 41.6666666667%;
  }

  .offset-md-6 {
    margin-left: 50%;
  }

  .offset-md-7 {
    margin-left: 58.3333333333%;
  }

  .offset-md-8 {
    margin-left: 66.6666666667%;
  }

  .offset-md-9 {
    margin-left: 75%;
  }

  .offset-md-10 {
    margin-left: 83.3333333333%;
  }

  .offset-md-11 {
    margin-left: 91.6666666667%;
  }

  .g-md-0,
.gx-md-0 {
    --bs-gutter-x: 0;
  }

  .g-md-0,
.gy-md-0 {
    --bs-gutter-y: 0;
  }

  .g-md-1,
.gx-md-1 {
    --bs-gutter-x: 0.25rem;
  }

  .g-md-1,
.gy-md-1 {
    --bs-gutter-y: 0.25rem;
  }

  .g-md-2,
.gx-md-2 {
    --bs-gutter-x: 0.5rem;
  }

  .g-md-2,
.gy-md-2 {
    --bs-gutter-y: 0.5rem;
  }

  .g-md-3,
.gx-md-3 {
    --bs-gutter-x: 1rem;
  }

  .g-md-3,
.gy-md-3 {
    --bs-gutter-y: 1rem;
  }

  .g-md-4,
.gx-md-4 {
    --bs-gutter-x: 1.5rem;
  }

  .g-md-4,
.gy-md-4 {
    --bs-gutter-y: 1.5rem;
  }

  .g-md-5,
.gx-md-5 {
    --bs-gutter-x: 3rem;
  }

  .g-md-5,
.gy-md-5 {
    --bs-gutter-y: 3rem;
  }
}
@media (min-width: 992px) {
  .col-lg {
    flex: 1 0 0%;
  }

  .row-cols-lg-auto > * {
    flex: 0 0 auto;
    width: auto;
  }

  .row-cols-lg-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }

  .row-cols-lg-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }

  .row-cols-lg-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .row-cols-lg-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }

  .row-cols-lg-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }

  .row-cols-lg-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-lg-auto {
    flex: 0 0 auto;
    width: auto;
  }

  .col-lg-1 {
    flex: 0 0 auto;
    width: 8.3333333333%;
  }

  .col-lg-2 {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-lg-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .col-lg-5 {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }

  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-lg-7 {
    flex: 0 0 auto;
    width: 58.3333333333%;
  }

  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }

  .col-lg-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-lg-10 {
    flex: 0 0 auto;
    width: 83.3333333333%;
  }

  .col-lg-11 {
    flex: 0 0 auto;
    width: 91.6666666667%;
  }

  .col-lg-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .offset-lg-0 {
    margin-left: 0;
  }

  .offset-lg-1 {
    margin-left: 8.3333333333%;
  }

  .offset-lg-2 {
    margin-left: 16.6666666667%;
  }

  .offset-lg-3 {
    margin-left: 25%;
  }

  .offset-lg-4 {
    margin-left: 33.3333333333%;
  }

  .offset-lg-5 {
    margin-left: 41.6666666667%;
  }

  .offset-lg-6 {
    margin-left: 50%;
  }

  .offset-lg-7 {
    margin-left: 58.3333333333%;
  }

  .offset-lg-8 {
    margin-left: 66.6666666667%;
  }

  .offset-lg-9 {
    margin-left: 75%;
  }

  .offset-lg-10 {
    margin-left: 83.3333333333%;
  }

  .offset-lg-11 {
    margin-left: 91.6666666667%;
  }

  .g-lg-0,
.gx-lg-0 {
    --bs-gutter-x: 0;
  }

  .g-lg-0,
.gy-lg-0 {
    --bs-gutter-y: 0;
  }

  .g-lg-1,
.gx-lg-1 {
    --bs-gutter-x: 0.25rem;
  }

  .g-lg-1,
.gy-lg-1 {
    --bs-gutter-y: 0.25rem;
  }

  .g-lg-2,
.gx-lg-2 {
    --bs-gutter-x: 0.5rem;
  }

  .g-lg-2,
.gy-lg-2 {
    --bs-gutter-y: 0.5rem;
  }

  .g-lg-3,
.gx-lg-3 {
    --bs-gutter-x: 1rem;
  }

  .g-lg-3,
.gy-lg-3 {
    --bs-gutter-y: 1rem;
  }

  .g-lg-4,
.gx-lg-4 {
    --bs-gutter-x: 1.5rem;
  }

  .g-lg-4,
.gy-lg-4 {
    --bs-gutter-y: 1.5rem;
  }

  .g-lg-5,
.gx-lg-5 {
    --bs-gutter-x: 3rem;
  }

  .g-lg-5,
.gy-lg-5 {
    --bs-gutter-y: 3rem;
  }
}
@media (min-width: 1200px) {
  .col-xl {
    flex: 1 0 0%;
  }

  .row-cols-xl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }

  .row-cols-xl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }

  .row-cols-xl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }

  .row-cols-xl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .row-cols-xl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }

  .row-cols-xl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }

  .row-cols-xl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-xl-auto {
    flex: 0 0 auto;
    width: auto;
  }

  .col-xl-1 {
    flex: 0 0 auto;
    width: 8.3333333333%;
  }

  .col-xl-2 {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-xl-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-xl-4 {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .col-xl-5 {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }

  .col-xl-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-xl-7 {
    flex: 0 0 auto;
    width: 58.3333333333%;
  }

  .col-xl-8 {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }

  .col-xl-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-xl-10 {
    flex: 0 0 auto;
    width: 83.3333333333%;
  }

  .col-xl-11 {
    flex: 0 0 auto;
    width: 91.6666666667%;
  }

  .col-xl-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .offset-xl-0 {
    margin-left: 0;
  }

  .offset-xl-1 {
    margin-left: 8.3333333333%;
  }

  .offset-xl-2 {
    margin-left: 16.6666666667%;
  }

  .offset-xl-3 {
    margin-left: 25%;
  }

  .offset-xl-4 {
    margin-left: 33.3333333333%;
  }

  .offset-xl-5 {
    margin-left: 41.6666666667%;
  }

  .offset-xl-6 {
    margin-left: 50%;
  }

  .offset-xl-7 {
    margin-left: 58.3333333333%;
  }

  .offset-xl-8 {
    margin-left: 66.6666666667%;
  }

  .offset-xl-9 {
    margin-left: 75%;
  }

  .offset-xl-10 {
    margin-left: 83.3333333333%;
  }

  .offset-xl-11 {
    margin-left: 91.6666666667%;
  }

  .g-xl-0,
.gx-xl-0 {
    --bs-gutter-x: 0;
  }

  .g-xl-0,
.gy-xl-0 {
    --bs-gutter-y: 0;
  }

  .g-xl-1,
.gx-xl-1 {
    --bs-gutter-x: 0.25rem;
  }

  .g-xl-1,
.gy-xl-1 {
    --bs-gutter-y: 0.25rem;
  }

  .g-xl-2,
.gx-xl-2 {
    --bs-gutter-x: 0.5rem;
  }

  .g-xl-2,
.gy-xl-2 {
    --bs-gutter-y: 0.5rem;
  }

  .g-xl-3,
.gx-xl-3 {
    --bs-gutter-x: 1rem;
  }

  .g-xl-3,
.gy-xl-3 {
    --bs-gutter-y: 1rem;
  }

  .g-xl-4,
.gx-xl-4 {
    --bs-gutter-x: 1.5rem;
  }

  .g-xl-4,
.gy-xl-4 {
    --bs-gutter-y: 1.5rem;
  }

  .g-xl-5,
.gx-xl-5 {
    --bs-gutter-x: 3rem;
  }

  .g-xl-5,
.gy-xl-5 {
    --bs-gutter-y: 3rem;
  }
}
@media (min-width: 1400px) {
  .col-xxl {
    flex: 1 0 0%;
  }

  .row-cols-xxl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }

  .row-cols-xxl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }

  .row-cols-xxl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }

  .row-cols-xxl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .row-cols-xxl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }

  .row-cols-xxl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }

  .row-cols-xxl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-xxl-auto {
    flex: 0 0 auto;
    width: auto;
  }

  .col-xxl-1 {
    flex: 0 0 auto;
    width: 8.3333333333%;
  }

  .col-xxl-2 {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }

  .col-xxl-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-xxl-4 {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }

  .col-xxl-5 {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }

  .col-xxl-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-xxl-7 {
    flex: 0 0 auto;
    width: 58.3333333333%;
  }

  .col-xxl-8 {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }

  .col-xxl-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-xxl-10 {
    flex: 0 0 auto;
    width: 83.3333333333%;
  }

  .col-xxl-11 {
    flex: 0 0 auto;
    width: 91.6666666667%;
  }

  .col-xxl-12 {
    flex: 0 0 auto;
    width: 100%;
  }

  .offset-xxl-0 {
    margin-left: 0;
  }

  .offset-xxl-1 {
    margin-left: 8.3333333333%;
  }

  .offset-xxl-2 {
    margin-left: 16.6666666667%;
  }

  .offset-xxl-3 {
    margin-left: 25%;
  }

  .offset-xxl-4 {
    margin-left: 33.3333333333%;
  }

  .offset-xxl-5 {
    margin-left: 41.6666666667%;
  }

  .offset-xxl-6 {
    margin-left: 50%;
  }

  .offset-xxl-7 {
    margin-left: 58.3333333333%;
  }

  .offset-xxl-8 {
    margin-left: 66.6666666667%;
  }

  .offset-xxl-9 {
    margin-left: 75%;
  }

  .offset-xxl-10 {
    margin-left: 83.3333333333%;
  }

  .offset-xxl-11 {
    margin-left: 91.6666666667%;
  }

  .g-xxl-0,
.gx-xxl-0 {
    --bs-gutter-x: 0;
  }

  .g-xxl-0,
.gy-xxl-0 {
    --bs-gutter-y: 0;
  }

  .g-xxl-1,
.gx-xxl-1 {
    --bs-gutter-x: 0.25rem;
  }

  .g-xxl-1,
.gy-xxl-1 {
    --bs-gutter-y: 0.25rem;
  }

  .g-xxl-2,
.gx-xxl-2 {
    --bs-gutter-x: 0.5rem;
  }

  .g-xxl-2,
.gy-xxl-2 {
    --bs-gutter-y: 0.5rem;
  }

  .g-xxl-3,
.gx-xxl-3 {
    --bs-gutter-x: 1rem;
  }

  .g-xxl-3,
.gy-xxl-3 {
    --bs-gutter-y: 1rem;
  }

  .g-xxl-4,
.gx-xxl-4 {
    --bs-gutter-x: 1.5rem;
  }

  .g-xxl-4,
.gy-xxl-4 {
    --bs-gutter-y: 1.5rem;
  }

  .g-xxl-5,
.gx-xxl-5 {
    --bs-gutter-x: 3rem;
  }

  .g-xxl-5,
.gy-xxl-5 {
    --bs-gutter-y: 3rem;
  }
}
.table {
  --bs-table-bg: transparent;
  --bs-table-striped-color: #212529;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #212529;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #212529;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  vertical-align: top;
  border-color: #dee2e6;
}
.table > :not(caption) > * > * {
  padding: 0.5rem 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table > tbody {
  vertical-align: inherit;
}
.table > thead {
  vertical-align: bottom;
}
.table > :not(:last-child) > :last-child > * {
  border-bottom-color: currentColor;
}

.caption-top {
  caption-side: top;
}

.table-sm > :not(caption) > * > * {
  padding: 0.25rem 0.25rem;
}

.table-bordered > :not(caption) > * {
  border-width: 1px 0;
}
.table-bordered > :not(caption) > * > * {
  border-width: 0 1px;
}

.table-borderless > :not(caption) > * > * {
  border-bottom-width: 0;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}

.table-active {
  --bs-table-accent-bg: var(--bs-table-active-bg);
  color: var(--bs-table-active-color);
}

.table-hover > tbody > tr:hover {
  --bs-table-accent-bg: var(--bs-table-hover-bg);
  color: var(--bs-table-hover-color);
}

.table-primary {
  --bs-table-bg: #cfe2ff;
  --bs-table-striped-bg: #c5d7f2;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #bacbe6;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bfd1ec;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #bacbe6;
}

.table-secondary {
  --bs-table-bg: #e2e3e5;
  --bs-table-striped-bg: #d7d8da;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #cbccce;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #d1d2d4;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #cbccce;
}

.table-success {
  --bs-table-bg: #d1e7dd;
  --bs-table-striped-bg: #c7dbd2;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #bcd0c7;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #c1d6cc;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #bcd0c7;
}

.table-info {
  --bs-table-bg: #cff4fc;
  --bs-table-striped-bg: #c5e8ef;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #badce3;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bfe2e9;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #badce3;
}

.table-warning {
  --bs-table-bg: #fff3cd;
  --bs-table-striped-bg: #f2e7c3;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #e6dbb9;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #ece1be;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #e6dbb9;
}

.table-danger {
  --bs-table-bg: #f8d7da;
  --bs-table-striped-bg: #eccccf;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #dfc2c4;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e5c7ca;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #dfc2c4;
}

.table-light {
  --bs-table-bg: #f8f9fa;
  --bs-table-striped-bg: #ecedee;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #dfe0e1;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e5e6e7;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #dfe0e1;
}

.table-dark {
  --bs-table-bg: #212529;
  --bs-table-striped-bg: #2c3034;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #373b3e;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #323539;
  --bs-table-hover-color: #fff;
  color: #fff;
  border-color: #373b3e;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 575.98px) {
  .table-responsive-sm {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 767.98px) {
  .table-responsive-md {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 991.98px) {
  .table-responsive-lg {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1199.98px) {
  .table-responsive-xl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1399.98px) {
  .table-responsive-xxl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.form-label {
  margin-bottom: 0.5rem;
}

.col-form-label {
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
}

.col-form-label-lg {
  padding-top: calc(0.5rem + 1px);
  padding-bottom: calc(0.5rem + 1px);
  font-size: 1.25rem;
}

.col-form-label-sm {
  padding-top: calc(0.25rem + 1px);
  padding-bottom: calc(0.25rem + 1px);
  font-size: 0.875rem;
}

.form-text {
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #6c757d;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control {
    transition: none;
  }
}
.form-control[type=file] {
  overflow: hidden;
}
.form-control[type=file]:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-control::-webkit-date-and-time-value {
  height: 1.5em;
}
.form-control::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}
.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}
.form-control:disabled, .form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
.form-control::file-selector-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
  margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control::file-selector-button {
    transition: none;
  }
}
.form-control:hover:not(:disabled):not([readonly])::file-selector-button {
  background-color: #dde0e3;
}
.form-control::-webkit-file-upload-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
  margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control::-webkit-file-upload-button {
    -webkit-transition: none;
    transition: none;
  }
}
.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
  background-color: #dde0e3;
}

.form-control-plaintext {
  display: block;
  width: 100%;
  padding: 0.375rem 0;
  margin-bottom: 0;
  line-height: 1.5;
  color: #212529;
  background-color: transparent;
  border: solid transparent;
  border-width: 1px 0;
}
.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {
  padding-right: 0;
  padding-left: 0;
}

.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}
.form-control-sm::file-selector-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
  margin-inline-end: 0.5rem;
}
.form-control-sm::-webkit-file-upload-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
  margin-inline-end: 0.5rem;
}

.form-control-lg {
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}
.form-control-lg::file-selector-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
  margin-inline-end: 1rem;
}
.form-control-lg::-webkit-file-upload-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
  margin-inline-end: 1rem;
}

textarea.form-control {
  min-height: calc(1.5em + 0.75rem + 2px);
}
textarea.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
}
textarea.form-control-lg {
  min-height: calc(1.5em + 1rem + 2px);
}

.form-control-color {
  max-width: 3rem;
  height: auto;
  padding: 0.375rem;
}
.form-control-color:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control-color::-moz-color-swatch {
  height: 1.5em;
  border-radius: 0.25rem;
}
.form-control-color::-webkit-color-swatch {
  height: 1.5em;
  border-radius: 0.25rem;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.form-select:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-select[multiple], .form-select[size]:not([size="1"]) {
  padding-right: 0.75rem;
  background-image: none;
}
.form-select:disabled {
  background-color: #e9ecef;
}
.form-select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #212529;
}

.form-select-sm {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;
}

.form-select-lg {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  font-size: 1.25rem;
}

.form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
}
.form-check .form-check-input {
  float: left;
  margin-left: -1.5em;
}

.form-check-input {
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
}
.form-check-input[type=checkbox] {
  border-radius: 0.25em;
}
.form-check-input[type=radio] {
  border-radius: 50%;
}
.form-check-input:active {
  filter: brightness(90%);
}
.form-check-input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.form-check-input:checked[type=checkbox] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
}
.form-check-input:checked[type=radio] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check-input[type=checkbox]:indeterminate {
  background-color: #0d6efd;
  border-color: #0d6efd;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
.form-check-input:disabled {
  pointer-events: none;
  filter: none;
  opacity: 0.5;
}
.form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {
  opacity: 0.5;
}

.form-switch {
  padding-left: 2.5em;
}
.form-switch .form-check-input {
  width: 2em;
  margin-left: -2.5em;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
  background-position: left center;
  border-radius: 2em;
  transition: background-position 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-switch .form-check-input {
    transition: none;
  }
}
.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e");
}
.form-switch .form-check-input:checked {
  background-position: right center;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}

.form-check-inline {
  display: inline-block;
  margin-right: 1rem;
}

.btn-check {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.btn-check[disabled] + .btn, .btn-check:disabled + .btn {
  pointer-events: none;
  filter: none;
  opacity: 0.65;
}

.form-range {
  width: 100%;
  height: 1.5rem;
  padding: 0;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.form-range:focus {
  outline: 0;
}
.form-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-range::-moz-focus-outer {
  border: 0;
}
.form-range::-webkit-slider-thumb {
  width: 1rem;
  height: 1rem;
  margin-top: -0.25rem;
  background-color: #0d6efd;
  border: 0;
  border-radius: 1rem;
  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .form-range::-webkit-slider-thumb {
    -webkit-transition: none;
    transition: none;
  }
}
.form-range::-webkit-slider-thumb:active {
  background-color: #b6d4fe;
}
.form-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}
.form-range::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background-color: #0d6efd;
  border: 0;
  border-radius: 1rem;
  -moz-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -moz-appearance: none;
  appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .form-range::-moz-range-thumb {
    -moz-transition: none;
    transition: none;
  }
}
.form-range::-moz-range-thumb:active {
  background-color: #b6d4fe;
}
.form-range::-moz-range-track {
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}
.form-range:disabled {
  pointer-events: none;
}
.form-range:disabled::-webkit-slider-thumb {
  background-color: #adb5bd;
}
.form-range:disabled::-moz-range-thumb {
  background-color: #adb5bd;
}

.form-floating {
  position: relative;
}
.form-floating > .form-control,
.form-floating > .form-select {
  height: calc(3.5rem + 2px);
  padding: 1rem 0.75rem;
}
.form-floating > label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-floating > label {
    transition: none;
  }
}
.form-floating > .form-control::-moz-placeholder {
  color: transparent;
}
.form-floating > .form-control::placeholder {
  color: transparent;
}
.form-floating > .form-control:not(:-moz-placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-control:-webkit-autofill {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-select {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-control:not(:-moz-placeholder-shown) ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label,
.form-floating > .form-select ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.form-floating > .form-control:-webkit-autofill ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.input-group > .form-control,
.input-group > .form-select {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
.input-group > .form-control:focus,
.input-group > .form-select:focus {
  z-index: 3;
}
.input-group .btn {
  position: relative;
  z-index: 2;
}
.input-group .btn:focus {
  z-index: 3;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text,
.input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.input-group-sm > .form-control,
.input-group-sm > .form-select,
.input-group-sm > .input-group-text,
.input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.input-group-lg > .form-select,
.input-group-sm > .form-select {
  padding-right: 3rem;
}

.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu),
.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu),
.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #198754;
}

.valid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: rgba(25, 135, 84, 0.9);
  border-radius: 0.25rem;
}

.was-validated :valid ~ .valid-feedback,
.was-validated :valid ~ .valid-tooltip,
.is-valid ~ .valid-feedback,
.is-valid ~ .valid-tooltip {
  display: block;
}

.was-validated .form-control:valid, .form-control.is-valid {
  border-color: #198754;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:valid:focus, .form-control.is-valid:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.was-validated textarea.form-control:valid, textarea.form-control.is-valid {
  padding-right: calc(1.5em + 0.75rem);
  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);
}

.was-validated .form-select:valid, .form-select.is-valid {
  border-color: #198754;
  padding-right: 4.125rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-position: right 0.75rem center, center right 2.25rem;
  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-select:valid:focus, .form-select.is-valid:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.was-validated .form-check-input:valid, .form-check-input.is-valid {
  border-color: #198754;
}
.was-validated .form-check-input:valid:checked, .form-check-input.is-valid:checked {
  background-color: #198754;
}
.was-validated .form-check-input:valid:focus, .form-check-input.is-valid:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {
  color: #198754;
}

.form-check-inline .form-check-input ~ .valid-feedback {
  margin-left: 0.5em;
}

.was-validated .input-group .form-control:valid, .input-group .form-control.is-valid,
.was-validated .input-group .form-select:valid,
.input-group .form-select.is-valid {
  z-index: 3;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.invalid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: rgba(220, 53, 69, 0.9);
  border-radius: 0.25rem;
}

.was-validated :invalid ~ .invalid-feedback,
.was-validated :invalid ~ .invalid-tooltip,
.is-invalid ~ .invalid-feedback,
.is-invalid ~ .invalid-tooltip {
  display: block;
}

.was-validated .form-control:invalid, .form-control.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {
  padding-right: calc(1.5em + 0.75rem);
  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);
}

.was-validated .form-select:invalid, .form-select.is-invalid {
  border-color: #dc3545;
  padding-right: 4.125rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-position: right 0.75rem center, center right 2.25rem;
  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-select:invalid:focus, .form-select.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.was-validated .form-check-input:invalid, .form-check-input.is-invalid {
  border-color: #dc3545;
}
.was-validated .form-check-input:invalid:checked, .form-check-input.is-invalid:checked {
  background-color: #dc3545;
}
.was-validated .form-check-input:invalid:focus, .form-check-input.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {
  color: #dc3545;
}

.form-check-inline .form-check-input ~ .invalid-feedback {
  margin-left: 0.5em;
}

.was-validated .input-group .form-control:invalid, .input-group .form-control.is-invalid,
.was-validated .input-group .form-select:invalid,
.input-group .form-select.is-invalid {
  z-index: 3;
}

.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover {
  color: #212529;
}
.btn-check:focus + .btn, .btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.btn:disabled, .btn.disabled, fieldset:disabled .btn {
  pointer-events: none;
  opacity: 0.65;
}

.btn-primary {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
.btn-check:focus + .btn-primary, .btn-primary:focus {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
  box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
}
.btn-check:checked + .btn-primary, .btn-check:active + .btn-primary, .btn-primary:active, .btn-primary.active, .show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #0a58ca;
  border-color: #0a53be;
}
.btn-check:checked + .btn-primary:focus, .btn-check:active + .btn-primary:focus, .btn-primary:active:focus, .btn-primary.active:focus, .show > .btn-primary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
}
.btn-primary:disabled, .btn-primary.disabled {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
.btn-check:focus + .btn-secondary, .btn-secondary:focus {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
}
.btn-check:checked + .btn-secondary, .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #565e64;
  border-color: #51585e;
}
.btn-check:checked + .btn-secondary:focus, .btn-check:active + .btn-secondary:focus, .btn-secondary:active:focus, .btn-secondary.active:focus, .show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
}
.btn-secondary:disabled, .btn-secondary.disabled {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-success {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}
.btn-success:hover {
  color: #fff;
  background-color: #157347;
  border-color: #146c43;
}
.btn-check:focus + .btn-success, .btn-success:focus {
  color: #fff;
  background-color: #157347;
  border-color: #146c43;
  box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
}
.btn-check:checked + .btn-success, .btn-check:active + .btn-success, .btn-success:active, .btn-success.active, .show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #146c43;
  border-color: #13653f;
}
.btn-check:checked + .btn-success:focus, .btn-check:active + .btn-success:focus, .btn-success:active:focus, .btn-success.active:focus, .show > .btn-success.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);
}
.btn-success:disabled, .btn-success.disabled {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}

.btn-info {
  color: #000;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}
.btn-info:hover {
  color: #000;
  background-color: #31d2f2;
  border-color: #25cff2;
}
.btn-check:focus + .btn-info, .btn-info:focus {
  color: #000;
  background-color: #31d2f2;
  border-color: #25cff2;
  box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
}
.btn-check:checked + .btn-info, .btn-check:active + .btn-info, .btn-info:active, .btn-info.active, .show > .btn-info.dropdown-toggle {
  color: #000;
  background-color: #3dd5f3;
  border-color: #25cff2;
}
.btn-check:checked + .btn-info:focus, .btn-check:active + .btn-info:focus, .btn-info:active:focus, .btn-info.active:focus, .show > .btn-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);
}
.btn-info:disabled, .btn-info.disabled {
  color: #000;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}

.btn-warning {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}
.btn-warning:hover {
  color: #000;
  background-color: #ffca2c;
  border-color: #ffc720;
}
.btn-check:focus + .btn-warning, .btn-warning:focus {
  color: #000;
  background-color: #ffca2c;
  border-color: #ffc720;
  box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
}
.btn-check:checked + .btn-warning, .btn-check:active + .btn-warning, .btn-warning:active, .btn-warning.active, .show > .btn-warning.dropdown-toggle {
  color: #000;
  background-color: #ffcd39;
  border-color: #ffc720;
}
.btn-check:checked + .btn-warning:focus, .btn-check:active + .btn-warning:focus, .btn-warning:active:focus, .btn-warning.active:focus, .show > .btn-warning.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
}
.btn-warning:disabled, .btn-warning.disabled {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bb2d3b;
  border-color: #b02a37;
}
.btn-check:focus + .btn-danger, .btn-danger:focus {
  color: #fff;
  background-color: #bb2d3b;
  border-color: #b02a37;
  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
}
.btn-check:checked + .btn-danger, .btn-check:active + .btn-danger, .btn-danger:active, .btn-danger.active, .show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #b02a37;
  border-color: #a52834;
}
.btn-check:checked + .btn-danger:focus, .btn-check:active + .btn-danger:focus, .btn-danger:active:focus, .btn-danger.active:focus, .show > .btn-danger.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
}
.btn-danger:disabled, .btn-danger.disabled {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-light {
  color: #000;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
.btn-light:hover {
  color: #000;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
.btn-check:focus + .btn-light, .btn-light:focus {
  color: #000;
  background-color: #f9fafb;
  border-color: #f9fafb;
  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
}
.btn-check:checked + .btn-light, .btn-check:active + .btn-light, .btn-light:active, .btn-light.active, .show > .btn-light.dropdown-toggle {
  color: #000;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
.btn-check:checked + .btn-light:focus, .btn-check:active + .btn-light:focus, .btn-light:active:focus, .btn-light.active:focus, .show > .btn-light.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);
}
.btn-light:disabled, .btn-light.disabled {
  color: #000;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-dark {
  color: #fff;
  background-color: #212529;
  border-color: #212529;
}
.btn-dark:hover {
  color: #fff;
  background-color: #1c1f23;
  border-color: #1a1e21;
}
.btn-check:focus + .btn-dark, .btn-dark:focus {
  color: #fff;
  background-color: #1c1f23;
  border-color: #1a1e21;
  box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
}
.btn-check:checked + .btn-dark, .btn-check:active + .btn-dark, .btn-dark:active, .btn-dark.active, .show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #1a1e21;
  border-color: #191c1f;
}
.btn-check:checked + .btn-dark:focus, .btn-check:active + .btn-dark:focus, .btn-dark:active:focus, .btn-dark.active:focus, .show > .btn-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);
}
.btn-dark:disabled, .btn-dark.disabled {
  color: #fff;
  background-color: #212529;
  border-color: #212529;
}

.btn-outline-primary {
  color: #0d6efd;
  border-color: #0d6efd;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.btn-check:focus + .btn-outline-primary, .btn-outline-primary:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.btn-check:checked + .btn-outline-primary:focus, .btn-check:active + .btn-outline-primary:focus, .btn-outline-primary:active:focus, .btn-outline-primary.active:focus, .btn-outline-primary.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
}
.btn-outline-primary:disabled, .btn-outline-primary.disabled {
  color: #0d6efd;
  background-color: transparent;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
}
.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-check:focus + .btn-outline-secondary, .btn-outline-secondary:focus {
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-check:checked + .btn-outline-secondary, .btn-check:active + .btn-outline-secondary, .btn-outline-secondary:active, .btn-outline-secondary.active, .btn-outline-secondary.dropdown-toggle.show {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-check:checked + .btn-outline-secondary:focus, .btn-check:active + .btn-outline-secondary:focus, .btn-outline-secondary:active:focus, .btn-outline-secondary.active:focus, .btn-outline-secondary.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);
}
.btn-outline-secondary:disabled, .btn-outline-secondary.disabled {
  color: #6c757d;
  background-color: transparent;
}

.btn-outline-success {
  color: #198754;
  border-color: #198754;
}
.btn-outline-success:hover {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}
.btn-check:focus + .btn-outline-success, .btn-outline-success:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-check:checked + .btn-outline-success, .btn-check:active + .btn-outline-success, .btn-outline-success:active, .btn-outline-success.active, .btn-outline-success.dropdown-toggle.show {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}
.btn-check:checked + .btn-outline-success:focus, .btn-check:active + .btn-outline-success:focus, .btn-outline-success:active:focus, .btn-outline-success.active:focus, .btn-outline-success.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);
}
.btn-outline-success:disabled, .btn-outline-success.disabled {
  color: #198754;
  background-color: transparent;
}

.btn-outline-info {
  color: #0dcaf0;
  border-color: #0dcaf0;
}
.btn-outline-info:hover {
  color: #000;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}
.btn-check:focus + .btn-outline-info, .btn-outline-info:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-check:checked + .btn-outline-info, .btn-check:active + .btn-outline-info, .btn-outline-info:active, .btn-outline-info.active, .btn-outline-info.dropdown-toggle.show {
  color: #000;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}
.btn-check:checked + .btn-outline-info:focus, .btn-check:active + .btn-outline-info:focus, .btn-outline-info:active:focus, .btn-outline-info.active:focus, .btn-outline-info.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);
}
.btn-outline-info:disabled, .btn-outline-info.disabled {
  color: #0dcaf0;
  background-color: transparent;
}

.btn-outline-warning {
  color: #ffc107;
  border-color: #ffc107;
}
.btn-outline-warning:hover {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}
.btn-check:focus + .btn-outline-warning, .btn-outline-warning:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-check:checked + .btn-outline-warning, .btn-check:active + .btn-outline-warning, .btn-outline-warning:active, .btn-outline-warning.active, .btn-outline-warning.dropdown-toggle.show {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}
.btn-check:checked + .btn-outline-warning:focus, .btn-check:active + .btn-outline-warning:focus, .btn-outline-warning:active:focus, .btn-outline-warning.active:focus, .btn-outline-warning.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
}
.btn-outline-warning:disabled, .btn-outline-warning.disabled {
  color: #ffc107;
  background-color: transparent;
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}
.btn-outline-danger:hover {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-check:focus + .btn-outline-danger, .btn-outline-danger:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-check:checked + .btn-outline-danger, .btn-check:active + .btn-outline-danger, .btn-outline-danger:active, .btn-outline-danger.active, .btn-outline-danger.dropdown-toggle.show {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-check:checked + .btn-outline-danger:focus, .btn-check:active + .btn-outline-danger:focus, .btn-outline-danger:active:focus, .btn-outline-danger.active:focus, .btn-outline-danger.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);
}
.btn-outline-danger:disabled, .btn-outline-danger.disabled {
  color: #dc3545;
  background-color: transparent;
}

.btn-outline-light {
  color: #f8f9fa;
  border-color: #f8f9fa;
}
.btn-outline-light:hover {
  color: #000;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
.btn-check:focus + .btn-outline-light, .btn-outline-light:focus {
  box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-check:checked + .btn-outline-light, .btn-check:active + .btn-outline-light, .btn-outline-light:active, .btn-outline-light.active, .btn-outline-light.dropdown-toggle.show {
  color: #000;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
.btn-check:checked + .btn-outline-light:focus, .btn-check:active + .btn-outline-light:focus, .btn-outline-light:active:focus, .btn-outline-light.active:focus, .btn-outline-light.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);
}
.btn-outline-light:disabled, .btn-outline-light.disabled {
  color: #f8f9fa;
  background-color: transparent;
}

.btn-outline-dark {
  color: #212529;
  border-color: #212529;
}
.btn-outline-dark:hover {
  color: #fff;
  background-color: #212529;
  border-color: #212529;
}
.btn-check:focus + .btn-outline-dark, .btn-outline-dark:focus {
  box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-check:checked + .btn-outline-dark, .btn-check:active + .btn-outline-dark, .btn-outline-dark:active, .btn-outline-dark.active, .btn-outline-dark.dropdown-toggle.show {
  color: #fff;
  background-color: #212529;
  border-color: #212529;
}
.btn-check:checked + .btn-outline-dark:focus, .btn-check:active + .btn-outline-dark:focus, .btn-outline-dark:active:focus, .btn-outline-dark.active:focus, .btn-outline-dark.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);
}
.btn-outline-dark:disabled, .btn-outline-dark.disabled {
  color: #212529;
  background-color: transparent;
}

.btn-link {
  font-weight: 400;
  color: #0d6efd;
  text-decoration: underline;
}
.btn-link:hover {
  color: #0a58ca;
}
.btn-link:disabled, .btn-link.disabled {
  color: #6c757d;
}

.btn-lg, .btn-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.btn-sm, .btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.fade {
  transition: opacity 0.15s linear;
}
@media (prefers-reduced-motion: reduce) {
  .fade {
    transition: none;
  }
}
.fade:not(.show) {
  opacity: 0;
}

.collapse:not(.show) {
  display: none;
}

.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
@media (prefers-reduced-motion: reduce) {
  .collapsing {
    transition: none;
  }
}

.dropup,
.dropend,
.dropdown,
.dropstart {
  position: relative;
}

.dropdown-toggle {
  white-space: nowrap;
}
.dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.dropdown-toggle:empty::after {
  margin-left: 0;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.dropdown-menu[data-bs-popper] {
  left: 0;
  margin-top: 0.125rem;
}

.dropdown-menu-start {
  --bs-position: start;
}
.dropdown-menu-start[data-bs-popper] {
  right: auto /* rtl:ignore */;
  left: 0 /* rtl:ignore */;
}

.dropdown-menu-end {
  --bs-position: end;
}
.dropdown-menu-end[data-bs-popper] {
  right: 0 /* rtl:ignore */;
  left: auto /* rtl:ignore */;
}

@media (min-width: 576px) {
  .dropdown-menu-sm-start {
    --bs-position: start;
  }
  .dropdown-menu-sm-start[data-bs-popper] {
    right: auto /* rtl:ignore */;
    left: 0 /* rtl:ignore */;
  }

  .dropdown-menu-sm-end {
    --bs-position: end;
  }
  .dropdown-menu-sm-end[data-bs-popper] {
    right: 0 /* rtl:ignore */;
    left: auto /* rtl:ignore */;
  }
}
@media (min-width: 768px) {
  .dropdown-menu-md-start {
    --bs-position: start;
  }
  .dropdown-menu-md-start[data-bs-popper] {
    right: auto /* rtl:ignore */;
    left: 0 /* rtl:ignore */;
  }

  .dropdown-menu-md-end {
    --bs-position: end;
  }
  .dropdown-menu-md-end[data-bs-popper] {
    right: 0 /* rtl:ignore */;
    left: auto /* rtl:ignore */;
  }
}
@media (min-width: 992px) {
  .dropdown-menu-lg-start {
    --bs-position: start;
  }
  .dropdown-menu-lg-start[data-bs-popper] {
    right: auto /* rtl:ignore */;
    left: 0 /* rtl:ignore */;
  }

  .dropdown-menu-lg-end {
    --bs-position: end;
  }
  .dropdown-menu-lg-end[data-bs-popper] {
    right: 0 /* rtl:ignore */;
    left: auto /* rtl:ignore */;
  }
}
@media (min-width: 1200px) {
  .dropdown-menu-xl-start {
    --bs-position: start;
  }
  .dropdown-menu-xl-start[data-bs-popper] {
    right: auto /* rtl:ignore */;
    left: 0 /* rtl:ignore */;
  }

  .dropdown-menu-xl-end {
    --bs-position: end;
  }
  .dropdown-menu-xl-end[data-bs-popper] {
    right: 0 /* rtl:ignore */;
    left: auto /* rtl:ignore */;
  }
}
@media (min-width: 1400px) {
  .dropdown-menu-xxl-start {
    --bs-position: start;
  }
  .dropdown-menu-xxl-start[data-bs-popper] {
    right: auto /* rtl:ignore */;
    left: 0 /* rtl:ignore */;
  }

  .dropdown-menu-xxl-end {
    --bs-position: end;
  }
  .dropdown-menu-xxl-end[data-bs-popper] {
    right: 0 /* rtl:ignore */;
    left: auto /* rtl:ignore */;
  }
}
.dropup .dropdown-menu[data-bs-popper] {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 0.125rem;
}
.dropup .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0;
  border-right: 0.3em solid transparent;
  border-bottom: 0.3em solid;
  border-left: 0.3em solid transparent;
}
.dropup .dropdown-toggle:empty::after {
  margin-left: 0;
}

.dropend .dropdown-menu {
  top: 0;
  right: auto;
  left: 100%;
}
.dropend .dropdown-menu[data-bs-popper] {
  margin-top: 0;
  margin-left: 0.125rem;
}
.dropend .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid transparent;
  border-right: 0;
  border-bottom: 0.3em solid transparent;
  border-left: 0.3em solid;
}
.dropend .dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropend .dropdown-toggle::after {
  vertical-align: 0;
}

.dropstart .dropdown-menu {
  top: 0;
  right: 100%;
  left: auto;
}
.dropstart .dropdown-menu[data-bs-popper] {
  margin-top: 0;
  margin-right: 0.125rem;
}
.dropstart .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
}
.dropstart .dropdown-toggle::after {
  display: none;
}
.dropstart .dropdown-toggle::before {
  display: inline-block;
  margin-right: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid transparent;
  border-right: 0.3em solid;
  border-bottom: 0.3em solid transparent;
}
.dropstart .dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropstart .dropdown-toggle::before {
  vertical-align: 0;
}

.dropdown-divider {
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.dropdown-item:hover, .dropdown-item:focus {
  color: #1e2125;
  background-color: #e9ecef;
}
.dropdown-item.active, .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #0d6efd;
}
.dropdown-item.disabled, .dropdown-item:disabled {
  color: #adb5bd;
  pointer-events: none;
  background-color: transparent;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-header {
  display: block;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #6c757d;
  white-space: nowrap;
}

.dropdown-item-text {
  display: block;
  padding: 0.25rem 1rem;
  color: #212529;
}

.dropdown-menu-dark {
  color: #dee2e6;
  background-color: #343a40;
  border-color: rgba(0, 0, 0, 0.15);
}
.dropdown-menu-dark .dropdown-item {
  color: #dee2e6;
}
.dropdown-menu-dark .dropdown-item:hover, .dropdown-menu-dark .dropdown-item:focus {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
}
.dropdown-menu-dark .dropdown-item.active, .dropdown-menu-dark .dropdown-item:active {
  color: #fff;
  background-color: #0d6efd;
}
.dropdown-menu-dark .dropdown-item.disabled, .dropdown-menu-dark .dropdown-item:disabled {
  color: #adb5bd;
}
.dropdown-menu-dark .dropdown-divider {
  border-color: rgba(0, 0, 0, 0.15);
}
.dropdown-menu-dark .dropdown-item-text {
  color: #dee2e6;
}
.dropdown-menu-dark .dropdown-header {
  color: #adb5bd;
}

.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}
.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  flex: 1 1 auto;
}
.btn-group > .btn-check:checked + .btn,
.btn-group > .btn-check:focus + .btn,
.btn-group > .btn:hover,
.btn-group > .btn:focus,
.btn-group > .btn:active,
.btn-group > .btn.active,
.btn-group-vertical > .btn-check:checked + .btn,
.btn-group-vertical > .btn-check:focus + .btn,
.btn-group-vertical > .btn:hover,
.btn-group-vertical > .btn:focus,
.btn-group-vertical > .btn:active,
.btn-group-vertical > .btn.active {
  z-index: 1;
}

.btn-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.btn-toolbar .input-group {
  width: auto;
}

.btn-group > .btn:not(:first-child),
.btn-group > .btn-group:not(:first-child) {
  margin-left: -1px;
}
.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group > .btn-group:not(:last-child) > .btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group > .btn:nth-child(n+3),
.btn-group > :not(.btn-check) + .btn,
.btn-group > .btn-group:not(:first-child) > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.dropdown-toggle-split {
  padding-right: 0.5625rem;
  padding-left: 0.5625rem;
}
.dropdown-toggle-split::after, .dropup .dropdown-toggle-split::after, .dropend .dropdown-toggle-split::after {
  margin-left: 0;
}
.dropstart .dropdown-toggle-split::before {
  margin-right: 0;
}

.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {
  padding-right: 0.375rem;
  padding-left: 0.375rem;
}

.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

.btn-group-vertical {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group {
  width: 100%;
}
.btn-group-vertical > .btn:not(:first-child),
.btn-group-vertical > .btn-group:not(:first-child) {
  margin-top: -1px;
}
.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group-vertical > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn ~ .btn,
.btn-group-vertical > .btn-group:not(:first-child) > .btn {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}
.nav-link.disabled {
  color: #6c757d;
  pointer-events: none;
  cursor: default;
}

.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}
.nav-tabs .nav-link {
  margin-bottom: -1px;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {
  border-color: #e9ecef #e9ecef #dee2e6;
  isolation: isolate;
}
.nav-tabs .nav-link.disabled {
  color: #6c757d;
  background-color: transparent;
  border-color: transparent;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.nav-pills .nav-link {
  background: none;
  border: 0;
  border-radius: 0.25rem;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #0d6efd;
}

.nav-fill > .nav-link,
.nav-fill .nav-item {
  flex: 1 1 auto;
  text-align: center;
}

.nav-justified > .nav-link,
.nav-justified .nav-item {
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
}

.nav-fill .nav-item .nav-link,
.nav-justified .nav-item .nav-link {
  width: 100%;
}

.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.navbar > .container,
.navbar > .container-fluid,
.navbar > .container-sm,
.navbar > .container-md,
.navbar > .container-lg,
.navbar > .container-xl,
.navbar > .container-xxl {
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
}
.navbar-brand {
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  white-space: nowrap;
}
.navbar-nav {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.navbar-nav .nav-link {
  padding-right: 0;
  padding-left: 0;
}
.navbar-nav .dropdown-menu {
  position: static;
}

.navbar-text {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.navbar-collapse {
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
}

.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .navbar-toggler {
    transition: none;
  }
}
.navbar-toggler:hover {
  text-decoration: none;
}
.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 0 0.25rem;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.navbar-nav-scroll {
  max-height: var(--bs-scroll-height, 75vh);
  overflow-y: auto;
}

@media (min-width: 576px) {
  .navbar-expand-sm {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-sm .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-sm .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-sm .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-sm .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-sm .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-sm .navbar-toggler {
    display: none;
  }
}
@media (min-width: 768px) {
  .navbar-expand-md {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-md .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-md .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-md .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-md .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-md .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-md .navbar-toggler {
    display: none;
  }
}
@media (min-width: 992px) {
  .navbar-expand-lg {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-lg .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-lg .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-lg .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-lg .navbar-toggler {
    display: none;
  }
}
@media (min-width: 1200px) {
  .navbar-expand-xl {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-xl .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-xl .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-xl .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-xl .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-xl .navbar-toggler {
    display: none;
  }
}
@media (min-width: 1400px) {
  .navbar-expand-xxl {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-xxl .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-xxl .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-xxl .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-xxl .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-xxl .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-xxl .navbar-toggler {
    display: none;
  }
}
.navbar-expand {
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.navbar-expand .navbar-nav {
  flex-direction: row;
}
.navbar-expand .navbar-nav .dropdown-menu {
  position: absolute;
}
.navbar-expand .navbar-nav .nav-link {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
.navbar-expand .navbar-nav-scroll {
  overflow: visible;
}
.navbar-expand .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
}
.navbar-expand .navbar-toggler {
  display: none;
}

.navbar-light .navbar-brand {
  color: rgba(0, 0, 0, 0.9);
}
.navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {
  color: rgba(0, 0, 0, 0.9);
}
.navbar-light .navbar-nav .nav-link {
  color: rgba(0, 0, 0, 0.55);
}
.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {
  color: rgba(0, 0, 0, 0.7);
}
.navbar-light .navbar-nav .nav-link.disabled {
  color: rgba(0, 0, 0, 0.3);
}
.navbar-light .navbar-nav .show > .nav-link,
.navbar-light .navbar-nav .nav-link.active {
  color: rgba(0, 0, 0, 0.9);
}
.navbar-light .navbar-toggler {
  color: rgba(0, 0, 0, 0.55);
  border-color: rgba(0, 0, 0, 0.1);
}
.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar-light .navbar-text {
  color: rgba(0, 0, 0, 0.55);
}
.navbar-light .navbar-text a,
.navbar-light .navbar-text a:hover,
.navbar-light .navbar-text a:focus {
  color: rgba(0, 0, 0, 0.9);
}

.navbar-dark .navbar-brand {
  color: #fff;
}
.navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {
  color: #fff;
}
.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.55);
}
.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {
  color: rgba(255, 255, 255, 0.75);
}
.navbar-dark .navbar-nav .nav-link.disabled {
  color: rgba(255, 255, 255, 0.25);
}
.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .nav-link.active {
  color: #fff;
}
.navbar-dark .navbar-toggler {
  color: rgba(255, 255, 255, 0.55);
  border-color: rgba(255, 255, 255, 0.1);
}
.navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar-dark .navbar-text {
  color: rgba(255, 255, 255, 0.55);
}
.navbar-dark .navbar-text a,
.navbar-dark .navbar-text a:hover,
.navbar-dark .navbar-text a:focus {
  color: #fff;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.card > hr {
  margin-right: 0;
  margin-left: 0;
}
.card > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}
.card > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.card > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: calc(0.25rem - 1px);
  border-bottom-left-radius: calc(0.25rem - 1px);
}
.card > .card-header + .list-group,
.card > .list-group + .card-footer {
  border-top: 0;
}

.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
}

.card-title {
  margin-bottom: 0.5rem;
}

.card-subtitle {
  margin-top: -0.25rem;
  margin-bottom: 0;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-link:hover {
  text-decoration: none;
}
.card-link + .card-link {
  margin-left: 1rem;
}

.card-header {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card-footer {
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.card-footer:last-child {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
}

.card-header-tabs {
  margin-right: -0.5rem;
  margin-bottom: -0.5rem;
  margin-left: -0.5rem;
  border-bottom: 0;
}

.card-header-pills {
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}

.card-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  border-radius: calc(0.25rem - 1px);
}

.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
}

.card-img,
.card-img-top {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}

.card-img,
.card-img-bottom {
  border-bottom-right-radius: calc(0.25rem - 1px);
  border-bottom-left-radius: calc(0.25rem - 1px);
}

.card-group > .card {
  margin-bottom: 0.75rem;
}
@media (min-width: 576px) {
  .card-group {
    display: flex;
    flex-flow: row wrap;
  }
  .card-group > .card {
    flex: 1 0 0%;
    margin-bottom: 0;
  }
  .card-group > .card + .card {
    margin-left: 0;
    border-left: 0;
  }
  .card-group > .card:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-top,
.card-group > .card:not(:last-child) .card-header {
    border-top-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-bottom,
.card-group > .card:not(:last-child) .card-footer {
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-top,
.card-group > .card:not(:first-child) .card-header {
    border-top-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-bottom,
.card-group > .card:not(:first-child) .card-footer {
    border-bottom-left-radius: 0;
  }
}

.accordion-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border: 0;
  border-radius: 0;
  overflow-anchor: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
}
@media (prefers-reduced-motion: reduce) {
  .accordion-button {
    transition: none;
  }
}
.accordion-button:not(.collapsed) {
  color: #0c63e4;
  background-color: #e7f1ff;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
}
.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  transform: rotate(180deg);
}
.accordion-button::after {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  content: "";
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.25rem;
  transition: transform 0.2s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .accordion-button::after {
    transition: none;
  }
}
.accordion-button:hover {
  z-index: 2;
}
.accordion-button:focus {
  z-index: 3;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.accordion-header {
  margin-bottom: 0;
}

.accordion-item {
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.accordion-item:first-of-type {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.accordion-item:first-of-type .accordion-button {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.accordion-item:last-of-type {
  margin-bottom: 0;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.accordion-item:last-of-type .accordion-button.collapsed {
  border-bottom-right-radius: calc(0.25rem - 1px);
  border-bottom-left-radius: calc(0.25rem - 1px);
}
.accordion-item:last-of-type .accordion-collapse {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.accordion-body {
  padding: 1rem 1.25rem;
}

.accordion-flush .accordion-collapse {
  border-width: 0;
}
.accordion-flush .accordion-item {
  border-right: 0;
  border-left: 0;
  border-radius: 0;
}
.accordion-flush .accordion-item:first-child {
  border-top: 0;
}
.accordion-flush .accordion-item:last-child {
  border-bottom: 0;
}
.accordion-flush .accordion-item .accordion-button {
  border-radius: 0;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0;
  margin-bottom: 1rem;
  list-style: none;
}

.breadcrumb-item + .breadcrumb-item {
  padding-left: 0.5rem;
}
.breadcrumb-item + .breadcrumb-item::before {
  float: left;
  padding-right: 0.5rem;
  color: #6c757d;
  content: var(--bs-breadcrumb-divider, "/") /* rtl: var(--bs-breadcrumb-divider, "/") */;
}
.breadcrumb-item.active {
  color: #6c757d;
}

.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-link {
  position: relative;
  display: block;
  color: #0d6efd;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dee2e6;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .page-link {
    transition: none;
  }
}
.page-link:hover {
  z-index: 2;
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}
.page-link:focus {
  z-index: 3;
  color: #0a58ca;
  background-color: #e9ecef;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.page-item:not(:first-child) .page-link {
  margin-left: -1px;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}

.page-link {
  padding: 0.375rem 0.75rem;
}

.page-item:first-child .page-link {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.page-item:last-child .page-link {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.pagination-lg .page-link {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}
.pagination-lg .page-item:first-child .page-link {
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}
.pagination-lg .page-item:last-child .page-link {
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

.pagination-sm .page-link {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.pagination-sm .page-item:first-child .page-link {
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
}
.pagination-sm .page-item:last-child .page-link {
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}

.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.badge:empty {
  display: none;
}

.btn .badge {
  position: relative;
  top: -1px;
}

.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-heading {
  color: inherit;
}

.alert-link {
  font-weight: 700;
}

.alert-dismissible {
  padding-right: 3rem;
}
.alert-dismissible .btn-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 1.25rem 1rem;
}

.alert-primary {
  color: #084298;
  background-color: #cfe2ff;
  border-color: #b6d4fe;
}
.alert-primary .alert-link {
  color: #06357a;
}

.alert-secondary {
  color: #41464b;
  background-color: #e2e3e5;
  border-color: #d3d6d8;
}
.alert-secondary .alert-link {
  color: #34383c;
}

.alert-success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
.alert-success .alert-link {
  color: #0c4128;
}

.alert-info {
  color: #055160;
  background-color: #cff4fc;
  border-color: #b6effb;
}
.alert-info .alert-link {
  color: #04414d;
}

.alert-warning {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}
.alert-warning .alert-link {
  color: #523e02;
}

.alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
.alert-danger .alert-link {
  color: #6a1a21;
}

.alert-light {
  color: #636464;
  background-color: #fefefe;
  border-color: #fdfdfe;
}
.alert-light .alert-link {
  color: #4f5050;
}

.alert-dark {
  color: #141619;
  background-color: #d3d3d4;
  border-color: #bcbebf;
}
.alert-dark .alert-link {
  color: #101214;
}

@-webkit-keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}

@keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}
.progress {
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #0d6efd;
  transition: width 0.6s ease;
}
@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    transition: none;
  }
}

.progress-bar-striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 1rem 1rem;
}

.progress-bar-animated {
  -webkit-animation: 1s linear infinite progress-bar-stripes;
  animation: 1s linear infinite progress-bar-stripes;
}
@media (prefers-reduced-motion: reduce) {
  .progress-bar-animated {
    -webkit-animation: none;
    animation: none;
  }
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}

.list-group-numbered {
  list-style-type: none;
  counter-reset: section;
}
.list-group-numbered > li::before {
  content: counters(section, ".") ". ";
  counter-increment: section;
}

.list-group-item-action {
  width: 100%;
  color: #495057;
  text-align: inherit;
}
.list-group-item-action:hover, .list-group-item-action:focus {
  z-index: 1;
  color: #495057;
  text-decoration: none;
  background-color: #f8f9fa;
}
.list-group-item-action:active {
  color: #212529;
  background-color: #e9ecef;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  color: #212529;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.list-group-item:last-child {
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
}
.list-group-item.disabled, .list-group-item:disabled {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.list-group-item + .list-group-item {
  border-top-width: 0;
}
.list-group-item + .list-group-item.active {
  margin-top: -1px;
  border-top-width: 1px;
}

.list-group-horizontal {
  flex-direction: row;
}
.list-group-horizontal > .list-group-item:first-child {
  border-bottom-left-radius: 0.25rem;
  border-top-right-radius: 0;
}
.list-group-horizontal > .list-group-item:last-child {
  border-top-right-radius: 0.25rem;
  border-bottom-left-radius: 0;
}
.list-group-horizontal > .list-group-item.active {
  margin-top: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item {
  border-top-width: 1px;
  border-left-width: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item.active {
  margin-left: -1px;
  border-left-width: 1px;
}

@media (min-width: 576px) {
  .list-group-horizontal-sm {
    flex-direction: row;
  }
  .list-group-horizontal-sm > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }
  .list-group-horizontal-sm > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-sm > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-sm > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
  }
  .list-group-horizontal-sm > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
  }
}
@media (min-width: 768px) {
  .list-group-horizontal-md {
    flex-direction: row;
  }
  .list-group-horizontal-md > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }
  .list-group-horizontal-md > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-md > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-md > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
  }
  .list-group-horizontal-md > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
  }
}
@media (min-width: 992px) {
  .list-group-horizontal-lg {
    flex-direction: row;
  }
  .list-group-horizontal-lg > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }
  .list-group-horizontal-lg > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-lg > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-lg > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
  }
  .list-group-horizontal-lg > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
  }
}
@media (min-width: 1200px) {
  .list-group-horizontal-xl {
    flex-direction: row;
  }
  .list-group-horizontal-xl > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }
  .list-group-horizontal-xl > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-xl > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-xl > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
  }
  .list-group-horizontal-xl > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
  }
}
@media (min-width: 1400px) {
  .list-group-horizontal-xxl {
    flex-direction: row;
  }
  .list-group-horizontal-xxl > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }
  .list-group-horizontal-xxl > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-xxl > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-xxl > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
  }
  .list-group-horizontal-xxl > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
  }
}
.list-group-flush {
  border-radius: 0;
}
.list-group-flush > .list-group-item {
  border-width: 0 0 1px;
}
.list-group-flush > .list-group-item:last-child {
  border-bottom-width: 0;
}

.list-group-item-primary {
  color: #084298;
  background-color: #cfe2ff;
}
.list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {
  color: #084298;
  background-color: #bacbe6;
}
.list-group-item-primary.list-group-item-action.active {
  color: #fff;
  background-color: #084298;
  border-color: #084298;
}

.list-group-item-secondary {
  color: #41464b;
  background-color: #e2e3e5;
}
.list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {
  color: #41464b;
  background-color: #cbccce;
}
.list-group-item-secondary.list-group-item-action.active {
  color: #fff;
  background-color: #41464b;
  border-color: #41464b;
}

.list-group-item-success {
  color: #0f5132;
  background-color: #d1e7dd;
}
.list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {
  color: #0f5132;
  background-color: #bcd0c7;
}
.list-group-item-success.list-group-item-action.active {
  color: #fff;
  background-color: #0f5132;
  border-color: #0f5132;
}

.list-group-item-info {
  color: #055160;
  background-color: #cff4fc;
}
.list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {
  color: #055160;
  background-color: #badce3;
}
.list-group-item-info.list-group-item-action.active {
  color: #fff;
  background-color: #055160;
  border-color: #055160;
}

.list-group-item-warning {
  color: #664d03;
  background-color: #fff3cd;
}
.list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {
  color: #664d03;
  background-color: #e6dbb9;
}
.list-group-item-warning.list-group-item-action.active {
  color: #fff;
  background-color: #664d03;
  border-color: #664d03;
}

.list-group-item-danger {
  color: #842029;
  background-color: #f8d7da;
}
.list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {
  color: #842029;
  background-color: #dfc2c4;
}
.list-group-item-danger.list-group-item-action.active {
  color: #fff;
  background-color: #842029;
  border-color: #842029;
}

.list-group-item-light {
  color: #636464;
  background-color: #fefefe;
}
.list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {
  color: #636464;
  background-color: #e5e5e5;
}
.list-group-item-light.list-group-item-action.active {
  color: #fff;
  background-color: #636464;
  border-color: #636464;
}

.list-group-item-dark {
  color: #141619;
  background-color: #d3d3d4;
}
.list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {
  color: #141619;
  background-color: #bebebf;
}
.list-group-item-dark.list-group-item-action.active {
  color: #fff;
  background-color: #141619;
  border-color: #141619;
}

.btn-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
}
.btn-close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}
.btn-close:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  opacity: 1;
}
.btn-close:disabled, .btn-close.disabled {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  opacity: 0.25;
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}

.toast {
  width: 350px;
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.85);
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.toast:not(.showing):not(.show) {
  opacity: 0;
}
.toast.hide {
  display: none;
}

.toast-container {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  max-width: 100%;
  pointer-events: none;
}
.toast-container > :not(:last-child) {
  margin-bottom: 0.75rem;
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: #6c757d;
  background-color: rgba(255, 255, 255, 0.85);
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.toast-header .btn-close {
  margin-right: -0.375rem;
  margin-left: 0.75rem;
}

.toast-body {
  padding: 0.75rem;
  word-wrap: break-word;
}

.modal-open {
  overflow: hidden;
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}
@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
    transition: none;
  }
}
.modal.show .modal-dialog {
  transform: none;
}
.modal.modal-static .modal-dialog {
  transform: scale(1.02);
}

.modal-dialog-scrollable {
  height: calc(100% - 1rem);
}
.modal-dialog-scrollable .modal-content {
  max-height: 100%;
  overflow: hidden;
}
.modal-dialog-scrollable .modal-body {
  overflow-y: auto;
}

.modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - 1rem);
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.modal-backdrop.fade {
  opacity: 0;
}
.modal-backdrop.show {
  opacity: 0.5;
}

.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
.modal-header .btn-close {
  padding: 0.5rem 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}
.modal-footer > * {
  margin: 0.25rem;
}

.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }

  .modal-dialog-scrollable {
    height: calc(100% - 3.5rem);
  }

  .modal-dialog-centered {
    min-height: calc(100% - 3.5rem);
  }

  .modal-sm {
    max-width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg,
.modal-xl {
    max-width: 800px;
  }
}
@media (min-width: 1200px) {
  .modal-xl {
    max-width: 1140px;
  }
}
.modal-fullscreen {
  width: 100vw;
  max-width: none;
  height: 100%;
  margin: 0;
}
.modal-fullscreen .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.modal-fullscreen .modal-header {
  border-radius: 0;
}
.modal-fullscreen .modal-body {
  overflow-y: auto;
}
.modal-fullscreen .modal-footer {
  border-radius: 0;
}

@media (max-width: 575.98px) {
  .modal-fullscreen-sm-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-sm-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-sm-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-sm-down .modal-body {
    overflow-y: auto;
  }
  .modal-fullscreen-sm-down .modal-footer {
    border-radius: 0;
  }
}
@media (max-width: 767.98px) {
  .modal-fullscreen-md-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-md-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-md-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-md-down .modal-body {
    overflow-y: auto;
  }
  .modal-fullscreen-md-down .modal-footer {
    border-radius: 0;
  }
}
@media (max-width: 991.98px) {
  .modal-fullscreen-lg-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-lg-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-lg-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-lg-down .modal-body {
    overflow-y: auto;
  }
  .modal-fullscreen-lg-down .modal-footer {
    border-radius: 0;
  }
}
@media (max-width: 1199.98px) {
  .modal-fullscreen-xl-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-xl-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-xl-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-xl-down .modal-body {
    overflow-y: auto;
  }
  .modal-fullscreen-xl-down .modal-footer {
    border-radius: 0;
  }
}
@media (max-width: 1399.98px) {
  .modal-fullscreen-xxl-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-xxl-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-xxl-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-xxl-down .modal-body {
    overflow-y: auto;
  }
  .modal-fullscreen-xxl-down .modal-footer {
    border-radius: 0;
  }
}
.tooltip {
  position: absolute;
  z-index: 1080;
  display: block;
  margin: 0;
  font-family: var(--bs-font-sans-serif);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  font-size: 0.875rem;
  word-wrap: break-word;
  opacity: 0;
}
.tooltip.show {
  opacity: 0.9;
}
.tooltip .tooltip-arrow {
  position: absolute;
  display: block;
  width: 0.8rem;
  height: 0.4rem;
}
.tooltip .tooltip-arrow::before {
  position: absolute;
  content: "";
  border-color: transparent;
  border-style: solid;
}

.bs-tooltip-top, .bs-tooltip-auto[data-popper-placement^=top] {
  padding: 0.4rem 0;
}
.bs-tooltip-top .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow {
  bottom: 0;
}
.bs-tooltip-top .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow::before {
  top: -1px;
  border-width: 0.4rem 0.4rem 0;
  border-top-color: #000;
}

.bs-tooltip-end, .bs-tooltip-auto[data-popper-placement^=right] {
  padding: 0 0.4rem;
}
.bs-tooltip-end .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow {
  left: 0;
  width: 0.4rem;
  height: 0.8rem;
}
.bs-tooltip-end .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow::before {
  right: -1px;
  border-width: 0.4rem 0.4rem 0.4rem 0;
  border-right-color: #000;
}

.bs-tooltip-bottom, .bs-tooltip-auto[data-popper-placement^=bottom] {
  padding: 0.4rem 0;
}
.bs-tooltip-bottom .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow {
  top: 0;
}
.bs-tooltip-bottom .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow::before {
  bottom: -1px;
  border-width: 0 0.4rem 0.4rem;
  border-bottom-color: #000;
}

.bs-tooltip-start, .bs-tooltip-auto[data-popper-placement^=left] {
  padding: 0 0.4rem;
}
.bs-tooltip-start .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow {
  right: 0;
  width: 0.4rem;
  height: 0.8rem;
}
.bs-tooltip-start .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow::before {
  left: -1px;
  border-width: 0.4rem 0 0.4rem 0.4rem;
  border-left-color: #000;
}

.tooltip-inner {
  max-width: 200px;
  padding: 0.25rem 0.5rem;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 0.25rem;
}

.popover {
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  z-index: 1070;
  display: block;
  max-width: 276px;
  font-family: var(--bs-font-sans-serif);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  font-size: 0.875rem;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
}
.popover .popover-arrow {
  position: absolute;
  display: block;
  width: 1rem;
  height: 0.5rem;
}
.popover .popover-arrow::before, .popover .popover-arrow::after {
  position: absolute;
  display: block;
  content: "";
  border-color: transparent;
  border-style: solid;
}

.bs-popover-top > .popover-arrow, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow {
  bottom: calc(-0.5rem - 1px);
}
.bs-popover-top > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow::before {
  bottom: 0;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: rgba(0, 0, 0, 0.25);
}
.bs-popover-top > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow::after {
  bottom: 1px;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: #fff;
}

.bs-popover-end > .popover-arrow, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow {
  left: calc(-0.5rem - 1px);
  width: 0.5rem;
  height: 1rem;
}
.bs-popover-end > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow::before {
  left: 0;
  border-width: 0.5rem 0.5rem 0.5rem 0;
  border-right-color: rgba(0, 0, 0, 0.25);
}
.bs-popover-end > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow::after {
  left: 1px;
  border-width: 0.5rem 0.5rem 0.5rem 0;
  border-right-color: #fff;
}

.bs-popover-bottom > .popover-arrow, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow {
  top: calc(-0.5rem - 1px);
}
.bs-popover-bottom > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::before {
  top: 0;
  border-width: 0 0.5rem 0.5rem 0.5rem;
  border-bottom-color: rgba(0, 0, 0, 0.25);
}
.bs-popover-bottom > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::after {
  top: 1px;
  border-width: 0 0.5rem 0.5rem 0.5rem;
  border-bottom-color: #fff;
}
.bs-popover-bottom .popover-header::before, .bs-popover-auto[data-popper-placement^=bottom] .popover-header::before {
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  width: 1rem;
  margin-left: -0.5rem;
  content: "";
  border-bottom: 1px solid #f0f0f0;
}

.bs-popover-start > .popover-arrow, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow {
  right: calc(-0.5rem - 1px);
  width: 0.5rem;
  height: 1rem;
}
.bs-popover-start > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow::before {
  right: 0;
  border-width: 0.5rem 0 0.5rem 0.5rem;
  border-left-color: rgba(0, 0, 0, 0.25);
}
.bs-popover-start > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow::after {
  right: 1px;
  border-width: 0.5rem 0 0.5rem 0.5rem;
  border-left-color: #fff;
}

.popover-header {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  font-size: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d8d8d8;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
.popover-header:empty {
  display: none;
}

.popover-body {
  padding: 1rem 1rem;
  color: #212529;
}

.carousel {
  position: relative;
}

.carousel.pointer-event {
  touch-action: pan-y;
}

.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.carousel-inner::after {
  display: block;
  clear: both;
  content: "";
}

.carousel-item {
  position: relative;
  display: none;
  float: left;
  width: 100%;
  margin-right: -100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: transform 0.6s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .carousel-item {
    transition: none;
  }
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

/* rtl:begin:ignore */
.carousel-item-next:not(.carousel-item-start),
.active.carousel-item-end {
  transform: translateX(100%);
}

.carousel-item-prev:not(.carousel-item-end),
.active.carousel-item-start {
  transform: translateX(-100%);
}

/* rtl:end:ignore */
.carousel-fade .carousel-item {
  opacity: 0;
  transition-property: opacity;
  transform: none;
}
.carousel-fade .carousel-item.active,
.carousel-fade .carousel-item-next.carousel-item-start,
.carousel-fade .carousel-item-prev.carousel-item-end {
  z-index: 1;
  opacity: 1;
}
.carousel-fade .active.carousel-item-start,
.carousel-fade .active.carousel-item-end {
  z-index: 0;
  opacity: 0;
  transition: opacity 0s 0.6s;
}
@media (prefers-reduced-motion: reduce) {
  .carousel-fade .active.carousel-item-start,
.carousel-fade .active.carousel-item-end {
    transition: none;
  }
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  padding: 0;
  color: #fff;
  text-align: center;
  background: none;
  border: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease;
}
@media (prefers-reduced-motion: reduce) {
  .carousel-control-prev,
.carousel-control-next {
    transition: none;
  }
}
.carousel-control-prev:hover, .carousel-control-prev:focus,
.carousel-control-next:hover,
.carousel-control-next:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  opacity: 0.9;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}

/* rtl:options: {
  "autoRename": true,
  "stringMap":[ {
    "name"    : "prev-next",
    "search"  : "prev",
    "replace" : "next"
  } ]
} */
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.carousel-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 15%;
  margin-bottom: 1rem;
  margin-left: 15%;
  list-style: none;
}
.carousel-indicators [data-bs-target] {
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 3px;
  padding: 0;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}
@media (prefers-reduced-motion: reduce) {
  .carousel-indicators [data-bs-target] {
    transition: none;
  }
}
.carousel-indicators .active {
  opacity: 1;
}

.carousel-caption {
  position: absolute;
  right: 15%;
  bottom: 1.25rem;
  left: 15%;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #fff;
  text-align: center;
}

.carousel-dark .carousel-control-prev-icon,
.carousel-dark .carousel-control-next-icon {
  filter: invert(1) grayscale(100);
}
.carousel-dark .carousel-indicators [data-bs-target] {
  background-color: #000;
}
.carousel-dark .carousel-caption {
  color: #000;
}

@-webkit-keyframes spinner-border {
  to {
    transform: rotate(360deg) /* rtl:ignore */;
  }
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg) /* rtl:ignore */;
  }
}
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: 0.75s linear infinite spinner-border;
  animation: 0.75s linear infinite spinner-border;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}

@-webkit-keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}

@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}
.spinner-grow {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: 0.75s linear infinite spinner-grow;
  animation: 0.75s linear infinite spinner-grow;
}

.spinner-grow-sm {
  width: 1rem;
  height: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .spinner-border,
.spinner-grow {
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
  }
}
.offcanvas {
  position: fixed;
  bottom: 0;
  z-index: 1040;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  visibility: hidden;
  background-color: #fff;
  background-clip: padding-box;
  outline: 0;
  transition: transform 0.3s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .offcanvas {
    transition: none;
  }
}

.offcanvas-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
}
.offcanvas-header .btn-close {
  padding: 0.5rem 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
}

.offcanvas-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.offcanvas-body {
  flex-grow: 1;
  padding: 1rem 1rem;
  overflow-y: auto;
}

.offcanvas-start {
  top: 0;
  left: 0;
  width: 400px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
}

.offcanvas-end {
  top: 0;
  right: 0;
  width: 400px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
}

.offcanvas-bottom {
  right: 0;
  left: 0;
  height: 30vh;
  max-height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateY(100%);
}

.offcanvas.show {
  transform: none;
}

.offcanvas-backdrop::before {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1039;
  width: 100vw;
  height: 100vh;
  content: "";
  background-color: rgba(0, 0, 0, 0.5);
}

.clearfix::after {
  display: block;
  clear: both;
  content: "";
}

.link-primary {
  color: #0d6efd;
}
.link-primary:hover, .link-primary:focus {
  color: #0a58ca;
}

.link-secondary {
  color: #6c757d;
}
.link-secondary:hover, .link-secondary:focus {
  color: #565e64;
}

.link-success {
  color: #198754;
}
.link-success:hover, .link-success:focus {
  color: #146c43;
}

.link-info {
  color: #0dcaf0;
}
.link-info:hover, .link-info:focus {
  color: #3dd5f3;
}

.link-warning {
  color: #ffc107;
}
.link-warning:hover, .link-warning:focus {
  color: #ffcd39;
}

.link-danger {
  color: #dc3545;
}
.link-danger:hover, .link-danger:focus {
  color: #b02a37;
}

.link-light {
  color: #f8f9fa;
}
.link-light:hover, .link-light:focus {
  color: #f9fafb;
}

.link-dark {
  color: #212529;
}
.link-dark:hover, .link-dark:focus {
  color: #1a1e21;
}

.ratio {
  position: relative;
  width: 100%;
}
.ratio::before {
  display: block;
  padding-top: var(--bs-aspect-ratio);
  content: "";
}
.ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ratio-1x1 {
  --bs-aspect-ratio: 100%;
}

.ratio-4x3 {
  --bs-aspect-ratio: calc(3 / 4 * 100%);
}

.ratio-16x9 {
  --bs-aspect-ratio: calc(9 / 16 * 100%);
}

.ratio-21x9 {
  --bs-aspect-ratio: calc(9 / 21 * 100%);
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}

.sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1020;
}

@media (min-width: 576px) {
  .sticky-sm-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 768px) {
  .sticky-md-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 992px) {
  .sticky-lg-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 1200px) {
  .sticky-xl-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 1400px) {
  .sticky-xxl-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
.visually-hidden,
.visually-hidden-focusable:not(:focus):not(:focus-within) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.align-baseline {
  vertical-align: baseline !important;
}

.align-top {
  vertical-align: top !important;
}

.align-middle {
  vertical-align: middle !important;
}

.align-bottom {
  vertical-align: bottom !important;
}

.align-text-bottom {
  vertical-align: text-bottom !important;
}

.align-text-top {
  vertical-align: text-top !important;
}

.float-start {
  float: left !important;
}

.float-end {
  float: right !important;
}

.float-none {
  float: none !important;
}

.overflow-auto {
  overflow: auto !important;
}

.overflow-hidden {
  overflow: hidden !important;
}

.overflow-visible {
  overflow: visible !important;
}

.overflow-scroll {
  overflow: scroll !important;
}

.d-inline {
  display: inline !important;
}

.d-inline-block {
  display: inline-block !important;
}

.d-block {
  display: block !important;
}

.d-grid {
  display: grid !important;
}

.d-table {
  display: table !important;
}

.d-table-row {
  display: table-row !important;
}

.d-table-cell {
  display: table-cell !important;
}

.d-flex {
  display: flex !important;
}

.d-inline-flex {
  display: inline-flex !important;
}

.d-none {
  display: none !important;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.shadow-none {
  box-shadow: none !important;
}

.position-static {
  position: static !important;
}

.position-relative {
  position: relative !important;
}

.position-absolute {
  position: absolute !important;
}

.position-fixed {
  position: fixed !important;
}

.position-sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
}

.top-0 {
  top: 0 !important;
}

.top-50 {
  top: 50% !important;
}

.top-100 {
  top: 100% !important;
}

.bottom-0 {
  bottom: 0 !important;
}

.bottom-50 {
  bottom: 50% !important;
}

.bottom-100 {
  bottom: 100% !important;
}

.start-0 {
  left: 0 !important;
}

.start-50 {
  left: 50% !important;
}

.start-100 {
  left: 100% !important;
}

.end-0 {
  right: 0 !important;
}

.end-50 {
  right: 50% !important;
}

.end-100 {
  right: 100% !important;
}

.translate-middle {
  transform: translate(-50%, -50%) !important;
}

.translate-middle-x {
  transform: translateX(-50%) !important;
}

.translate-middle-y {
  transform: translateY(-50%) !important;
}

.border {
  border: 1px solid #dee2e6 !important;
}

.border-0 {
  border: 0 !important;
}

.border-top {
  border-top: 1px solid #dee2e6 !important;
}

.border-top-0 {
  border-top: 0 !important;
}

.border-end {
  border-right: 1px solid #dee2e6 !important;
}

.border-end-0 {
  border-right: 0 !important;
}

.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}

.border-bottom-0 {
  border-bottom: 0 !important;
}

.border-start {
  border-left: 1px solid #dee2e6 !important;
}

.border-start-0 {
  border-left: 0 !important;
}

.border-primary {
  border-color: #0d6efd !important;
}

.border-secondary {
  border-color: #6c757d !important;
}

.border-success {
  border-color: #198754 !important;
}

.border-info {
  border-color: #0dcaf0 !important;
}

.border-warning {
  border-color: #ffc107 !important;
}

.border-danger {
  border-color: #dc3545 !important;
}

.border-light {
  border-color: #f8f9fa !important;
}

.border-dark {
  border-color: #212529 !important;
}

.border-white {
  border-color: #fff !important;
}

.border-1 {
  border-width: 1px !important;
}

.border-2 {
  border-width: 2px !important;
}

.border-3 {
  border-width: 3px !important;
}

.border-4 {
  border-width: 4px !important;
}

.border-5 {
  border-width: 5px !important;
}

.w-25 {
  width: 25% !important;
}

.w-50 {
  width: 50% !important;
}

.w-75 {
  width: 75% !important;
}

.w-100 {
  width: 100% !important;
}

.w-auto {
  width: auto !important;
}

.mw-100 {
  max-width: 100% !important;
}

.vw-100 {
  width: 100vw !important;
}

.min-vw-100 {
  min-width: 100vw !important;
}

.h-25 {
  height: 25% !important;
}

.h-50 {
  height: 50% !important;
}

.h-75 {
  height: 75% !important;
}

.h-100 {
  height: 100% !important;
}

.h-auto {
  height: auto !important;
}

.mh-100 {
  max-height: 100% !important;
}

.vh-100 {
  height: 100vh !important;
}

.min-vh-100 {
  min-height: 100vh !important;
}

.flex-fill {
  flex: 1 1 auto !important;
}

.flex-row {
  flex-direction: row !important;
}

.flex-column {
  flex-direction: column !important;
}

.flex-row-reverse {
  flex-direction: row-reverse !important;
}

.flex-column-reverse {
  flex-direction: column-reverse !important;
}

.flex-grow-0 {
  flex-grow: 0 !important;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.flex-shrink-0 {
  flex-shrink: 0 !important;
}

.flex-shrink-1 {
  flex-shrink: 1 !important;
}

.flex-wrap {
  flex-wrap: wrap !important;
}

.flex-nowrap {
  flex-wrap: nowrap !important;
}

.flex-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}

.gap-0 {
  gap: 0 !important;
}

.gap-1 {
  gap: 0.25rem !important;
}

.gap-2 {
  gap: 0.5rem !important;
}

.gap-3 {
  gap: 1rem !important;
}

.gap-4 {
  gap: 1.5rem !important;
}

.gap-5 {
  gap: 3rem !important;
}

.justify-content-start {
  justify-content: flex-start !important;
}

.justify-content-end {
  justify-content: flex-end !important;
}

.justify-content-center {
  justify-content: center !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.justify-content-around {
  justify-content: space-around !important;
}

.justify-content-evenly {
  justify-content: space-evenly !important;
}

.align-items-start {
  align-items: flex-start !important;
}

.align-items-end {
  align-items: flex-end !important;
}

.align-items-center {
  align-items: center !important;
}

.align-items-baseline {
  align-items: baseline !important;
}

.align-items-stretch {
  align-items: stretch !important;
}

.align-content-start {
  align-content: flex-start !important;
}

.align-content-end {
  align-content: flex-end !important;
}

.align-content-center {
  align-content: center !important;
}

.align-content-between {
  align-content: space-between !important;
}

.align-content-around {
  align-content: space-around !important;
}

.align-content-stretch {
  align-content: stretch !important;
}

.align-self-auto {
  align-self: auto !important;
}

.align-self-start {
  align-self: flex-start !important;
}

.align-self-end {
  align-self: flex-end !important;
}

.align-self-center {
  align-self: center !important;
}

.align-self-baseline {
  align-self: baseline !important;
}

.align-self-stretch {
  align-self: stretch !important;
}

.order-first {
  order: -1 !important;
}

.order-0 {
  order: 0 !important;
}

.order-1 {
  order: 1 !important;
}

.order-2 {
  order: 2 !important;
}

.order-3 {
  order: 3 !important;
}

.order-4 {
  order: 4 !important;
}

.order-5 {
  order: 5 !important;
}

.order-last {
  order: 6 !important;
}

.m-0 {
  margin: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.m-3 {
  margin: 1rem !important;
}

.m-4 {
  margin: 1.5rem !important;
}

.m-5 {
  margin: 3rem !important;
}

.m-auto {
  margin: auto !important;
}

.mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}

.mx-2 {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}

.mx-3 {
  margin-right: 1rem !important;
  margin-left: 1rem !important;
}

.mx-4 {
  margin-right: 1.5rem !important;
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-right: 3rem !important;
  margin-left: 3rem !important;
}

.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.my-3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.my-5 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mt-5 {
  margin-top: 3rem !important;
}

.mt-auto {
  margin-top: auto !important;
}

.me-0 {
  margin-right: 0 !important;
}

.me-1 {
  margin-right: 0.25rem !important;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.me-3 {
  margin-right: 1rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}

.me-5 {
  margin-right: 3rem !important;
}

.me-auto {
  margin-right: auto !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

.mb-auto {
  margin-bottom: auto !important;
}

.ms-0 {
  margin-left: 0 !important;
}

.ms-1 {
  margin-left: 0.25rem !important;
}

.ms-2 {
  margin-left: 0.5rem !important;
}

.ms-3 {
  margin-left: 1rem !important;
}

.ms-4 {
  margin-left: 1.5rem !important;
}

.ms-5 {
  margin-left: 3rem !important;
}

.ms-auto {
  margin-left: auto !important;
}

.p-0 {
  padding: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.p-5 {
  padding: 3rem !important;
}

.px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.px-1 {
  padding-right: 0.25rem !important;
  padding-left: 0.25rem !important;
}

.px-2 {
  padding-right: 0.5rem !important;
  padding-left: 0.5rem !important;
}

.px-3 {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

.px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-right: 3rem !important;
  padding-left: 3rem !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pt-3 {
  padding-top: 1rem !important;
}

.pt-4 {
  padding-top: 1.5rem !important;
}

.pt-5 {
  padding-top: 3rem !important;
}

.pe-0 {
  padding-right: 0 !important;
}

.pe-1 {
  padding-right: 0.25rem !important;
}

.pe-2 {
  padding-right: 0.5rem !important;
}

.pe-3 {
  padding-right: 1rem !important;
}

.pe-4 {
  padding-right: 1.5rem !important;
}

.pe-5 {
  padding-right: 3rem !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pb-3 {
  padding-bottom: 1rem !important;
}

.pb-4 {
  padding-bottom: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 3rem !important;
}

.ps-0 {
  padding-left: 0 !important;
}

.ps-1 {
  padding-left: 0.25rem !important;
}

.ps-2 {
  padding-left: 0.5rem !important;
}

.ps-3 {
  padding-left: 1rem !important;
}

.ps-4 {
  padding-left: 1.5rem !important;
}

.ps-5 {
  padding-left: 3rem !important;
}

.font-monospace {
  font-family: var(--bs-font-monospace) !important;
}

.fs-1 {
  font-size: calc(1.375rem + 1.5vw) !important;
}

.fs-2 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.fs-3 {
  font-size: calc(1.3rem + 0.6vw) !important;
}

.fs-4 {
  font-size: calc(1.275rem + 0.3vw) !important;
}

.fs-5 {
  font-size: 1.25rem !important;
}

.fs-6 {
  font-size: 1rem !important;
}

.fst-italic {
  font-style: italic !important;
}

.fst-normal {
  font-style: normal !important;
}

.fw-light {
  font-weight: 300 !important;
}

.fw-lighter {
  font-weight: lighter !important;
}

.fw-normal {
  font-weight: 400 !important;
}

.fw-bold {
  font-weight: 700 !important;
}

.fw-bolder {
  font-weight: bolder !important;
}

.lh-1 {
  line-height: 1 !important;
}

.lh-sm {
  line-height: 1.25 !important;
}

.lh-base {
  line-height: 1.5 !important;
}

.lh-lg {
  line-height: 2 !important;
}

.text-start {
  text-align: left !important;
}

.text-end {
  text-align: right !important;
}

.text-center {
  text-align: center !important;
}

.text-decoration-none {
  text-decoration: none !important;
}

.text-decoration-underline {
  text-decoration: underline !important;
}

.text-decoration-line-through {
  text-decoration: line-through !important;
}

.text-lowercase {
  text-transform: lowercase !important;
}

.text-uppercase {
  text-transform: uppercase !important;
}

.text-capitalize {
  text-transform: capitalize !important;
}

.text-wrap {
  white-space: normal !important;
}

.text-nowrap {
  white-space: nowrap !important;
}

/* rtl:begin:remove */
.text-break {
  word-wrap: break-word !important;
  word-break: break-word !important;
}

/* rtl:end:remove */
.text-primary {
  color: #0d6efd !important;
}

.text-secondary {
  color: #6c757d !important;
}

.text-success {
  color: #198754 !important;
}

.text-info {
  color: #0dcaf0 !important;
}

.text-warning {
  color: #ffc107 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-light {
  color: #f8f9fa !important;
}

.text-dark {
  color: #212529 !important;
}

.text-white {
  color: #fff !important;
}

.text-body {
  color: #212529 !important;
}

.text-muted {
  color: #6c757d !important;
}

.text-black-50 {
  color: rgba(0, 0, 0, 0.5) !important;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.5) !important;
}

.text-reset {
  color: inherit !important;
}

.bg-primary {
  background-color: #0d6efd !important;
}

.bg-secondary {
  background-color: #6c757d !important;
}

.bg-success {
  background-color: #198754 !important;
}

.bg-info {
  background-color: #0dcaf0 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.bg-dark {
  background-color: #212529 !important;
}

.bg-body {
  background-color: #fff !important;
}

.bg-white {
  background-color: #fff !important;
}

.bg-transparent {
  background-color: transparent !important;
}

.bg-gradient {
  background-image: var(--bs-gradient) !important;
}

.user-select-all {
  -webkit-user-select: all !important;
  -moz-user-select: all !important;
  user-select: all !important;
}

.user-select-auto {
  -webkit-user-select: auto !important;
  -moz-user-select: auto !important;
  user-select: auto !important;
}

.user-select-none {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  user-select: none !important;
}

.pe-none {
  pointer-events: none !important;
}

.pe-auto {
  pointer-events: auto !important;
}

.rounded {
  border-radius: 0.25rem !important;
}

.rounded-0 {
  border-radius: 0 !important;
}

.rounded-1 {
  border-radius: 0.2rem !important;
}

.rounded-2 {
  border-radius: 0.25rem !important;
}

.rounded-3 {
  border-radius: 0.3rem !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.rounded-pill {
  border-radius: 50rem !important;
}

.rounded-top {
  border-top-left-radius: 0.25rem !important;
  border-top-right-radius: 0.25rem !important;
}

.rounded-end {
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
}

.rounded-bottom {
  border-bottom-right-radius: 0.25rem !important;
  border-bottom-left-radius: 0.25rem !important;
}

.rounded-start {
  border-bottom-left-radius: 0.25rem !important;
  border-top-left-radius: 0.25rem !important;
}

.visible {
  visibility: visible !important;
}

.invisible {
  visibility: hidden !important;
}

@media (min-width: 576px) {
  .float-sm-start {
    float: left !important;
  }

  .float-sm-end {
    float: right !important;
  }

  .float-sm-none {
    float: none !important;
  }

  .d-sm-inline {
    display: inline !important;
  }

  .d-sm-inline-block {
    display: inline-block !important;
  }

  .d-sm-block {
    display: block !important;
  }

  .d-sm-grid {
    display: grid !important;
  }

  .d-sm-table {
    display: table !important;
  }

  .d-sm-table-row {
    display: table-row !important;
  }

  .d-sm-table-cell {
    display: table-cell !important;
  }

  .d-sm-flex {
    display: flex !important;
  }

  .d-sm-inline-flex {
    display: inline-flex !important;
  }

  .d-sm-none {
    display: none !important;
  }

  .flex-sm-fill {
    flex: 1 1 auto !important;
  }

  .flex-sm-row {
    flex-direction: row !important;
  }

  .flex-sm-column {
    flex-direction: column !important;
  }

  .flex-sm-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-sm-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-sm-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-sm-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-sm-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-sm-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-sm-wrap {
    flex-wrap: wrap !important;
  }

  .flex-sm-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-sm-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .gap-sm-0 {
    gap: 0 !important;
  }

  .gap-sm-1 {
    gap: 0.25rem !important;
  }

  .gap-sm-2 {
    gap: 0.5rem !important;
  }

  .gap-sm-3 {
    gap: 1rem !important;
  }

  .gap-sm-4 {
    gap: 1.5rem !important;
  }

  .gap-sm-5 {
    gap: 3rem !important;
  }

  .justify-content-sm-start {
    justify-content: flex-start !important;
  }

  .justify-content-sm-end {
    justify-content: flex-end !important;
  }

  .justify-content-sm-center {
    justify-content: center !important;
  }

  .justify-content-sm-between {
    justify-content: space-between !important;
  }

  .justify-content-sm-around {
    justify-content: space-around !important;
  }

  .justify-content-sm-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-sm-start {
    align-items: flex-start !important;
  }

  .align-items-sm-end {
    align-items: flex-end !important;
  }

  .align-items-sm-center {
    align-items: center !important;
  }

  .align-items-sm-baseline {
    align-items: baseline !important;
  }

  .align-items-sm-stretch {
    align-items: stretch !important;
  }

  .align-content-sm-start {
    align-content: flex-start !important;
  }

  .align-content-sm-end {
    align-content: flex-end !important;
  }

  .align-content-sm-center {
    align-content: center !important;
  }

  .align-content-sm-between {
    align-content: space-between !important;
  }

  .align-content-sm-around {
    align-content: space-around !important;
  }

  .align-content-sm-stretch {
    align-content: stretch !important;
  }

  .align-self-sm-auto {
    align-self: auto !important;
  }

  .align-self-sm-start {
    align-self: flex-start !important;
  }

  .align-self-sm-end {
    align-self: flex-end !important;
  }

  .align-self-sm-center {
    align-self: center !important;
  }

  .align-self-sm-baseline {
    align-self: baseline !important;
  }

  .align-self-sm-stretch {
    align-self: stretch !important;
  }

  .order-sm-first {
    order: -1 !important;
  }

  .order-sm-0 {
    order: 0 !important;
  }

  .order-sm-1 {
    order: 1 !important;
  }

  .order-sm-2 {
    order: 2 !important;
  }

  .order-sm-3 {
    order: 3 !important;
  }

  .order-sm-4 {
    order: 4 !important;
  }

  .order-sm-5 {
    order: 5 !important;
  }

  .order-sm-last {
    order: 6 !important;
  }

  .m-sm-0 {
    margin: 0 !important;
  }

  .m-sm-1 {
    margin: 0.25rem !important;
  }

  .m-sm-2 {
    margin: 0.5rem !important;
  }

  .m-sm-3 {
    margin: 1rem !important;
  }

  .m-sm-4 {
    margin: 1.5rem !important;
  }

  .m-sm-5 {
    margin: 3rem !important;
  }

  .m-sm-auto {
    margin: auto !important;
  }

  .mx-sm-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .mx-sm-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .mx-sm-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .mx-sm-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .mx-sm-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .mx-sm-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .mx-sm-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-sm-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .my-sm-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .my-sm-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .my-sm-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .my-sm-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .my-sm-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .my-sm-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-sm-0 {
    margin-top: 0 !important;
  }

  .mt-sm-1 {
    margin-top: 0.25rem !important;
  }

  .mt-sm-2 {
    margin-top: 0.5rem !important;
  }

  .mt-sm-3 {
    margin-top: 1rem !important;
  }

  .mt-sm-4 {
    margin-top: 1.5rem !important;
  }

  .mt-sm-5 {
    margin-top: 3rem !important;
  }

  .mt-sm-auto {
    margin-top: auto !important;
  }

  .me-sm-0 {
    margin-right: 0 !important;
  }

  .me-sm-1 {
    margin-right: 0.25rem !important;
  }

  .me-sm-2 {
    margin-right: 0.5rem !important;
  }

  .me-sm-3 {
    margin-right: 1rem !important;
  }

  .me-sm-4 {
    margin-right: 1.5rem !important;
  }

  .me-sm-5 {
    margin-right: 3rem !important;
  }

  .me-sm-auto {
    margin-right: auto !important;
  }

  .mb-sm-0 {
    margin-bottom: 0 !important;
  }

  .mb-sm-1 {
    margin-bottom: 0.25rem !important;
  }

  .mb-sm-2 {
    margin-bottom: 0.5rem !important;
  }

  .mb-sm-3 {
    margin-bottom: 1rem !important;
  }

  .mb-sm-4 {
    margin-bottom: 1.5rem !important;
  }

  .mb-sm-5 {
    margin-bottom: 3rem !important;
  }

  .mb-sm-auto {
    margin-bottom: auto !important;
  }

  .ms-sm-0 {
    margin-left: 0 !important;
  }

  .ms-sm-1 {
    margin-left: 0.25rem !important;
  }

  .ms-sm-2 {
    margin-left: 0.5rem !important;
  }

  .ms-sm-3 {
    margin-left: 1rem !important;
  }

  .ms-sm-4 {
    margin-left: 1.5rem !important;
  }

  .ms-sm-5 {
    margin-left: 3rem !important;
  }

  .ms-sm-auto {
    margin-left: auto !important;
  }

  .p-sm-0 {
    padding: 0 !important;
  }

  .p-sm-1 {
    padding: 0.25rem !important;
  }

  .p-sm-2 {
    padding: 0.5rem !important;
  }

  .p-sm-3 {
    padding: 1rem !important;
  }

  .p-sm-4 {
    padding: 1.5rem !important;
  }

  .p-sm-5 {
    padding: 3rem !important;
  }

  .px-sm-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .px-sm-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .px-sm-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .px-sm-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .px-sm-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .px-sm-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-sm-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-sm-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .py-sm-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .py-sm-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .py-sm-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .py-sm-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .pt-sm-0 {
    padding-top: 0 !important;
  }

  .pt-sm-1 {
    padding-top: 0.25rem !important;
  }

  .pt-sm-2 {
    padding-top: 0.5rem !important;
  }

  .pt-sm-3 {
    padding-top: 1rem !important;
  }

  .pt-sm-4 {
    padding-top: 1.5rem !important;
  }

  .pt-sm-5 {
    padding-top: 3rem !important;
  }

  .pe-sm-0 {
    padding-right: 0 !important;
  }

  .pe-sm-1 {
    padding-right: 0.25rem !important;
  }

  .pe-sm-2 {
    padding-right: 0.5rem !important;
  }

  .pe-sm-3 {
    padding-right: 1rem !important;
  }

  .pe-sm-4 {
    padding-right: 1.5rem !important;
  }

  .pe-sm-5 {
    padding-right: 3rem !important;
  }

  .pb-sm-0 {
    padding-bottom: 0 !important;
  }

  .pb-sm-1 {
    padding-bottom: 0.25rem !important;
  }

  .pb-sm-2 {
    padding-bottom: 0.5rem !important;
  }

  .pb-sm-3 {
    padding-bottom: 1rem !important;
  }

  .pb-sm-4 {
    padding-bottom: 1.5rem !important;
  }

  .pb-sm-5 {
    padding-bottom: 3rem !important;
  }

  .ps-sm-0 {
    padding-left: 0 !important;
  }

  .ps-sm-1 {
    padding-left: 0.25rem !important;
  }

  .ps-sm-2 {
    padding-left: 0.5rem !important;
  }

  .ps-sm-3 {
    padding-left: 1rem !important;
  }

  .ps-sm-4 {
    padding-left: 1.5rem !important;
  }

  .ps-sm-5 {
    padding-left: 3rem !important;
  }

  .text-sm-start {
    text-align: left !important;
  }

  .text-sm-end {
    text-align: right !important;
  }

  .text-sm-center {
    text-align: center !important;
  }
}
@media (min-width: 768px) {
  .float-md-start {
    float: left !important;
  }

  .float-md-end {
    float: right !important;
  }

  .float-md-none {
    float: none !important;
  }

  .d-md-inline {
    display: inline !important;
  }

  .d-md-inline-block {
    display: inline-block !important;
  }

  .d-md-block {
    display: block !important;
  }

  .d-md-grid {
    display: grid !important;
  }

  .d-md-table {
    display: table !important;
  }

  .d-md-table-row {
    display: table-row !important;
  }

  .d-md-table-cell {
    display: table-cell !important;
  }

  .d-md-flex {
    display: flex !important;
  }

  .d-md-inline-flex {
    display: inline-flex !important;
  }

  .d-md-none {
    display: none !important;
  }

  .flex-md-fill {
    flex: 1 1 auto !important;
  }

  .flex-md-row {
    flex-direction: row !important;
  }

  .flex-md-column {
    flex-direction: column !important;
  }

  .flex-md-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-md-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-md-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-md-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-md-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-md-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-md-wrap {
    flex-wrap: wrap !important;
  }

  .flex-md-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-md-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .gap-md-0 {
    gap: 0 !important;
  }

  .gap-md-1 {
    gap: 0.25rem !important;
  }

  .gap-md-2 {
    gap: 0.5rem !important;
  }

  .gap-md-3 {
    gap: 1rem !important;
  }

  .gap-md-4 {
    gap: 1.5rem !important;
  }

  .gap-md-5 {
    gap: 3rem !important;
  }

  .justify-content-md-start {
    justify-content: flex-start !important;
  }

  .justify-content-md-end {
    justify-content: flex-end !important;
  }

  .justify-content-md-center {
    justify-content: center !important;
  }

  .justify-content-md-between {
    justify-content: space-between !important;
  }

  .justify-content-md-around {
    justify-content: space-around !important;
  }

  .justify-content-md-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-md-start {
    align-items: flex-start !important;
  }

  .align-items-md-end {
    align-items: flex-end !important;
  }

  .align-items-md-center {
    align-items: center !important;
  }

  .align-items-md-baseline {
    align-items: baseline !important;
  }

  .align-items-md-stretch {
    align-items: stretch !important;
  }

  .align-content-md-start {
    align-content: flex-start !important;
  }

  .align-content-md-end {
    align-content: flex-end !important;
  }

  .align-content-md-center {
    align-content: center !important;
  }

  .align-content-md-between {
    align-content: space-between !important;
  }

  .align-content-md-around {
    align-content: space-around !important;
  }

  .align-content-md-stretch {
    align-content: stretch !important;
  }

  .align-self-md-auto {
    align-self: auto !important;
  }

  .align-self-md-start {
    align-self: flex-start !important;
  }

  .align-self-md-end {
    align-self: flex-end !important;
  }

  .align-self-md-center {
    align-self: center !important;
  }

  .align-self-md-baseline {
    align-self: baseline !important;
  }

  .align-self-md-stretch {
    align-self: stretch !important;
  }

  .order-md-first {
    order: -1 !important;
  }

  .order-md-0 {
    order: 0 !important;
  }

  .order-md-1 {
    order: 1 !important;
  }

  .order-md-2 {
    order: 2 !important;
  }

  .order-md-3 {
    order: 3 !important;
  }

  .order-md-4 {
    order: 4 !important;
  }

  .order-md-5 {
    order: 5 !important;
  }

  .order-md-last {
    order: 6 !important;
  }

  .m-md-0 {
    margin: 0 !important;
  }

  .m-md-1 {
    margin: 0.25rem !important;
  }

  .m-md-2 {
    margin: 0.5rem !important;
  }

  .m-md-3 {
    margin: 1rem !important;
  }

  .m-md-4 {
    margin: 1.5rem !important;
  }

  .m-md-5 {
    margin: 3rem !important;
  }

  .m-md-auto {
    margin: auto !important;
  }

  .mx-md-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .mx-md-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .mx-md-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .mx-md-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .mx-md-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .mx-md-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .mx-md-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-md-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .my-md-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .my-md-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .my-md-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .my-md-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .my-md-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .my-md-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-md-0 {
    margin-top: 0 !important;
  }

  .mt-md-1 {
    margin-top: 0.25rem !important;
  }

  .mt-md-2 {
    margin-top: 0.5rem !important;
  }

  .mt-md-3 {
    margin-top: 1rem !important;
  }

  .mt-md-4 {
    margin-top: 1.5rem !important;
  }

  .mt-md-5 {
    margin-top: 3rem !important;
  }

  .mt-md-auto {
    margin-top: auto !important;
  }

  .me-md-0 {
    margin-right: 0 !important;
  }

  .me-md-1 {
    margin-right: 0.25rem !important;
  }

  .me-md-2 {
    margin-right: 0.5rem !important;
  }

  .me-md-3 {
    margin-right: 1rem !important;
  }

  .me-md-4 {
    margin-right: 1.5rem !important;
  }

  .me-md-5 {
    margin-right: 3rem !important;
  }

  .me-md-auto {
    margin-right: auto !important;
  }

  .mb-md-0 {
    margin-bottom: 0 !important;
  }

  .mb-md-1 {
    margin-bottom: 0.25rem !important;
  }

  .mb-md-2 {
    margin-bottom: 0.5rem !important;
  }

  .mb-md-3 {
    margin-bottom: 1rem !important;
  }

  .mb-md-4 {
    margin-bottom: 1.5rem !important;
  }

  .mb-md-5 {
    margin-bottom: 3rem !important;
  }

  .mb-md-auto {
    margin-bottom: auto !important;
  }

  .ms-md-0 {
    margin-left: 0 !important;
  }

  .ms-md-1 {
    margin-left: 0.25rem !important;
  }

  .ms-md-2 {
    margin-left: 0.5rem !important;
  }

  .ms-md-3 {
    margin-left: 1rem !important;
  }

  .ms-md-4 {
    margin-left: 1.5rem !important;
  }

  .ms-md-5 {
    margin-left: 3rem !important;
  }

  .ms-md-auto {
    margin-left: auto !important;
  }

  .p-md-0 {
    padding: 0 !important;
  }

  .p-md-1 {
    padding: 0.25rem !important;
  }

  .p-md-2 {
    padding: 0.5rem !important;
  }

  .p-md-3 {
    padding: 1rem !important;
  }

  .p-md-4 {
    padding: 1.5rem !important;
  }

  .p-md-5 {
    padding: 3rem !important;
  }

  .px-md-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .px-md-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .px-md-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .px-md-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .px-md-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .px-md-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-md-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-md-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .py-md-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .py-md-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .py-md-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .py-md-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .pt-md-0 {
    padding-top: 0 !important;
  }

  .pt-md-1 {
    padding-top: 0.25rem !important;
  }

  .pt-md-2 {
    padding-top: 0.5rem !important;
  }

  .pt-md-3 {
    padding-top: 1rem !important;
  }

  .pt-md-4 {
    padding-top: 1.5rem !important;
  }

  .pt-md-5 {
    padding-top: 3rem !important;
  }

  .pe-md-0 {
    padding-right: 0 !important;
  }

  .pe-md-1 {
    padding-right: 0.25rem !important;
  }

  .pe-md-2 {
    padding-right: 0.5rem !important;
  }

  .pe-md-3 {
    padding-right: 1rem !important;
  }

  .pe-md-4 {
    padding-right: 1.5rem !important;
  }

  .pe-md-5 {
    padding-right: 3rem !important;
  }

  .pb-md-0 {
    padding-bottom: 0 !important;
  }

  .pb-md-1 {
    padding-bottom: 0.25rem !important;
  }

  .pb-md-2 {
    padding-bottom: 0.5rem !important;
  }

  .pb-md-3 {
    padding-bottom: 1rem !important;
  }

  .pb-md-4 {
    padding-bottom: 1.5rem !important;
  }

  .pb-md-5 {
    padding-bottom: 3rem !important;
  }

  .ps-md-0 {
    padding-left: 0 !important;
  }

  .ps-md-1 {
    padding-left: 0.25rem !important;
  }

  .ps-md-2 {
    padding-left: 0.5rem !important;
  }

  .ps-md-3 {
    padding-left: 1rem !important;
  }

  .ps-md-4 {
    padding-left: 1.5rem !important;
  }

  .ps-md-5 {
    padding-left: 3rem !important;
  }

  .text-md-start {
    text-align: left !important;
  }

  .text-md-end {
    text-align: right !important;
  }

  .text-md-center {
    text-align: center !important;
  }
}
@media (min-width: 992px) {
  .float-lg-start {
    float: left !important;
  }

  .float-lg-end {
    float: right !important;
  }

  .float-lg-none {
    float: none !important;
  }

  .d-lg-inline {
    display: inline !important;
  }

  .d-lg-inline-block {
    display: inline-block !important;
  }

  .d-lg-block {
    display: block !important;
  }

  .d-lg-grid {
    display: grid !important;
  }

  .d-lg-table {
    display: table !important;
  }

  .d-lg-table-row {
    display: table-row !important;
  }

  .d-lg-table-cell {
    display: table-cell !important;
  }

  .d-lg-flex {
    display: flex !important;
  }

  .d-lg-inline-flex {
    display: inline-flex !important;
  }

  .d-lg-none {
    display: none !important;
  }

  .flex-lg-fill {
    flex: 1 1 auto !important;
  }

  .flex-lg-row {
    flex-direction: row !important;
  }

  .flex-lg-column {
    flex-direction: column !important;
  }

  .flex-lg-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-lg-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-lg-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-lg-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-lg-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-lg-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-lg-wrap {
    flex-wrap: wrap !important;
  }

  .flex-lg-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-lg-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .gap-lg-0 {
    gap: 0 !important;
  }

  .gap-lg-1 {
    gap: 0.25rem !important;
  }

  .gap-lg-2 {
    gap: 0.5rem !important;
  }

  .gap-lg-3 {
    gap: 1rem !important;
  }

  .gap-lg-4 {
    gap: 1.5rem !important;
  }

  .gap-lg-5 {
    gap: 3rem !important;
  }

  .justify-content-lg-start {
    justify-content: flex-start !important;
  }

  .justify-content-lg-end {
    justify-content: flex-end !important;
  }

  .justify-content-lg-center {
    justify-content: center !important;
  }

  .justify-content-lg-between {
    justify-content: space-between !important;
  }

  .justify-content-lg-around {
    justify-content: space-around !important;
  }

  .justify-content-lg-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-lg-start {
    align-items: flex-start !important;
  }

  .align-items-lg-end {
    align-items: flex-end !important;
  }

  .align-items-lg-center {
    align-items: center !important;
  }

  .align-items-lg-baseline {
    align-items: baseline !important;
  }

  .align-items-lg-stretch {
    align-items: stretch !important;
  }

  .align-content-lg-start {
    align-content: flex-start !important;
  }

  .align-content-lg-end {
    align-content: flex-end !important;
  }

  .align-content-lg-center {
    align-content: center !important;
  }

  .align-content-lg-between {
    align-content: space-between !important;
  }

  .align-content-lg-around {
    align-content: space-around !important;
  }

  .align-content-lg-stretch {
    align-content: stretch !important;
  }

  .align-self-lg-auto {
    align-self: auto !important;
  }

  .align-self-lg-start {
    align-self: flex-start !important;
  }

  .align-self-lg-end {
    align-self: flex-end !important;
  }

  .align-self-lg-center {
    align-self: center !important;
  }

  .align-self-lg-baseline {
    align-self: baseline !important;
  }

  .align-self-lg-stretch {
    align-self: stretch !important;
  }

  .order-lg-first {
    order: -1 !important;
  }

  .order-lg-0 {
    order: 0 !important;
  }

  .order-lg-1 {
    order: 1 !important;
  }

  .order-lg-2 {
    order: 2 !important;
  }

  .order-lg-3 {
    order: 3 !important;
  }

  .order-lg-4 {
    order: 4 !important;
  }

  .order-lg-5 {
    order: 5 !important;
  }

  .order-lg-last {
    order: 6 !important;
  }

  .m-lg-0 {
    margin: 0 !important;
  }

  .m-lg-1 {
    margin: 0.25rem !important;
  }

  .m-lg-2 {
    margin: 0.5rem !important;
  }

  .m-lg-3 {
    margin: 1rem !important;
  }

  .m-lg-4 {
    margin: 1.5rem !important;
  }

  .m-lg-5 {
    margin: 3rem !important;
  }

  .m-lg-auto {
    margin: auto !important;
  }

  .mx-lg-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .mx-lg-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .mx-lg-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .mx-lg-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .mx-lg-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .mx-lg-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .mx-lg-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-lg-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .my-lg-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .my-lg-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .my-lg-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .my-lg-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .my-lg-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .my-lg-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-lg-0 {
    margin-top: 0 !important;
  }

  .mt-lg-1 {
    margin-top: 0.25rem !important;
  }

  .mt-lg-2 {
    margin-top: 0.5rem !important;
  }

  .mt-lg-3 {
    margin-top: 1rem !important;
  }

  .mt-lg-4 {
    margin-top: 1.5rem !important;
  }

  .mt-lg-5 {
    margin-top: 3rem !important;
  }

  .mt-lg-auto {
    margin-top: auto !important;
  }

  .me-lg-0 {
    margin-right: 0 !important;
  }

  .me-lg-1 {
    margin-right: 0.25rem !important;
  }

  .me-lg-2 {
    margin-right: 0.5rem !important;
  }

  .me-lg-3 {
    margin-right: 1rem !important;
  }

  .me-lg-4 {
    margin-right: 1.5rem !important;
  }

  .me-lg-5 {
    margin-right: 3rem !important;
  }

  .me-lg-auto {
    margin-right: auto !important;
  }

  .mb-lg-0 {
    margin-bottom: 0 !important;
  }

  .mb-lg-1 {
    margin-bottom: 0.25rem !important;
  }

  .mb-lg-2 {
    margin-bottom: 0.5rem !important;
  }

  .mb-lg-3 {
    margin-bottom: 1rem !important;
  }

  .mb-lg-4 {
    margin-bottom: 1.5rem !important;
  }

  .mb-lg-5 {
    margin-bottom: 3rem !important;
  }

  .mb-lg-auto {
    margin-bottom: auto !important;
  }

  .ms-lg-0 {
    margin-left: 0 !important;
  }

  .ms-lg-1 {
    margin-left: 0.25rem !important;
  }

  .ms-lg-2 {
    margin-left: 0.5rem !important;
  }

  .ms-lg-3 {
    margin-left: 1rem !important;
  }

  .ms-lg-4 {
    margin-left: 1.5rem !important;
  }

  .ms-lg-5 {
    margin-left: 3rem !important;
  }

  .ms-lg-auto {
    margin-left: auto !important;
  }

  .p-lg-0 {
    padding: 0 !important;
  }

  .p-lg-1 {
    padding: 0.25rem !important;
  }

  .p-lg-2 {
    padding: 0.5rem !important;
  }

  .p-lg-3 {
    padding: 1rem !important;
  }

  .p-lg-4 {
    padding: 1.5rem !important;
  }

  .p-lg-5 {
    padding: 3rem !important;
  }

  .px-lg-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .px-lg-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .px-lg-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .px-lg-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .px-lg-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .px-lg-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-lg-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-lg-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .py-lg-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .py-lg-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .py-lg-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .py-lg-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .pt-lg-0 {
    padding-top: 0 !important;
  }

  .pt-lg-1 {
    padding-top: 0.25rem !important;
  }

  .pt-lg-2 {
    padding-top: 0.5rem !important;
  }

  .pt-lg-3 {
    padding-top: 1rem !important;
  }

  .pt-lg-4 {
    padding-top: 1.5rem !important;
  }

  .pt-lg-5 {
    padding-top: 3rem !important;
  }

  .pe-lg-0 {
    padding-right: 0 !important;
  }

  .pe-lg-1 {
    padding-right: 0.25rem !important;
  }

  .pe-lg-2 {
    padding-right: 0.5rem !important;
  }

  .pe-lg-3 {
    padding-right: 1rem !important;
  }

  .pe-lg-4 {
    padding-right: 1.5rem !important;
  }

  .pe-lg-5 {
    padding-right: 3rem !important;
  }

  .pb-lg-0 {
    padding-bottom: 0 !important;
  }

  .pb-lg-1 {
    padding-bottom: 0.25rem !important;
  }

  .pb-lg-2 {
    padding-bottom: 0.5rem !important;
  }

  .pb-lg-3 {
    padding-bottom: 1rem !important;
  }

  .pb-lg-4 {
    padding-bottom: 1.5rem !important;
  }

  .pb-lg-5 {
    padding-bottom: 3rem !important;
  }

  .ps-lg-0 {
    padding-left: 0 !important;
  }

  .ps-lg-1 {
    padding-left: 0.25rem !important;
  }

  .ps-lg-2 {
    padding-left: 0.5rem !important;
  }

  .ps-lg-3 {
    padding-left: 1rem !important;
  }

  .ps-lg-4 {
    padding-left: 1.5rem !important;
  }

  .ps-lg-5 {
    padding-left: 3rem !important;
  }

  .text-lg-start {
    text-align: left !important;
  }

  .text-lg-end {
    text-align: right !important;
  }

  .text-lg-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .float-xl-start {
    float: left !important;
  }

  .float-xl-end {
    float: right !important;
  }

  .float-xl-none {
    float: none !important;
  }

  .d-xl-inline {
    display: inline !important;
  }

  .d-xl-inline-block {
    display: inline-block !important;
  }

  .d-xl-block {
    display: block !important;
  }

  .d-xl-grid {
    display: grid !important;
  }

  .d-xl-table {
    display: table !important;
  }

  .d-xl-table-row {
    display: table-row !important;
  }

  .d-xl-table-cell {
    display: table-cell !important;
  }

  .d-xl-flex {
    display: flex !important;
  }

  .d-xl-inline-flex {
    display: inline-flex !important;
  }

  .d-xl-none {
    display: none !important;
  }

  .flex-xl-fill {
    flex: 1 1 auto !important;
  }

  .flex-xl-row {
    flex-direction: row !important;
  }

  .flex-xl-column {
    flex-direction: column !important;
  }

  .flex-xl-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-xl-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-xl-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-xl-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-xl-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-xl-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-xl-wrap {
    flex-wrap: wrap !important;
  }

  .flex-xl-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-xl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .gap-xl-0 {
    gap: 0 !important;
  }

  .gap-xl-1 {
    gap: 0.25rem !important;
  }

  .gap-xl-2 {
    gap: 0.5rem !important;
  }

  .gap-xl-3 {
    gap: 1rem !important;
  }

  .gap-xl-4 {
    gap: 1.5rem !important;
  }

  .gap-xl-5 {
    gap: 3rem !important;
  }

  .justify-content-xl-start {
    justify-content: flex-start !important;
  }

  .justify-content-xl-end {
    justify-content: flex-end !important;
  }

  .justify-content-xl-center {
    justify-content: center !important;
  }

  .justify-content-xl-between {
    justify-content: space-between !important;
  }

  .justify-content-xl-around {
    justify-content: space-around !important;
  }

  .justify-content-xl-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-xl-start {
    align-items: flex-start !important;
  }

  .align-items-xl-end {
    align-items: flex-end !important;
  }

  .align-items-xl-center {
    align-items: center !important;
  }

  .align-items-xl-baseline {
    align-items: baseline !important;
  }

  .align-items-xl-stretch {
    align-items: stretch !important;
  }

  .align-content-xl-start {
    align-content: flex-start !important;
  }

  .align-content-xl-end {
    align-content: flex-end !important;
  }

  .align-content-xl-center {
    align-content: center !important;
  }

  .align-content-xl-between {
    align-content: space-between !important;
  }

  .align-content-xl-around {
    align-content: space-around !important;
  }

  .align-content-xl-stretch {
    align-content: stretch !important;
  }

  .align-self-xl-auto {
    align-self: auto !important;
  }

  .align-self-xl-start {
    align-self: flex-start !important;
  }

  .align-self-xl-end {
    align-self: flex-end !important;
  }

  .align-self-xl-center {
    align-self: center !important;
  }

  .align-self-xl-baseline {
    align-self: baseline !important;
  }

  .align-self-xl-stretch {
    align-self: stretch !important;
  }

  .order-xl-first {
    order: -1 !important;
  }

  .order-xl-0 {
    order: 0 !important;
  }

  .order-xl-1 {
    order: 1 !important;
  }

  .order-xl-2 {
    order: 2 !important;
  }

  .order-xl-3 {
    order: 3 !important;
  }

  .order-xl-4 {
    order: 4 !important;
  }

  .order-xl-5 {
    order: 5 !important;
  }

  .order-xl-last {
    order: 6 !important;
  }

  .m-xl-0 {
    margin: 0 !important;
  }

  .m-xl-1 {
    margin: 0.25rem !important;
  }

  .m-xl-2 {
    margin: 0.5rem !important;
  }

  .m-xl-3 {
    margin: 1rem !important;
  }

  .m-xl-4 {
    margin: 1.5rem !important;
  }

  .m-xl-5 {
    margin: 3rem !important;
  }

  .m-xl-auto {
    margin: auto !important;
  }

  .mx-xl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .mx-xl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .mx-xl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .mx-xl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .mx-xl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .mx-xl-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .mx-xl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-xl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .my-xl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .my-xl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .my-xl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .my-xl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .my-xl-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .my-xl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-xl-0 {
    margin-top: 0 !important;
  }

  .mt-xl-1 {
    margin-top: 0.25rem !important;
  }

  .mt-xl-2 {
    margin-top: 0.5rem !important;
  }

  .mt-xl-3 {
    margin-top: 1rem !important;
  }

  .mt-xl-4 {
    margin-top: 1.5rem !important;
  }

  .mt-xl-5 {
    margin-top: 3rem !important;
  }

  .mt-xl-auto {
    margin-top: auto !important;
  }

  .me-xl-0 {
    margin-right: 0 !important;
  }

  .me-xl-1 {
    margin-right: 0.25rem !important;
  }

  .me-xl-2 {
    margin-right: 0.5rem !important;
  }

  .me-xl-3 {
    margin-right: 1rem !important;
  }

  .me-xl-4 {
    margin-right: 1.5rem !important;
  }

  .me-xl-5 {
    margin-right: 3rem !important;
  }

  .me-xl-auto {
    margin-right: auto !important;
  }

  .mb-xl-0 {
    margin-bottom: 0 !important;
  }

  .mb-xl-1 {
    margin-bottom: 0.25rem !important;
  }

  .mb-xl-2 {
    margin-bottom: 0.5rem !important;
  }

  .mb-xl-3 {
    margin-bottom: 1rem !important;
  }

  .mb-xl-4 {
    margin-bottom: 1.5rem !important;
  }

  .mb-xl-5 {
    margin-bottom: 3rem !important;
  }

  .mb-xl-auto {
    margin-bottom: auto !important;
  }

  .ms-xl-0 {
    margin-left: 0 !important;
  }

  .ms-xl-1 {
    margin-left: 0.25rem !important;
  }

  .ms-xl-2 {
    margin-left: 0.5rem !important;
  }

  .ms-xl-3 {
    margin-left: 1rem !important;
  }

  .ms-xl-4 {
    margin-left: 1.5rem !important;
  }

  .ms-xl-5 {
    margin-left: 3rem !important;
  }

  .ms-xl-auto {
    margin-left: auto !important;
  }

  .p-xl-0 {
    padding: 0 !important;
  }

  .p-xl-1 {
    padding: 0.25rem !important;
  }

  .p-xl-2 {
    padding: 0.5rem !important;
  }

  .p-xl-3 {
    padding: 1rem !important;
  }

  .p-xl-4 {
    padding: 1.5rem !important;
  }

  .p-xl-5 {
    padding: 3rem !important;
  }

  .px-xl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .px-xl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .px-xl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .px-xl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .px-xl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .px-xl-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-xl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-xl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .py-xl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .py-xl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .py-xl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .py-xl-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .pt-xl-0 {
    padding-top: 0 !important;
  }

  .pt-xl-1 {
    padding-top: 0.25rem !important;
  }

  .pt-xl-2 {
    padding-top: 0.5rem !important;
  }

  .pt-xl-3 {
    padding-top: 1rem !important;
  }

  .pt-xl-4 {
    padding-top: 1.5rem !important;
  }

  .pt-xl-5 {
    padding-top: 3rem !important;
  }

  .pe-xl-0 {
    padding-right: 0 !important;
  }

  .pe-xl-1 {
    padding-right: 0.25rem !important;
  }

  .pe-xl-2 {
    padding-right: 0.5rem !important;
  }

  .pe-xl-3 {
    padding-right: 1rem !important;
  }

  .pe-xl-4 {
    padding-right: 1.5rem !important;
  }

  .pe-xl-5 {
    padding-right: 3rem !important;
  }

  .pb-xl-0 {
    padding-bottom: 0 !important;
  }

  .pb-xl-1 {
    padding-bottom: 0.25rem !important;
  }

  .pb-xl-2 {
    padding-bottom: 0.5rem !important;
  }

  .pb-xl-3 {
    padding-bottom: 1rem !important;
  }

  .pb-xl-4 {
    padding-bottom: 1.5rem !important;
  }

  .pb-xl-5 {
    padding-bottom: 3rem !important;
  }

  .ps-xl-0 {
    padding-left: 0 !important;
  }

  .ps-xl-1 {
    padding-left: 0.25rem !important;
  }

  .ps-xl-2 {
    padding-left: 0.5rem !important;
  }

  .ps-xl-3 {
    padding-left: 1rem !important;
  }

  .ps-xl-4 {
    padding-left: 1.5rem !important;
  }

  .ps-xl-5 {
    padding-left: 3rem !important;
  }

  .text-xl-start {
    text-align: left !important;
  }

  .text-xl-end {
    text-align: right !important;
  }

  .text-xl-center {
    text-align: center !important;
  }
}
@media (min-width: 1400px) {
  .float-xxl-start {
    float: left !important;
  }

  .float-xxl-end {
    float: right !important;
  }

  .float-xxl-none {
    float: none !important;
  }

  .d-xxl-inline {
    display: inline !important;
  }

  .d-xxl-inline-block {
    display: inline-block !important;
  }

  .d-xxl-block {
    display: block !important;
  }

  .d-xxl-grid {
    display: grid !important;
  }

  .d-xxl-table {
    display: table !important;
  }

  .d-xxl-table-row {
    display: table-row !important;
  }

  .d-xxl-table-cell {
    display: table-cell !important;
  }

  .d-xxl-flex {
    display: flex !important;
  }

  .d-xxl-inline-flex {
    display: inline-flex !important;
  }

  .d-xxl-none {
    display: none !important;
  }

  .flex-xxl-fill {
    flex: 1 1 auto !important;
  }

  .flex-xxl-row {
    flex-direction: row !important;
  }

  .flex-xxl-column {
    flex-direction: column !important;
  }

  .flex-xxl-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-xxl-column-reverse {
    flex-direction: column-reverse !important;
  }

  .flex-xxl-grow-0 {
    flex-grow: 0 !important;
  }

  .flex-xxl-grow-1 {
    flex-grow: 1 !important;
  }

  .flex-xxl-shrink-0 {
    flex-shrink: 0 !important;
  }

  .flex-xxl-shrink-1 {
    flex-shrink: 1 !important;
  }

  .flex-xxl-wrap {
    flex-wrap: wrap !important;
  }

  .flex-xxl-nowrap {
    flex-wrap: nowrap !important;
  }

  .flex-xxl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }

  .gap-xxl-0 {
    gap: 0 !important;
  }

  .gap-xxl-1 {
    gap: 0.25rem !important;
  }

  .gap-xxl-2 {
    gap: 0.5rem !important;
  }

  .gap-xxl-3 {
    gap: 1rem !important;
  }

  .gap-xxl-4 {
    gap: 1.5rem !important;
  }

  .gap-xxl-5 {
    gap: 3rem !important;
  }

  .justify-content-xxl-start {
    justify-content: flex-start !important;
  }

  .justify-content-xxl-end {
    justify-content: flex-end !important;
  }

  .justify-content-xxl-center {
    justify-content: center !important;
  }

  .justify-content-xxl-between {
    justify-content: space-between !important;
  }

  .justify-content-xxl-around {
    justify-content: space-around !important;
  }

  .justify-content-xxl-evenly {
    justify-content: space-evenly !important;
  }

  .align-items-xxl-start {
    align-items: flex-start !important;
  }

  .align-items-xxl-end {
    align-items: flex-end !important;
  }

  .align-items-xxl-center {
    align-items: center !important;
  }

  .align-items-xxl-baseline {
    align-items: baseline !important;
  }

  .align-items-xxl-stretch {
    align-items: stretch !important;
  }

  .align-content-xxl-start {
    align-content: flex-start !important;
  }

  .align-content-xxl-end {
    align-content: flex-end !important;
  }

  .align-content-xxl-center {
    align-content: center !important;
  }

  .align-content-xxl-between {
    align-content: space-between !important;
  }

  .align-content-xxl-around {
    align-content: space-around !important;
  }

  .align-content-xxl-stretch {
    align-content: stretch !important;
  }

  .align-self-xxl-auto {
    align-self: auto !important;
  }

  .align-self-xxl-start {
    align-self: flex-start !important;
  }

  .align-self-xxl-end {
    align-self: flex-end !important;
  }

  .align-self-xxl-center {
    align-self: center !important;
  }

  .align-self-xxl-baseline {
    align-self: baseline !important;
  }

  .align-self-xxl-stretch {
    align-self: stretch !important;
  }

  .order-xxl-first {
    order: -1 !important;
  }

  .order-xxl-0 {
    order: 0 !important;
  }

  .order-xxl-1 {
    order: 1 !important;
  }

  .order-xxl-2 {
    order: 2 !important;
  }

  .order-xxl-3 {
    order: 3 !important;
  }

  .order-xxl-4 {
    order: 4 !important;
  }

  .order-xxl-5 {
    order: 5 !important;
  }

  .order-xxl-last {
    order: 6 !important;
  }

  .m-xxl-0 {
    margin: 0 !important;
  }

  .m-xxl-1 {
    margin: 0.25rem !important;
  }

  .m-xxl-2 {
    margin: 0.5rem !important;
  }

  .m-xxl-3 {
    margin: 1rem !important;
  }

  .m-xxl-4 {
    margin: 1.5rem !important;
  }

  .m-xxl-5 {
    margin: 3rem !important;
  }

  .m-xxl-auto {
    margin: auto !important;
  }

  .mx-xxl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .mx-xxl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .mx-xxl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .mx-xxl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .mx-xxl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .mx-xxl-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .mx-xxl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .my-xxl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .my-xxl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .my-xxl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .my-xxl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .my-xxl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .my-xxl-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .my-xxl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }

  .mt-xxl-0 {
    margin-top: 0 !important;
  }

  .mt-xxl-1 {
    margin-top: 0.25rem !important;
  }

  .mt-xxl-2 {
    margin-top: 0.5rem !important;
  }

  .mt-xxl-3 {
    margin-top: 1rem !important;
  }

  .mt-xxl-4 {
    margin-top: 1.5rem !important;
  }

  .mt-xxl-5 {
    margin-top: 3rem !important;
  }

  .mt-xxl-auto {
    margin-top: auto !important;
  }

  .me-xxl-0 {
    margin-right: 0 !important;
  }

  .me-xxl-1 {
    margin-right: 0.25rem !important;
  }

  .me-xxl-2 {
    margin-right: 0.5rem !important;
  }

  .me-xxl-3 {
    margin-right: 1rem !important;
  }

  .me-xxl-4 {
    margin-right: 1.5rem !important;
  }

  .me-xxl-5 {
    margin-right: 3rem !important;
  }

  .me-xxl-auto {
    margin-right: auto !important;
  }

  .mb-xxl-0 {
    margin-bottom: 0 !important;
  }

  .mb-xxl-1 {
    margin-bottom: 0.25rem !important;
  }

  .mb-xxl-2 {
    margin-bottom: 0.5rem !important;
  }

  .mb-xxl-3 {
    margin-bottom: 1rem !important;
  }

  .mb-xxl-4 {
    margin-bottom: 1.5rem !important;
  }

  .mb-xxl-5 {
    margin-bottom: 3rem !important;
  }

  .mb-xxl-auto {
    margin-bottom: auto !important;
  }

  .ms-xxl-0 {
    margin-left: 0 !important;
  }

  .ms-xxl-1 {
    margin-left: 0.25rem !important;
  }

  .ms-xxl-2 {
    margin-left: 0.5rem !important;
  }

  .ms-xxl-3 {
    margin-left: 1rem !important;
  }

  .ms-xxl-4 {
    margin-left: 1.5rem !important;
  }

  .ms-xxl-5 {
    margin-left: 3rem !important;
  }

  .ms-xxl-auto {
    margin-left: auto !important;
  }

  .p-xxl-0 {
    padding: 0 !important;
  }

  .p-xxl-1 {
    padding: 0.25rem !important;
  }

  .p-xxl-2 {
    padding: 0.5rem !important;
  }

  .p-xxl-3 {
    padding: 1rem !important;
  }

  .p-xxl-4 {
    padding: 1.5rem !important;
  }

  .p-xxl-5 {
    padding: 3rem !important;
  }

  .px-xxl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .px-xxl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .px-xxl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .px-xxl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .px-xxl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .px-xxl-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-xxl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-xxl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .py-xxl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .py-xxl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .py-xxl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .py-xxl-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .pt-xxl-0 {
    padding-top: 0 !important;
  }

  .pt-xxl-1 {
    padding-top: 0.25rem !important;
  }

  .pt-xxl-2 {
    padding-top: 0.5rem !important;
  }

  .pt-xxl-3 {
    padding-top: 1rem !important;
  }

  .pt-xxl-4 {
    padding-top: 1.5rem !important;
  }

  .pt-xxl-5 {
    padding-top: 3rem !important;
  }

  .pe-xxl-0 {
    padding-right: 0 !important;
  }

  .pe-xxl-1 {
    padding-right: 0.25rem !important;
  }

  .pe-xxl-2 {
    padding-right: 0.5rem !important;
  }

  .pe-xxl-3 {
    padding-right: 1rem !important;
  }

  .pe-xxl-4 {
    padding-right: 1.5rem !important;
  }

  .pe-xxl-5 {
    padding-right: 3rem !important;
  }

  .pb-xxl-0 {
    padding-bottom: 0 !important;
  }

  .pb-xxl-1 {
    padding-bottom: 0.25rem !important;
  }

  .pb-xxl-2 {
    padding-bottom: 0.5rem !important;
  }

  .pb-xxl-3 {
    padding-bottom: 1rem !important;
  }

  .pb-xxl-4 {
    padding-bottom: 1.5rem !important;
  }

  .pb-xxl-5 {
    padding-bottom: 3rem !important;
  }

  .ps-xxl-0 {
    padding-left: 0 !important;
  }

  .ps-xxl-1 {
    padding-left: 0.25rem !important;
  }

  .ps-xxl-2 {
    padding-left: 0.5rem !important;
  }

  .ps-xxl-3 {
    padding-left: 1rem !important;
  }

  .ps-xxl-4 {
    padding-left: 1.5rem !important;
  }

  .ps-xxl-5 {
    padding-left: 3rem !important;
  }

  .text-xxl-start {
    text-align: left !important;
  }

  .text-xxl-end {
    text-align: right !important;
  }

  .text-xxl-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .fs-1 {
    font-size: 2.5rem !important;
  }

  .fs-2 {
    font-size: 2rem !important;
  }

  .fs-3 {
    font-size: 1.75rem !important;
  }

  .fs-4 {
    font-size: 1.5rem !important;
  }
}
@media print {
  .d-print-inline {
    display: inline !important;
  }

  .d-print-inline-block {
    display: inline-block !important;
  }

  .d-print-block {
    display: block !important;
  }

  .d-print-grid {
    display: grid !important;
  }

  .d-print-table {
    display: table !important;
  }

  .d-print-table-row {
    display: table-row !important;
  }

  .d-print-table-cell {
    display: table-cell !important;
  }

  .d-print-flex {
    display: flex !important;
  }

  .d-print-inline-flex {
    display: inline-flex !important;
  }

  .d-print-none {
    display: none !important;
  }
}

/*# sourceMappingURL=bootstrap.css.map */`;

  /**
  ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

  This component ...

  Example:

  ```html
  <input-element></input-element>
  ```

  ##styling-doc

  @customElement input-element
  */

  class InputElement extends LitElement {
    static get is() {
      return 'input-element';
    }

    static get styles() {
      return [styles, getComponentSharedStyles('input-element-shared-styles'), bootstrap];
    }

    static get properties() {
      return {
        value: {
          type: String
        },
        identifier: {
          type: String
        }
      };
    }

    constructor() {
      super();
      this.value = '';
    }

    update() {
      super.update();
      this.shadowRoot.querySelector("input").value = this.value;
    }

    _inputEvent(e) {
      let value = e.currentTarget.value;
      const inputEvent = new CustomEvent("input-event", {
        detail: {
          value,
          identifier: this.identifier
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(inputEvent);
    }

    render() {
      return html`<input
        type="text"
        value="${this.value}"
        class="form-control mb-3"
        @input="${this._inputEvent}"
    />`;
    }

  }

  customElements.define(InputElement.is, InputElement);

})));
//# sourceMappingURL=component.js.map
