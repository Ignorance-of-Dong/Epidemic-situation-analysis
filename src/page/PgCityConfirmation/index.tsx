import React, { useState, useEffect } from 'react'
import './style.scss'
import { Carousel, Radio } from 'antd';
import { observer } from 'mobx-react-lite'
import Store from '../../store/index'
import Http from '../../server/http'
// http://api.tianapi.com/txapi/ncov/index
function PgCityConfirmation():JSX.Element {

    let [data, setData] = useState([])
    let [autoplay, setautoplay] = useState(false)
    const getData = async () => {
        try {
            let res = await Http.post('/txapi/ncov/index', { key: '85ad61ad24cdc8ba43dd4fac68cfc494' }).toPromise()
            console.log(res)
            Promise.resolve(res).then(res => {
                // data = res.newslist
                console.log(res.newslist[0]['news'])
                setData(res.newslist[0]['news'])
                Store.getDesc(res.newslist[0]['desc'])
                setautoplay(true)
                // sessionStorage.setItem('data', JSON.stringify(res.newslist))
            })
        } catch (err) {

        }
    }

    useEffect(() => {
        getData()
    },[])

    
    return <>
        <div className="pc-c">
            <div className="header-c">
                疫情最新资讯
            </div>
           <div className="pro-cansols">
                <div className="c-c">
                    <Carousel autoplay={true} dotPosition={'top'} dots={false}>
                        {
                            data.map((item) => {
                                { console.log(11111) }
                                return <div className="contaitner" key={item.id}>
                                    <div className="container-header">
                                        <div className="time">{item.pubDateStr}</div>
                                        <div className="socrch">{item.infoSource}</div>
                                    </div>
                                    <div className="container-title">
                                        {item.title}
                                    </div>
                                    <div className="container-body">
                                        {item.summary}
                                    </div>
                                </div>
                            })
                        }


                    </Carousel>
                </div>
            </div> 
            
        </div>
    </>
}

export default observer(PgCityConfirmation)