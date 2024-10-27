export function appendChildren(parent: Node, children: (Node | null)[]) {
  for (let i = 0; i < children.length; i++) {
    if (children[i]) {
      parent.appendChild(children[i] as Node);
    }
  }
}
export function element(...params: Parameters<typeof document.createElement>) {
  return document.createElement(...params);
}

export function text(...params: Parameters<typeof document.createTextNode>) {
  return document.createTextNode(...params);
}

const htmlRenderer = element("body");
const HTMLReplacementComment = "__htmlelement";

export function stripHTML(text: string) {
  htmlRenderer.innerHTML = text;
  return htmlRenderer.innerText;
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): Node {
  const nodes = mhtml(strings, ...values);

  if (nodes.length === 1) {
    return nodes[0];
  }

  console.debug("debug for error\n", htmlRenderer.childNodes);
  throw new Error(
    "html literal used incorrectly, cannot find root or found multiple roots for"
  );
}

export function mhtml(strings: TemplateStringsArray, ...values: unknown[]): Node[] {
  let finalString = "";
  const elements: Node[] = [];
  for (let i = 0; i < strings.length; i++) {
    finalString += strings[i];
    if (i < values.length) {
      if (values[i] instanceof Node) {
        finalString += `<!--${HTMLReplacementComment}-->`;
        elements.push(<Node>values[i]);
      } else if (values[i] !== null && values[i] !== undefined) {
        finalString += values[i]?.toString();
      }
    }
  }

  htmlRenderer.innerHTML = finalString.trim();

  if (elements.length) {
    const iter = document.createNodeIterator(
      htmlRenderer,
      NodeFilter.SHOW_COMMENT,
      (node) =>
        node.nodeValue === HTMLReplacementComment
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP
    );
    let nextNode: Node | null;
    while ((nextNode = iter.nextNode())) {
      nextNode.parentNode?.replaceChild(elements.shift()!, nextNode);
    }
  }

  return [...htmlRenderer.childNodes];
}