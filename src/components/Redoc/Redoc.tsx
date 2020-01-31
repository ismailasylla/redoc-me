import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ThemeProvider } from '../../styled-components';
import { OptionsProvider } from '../OptionsProvider';

import { AppStore } from '../../services';
import { ApiLogo } from '../ApiLogo/ApiLogo';
import { ContentItems } from '../ContentItems/ContentItems';
import { SideMenu } from '../SideMenu/SideMenu';
import { StickyResponsiveSidebar } from '../StickySidebar/StickyResponsiveSidebar';
import { ApiContentWrap, BackgroundStub, RedocWrap } from './styled.elements';

import { SearchBox } from '../SearchBox/SearchBox';
import { StoreProvider } from '../StoreBuilder';

import { ContentItemModel } from '../../services/MenuBuilder';

export interface RedocProps {
	store: AppStore;
}

export class Redoc extends React.Component<RedocProps, RedocState> {
	constructor(props) {
		super(props);

		this.state = {
			item: this.props.store.menu.items[0] as any
		};
	}

	componentDidUpdate() {
		this.props.store.menu.activateAndScroll(this.state.item, true);
	}

	static propTypes = {
		store: PropTypes.instanceOf(AppStore).isRequired
	};

	componentDidMount() {
		this.props.store.onDidMount();
	}

	componentWillUnmount() {
		this.props.store.dispose();
	}

	onMenuItemClick = (menuItem) => {
		this.setState({ item: menuItem });
	};

	render() {
		const { store: { spec, menu, options, search, marker } } = this.props;
		const store = this.props.store;

		return (
			<ThemeProvider theme={options.theme}>
				<StoreProvider value={this.props.store}>
					<OptionsProvider value={options}>
						<RedocWrap className="redoc-wrap">
							<StickyResponsiveSidebar menu={menu} className="menu-content">
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
								<ContentItems items={menu.items as any} index={0} item={this.state.item} store={store} />
							</ApiContentWrap>
							<BackgroundStub />
						</RedocWrap>
					</OptionsProvider>
				</StoreProvider>
			</ThemeProvider>
		);
	}
}

export interface RedocState {
	item: ContentItemModel;
}
