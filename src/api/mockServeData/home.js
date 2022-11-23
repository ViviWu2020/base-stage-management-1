import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )

        }
        return {
            code: 20000,
            data: {
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    }, {
                        name: '苹果',
                        value: 5999
                    }, {
                        name: 'vivo',
                        value: 2500
                    }, {
                        name: 'oppo',
                        value: 1999
                    },{
                        name: '魅族',
                        value: 2200
                    }, {
                        name: '三星',
                        value: 4500
                    },
                ],
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    }, {
                        date: '周二',
                        new: 10,
                        active: 500
                    }, {
                        date: '周三',
                        new: 12,
                        active: 550
                    }, {
                        date: '周四',
                        new: 60,
                        active: 800
                    }, {
                        date: '周五',
                        new: 65,
                        active: 550
                    }, {
                        date: '周六',
                        new: 53,
                        active: 770
                    }, {
                        date: '周日',
                        new: 33,
                        active: 170
                    },
                ],
                orderData: {
                    date: ['20221001', '20221002', '20221003', '20221004', '20221005', '20221006', '20221007'],
                    data: List
                },
                tableData: [
                    {
                        name: "vivo",
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 8800,
                    },
                    {
                        name: "oppo",
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy: 22200,
                    },
                    {
                        name: "苹果",
                        todayBuy: 800,
                        monthBuy: 300,
                        totalBuy: 14000,
                    },
                    {
                        name: "小米",
                        todayBuy: 1200,
                        monthBuy: 450,
                        totalBuy: 33000,
                    },
                    {
                        name: "三星",
                        todayBuy: 300,
                        monthBuy: 5400,
                        totalBuy: 12000,
                    },
                    {
                        name: "魅族",
                        todayBuy: 350,
                        monthBuy: 1500,
                        totalBuy: 32000,
                    },
                ]
            }
        }
    }
}