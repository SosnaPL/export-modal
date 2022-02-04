import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import DotLoader from "react-spinners/DotLoader";

const Main = React.lazy(() => import('./pages/Main'));

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" name='keywords' content='Template' />
          <title>Export Modal</title>
          <meta name="description" content="Export Modal" />
        </Helmet>
        <Router>
          <React.Suspense
            fallback={(
              <div className="suspense">
                <DotLoader />
              </div>
            )}
          >
            <Switch>
              <Route path='/' exact={true} component={Main} />
              <Route path='*' exact={true} component={Main} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}
