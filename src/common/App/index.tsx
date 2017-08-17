import * as React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import * as styles from './style.less';

import { register, isAvailable, askPermission, subscribeUserToPush } from 'src/common/push';

export interface IProps {
}

class IndexPage extends React.PureComponent<any> {
	private onSubscribeButtonClick = () => {
		askPermission().then(
			() => {
				subscribeUserToPush(register());
			}
		)
	}

	public render() {
		return (
			<div>
				<h1>Index page</h1>
				{isAvailable() ? (
					<div>
						<p>Web pushes are available</p>
						<button onClick={this.onSubscribeButtonClick}>
							Subscribe
						</button>
					</div>
				) : (
					<p>Web pushes are not available</p>
				)}
			</div>
		);
	}
}

const App: React.SFC<IProps> = (): React.ReactElement<IProps> => (
	<div className={styles.wrapper}>
		<Helmet>
			<title>Push prototype</title>
		</Helmet>

		<Route exact path="/" component={IndexPage} />
	</div>
);

export default App;