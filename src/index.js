import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import asyncComponent from './components/AsyncComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import 'react-app-polyfill/ie11'
import { unregister } from './registerServiceWorker'

const Read = asyncComponent(() => import('./components/Read'))
const Resume = asyncComponent(() => import('./components/Resume'))
const Portfolio = asyncComponent(() => import('./components/Portfolio'))
const Places = asyncComponent(() => import('./components/Places'))
const Photography = asyncComponent(() => import('./components/Photography'))
const PageNotFound = asyncComponent(() => import('./components/PageNotFound'))

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/read" component={Read} />
        <Route exact path="/resume" component={Resume} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/places" component={Places} />
        <Route exact path="/photos" component={Photography} />
        {/* redirect to blog */}
        <Route
          path="/blog"
          component={({ match }) => (
            <Helmet>
              <meta
                http-equiv="refresh"
                content={`0;URL=https://blog.yliu.io`}
              />
            </Helmet>
          )}
        />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
unregister()
sessionStorage.removeItem('backId')
