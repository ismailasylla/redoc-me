import * as React from 'react';

import { AppStore, MarkdownRenderer, RedocNormalizedOptions } from '../../services';
import { BaseMarkdownProps } from './Markdown';
import { SanitizedMarkdownHTML, ExtendedSanitizedMarkdownHTML } from './SanitizedMdBlock';

import { OptionsConsumer } from '../OptionsProvider';
import { StoreConsumer } from '../StoreBuilder';

import { DarkRightPanelExtended, MiddlePanelExtended, Row } from '../../common-elements';
import styled from '../../styled-components';

const OperationRow = styled(Row)`
  backface-visibility: hidden;
  contain: content;

  overflow: hidden;
`;

export interface AdvancedMarkdownProps extends BaseMarkdownProps {
  extendedDescription: string;
  htmlWrap?: (part: JSX.Element) => JSX.Element;
}

export class AdvancedMarkdown extends React.Component<AdvancedMarkdownProps> {
  render() {
    const { extendedDescription } = this.props;
    var isExtendedDescription = false;

    if (extendedDescription.length > 0) {
      isExtendedDescription = true;
    }

    return (
      <OperationRow>
        <MiddlePanelExtended>

          <OptionsConsumer>
            {options => (
              <StoreConsumer>{store => this.renderWithOptionsAndStore(options, store)}</StoreConsumer>
            )}
          </OptionsConsumer>

        </MiddlePanelExtended>

        {isExtendedDescription ? <DarkRightPanelExtended><OptionsConsumer>
          {options => (
            <StoreConsumer>{store => this.renderExtendedWithOptionsAndStore(options, store)}</StoreConsumer>
          )}
        </OptionsConsumer></DarkRightPanelExtended> : null}

      </OperationRow>
    );
  }

  renderWithOptionsAndStore(options: RedocNormalizedOptions, store?: AppStore) {
    const { source, htmlWrap = i => i } = this.props;
    if (!store) {
      throw new Error('When using components in markdown, store prop must be provided');
    }

    const renderer = new MarkdownRenderer(options);
    const parts = renderer.renderMdWithComponents(source);

    if (!parts.length) {
      return null;
    }

    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        return React.cloneElement(
          htmlWrap(<SanitizedMarkdownHTML html={part} inline={false} compact={false} />),
          { key: idx },
        );
      }

      return <part.component key={idx} {...{ ...part.props, ...part.propsSelector(store) }} />;
    });
  }

  renderExtendedWithOptionsAndStore(options: RedocNormalizedOptions, store?: AppStore) {
    const { extendedDescription, htmlWrap = i => i } = this.props;
    if (!store) {
      throw new Error('When using components in markdown, store prop must be provided');
    }

    const renderer = new MarkdownRenderer(options);
    const extParts = renderer.renderMdWithComponents(extendedDescription);

    if (!extParts.length) {
      return null;
    }

    return extParts.map((part, idx) => {
      if (typeof part === 'string') {
        return React.cloneElement(
          htmlWrap(<ExtendedSanitizedMarkdownHTML html={part} inline={false} compact={false} />),
          { key: idx },
        );
      }

      return <part.component key={idx} {...{ ...part.props, ...part.propsSelector(store) }} />;
    });
  }
}

