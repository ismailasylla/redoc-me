import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ThemeProvider } from '../../styled-components';
import { OptionsProvider } from '../OptionsProvider';
import styled from 'styled-components';

import { AppStore } from '../../services';
import { ApiLogo } from '../ApiLogo/ApiLogo';
import { ContentItems } from '../ContentItems/ContentItems';
import { SideMenu } from '../SideMenu/SideMenu';
import { StickyResponsiveSidebar } from '../StickySidebar/StickyResponsiveSidebar';
import { ApiContentWrap, BackgroundStub, RedocWrap } from './styled.elements';

import { SearchBox } from '../SearchBox/SearchBox';
import { StoreProvider } from '../StoreBuilder';

import { ContentItemModel } from '../../services/MenuBuilder';
import { resolve as urlResolve } from 'url';
import ComboBox from '../../../demo/ComboBox';

const demo = [
  { value: 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml', label: 'Instagram' },
  {
    value: 'https://api.apis.guru/v2/specs/googleapis.com/calendar/v3/swagger.yaml',
    label: 'Google Calendar',
  },
  { value: 'https://api.apis.guru/v2/specs/slack.com/1.2.0/swagger.yaml', label: 'Slack' },
  { value: 'https://api.apis.guru/v2/specs/zoom.us/2.0.0/swagger.yaml', label: 'Zoom.us' },
  {
    value: 'https://api.apis.guru/v2/specs/graphhopper.com/1.0/swagger.yaml',
    label: 'GraphHopper',
  },
];
const DEFAULT_SPEC = 'openapi.yaml';



export interface RedocProps {
  store: AppStore;

}

export class Redoc extends React.Component<RedocProps, RedocState> {

  constructor(props) {
    super(props);
    let parts = window.location.search.match(/url=([^&]+)/);
    let url = DEFAULT_SPEC;
    if (parts && parts.length > 1) {
      url = decodeURIComponent(parts[1]);
    }

    parts = window.location.search.match(/[?&]nocors(&|#|$)/);
    let cors = true;
    if (parts && parts.length > 1) {
      cors = false;
    }

    this.state = {
      item: this.props.store.menu.items[0] as any,
      specUrl: url,
      dropdownOpen: false,
      cors,
    };


  }

  handleChange = (url: string) => {
    this.setState({
      specUrl: url,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'url', url),
    );
  };

  toggleCors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cors = e.currentTarget.checked;
    this.setState({
      cors,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'nocors', cors ? undefined : ''),
    );
  };


  componentDidUpdate() {
    this.props.store.menu.activateAndScroll(this.state.item, true);
  }

  static propTypes = {
    store: PropTypes.instanceOf(AppStore).isRequired,
  };

  componentDidMount() {
    this.props.store.onDidMount();
  }

  componentWillUnmount() {
    this.props.store.dispose();
  }

  onMenuItemClick = menuItem => {
    this.setState({ item: menuItem });
  };



  render() {
    const {
      store: { spec, menu, options, search, marker },
    } = this.props;
    const store = this.props.store;

    ///
    const { specUrl, cors } = this.state;
    let proxiedUrl = specUrl;
    if (specUrl !== DEFAULT_SPEC) {
      proxiedUrl = cors
        ? '\\\\cors.apis.guru/' + urlResolve(window.location.href, specUrl)
        : specUrl;
    }

    return (
      <>
      <ThemeProvider theme={options.theme}>
        <StoreProvider value={this.props.store}>
          <OptionsProvider value={options}>
          <Heading>
                <a href=".">
                  <Logo src="https://github.com/Redocly/redoc/raw/master/docs/images/redoc-logo.png" />
                </a>
                <ControlsContainer>
                  <ComboBox
                    placeholder={'URL to a spec to try'}
                    options={demo}
                    onChange={this.handleChange}
                    value={specUrl === DEFAULT_SPEC ? '' : specUrl}
                  />
                  <CorsCheckbox title="Use CORS proxy">
                    <input id="cors_checkbox" type="checkbox" onChange={this.toggleCors} checked={cors} />
                    <label htmlFor="cors_checkbox">CORS</label>
                  </CorsCheckbox>
                </ControlsContainer>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=Redocly&amp;repo=redoc&amp;type=star&amp;count=true&amp;size=large"
                  frameBorder="0"
                  scrolling="0"
                  width="150px"
                  height="30px"
                />
              </Heading>
            <RedocWrap className="redoc-wrap">
              <StickyResponsiveSidebar menu={menu} className="menu-content">
                <a href=".">
                <img style={{ height: '100px', width: '250px', margin: '5px', cursor: 'pointer' }}
                src="https://raw.githubusercontent.com/Redocly/redoc/master/docs/images/redoc-logo.png"
                  />
                </a>
                <ApiLogo info={spec.info} />
                {(!options.disableSearch && (
                  <SearchBox
                    search={search!}
                    marker={marker}
                    getItemById={menu.getItemById}
                    onActivate={menu.activateAndScroll}
                  />
                )) ||
                  null}
                <SideMenu menu={menu} onItemClick={this.onMenuItemClick} />
              </StickyResponsiveSidebar>
              <ApiContentWrap className="api-content">
                <ContentItems
                  items={menu.items as any}
                  index={0}
                  item={this.state.item}
                  store={store}
                /> */}
              </ApiContentWrap>
              <BackgroundStub />
            </RedocWrap>
          </OptionsProvider>
        </StoreProvider>
      </ThemeProvider>
      </>
    );
  }
}

export interface RedocState {
  item: ContentItemModel;
  specUrl: string, dropdownOpen: boolean, cors: boolean
}


/* ====== Styled components ====== */

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 0 15px;
  align-items: center;
`;

const CorsCheckbox = styled.div`
  margin-left: 10px;
  white-space: nowrap;

  label {
    font-size: 13px;
  }

  @media screen and (max-width: 550px) {
    display: none;
  }
`;

const Heading = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #cccccc;
  z-index: 10;
  padding: 5px;

  display: flex;
  align-items: center;
  font-family: 'Lato';
`;

const Logo = styled.img`
  height: 40px;
  width: 124px;
  display: inline-block;
  margin-right: 15px;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

/* ====== Helpers ====== */
function updateQueryStringParameter(uri, key, value) {
  const keyValue = value === '' ? key : key + '=' + value;
  const re = new RegExp('([?|&])' + key + '=?.*?(&|#|$)', 'i');
  if (uri.match(re)) {
    if (value !== undefined) {
      return uri.replace(re, '$1' + keyValue + '$2');
    } else {
      return uri.replace(re, (_, separator: string, rest: string) => {
        if (rest.startsWith('&')) {
          rest = rest.substring(1);
        }
        return separator === '&' ? rest : separator + rest;
      });
    }
  } else {
    if (value === undefined) {
      return uri;
    }
    let hash = '';
    if (uri.indexOf('#') !== -1) {
      hash = uri.replace(/.*#/, '#');
      uri = uri.replace(/#.*/, '');
    }
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    return uri + separator + keyValue + hash;
  }
}

