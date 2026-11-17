import { Fragment } from 'react';

function emphasis(line) {
  return line.split('**').map((part, index) => index % 2
    ? <strong key={index}>{part}</strong>
    : <Fragment key={index}>{part}</Fragment>);
}

export default function PolicyCopy({ text }) {
  const blocks = [];
  for (const line of text.split('\n').map((line) => line.trim()).filter(Boolean)) {
    if (line.startsWith('- ')) {
      const previous = blocks.at(-1);
      if (previous?.type === 'list') previous.items.push(line.slice(2));
      else blocks.push({ type: 'list', items: [line.slice(2)] });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', text: line.slice(3) });
    } else {
      blocks.push({ type: 'paragraph', text: line });
    }
  }

  return blocks.map((block, index) => {
    if (block.type === 'list') return <ul className="list-unstyled mb-4" key={index}>{block.items.map((item, i) => <li className="mb-2" key={i}>{emphasis(item)}</li>)}</ul>;
    if (block.type === 'heading') return <h3 className="text-success mb-3" key={index}>{emphasis(block.text)}</h3>;
    return <p className="card-text mb-4" key={index}>{emphasis(block.text)}</p>;
  });
}
