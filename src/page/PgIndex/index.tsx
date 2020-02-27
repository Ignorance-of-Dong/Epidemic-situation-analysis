import React, {useEffect, useState} from 'react';
import PgCityConfirmation from '../PgCityConfirmation'
import PgMunicipalMap from '../PgMunicipalMap'
import { observer } from 'mobx-react-lite'
import PgMapShow from '../PgMapShow'
import './style.scss'
import Http from '../../server/http'
import { Carousel } from 'antd';
import Store from '../../store/index'

function Index(props):JSX.Element {
    useEffect(() => {
        
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
            <div className="header">
                <Carousel autoplay={true} dotPosition={'left'} dots={false}>
                    <div className="don">{Store.desc ? Store.desc.generalRemark : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.note1 : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.note2 : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.note3 : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.remark1 : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.remark2 : ''}</div>
                    <div className="don">{Store.desc ? Store.desc.remark3 : ''}</div>
                    <div className="don">
                        现存确诊 <span style={{ color: 'red' }}>{Store.desc ? Store.desc.currentConfirmedCount : ''}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        累计确诊 <span style={{ color: 'red' }}>{Store.desc ? Store.desc.confirmedCount : ''}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        累计治愈 <span style={{ color: 'green' }}>{Store.desc ? Store.desc.curedCount : ''}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        累计死亡 <span style={{ color: 'red' }}>{Store.desc ? Store.desc.deadCount : ''}</span>
                    </div>


                </Carousel>
            </div>
            <div className="content">
                <PgCityConfirmation/>
                <PgMapShow/>
                <PgMunicipalMap/>
            </div>
        </div>
    </>
}

export default observer(Index)