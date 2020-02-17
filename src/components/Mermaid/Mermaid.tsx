import * as React from 'react';
import mermaid from 'mermaid';

import '../Mermaid/styles.css';

mermaid.initialize({
	startOnLoad: true
});

class Mermaid extends React.Component {
	componentDidMount() {
		mermaid.contentLoaded();
	}
	render() {
		return (
      <>
			<div className="mermaid" style={{ marginLeft: '35px' }}>
				{this.props.chart}
			</div>
      </>
		);
	}
}

export default Mermaid;
