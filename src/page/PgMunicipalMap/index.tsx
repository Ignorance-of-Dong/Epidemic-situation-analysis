import React, { useEffect, useState } from 'react';
import echarts from 'echarts'
import './style.scss'
import { observer } from 'mobx-react-lite'
import Http from '../../server/http'
import Store from '../../store/index'


function init(id) {
    let initdata = JSON.parse(sessionStorage.getItem('data'))
    for (let index = 0; index < initdata.length; index++) {
        if (initdata[index].locationId == id) {
            return initdata[index].cities
        }
    }
}

function PgMunicipalMap(props): JSX.Element {

    let [cityId, setCidty] = useState('110000')
    const getMap = () => {
        let cityId = Store.cityId
        console.log(cityId)
        let olddata = init(cityId)
        var dom = document.getElementById("munic-map");
        var myChart = echarts.init(dom);

        myChart.showLoading(); //加载动画
        myChart.hideLoading(); //关闭加载动画
        let tjJson = require(`../../assets/data/${cityId}.json`)
        console.log(tjJson)
        // echarts.registerMap('anhui', data); //加载地图数据
        echarts.registerMap('tianjin', tjJson);
        let mapFeatures = tjJson.features
        
        let arrS = []
        let numRE = () => {
            let oldObj = {}
            
            olddata.forEach(res => {
                oldObj[res.cityName] = 0
            })
            mapFeatures.forEach(res => {
                if (!oldObj.hasOwnProperty(res.properties.name)) {
                    arrS.push({
                        cityName: res.properties.name,
                        confirmedCount: 0,
                        curedCount: 0,
                        currentConfirmedCount: 0,
                        deadCount: 0,
                        locationId: 0,
                        suspectedCount: 0,
                    })
                }
            })


            console.log(arrS)
        }
        numRE()
        let data = [
            ...olddata,
            ...arrS
        ]

        console.log(data)
        
        let filterResult = 1;
        console.log(mapFeatures)
        // myChart.setOption({
        //     series: []
        // });

        var geoCoordMap = {
    
        };
        // var mapFeatures = echarts.getMap('china').geoJson.features;
        mapFeatures.forEach(function (v) {
            // console.log(v)
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.centroid;

        });
        var convertData = function (data) {
            console.log(data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].cityName];
                console.log(geoCoord)
                console.log(data[i].confirmedCount)
                if (geoCoord) {
                    res.push({
                        name: data[i].cityName,
                        value: geoCoord.concat(data[i].confirmedCount),
                        visualMap: false,
                    });
                } 
            }
            console.log(res)
            return res
        };
        var showMapC = function (data) {
            console.log(data)
            let result = data.map(res => {
                return {
                    ...res,
                    name: res.cityName,
                    value: res.confirmedCount
                }
            })
            return result
        }
        var color = ['#fff', '#FF1493', '#0000FF'];
        var series = [];
        

        let option = {
            // backgroundColor: '#404a59',
            title: {
                text: '当前省份疫情数据',
                subtext: '戴口罩勤洗手少聚集，快乐健康每一天',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (params.value) {
                        var toolTiphtml = ''
                        for (var i = 0; i < data.length; i++) {
                            if (params.name == data[i].cityName) {
                                toolTiphtml += data[i].cityName + ':<br>'
                                toolTiphtml += '累计确诊:' + data[i].confirmedCount + "<br>"
                                toolTiphtml += '累计治愈:' + data[i].curedCount + "<br>"
                                toolTiphtml += '累计死亡:' + data[i].deadCount + "<br>"
                                toolTiphtml += '现存确诊:' + data[i].currentConfirmedCount + "<br>"
                            }
                        }
                        console.log(toolTiphtml, 'hehe')
                        return toolTiphtml;
                    } else {
                        var toolTiphtml = ''
                        for (var i = 0; i < data.length; i++) {
                            if (params.name == data[i].cityName) {
                                toolTiphtml += data[i].cityName + ':<br>'
                                toolTiphtml += '累计确诊:' + data[i].confirmedCount + "<br>"
                                toolTiphtml += '累计治愈:' + data[i].curedCount + "<br>"
                                toolTiphtml += '累计死亡:' + data[i].deadCount + "<br>"
                                toolTiphtml += '现存确诊:' + data[i].currentConfirmedCount + "<br>"
                                // for (var j = 0; j < data[i].value.length; j++) {

                                // }
                            }
                        }
                        console.log(toolTiphtml, 'nicai')
                        // console.log(convertData(data))
                        return toolTiphtml;
                    }
                }
            },
            //线颜色及飞行轨道颜色
            visualMap: {
                show: true,
                min: 0,
                max: showMapC(data)[0]['value'],
                x: 'left',
                y: 'bottom',
                // type: 'piecewise',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    // color: ['#3C3B3F', '#605C3C'] // 黑绿
                    // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    color: ['#fff', '#ae4141', '#900b09'] // 紫红
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿

                }
            },
            //地图相关设置
            geo: {
                map: 'tianjin',
                //视角缩放比例
                zoom: 1,
                //显示文本样式
                label: {
                    show: false,
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                //鼠标缩放和平移
                roam: true,
                itemStyle: {
                    color: 'red'
                }
            },
            series: [
                ...series,
                {
                    type: 'map',
                    map: 'tianjin',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    animation: true,
                    data: showMapC(data)
                },
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    zlevel: '2',
                    symbolSize: function (val) {
                        return 5;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            color: '#000',
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    }
                },
                {
                    name: 'Top 3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.confirmedCount - a.confirmedCount;
                    }).slice(0, 2)),
                    symbolSize: function (val) {
                        return 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        // normal: {
                        //     formatter: '{b}',
                        //     position: 'right',
                        //     color: '#000',
                        //     // show: true
                        // }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 0,
                            shadowColor: 'yellow'
                        }
                    },
                    zlevel: 2
                },
            ]
        };
        myChart.setOption(option);
    }

    const changeCityID = (id) => {
        setCidty(id)
    }

    useEffect(() => {
        setCidty(Store.cityId)
       setTimeout(() => {
           getMap()
       }, 1000)
    }, [])

    if (Store.cityId != cityId) {
        // if (Store.cityId == '710000') {
        //     return;
        // }
        getMap()
        setCidty(Store.cityId)
    }
    console.log()
    return <>
        <div className="munic-map" id="munic-map">

        </div>
    </>
}

