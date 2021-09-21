
export interface UMessItem {
    id: string,
    mark: string,
    link: string,
    home: string,
    value: string
}

export const messList: UMessItem[] = [
    {
        id: 'zhihu',
        mark: '知乎',
        link: 'https://www.zhihu.com/search?type=content&q=',
        home: 'https://www.zhihu.com/',
        value: ''
    },
    {
        id: 'bilibili',
        mark: 'B站',
        link: 'https://search.bilibili.com/all?keyword=',
        home: 'https://www.bilibili.com/',
        value: ''
    },
    {
        id: 'juejin',
        mark: '掘金',
        link: 'https://juejin.cn/search?query=',
        home: 'https://juejin.cn/',
        value: ''
    },
    {
        id: 'npm',
        mark: 'npm',
        link: 'https://www.npmjs.com/search?q=',
        home: 'https://www.npmjs.com/',
        value: ''
    }
]

export interface UEngineItem {
    id: string,
    logo: string,
    mark: string,
    link: string,
    suggest?: string,
    suggestList?: { label: string, value: string }[],        // { label: string, value:string }
    value: string,
}

export const engineList: UEngineItem[] = [
    {
        id: 'baidu',
        logo: './image/baidu-logo.png',
        mark: '百度',
        link: 'https://www.baidu.com/s?wd=',
        suggest: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=34534,34496,31254,34004,34092,34517,26350,34319&req=2&bs=fetch&csor=5&cb=baiduCb&wd=',
        suggestList: [],        // { label: string, value:string }
        value: ''
    },
    {
        id: 'google',
        logo: './image/google-logo.png',
        mark: '谷歌',
        link: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
        suggest: 'https://www.google.com.hk/complete/search?q=%E6%9D%8E&cp=1&client=gws-wiz&xssi=t&hl=zh-CN&authuser=0&pq=%E6%9D%8E%E7%99%BD&psi=HbkwYf7PIYm2mAW3-YCwDg.1630583069240&dpr=1.4322917461395264',
        value: ''
    },
    {
        id: 'bing',
        logo: './image/bing-logo.png',
        mark: '必应',
        link: 'https://www.bing.com/search?q=',
        value: ''
    },
    {
        id: 'develop',
        logo: './image/develop-logo.png',
        mark: '开发者',
        link: 'https://kaifa.baidu.com/searchPage?value=',
        value: ''
    }
]