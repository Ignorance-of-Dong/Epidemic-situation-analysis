import React, {useEffect} from 'react';
import G2 from '@antv/g2';
import PgCityConfirmation from '../PgCityConfirmation'
import PgMunicipalMap from '../PgMunicipalMap'
import PgMapShow from '../PgMapShow'
import './style.scss'
import Http from '../../server/http'

function Index():JSX.Element {
    useEffect(() => {
        console.log()
        try {
            // let res = Http.post('/active/removequestionlist').toPromise()
            // console.log(res)
        }catch(err) {
            console.log(err)
        }
        // Promise.resolve(res).then(res => {
        //     console.log(res)
        // })
        // console.log(res)
    }, [])
    return <>
        <div className="wrap">
            <div className="header"></div>
            <div className="content">
                <PgCityConfirmation/>
                <PgMapShow/>
                <PgMunicipalMap/>
            </div>
        </div>
    </>
}

export default Index