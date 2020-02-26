import React from 'react'
import './style.scss'
import { Carousel, Radio } from 'antd';
// http://api.tianapi.com/txapi/ncov/index
function PgCityConfirmation():JSX.Element {
    return <>
        <div className="pc-c">
            <div className="header-c">
                疫情最新资讯
            </div>
            <div className="contaitner">
                <div className="container-header">
                    <div className="time">2小时前</div>
                    <div className="socrch">人民日报</div>
                </div>
                <div className="container-title">
                    泰国累计确诊新冠肺炎达40例
                </div>
                <div className="container-body">
据央视，26日，泰国卫生部在每日新冠肺炎疫情的发布会上表示，泰国新增新冠肺炎确诊病例3例。这3例为同一家庭，其中2人为一对从日本旅行归来的夫妇，另1人为该夫妇8岁的外孙，未有出国旅行史。截止到当地时间26日上午11时，泰国累计确诊病例40例。
                </div>
            </div>
        </div>
    </>
}

export default PgCityConfirmation