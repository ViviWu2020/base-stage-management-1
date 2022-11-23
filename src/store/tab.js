import Cookie from "js-cookie"

export default {
    state: {
        isCollapse: false,
        // 面包屑数据
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        menu: []
    },
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== "home") {
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index < 0) {
                    state.tabList.push(val)
                }
            }
        },
        //删除指定的 tag 数据
        closeTag(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)

        },
        // 设置 menu 数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item =>{
                router.addRoute('Main', item)
            })
        }

    }
}
