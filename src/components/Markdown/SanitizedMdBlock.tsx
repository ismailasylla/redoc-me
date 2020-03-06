import * as DOMPurify from 'dompurify';
import * as React from 'react';

import { OptionsConsumer } from '../OptionsProvider';
import { StylingMarkdownProps } from './Markdown';
import { StyledMarkdownBlock, ExtendedStyledMarkdownBlock } from './styled.elements';

const StyledMarkdownSpan = StyledMarkdownBlock.withComponent('span');

const sanitize = (untrustedSpec, html) => (untrustedSpec ? DOMPurify.sanitize(html) : html);

export function SanitizedMarkdownHTML(
  props: StylingMarkdownProps & { html: string; className?: string },
) {
  const Wrap = props.inline ? StyledMarkdownSpan : StyledMarkdownBlock;

  return (
    <OptionsConsumer>
      {options => (
        <Wrap
          className={'redoc-markdown ' + (props.className || '')}
          dangerouslySetInnerHTML={{
            __html: sanitize(options.untrustedSpec, props.html),
          }}
          {...props}
        />
      )}
    </OptionsConsumer>
  );
}

export function ExtendedSanitizedMarkdownHTML(
  props: StylingMarkdownProps & { html: string; className?: string },
) {
  const Wrap = props.inline ? StyledMarkdownSpan : ExtendedStyledMarkdownBlock;

  return (
    <OptionsConsumer>
      {options => (
        <Wrap
          className={'redoc-markdown ' + (props.className || '')}
          dangerouslySetInnerHTML={{
            __html: sanitize(options.untrustedSpec, props.html),
          }}
          {...props}
        />
      )}
    </OptionsConsumer>
  );
}