export default observer(PgMunicipalMap)

// [
//     ['1', goData],
//     ['2', backData]
// ].forEach(function (item, i) {
//     series.push({
//         name: item[0],
//         type: 'lines',
//         zlevel: 2,
//         //线特效配置
//         effect: {
//             show: true,
//             period: 6,
//             trailLength: 0.1,
//             symbol: planePath, //标记类型
//             symbolSize: 10
//         },
//         lineStyle: {
//             normal: {
//                 width: 1,
//                 opacity: 0.4,
//                 curveness: arcAngle(item[1]), //弧线角度
//                 color: '#fff'
//             }
//         },
//         data: convertData(item[1])
//     }, {
//         type: 'effectScatter',
//         coordinateSystem: 'geo',
//         zlevel: 2,
//         //波纹效果
//         rippleEffect: {
//             period: 2,
//             brushType: 'stroke',
//             scale: 3
//         },
//         label: {
//             normal: {
//                 show: true,
//                 color: '#fff',
//                 position: 'right',
//                 formatter: '{b}'
//             }
//         },
//         //终点形象
//         symbol: 'circle',
//         //圆点大小
//         symbolSize: function (val) {
//             return val[2] / 8;
//         },
//         itemStyle: {
//             normal: {
//                 show: true
//             }
//         },
//         data: item[1].map(function (dataItem) {
//             return {
//                 name: dataItem[1].name,
//                 value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
//             };
//         })

//     });

// });