import React, { Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import routerConfig from './router/index'
import './App.css'
import Index from './page/PgIndex'



function App() {
    return <>
        <HashRouter>
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Redirect exact from='/' to="/index" />
                    {
                        routerConfig.config.map((item, ind) => {
                            return <Route exact={item.exact} key={ind} path={item.path} render={(location) => {
                                // Store.getHistory({...location})
                                // commonStore.getHistory({ ...location })
                                return <item.component {...location} />
                            }} />
                        })
                    }
                    {/* <Route component={Wrong} /> */}
                </Switch>
            </Suspense>
        </HashRouter>
    </>
}

export default App