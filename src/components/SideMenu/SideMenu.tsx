import { observer } from 'mobx-react';
import * as React from 'react';

import { IMenuItem, MenuStore } from '../../services/MenuStore';
import { OptionsContext } from '../OptionsProvider';
import { MenuItems } from './MenuItems';

import { PerfectScrollbarWrap } from '../../common-elements/perfect-scrollbar';

@observer
export class SideMenu extends React.Component<{ menu: MenuStore; className?: string }> {
	static contextType = OptionsContext;
	private _updateScroll?: () => void;

	render() {
		const MenuStyle = {
			backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(114,47,170,0.84) 100%, rgba(0,212,255,1) 100%)',
			fontWeight: 'bold'
		};
		const store = this.props.menu;
		return (
			<div style={MenuStyle}>
				<PerfectScrollbarWrap
					updateFn={this.saveScrollUpdate}
					className={this.props.className}
					options={{
						wheelPropagation: false
					}}
				>
					<MenuItems items={store.items} onActivate={this.activate} root={true} />
				</PerfectScrollbarWrap>
			</div>
		);
	}

	activate = (item: IMenuItem) => {
		if (item && item.active && this.context.menuToggle) {
			return item.expanded ? item.collapse() : item.expand();
		}

		this.props.menu.activateAndScroll(item, true);
		setTimeout(() => {
			if (this._updateScroll) {
				this._updateScroll();
			}
		});
	};

	private saveScrollUpdate = (upd) => {
		this._updateScroll = upd;
	};
}
