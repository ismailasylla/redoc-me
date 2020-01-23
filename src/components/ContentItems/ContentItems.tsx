import { observer } from 'mobx-react';
import * as React from 'react';

import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { AdvancedMarkdown } from '../Markdown/AdvancedMarkdown';

import { H1, H2, MiddlePanel, Row, Section, ShareLink } from '../../common-elements';
import { ContentItemModel } from '../../services/MenuBuilder';
import { GroupModel, OperationModel } from '../../services/models';
import { Operation } from '../Operation/Operation';
import { NextButton } from '../ApiInfo/styled.elements';
import { BackButton } from '../ApiInfo/styled.elements';
@observer
export class ContentItems extends React.Component<{ items: ContentItemModel[]; count: number}, IYoState> {
  constructor(props) {
    super(props);

    let index = 0;

    if (this.props.count && this.props.count <= this.props.items.length) {
      index = this.props.count;
    }

    this.state = {
      count: index
    };
  }
  handlePreviousPage = () =>{
    let currentCount = 0;
    if (this.state.count < this.props.items.length) {
      currentCount = this.state.count - 1;
    }
    this.setState({ count: currentCount });
  }

  handleNextPage = () =>{
    let currentCount = 0;
    if (this.state.count < this.props.items.length) {
      currentCount = this.state.count + 1;
    }
    this.setState({ count: currentCount })
  }
  render() {
    const items = this.props.items;
    if (items.length === 0) {
      return null;
    }

    const nextStyle = {
        overflow: 'hidden',
        top: '4px',
        display: 'inline-block',
        marginLeft: '590px'
    };
      const backStyle = {
        overflow: 'hidden',
        top: '4px',
        position: 'fixed',
        marginBottom: '10px',
        textAlign: 'center',
			  display: 'inline-block'
    };
    return (
      <div>
        <ContentItem item={items[this.state.count]} key={items[this.state.count].id} />
        <BackButton style={backStyle}onClick={this.handlePreviousPage  }>← Go Back </BackButton>
        <NextButton style={nextStyle} onClick={this.handleNextPage }>Next Page →</NextButton>
      </div >
    );
  }
}

export interface ContentItemProps {
  item: ContentItemModel;
}
export interface IYoState {
  count: number;
}

@observer
export class ContentItem extends React.Component<ContentItemProps> {
  render() {
    const item = this.props.item;
    let content;
    const { type } = item;
    switch (type) {
      case 'group':
        content = null;
        break;
      case 'tag':
      case 'section':
        content = <SectionItem {...this.props} />;
        break;
      case 'operation':
        content = <OperationItem item={item as any} />;
        break;
      default:
        content = <SectionItem {...this.props} />;
    }

    return (
      <>
        {content && (
          <Section id={item.id} underlined={item.type === 'operation'}>
            {content}
          </Section>
        )}
        {item.items && <ContentItems items={item.items} count={0} />}
      </>
    );
  }
}

const middlePanelWrap = component => <MiddlePanel compact={true}>{component}</MiddlePanel>;

@observer
export class SectionItem extends React.Component<ContentItemProps> {
  render() {
    const { name, description, externalDocs, level } = this.props.item as GroupModel;

    const Header = level === 2 ? H2 : H1;

    return (
      <>
        <Row>
          <MiddlePanel compact={false}>
            <Header>
              <ShareLink to={this.props.item.id} />
              {name}
            </Header>
          </MiddlePanel>
        </Row>
        <AdvancedMarkdown source={description || ''} htmlWrap={middlePanelWrap} />
        {externalDocs && (
          <Row>
            <MiddlePanel>
              <ExternalDocumentation externalDocs={externalDocs} />
            </MiddlePanel>
          </Row>
        )}
      </>
    );
  }
}

@observer
export class OperationItem extends React.Component<{
  item: OperationModel;
}> {
  render() {
    return <Operation operation={this.props.item} />;
  }
}
