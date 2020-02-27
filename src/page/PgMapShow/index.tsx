import React, { useEffect, useState } from 'react';
import './style.scss'
import { observer } from 'mobx-react-lite'
import Store from '../../store/index'
// import G2 from '@antv/g2';

import echarts from 'echarts'
import 'echarts/map/js/china'

import Http from '../../server/http'

let data = []
let provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']

let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']
var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
function PgMapShow(props) {

    // let [data, setdata] = useState([])

    const getmap = () => {

       
        let myChart = echarts.init(document.getElementById('map'))
        var name_title = "全国疫情数据分析"
        var subname = '数据来自于天行数据'
        var nameColor = " #fff"
        var name_fontFamily = '等线'
        var subname_fontSize = 15
        var name_fontSize = 18
        var mapName = 'china'
        

        var geoCoordMap = {};
        

        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function (v) {
            // console.log(v)
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        var convertData = function (data) {
            // console.log(data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].provinceShortName];
                if (geoCoord) {
                    res.push({
                        name: data[i].provinceShortName,
                        value: geoCoord.concat(data[i].confirmedCount),
                        visualMap: false,
                    });
                }
            }
            // console.log(res)
            return res;
        };

        var showMapC = function (data) {
            let result = data.map(res => {
                return {
                    ...res,
                    name: res.provinceShortName,
                    value: res.confirmedCount
                }
            })
            return result
        }
        let option = {
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
            title: {
                text: name_title,
                subtext: subname,
                x: 'center',
                textStyle: {
                    color: nameColor,
                    fontFamily: name_fontFamily,
                    fontSize: name_fontSize
                },
                subtextStyle: {
                    fontSize: subname_fontSize,
                    fontFamily: name_fontFamily
                }
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'click',
                formatter: function (params) {
                    console.log(params, 'params')
                    Store.changeCityID(params.data.locationId)
                    // console.log(Store)
                    
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
                        // console.log(toolTiphtml, 'hehe')
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
                        // console.log(toolTiphtml, 'nicai')
                        // console.log(convertData(data))
                        return toolTiphtml;
                    }
                }
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        // areaColor: '#031525',
                        areaColor: '#fff',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                        // areaColor: 'red',

                    }
                },
                
            },
            series: [
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    // label: {
                    //     normal: {
                    //         show: false
                    //     },
                    //     emphasis: {
                    //         show: false,
                    //         textStyle: {
                    //             color: '#fff'
                    //         }
                    //     }
                    // },
                    // roam: true,
                    // itemStyle: {
                    //     normal: {
                    //         areaColor: '#031525',
                    //         borderColor: '#3B5077',
                    //     },
                    //     emphasis: {
                    //         areaColor: '#2B91B7'
                    //     }
                    // },
                    animation: false,
                    data: showMapC(data)
                },
                {
                    type: "lines",               //线图
                    zlevel: 1,                   //柱状图所有图形的 zlevel 值。
                    // z: 1,                        //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                    silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                    name: "数据名称",            //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                    coordinateSystem: "geo",    //'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
                    polyline: false,             //是否是多段线。默认为 false，只能用于绘制只有两个端点的线段，线段可以通过 lineStyle.normal.curveness 配置为曲线。
                    symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                    symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                    symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                    large: false,                //是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。开启后配合 largeThreshold 在数据量大于指定阈值的时候对绘制进行优化。缺点：优化后不能自定义设置单个数据项的样式。
                    largeThreshold: 2000,        //开启绘制优化的阈值。
                    symbol: planePath,
                    cursor: "pointer",           //鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。
                    label: {                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                        normal: {
                            show: false,                  //是否显示标签。
                            position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
                            offset: [30, 40],              //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
                            formatter: '{b}: {c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                            // textStyle: mytextStyle
                        },
                        emphasis: {
                            show: false,                  //是否显示标签。
                            position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
                            offset: [30, 40],              //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
                            formatter: '{b}: {c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                            // textStyle: mytextStyle
                        }
                    },
                    lineStyle: {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                        normal: {
                            color: "#3ed4ff",
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        },
                        emphasis: {
                            // color: "red",
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        },
                    },
                    // animation: true,
                    effect: {
                        show: true,
                        period: 3,
                        trailLength: 0.7,
                        // color: '#fff',
                        symbolSize: 4
                    },
                    data: [
                        [{ coord: [113.298572, 30.684355] }, { coord: [96.778916, 35.623178] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [113.280637, 23.125178] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [120.153576, 29.287459] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [118.000923, 36.275807] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [117.283042, 31.26119] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [113.665412, 33.757975] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [115.592151, 27.676493] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [111.782279, 28.09409] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [104.065735, 30.659462] }],
                        [{ coord: [113.298572, 30.684355] }, { coord: [119.767413, 33.041544] }],
                    ]
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
                    name: 'Top 3-20',
                    type: 'effectScatter',
                    zlevel: 5, 
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.confirmedCount - a.confirmedCount;
                    }).slice(3, 20)),
                    symbolSize: function (val) {
                        return 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            // show: true,
                            color: '#000',
                        }
                    },
                    itemStyle: {
                        color: 'yellow',
                        normal: {
                            show: true,
                            color: 'yellow',
                            areaColor: 'yellow',
                            // color: 'yellow',
                            shadowBlur: 0,
                            shadowColor: 'yellow'
                        }
                    },
                    // zlevel: 1
                },
                {
                    name: 'Top 3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.confirmedCount - a.confirmedCount;
                    }).slice(0, 3)),
                    symbolSize: function (val) {
                        return 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            color: '#000',
                            // show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            shadowBlur: 0,
                            shadowColor: '#fff'
                        }
                    },
                    zlevel: 2
                },
            ]
        };
        myChart.setOption(option);
    }

    const initFn = async () => {
        await getData()
        await setTimeout(() => {
            getmap()
        }, 1000)
    }

    const getData = async () => {
        try {
            let res = await Http.post('/txapi/ncovcity/index', { key: '85ad61ad24cdc8ba43dd4fac68cfc494' }).toPromise()
            Promise.resolve(res).then(res => {
                data = res.newslist
                sessionStorage.setItem('data', JSON.stringify(res.newslist))
            })
        } catch (err) {

        }
    }
    useEffect(() => {
        initFn()
        console.log(props)
        // 
        // let res = 
        // console.log(res)

    }, [])
    return <div className="map-content">
        <div className="map-show" id="map">

        </div>
        <div className="map-text">

        </div>
    </div>
}

export default observer(PgMapShow)