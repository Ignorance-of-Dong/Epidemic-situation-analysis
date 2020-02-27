import React from 'react'

export default {
    config: [
        {
            path: "/index",
            component: React.lazy(() => import('../page/PgIndex/index')),
            exact: true
        },
    ]
}
