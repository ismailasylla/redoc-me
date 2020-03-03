import * as React from 'react';

import { AppStore, MarkdownRenderer, RedocNormalizedOptions } from '../../services';
import { StyledMarkdownBlock } from '../Markdown/styled.elements';
import { BaseMarkdownProps } from './Markdown';
import { SanitizedMarkdownHTML } from './SanitizedMdBlock';

import { MiddlePanel, Row, Section } from '../../common-elements';

import { OptionsConsumer } from '../OptionsProvider';
import { StoreConsumer } from '../StoreBuilder';

export interface AdvancedMarkdownProps extends BaseMarkdownProps {
  htmlWrap?: (part: JSX.Element) => JSX.Element;
}

export class AdvancedMarkdown extends React.Component<AdvancedMarkdownProps> {


  render() {
    return (
      <>
        <OptionsConsumer>
          {options => (
            <StoreConsumer>{store => this.renderWithOptionsAndStore(options, store)}</StoreConsumer>
          )}
        </OptionsConsumer>
        <Section>
          <Row>
            <MiddlePanel>
            </MiddlePanel>
            <StyledMarkdownBlock >
              <div style={{ width: '450px', marginLeft: '10px' }}>
                <div className="method-example-part" >
                  <div className="method-example-table">
                    <section className="table" style={{ padding: '5px' }}>
                        <div className="method-example-table-topbar" style={{ backgroundColor: '#2a2f45', padding: '10px', borderTopLeftRadius: '8px',borderTopRightRadius: '8px'}}>
                          <div className="method-example-table-title" style={{ color: '#9199a8', padding: '15px' }}><span style={{
                            display: 'flex',alignItems: 'center',justifyContent: 'center'}}>Extended Description Table</span></div>
                        </div>
                      <table className="table-container" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', margin:'auto' }}>
                      {/* <h1 style={{ color: 'white', display: 'flex',alignItems: 'center',justifyContent: 'center' }}>ExtendedDescription Table</h1> */}
                        <tbody >
                          <tr id="errors-200-OK">
                            <th className="table-row-property">
                              <span>Extended Description</span>
                            </th>
                            <td className="table-row-definition">
                              <span>{this.props.extendedDescription}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>
            </StyledMarkdownBlock>
          </Row>
        </Section>

      </>
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
}
