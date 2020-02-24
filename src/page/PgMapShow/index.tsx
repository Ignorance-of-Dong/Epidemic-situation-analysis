import React, { useEffect, useState } from 'react';
import './style.scss'
// import G2 from '@antv/g2';

import echarts from 'echarts'
import 'echarts/map/js/china'

import Http from '../../server/http'

let data = []
let provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']

let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']

function PgMapShow() {

    // let [data, setdata] = useState([])

    const getmap = () => {

        let mytextStyle = {
            color: "#333",               //文字颜色
            fontStyle: "normal",         //italic斜体  oblique倾斜
            fontWeight: "normal",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
            fontFamily: "sans-serif",    //字体系列
            fontSize: 18,                  //字体大小
        };
        let mylineStyle = {
            color: "red",               //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
            shadowColor: "red",          //阴影颜色
            shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
            shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
            shadowBlur: 10,              //图形阴影的模糊大小。
            type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
            width: 2,                     //坐标轴线线宽
            opacity: 0.7,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
            curveness: 0.2
        };
        let myareaStyle = {
            color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],//分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            shadowColor: "red",          //阴影颜色
            shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
            shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
            shadowBlur: 10,              //图形阴影的模糊大小。
            opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
        };
        let myitemStyle = {
            color: "red",                 //颜色
            borderColor: "#000",         //边框颜色
            borderWidth: 0,               //柱条的描边宽度，默认不描边。
            borderType: "solid",         //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
            barBorderRadius: 0,          //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
            shadowBlur: 10,               //图形阴影的模糊大小。
            shadowColor: "#000",         //阴影颜色
            shadowOffsetX: 0,             //阴影水平方向上的偏移距离。
            shadowOffsetY: 0,             //阴影垂直方向上的偏移距离。
            opacity: 1,                    //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
        };
        let mylabel = {
            show: false,                  //是否显示标签。
            position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
            offset: [30, 40],              //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
            formatter: '{b}: {c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
            textStyle: mytextStyle
        };
        let mypoint = {
            symbol: "pin",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
            symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
            silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            label: {
                normal: mylabel,
                emphasis: mylabel
            },
            itemStyle: {
                normal: myitemStyle,
                emphasis: myitemStyle
            }
        };
        let myline = {
            symbol: ["pin", "circle"],    //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            precision: 2,                //标线数值的精度，在显示平均值线的时候有用。
            silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            label: {
                normal: mylabel,
                emphasis: mylabel
            },
            lineStyle: {
                normal: mylineStyle,
                emphasis: mylineStyle
            }
        };
        let myarea = {
            silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            label: {
                normal: mylabel,
                emphasis: mylabel
            },
            itemStyle: {
                normal: myitemStyle,
                emphasis: myitemStyle
            }
        };
        let myChart = echarts.init(document.getElementById('map'))
        var name_title = "全国疫情数据分析"
        var subname = '数据爬取自千栀网'
        var nameColor = " rgb(55, 75, 113)"
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
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });

        // console.log("============geoCoordMap===================")
        // console.log(geoCoordMap)
        // console.log("================data======================")
        var max = 480,
            min = 9; // todo 
        var maxSize4Pin = 100,
            minSize4Pin = 20;

        var convertData = function (data) {
            console.log(data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].provinceShortName];
                if (geoCoord) {
                    res.push({
                        name: data[i].provinceShortName,
                        value: geoCoord.concat(data[i].confirmedCount),
                    });
                }
            }
            console.log(res)
            return res;
        };
        let option = {
            dataRange: {
                min: -20000,
                max: 64287,
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    // color: ['#3C3B3F', '#605C3C'] // 黑绿
                    // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    color: ['yellow', 'red'] // 紫红
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
                formatter: function (params) {
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
                        console.log(toolTiphtml)
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
                        console.log(toolTiphtml)
                        // console.log(convertData(data))
                        return toolTiphtml;
                    }
                }
            },
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data: ['北京 Top10'],
            //     selectedMode: 'single',
            //     selected: {
            //         '上海 Top10': false,
            //         '广州 Top10': false
            //     },
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            visualMap: {
                show: true,
                min: 0,
                max: 20000,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    color: ['#3C3B3F', '#605C3C'] // 黑绿
                    // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    // color: ['yellow', 'red'] // 紫红
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿

                }
            },
            /*工具按钮组*/
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
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
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            },
            series: [
                // {
                //     name: '北京 Top10',
                //     type: 'line',
                //     coordinateSystem: 'geo',
                //     roam: true,
                //     markLine: {
                //         smooth: false,
                //         symbol: 'none',//去掉箭头
                //         effect: {
                //             show: true,
                //             scaleSize: 1,
                //             period: 30,
                //             color: '#fff',
                //             shadowBlur: 10
                //         },
                //         itemStyle: {
                //             normal: {
                //                 borderWidth: 1,
                //                 lineStyle: {
                //                     type: 'solid',
                //                     shadowBlur: 10
                //                 }
                //             }
                //         },
                //         data: [
                //             // [{ name: '北京' }, { name: '上海', value: 95 }],
                //             // [{ name: '北京' }, { name: '广州', value: 90 }],
                //             // [{ name: '北京' }, { name: '大连', value: 80 }],
                //             // [{ name: '北京' }, { name: '南宁', value: 70 }],
                //             // [{ name: '北京' }, { name: '南昌', value: 60 }],
                //             // [{ name: '北京' }, { name: '拉萨', value: 50 }],
                //             // [{ name: '北京' }, { name: '长春', value: 40 }],
                //             // [{ name: '北京' }, { name: '包头', value: 30 }],
                //             // [{ name: '北京' }, { name: '重庆', value: 20 }],
                //             // [{ name: '北京' }, { name: '常州', value: 10 }]
                //             [{ coord: [113.298572, 30.684355] }, { coord: [96.778916, 35.623178]}]
                //         ]
                //     },
                //     // markPoint: {
                //     //     symbol: 'emptyCircle',
                //     //     symbolSize: function (v) {
                //     //         return 10 + v / 10
                //     //     },
                //     //     effect: {
                //     //         show: true,
                //     //         shadowBlur: 0
                //     //     },
                //     //     itemStyle: {
                //     //         normal: {
                //     //             label: { show: false }
                //     //         },
                //     //         emphasis: {
                //     //             label: { position: 'top' }
                //     //         }
                //     //     },
                //     //     data: [
                //     //         // { name: '上海', value: 95 },
                //     //         // { name: '广州', value: 90 },
                //     //         // { name: '大连', value: 80 },
                //     //         // { name: '南宁', value: 70 },
                //     //         // { name: '南昌', value: 60 },
                //     //         // { name: '拉萨', value: 50 },
                //     //         // { name: '长春', value: 40 },
                //     //         // { name: '包头', value: 30 },
                //     //         // { name: '重庆', value: 20 },
                //     //         // { name: '常州', value: 10 }
                //     //         // { coord: [96.778916, 35.623178] }
                //     //     ]
                //     // }
                // },
                {
                    type: "lines",               //线图
                    zlevel: 0,                   //柱状图所有图形的 zlevel 值。
                    z: 1,                        //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                    silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                    name: "数据名称",            //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                    coordinateSystem: "geo",    //'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
                    xAxisIndex: 0,               //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
                    yAxisIndex: 0,               //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                    geoIndex: 0,                 //使用的地理坐标系的 index，在单个图表实例中存在多个地理坐标系的时候有用。
                    polyline: false,             //是否是多段线。默认为 false，只能用于绘制只有两个端点的线段，线段可以通过 lineStyle.normal.curveness 配置为曲线。
                    // symbol: "pin",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                    symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                    symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                    large: false,                //是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。开启后配合 largeThreshold 在数据量大于指定阈值的时候对绘制进行优化。缺点：优化后不能自定义设置单个数据项的样式。
                    largeThreshold: 2000,        //开启绘制优化的阈值。
                    cursor: "pointer",           //鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。
                    label: {                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                        normal: mylabel,
                        emphasis: mylabel
                    },
                    lineStyle: {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                        normal: mylineStyle,
                        emphasis: mylineStyle,
                    },
                    animation: true,
                    effect: {
                        show: true,
                        scaleSize: 2,
                        period: 4,
                        color: '#fff',
                        shadowBlur: 10,
                        // trailLength: 0.2

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
                    symbolSize: function (val) {
                        return 5;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
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
                            // show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 10,
                            shadowColor: 'yellow'
                        }
                    },
                    zlevel: 1
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
                            // show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'red',
                            shadowBlur: 10,
                            shadowColor: 'red'
                        }
                    },
                    zlevel: 1
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
            let res = await Http.post('/index', { key: '85ad61ad24cdc8ba43dd4fac68cfc494' }).toPromise()
            Promise.resolve(res).then(res => {
                data = res.newslist
            })
        } catch (err) {

        }
    }
    useEffect(() => {
        initFn()
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

export default PgMapShow