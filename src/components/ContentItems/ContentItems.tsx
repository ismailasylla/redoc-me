import { observer } from 'mobx-react';
import * as React from 'react';
import { ApiInfo } from '../ApiInfo/';
import { AppStore } from '../../services';

import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { AdvancedMarkdown } from '../Markdown/AdvancedMarkdown';

import { H1, H2, MiddlePanel, Row, Section, ShareLink } from '../../common-elements';
import { ContentItemModel } from '../../services/MenuBuilder';
import { GroupModel, OperationModel } from '../../services/models';
import { Operation } from '../Operation/Operation';
import { NextButton } from '../ApiInfo/styled.elements';
import { BackButton } from '../ApiInfo/styled.elements';
// import {Link, BrowserRouter} from 'react-router-dom';

@observer
export class ContentItems extends React.Component<{ items: ContentItemModel[]; item: ContentItemModel; index: number; store: AppStore }, IYoState> {
  constructor(props) {
    super(props);

    let index = 0;
    if (this.props.index && this.props.index <= this.props.items.length) {
      index = this.props.index;
    }

    let tempItems: ContentItemModel[] = [];

    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].type === 'group') {
        for (let j = 0; j < this.props.items[i].items.length; j++) {
          tempItems.push(this.props.items[i].items[j]);
        }
      }
      else {
        tempItems.push(this.props.items[i]);
      }
    }

    this.state = {
      items: tempItems,
      index: index,
      isLastItem: false,
      isFirstItem: true,
      sectionsCount: this.getNextSectionsCount(index, tempItems),
    };
  }

  componentDidUpdate() {
    if (window.scrollY < 1) {
      window.scrollTo(0, 40);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(props) {
    let item = props.item;
    if (props.item.type === 'operation') {
      item = props.item.parent;
    }

    let index = this.getItemIndex(item);
    let isFirstItem = false;
    let isLastItem = false;

    if (index === 0) {
      isFirstItem = true;
    }
    if (index + 1 === this.state.items.length) {
      isLastItem = true;
    }
    this.setState({ index: index, isLastItem: isLastItem, isFirstItem: isFirstItem, sectionsCount: this.getNextSectionsCount(index, this.state.items) })
  }

  getItemIndex = (item) => {
    let index = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      if (item.id === this.state.items[i].id) {
        break;
      }
      index++;
    }
    return index;
  }

  getNextSectionsCount = (currentCount, items) => {
    let multipleSections = 0;
    if (items[currentCount].type === 'section') {
      multipleSections++;
      for (let i = currentCount; i < items.length; i++) {
        if (items[i + 1].type === 'section') {
          multipleSections++;
        }
        else {
          break;
        }
      }
    }
    return multipleSections;
  }

  getPrevSectionsCount = (currentCount) => {
    let multipleSections = 0;
    if (!this.state.isFirstItem) {
      for (let i = currentCount; i > 0; i--) {
        if (this.state.items[i - 1].type === 'section') {
          multipleSections++;
        }
        else {
          break;
        }
      }
    }
    return multipleSections;
  }

  prevPage = () => {
    let currentCount = 0;
    let isFirstItem = false;
    if (this.state.index > 0) {
      currentCount = this.state.index - 1;
    }
    let prevCount = this.getPrevSectionsCount(this.state.index);
    if (prevCount > 0) {
      currentCount = currentCount - prevCount + 1;
    }
    if (currentCount === 0) {
      isFirstItem = true;
    }
    this.setState({ index: currentCount, isLastItem: false, isFirstItem: isFirstItem, sectionsCount: this.getNextSectionsCount(currentCount, this.state.items) })
  }

  nextPage = () => {
    let currentCount = 0;
    let isLastItem = false;

    if (this.state.index < this.state.items.length) {
      currentCount = this.state.index + 1;
    }
    if (this.state.sectionsCount > 0) {
      currentCount = currentCount + this.state.sectionsCount - 1;
    }
    if (currentCount + 1 === this.state.items.length) {
      isLastItem = true;
    }

    this.setState({ index: currentCount, isLastItem: isLastItem, isFirstItem: false, sectionsCount: this.getNextSectionsCount(currentCount, this.state.items) })
  }

  createSections = () => {
    let sections: JSX.Element[] = [];
    for (let i = 0; i < this.state.sectionsCount; i++) {
      sections.push(<ContentItem item={this.state.items[this.state.index + i]} key={this.state.items[this.state.index + i].id} />);
    }
    return sections;
  }

  getNextPageName = () => {
    let nextCount = this.state.index + 1;
    if (this.state.sectionsCount > 0) {
      nextCount = nextCount + this.state.sectionsCount - 1;
    }
    return this.state.items[nextCount].name;;
  }

  getPrevPageName = () => {
    let prevCount = this.state.index - 1;
    let prevSectionsCount = this.getPrevSectionsCount(this.state.index);
    if (prevSectionsCount > 0) {
      prevCount = prevCount - prevSectionsCount + 1;
    }
    return this.state.items[prevCount].name;
  }

  render() {
    const items = this.state.items;
    if (items.length === 0) {
      return null;
    }

    const prevStyle = { position: 'fixed', overflow: 'hidden', top: 0, marginTop: 5, marginLeft: 40 } as React.CSSProperties;
    const nextStyle = { position: 'absolute', display: 'inline-block', marginLeft: '40px', bottom: '10px' } as React.CSSProperties;

    return (
      <div>
        {!this.state.isFirstItem ? <BackButton  onClick={this.prevPage}>←  Back to <b>{this.getPrevPageName()}</b></BackButton > : null}

        {this.state.isFirstItem ? <ApiInfo store={this.props.store}></ApiInfo> : null}

        {this.state.sectionsCount > 0 ? this.createSections() : <ContentItem item={items[this.state.index]} key={items[this.state.index].id} />}

        {!this.state.isLastItem ? <NextButton onClick={this.nextPage}>→ Next to <b>{this.getNextPageName()}</b></NextButton> : null}
      </div>
    );
  }
}

export interface ContentItemProps {
  item: ContentItemModel;
}
export interface IYoState {
  items: ContentItemModel[];
  index: number;
  isLastItem: boolean;
  isFirstItem: boolean;
  sectionsCount: number;
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
        {item.items && item.items.map(item => <ContentItem item={item} key={item.id} />)}
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
