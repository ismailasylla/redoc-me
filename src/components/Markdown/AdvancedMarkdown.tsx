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
                      <table className="table-container" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                      <h1 style={{ color: 'white', display: 'flex',alignItems: 'center',justifyContent: 'center' }}>ExtendedDescription Table</h1>
                        <div className="method-example-table-topbar" style={{ backgroundColor: '#2a2f45', padding: '10px', borderTopLeftRadius: '8px',borderTopRightRadius: '8px'}}>
                          <div className="method-example-table-title" style={{ color: '#9199a8', padding: '15px' }}><span style={{
                            display: 'flex',alignItems: 'center',justifyContent: 'center'}}>HTTP status code summary {this.props.extendedDescription}</span></div>
                        </div>
                        <tbody style={{ marginBottom: '10px' }} >
                          <tr id="errors-200-OK">
                            <th className="table-row-property">
                              <span>200 - OK</span>
                            </th>
                            <td className="table-row-definition">
                              <span>Everything worked as expected.</span>
                            </td>
                          </tr>
                          <tr id="errors-400-BadRequest">
                            <th className="table-row-property">
                              <span>400 - Bad Request</span>
                            </th>
                            <td className="table-row-definition">
                              <span>
                                The request was unacceptable, often due to missing a required parameter.
                      </span>
                            </td>
                          </tr>
                          <tr id="errors-401-Unauthorized">
                            <th className="table-row-property">
                              <span>401 - Unauthorized</span>
                            </th>
                            <td className="table-row-definition">
                              <span>No valid API key provided.</span>
                            </td>
                          </tr>
                          <tr id="errors-402-RequestFailed">
                            <th className="table-row-property">
                              <span>402 - Request Failed</span>
                            </th>
                            <td className="table-row-definition">
                              <span>The parameters were valid but the request failed.</span>
                            </td>
                          </tr>
                          <tr id="errors-409-Conflict">
                            <th className="table-row-property">
                              <span>409 - Conflict</span>
                            </th>
                            <td className="table-row-definition">
                              <span>
                                The request conflicts with another request (perhaps due to using the same
                                idempotent key).
                      </span>
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
