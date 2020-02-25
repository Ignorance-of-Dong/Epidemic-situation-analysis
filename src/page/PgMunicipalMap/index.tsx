import React, { useEffect } from 'react';
import echarts from 'echarts'
import './style.scss'
import Http from '../../server/http'


function init(id) {
    let initdata = JSON.parse(sessionStorage.getItem('data'))
    for (let index = 0; index < initdata.length; index++) {
        if (initdata[index].locationId == id) {
            return initdata[index].cities
        }
    }
}

function PgMunicipalMap(): JSX.Element {

    // const getData = async () => {
    //     try {
    //         let res = await Http.get('https://geo.datav.aliyun.com/areas/bound/100000.json', {}, false).toPromise()
    //         Promise.resolve(res).then(res => {
    //             // data = res.newslist
    //             // sessionStorage.setItem('data', JSON.stringify(res.newslist))
    //         })
    //     } catch (err) {

    //     }
    // }

    


    const getMap = () => {
        let data = init(120000)
        var dom = document.getElementById("munic-map");
        var myChart = echarts.init(dom);
        var option1 = null;
        myChart.showLoading(); //加载动画
        myChart.hideLoading(); //关闭加载动画
        let tjJson = require('../../assets/data/120000.json')
        console.log(tjJson)
        // echarts.registerMap('anhui', data); //加载地图数据
        echarts.registerMap('tianjin', tjJson);
        myChart.setOption({
            series: []
        });

        var geoCoordMap = {
    
        };
        var mapFeatures = echarts.getMap('china').geoJson.features;
        mapFeatures.forEach(function (v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        var goData = [
            [{
                name: '蓟县'
            }, {
                id: 1,
                name: '宁河',
                value: 75
            }],
            [{
                name: '蓟县'
            }, {
                id: 1,
                name: '东丽',
                value: 35
            }],

            //  [{name:'蓟县'}, {name:'宁河',value:95}],
        ];
        //值控制圆点大小
        var backData = [
            [{
                name: '宁河'
            }, {
                id: 2,
                name: '蓟县',
                value: 75
            }],
            [{
                name: '东丽'
            }, {
                id: 2,
                name: '蓟县',
                value: 95
            }]
        ];

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        var arcAngle = function (data) {
            var j, k;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                if (dataItem[1].id == 1) {
                    j = 0.2;
                    return j;
                } else if (dataItem[1].id == 2) {
                    k = -0.2;
                    return k;
                }
            }
        }

        var convertData = function (data) {
            console.log(data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].cityName];
                console.log(data[i].cityName)
                if (geoCoord) {
                    res.push({
                        name: data[i].cityName,
                        value: geoCoord.concat(data[i].confirmedCount),
                        visualMap: false,
                    });
                }
            }
            console.log(res)
            return res;
        };
        var showMapC = function (data) {
            console.log(data)
            let result = data.map(res => {
                return {
                    ...res,
                    name: res.provinceShortName,
                    value: res.confirmedCount
                }
            })
            return result
        }
        var color = ['#fff', '#FF1493', '#0000FF'];
        var series = [];
        

        let option = {
            backgroundColor: '#404a59',
            title: {
                text: '天津迁徙',
                subtext: '数据可更换，去掉头尾注释可直接应用到本地',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    console.log(params, '55555555555')
                    console.log(params.value, '55555555555')
                    if (typeof (params.value)[2] == "undefined") {
                        var toolTiphtml = ''
                        for (var i = 0; i < data.length; i++) {
                            if (params.name == data[i].provinceShortName) {
                                toolTiphtml += data[i].provinceName + ':<br>'
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
                            if (params.name == data[i].provinceShortName) {
                                toolTiphtml += data[i].provinceName + ':<br>'
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
                min: 500,
                max: 64287,
                x: 'left',
                y: 'bottom',
                type: 'piecewise',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                pieces: [      // 自定义每一段的范围，以及每一段的文字
                    { gte: 10000, label: '10000人以上' }, // 不指定 max，表示 max 为无限大（Infinity）。
                    { gte: 1000, lte: 9999, label: '1000-9999人' },
                    { gte: 500, lte: 999, label: '500-999人' },
                    { gte: 100, lte: 499, label: '100-499人' },
                    { gte: 10, lte: 99, label: '10-99人' },
                    { lte: 9, label: '1-9人' }          // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                // inRange: {
                //     // 渐变颜色，从小到大
                //     color: ['#d1d4da', '#bacae8', '#96b5ef', '#6797ef', '#3375e4', '#035cf5']
                // },
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
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                //鼠标缩放和平移
                roam: true,
                itemStyle: {
                    // normal: {
                    //     //          	color: '#ddd',
                    //     borderColor: 'rgba(147, 235, 248, 1)',
                    //     borderWidth: 1,
                    //     areaColor: {
                    //         type: 'radial',
                    //         x: 0.5,
                    //         y: 0.5,
                    //         r: 0.8,
                    //         colorStops: [{
                    //             offset: 0,
                    //             color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                    //         }, {
                    //             offset: 1,
                    //             color: 'rgba(	47,79,79, .2)' // 100% 处的颜色
                    //         }],
                    //         globalCoord: false // 缺省为 false
                    //     },
                    //     shadowColor: 'rgba(128, 217, 248, 1)',
                    //     // shadowColor: 'rgba(255, 255, 255, 1)',
                    //     shadowOffsetX: -2,
                    //     shadowOffsetY: 2,
                    //     shadowBlur: 10
                    // },
                    // emphasis: {
                    //     areaColor: '#389BB7',
                    //     borderWidth: 0
                    // }
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
                    animation: false,
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
            ]
        };
        myChart.setOption(option);
    }
    useEffect(() => {
        // getData()
        getMap()
    }, [])
    return <>
        <div className="munic-map" id="munic-map">

        </div>
    </>
}

export default PgMunicipalMap

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