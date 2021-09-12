
import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import Icon from '@ant-design/icons';

import { messList as msl, engineList as defaultEgl, UEngineItem, UMessItem } from "./constant";
import { ajaxJSONP, copy, openUrl } from "@/utils/utils";

import { showContextMenu } from "@/components/ContextMenu"

import baiduLogo from "./image/baidu-logo.png";
import bingLogo from "./image/bing-logo.png";
import developLogo from "./image/develop-logo.png";
import googleLogo from "./image/google-logo.png";

import './Search.less'

const Icon_Map = new Map([
    ['zhihu', <svg viewBox="0 0 1024 1024"><path d="M 940.35 795.875 c 0 78.652 -63.771 142.422 -142.421 142.422 H 228.226 c -78.655 0 -142.427 -63.772 -142.427 -142.422 v -569.7 c 0 -78.658 63.772 -142.432 142.427 -142.432 H 797.93 c 78.658 0 142.432 63.772 142.432 142.431 l -0.01 569.701 Z M 415.621 543.356 h 125.593 c 0 -29.528 -13.923 -46.824 -13.923 -46.824 H 418.295 c 2.59 -53.493 4.91 -122.15 5.739 -147.65 h 103.677 s -0.561 -43.871 -12.091 -43.871 H 333.378 s 10.971 -57.374 25.594 -82.7 c 0 0 -54.417 -2.938 -72.98 69.622 c -18.562 72.56 -46.404 116.43 -49.356 124.446 c -2.953 8.013 16.031 3.795 24.044 0 c 8.015 -3.797 44.294 -16.876 54.84 -67.496 h 56.35 c 0.76 32.082 2.99 130.397 2.287 147.649 H 258.15 c -16.45 11.81 -21.936 46.824 -21.936 46.824 h 132.592 c -5.53 36.615 -15.239 83.813 -28.817 108.835 c -21.513 39.655 -32.904 75.934 -110.525 138.368 c 0 0 -12.657 9.28 26.576 5.906 c 39.231 -3.372 76.356 -13.498 102.087 -64.963 c 13.378 -26.756 27.213 -60.697 38.006 -95.121 l -0.04 0.12 l 109.26 125.795 s 14.343 -33.747 3.798 -70.87 l -80.994 -90.698 l -27.42 20.279 l -0.031 0.099 c 7.615 -26.7 13.092 -53.095 14.795 -76.061 c 0.042 -0.553 0.084 -1.119 0.121 -1.689 Z M 567.366 295.73 v 435.35 h 45.77 l 18.753 52.405 l 79.328 -52.405 h 99.978 V 295.73 H 567.366 Z M 764.09 684.253 h -51.968 l -64.817 42.817 l -15.319 -42.817 H 615.81 v -339.94 h 148.28 v 339.94 Z m 0 0" fill="#1b61de"></path></svg>],
    ['juejin', <svg viewBox="0 0 1272 1024"><path d="M729.64116345 165.27693991L634.32650881 90.125l-99.5625 78.52693991-5.17887981 4.16056009 104.74137981 83.50215546 105.09051682-83.50215546-9.77586218-7.53556009z m361.21228445 291.47198236l-456.78879245 360.19396555-456.49784537-359.99030128L110.125 511.12715547l523.93965546 413.11745671 524.23060335-413.35021555-67.44181091-54.14547436z m-456.78879245 29.21120673L385.4784479 290.00646554 318.06573237 344.12284454l315.96982771 249.16810336 316.28987101-249.40086136-67.41271555-54.14547436-248.84806008 196.21551682z" fill="#006cff"></path></svg>],
    ['bilibili', <svg viewBox="0 0 1024 1024"><path d="M896 1024h-768A128 128 0 0 1 0 896v-768A128 128 0 0 1 128 0h768A128 128 0 0 1 1024 128v768a128 128 0 0 1-128 128" fill="#F9729A" ></path><path d="M584.773818 341.76l0.581818 2.746182c-4.049455 79.685818 1.582545 159.557818 10.24 238.778182 21.922909-3.025455 44.194909-2.350545 65.908364 1.931636 22.341818 3.84 44.125091 10.472727 64.837818 19.642182 11.450182 5.515636 23.226182 11.589818 31.232 21.76 6.772364 8.96 3.956364 21.317818-0.837818 30.533818-7.68 13.381818-20.154182 23.296-33.093818 31.301818-33.652364 20.48-72.704 29.626182-111.476364 33.605818-15.872 2.094545-31.813818 2.420364-47.755636 1.908364-10.100364-112.174545-21.504-224.581818-42.752-335.546182-0.954182-6.981818-3.84-13.568-4.352-20.619636 5.632-2.141091 11.217455-4.468364 16.756363-6.842182l11.101091-4.794182c12.962909-5.585455 25.972364-10.938182 39.610182-14.405818z m40.890182 279.04c0 3.514182 0.395636 7.051636 1.093818 10.496 3.653818 18.501818 4.538182 37.515636 8.122182 56.064 13.824-9.285818 27.066182-19.456 40.378182-29.509818 5.003636-4.096 10.752-7.610182 14.731636-12.8-6.144-4.026182-13.381818-6.074182-20.037818-8.890182-14.661818-5.585455-29.114182-11.589818-44.288-15.36zM153.413818 341.690182c1.093818 10.24-0.907636 20.736-0.837818 31.045818a1699.281455 1699.281455 0 0 0 11.333818 210.501818c41.541818-6.144 83.968 3.188364 122.810182 18.106182a125.905455 125.905455 0 0 1 32.512 18.385455c5.306182 4.584727 10.752 10.472727 10.565818 17.92 0.884364 15.662545-9.797818 28.904727-20.992 38.702545a190.72 190.72 0 0 1-65.28 33.536c-35.956364 10.472727-73.309091 15.220364-110.731636 14.08-10.938182-119.109818-22.714182-238.778182-47.104-356.096a1405.253818 1405.253818 0 0 0 44.288-18.501818c7.68-3.002182 15.243636-6.842182 23.435636-7.68z m40.634182 279.109818c2.490182 22.085818 5.888 44.218182 9.285818 66.234182 15.872-10.868364 31.232-22.458182 46.592-34.048 3.165091-2.257455 6.004364-4.910545 8.448-7.912727-3.84-2.955636-8.517818-4.049455-12.8-6.05091-16.965818-6.632727-33.861818-13.614545-51.525818-18.222545z m308.48-76.869818c-15.034182-4.608-31.185455-1.978182-46.545455-0.884364 4.235636 53.108364 9.495273 106.123636 14.545455 159.092364 11.52 0.325818 23.04-0.442182 34.490182-0.698182-0.512-52.48 1.024-105.146182-2.490182-157.44v-0.069818z m431.616 0c-15.034182-4.468364-31.232-2.420364-46.592-0.884364 4.352 52.992 9.611636 106.123636 14.731636 159.092364 11.52 0.395636 23.04-0.628364 34.676364-0.442182-1.28-52.549818 0.837818-105.285818-2.816-157.765818z m-563.2-7.098182c-13.824-2.629818-28.090182 0.837818-41.797818 3.328-1.466182 0.651636-4.864 0.186182-4.538182 2.56 9.914182 51.712 20.224 103.424 30.394182 155.066182 11.52-1.908364 23.365818-2.164364 34.885818-3.956364-5.050182-45.381818-8.773818-90.88-15.034182-136.075636-1.163636-7.028364-1.792-14.08-3.84-20.922182h-0.069818z m431.802182-0.256c-15.36-2.373818-31.092364 1.536-46.08 4.864-0.232727 4.608 1.163636 9.029818 2.048 13.568 9.029818 47.616 18.688 95.232 27.927273 142.848 11.566545-1.908364 23.342545-2.373818 34.90909-3.909818-4.584727-44.916364-8.564364-89.832727-14.638545-134.586182-1.093818-7.610182-1.908364-15.36-4.096-22.784h-0.069818zM412.16 384l-4.468364 0.256c-11.077818 0.837818-22.225455 1.931636-33.28 4.096 18.292364 97.024 27.322182 195.514182 36.770909 293.562182 11.170909 0.581818 22.155636 0.325818 33.163637 1.396363-9.076364-99.188364-16.896-198.376727-23.412364-297.774545a29.626182 29.626182 0 0 0-13.195636-1.28l4.421818-0.256z m440.32 1.722182c-15.290182-3.258182-31.232 0.395636-46.405818 2.629818 18.432 96.954182 27.275636 195.514182 36.864 293.562182 11.008 0.581818 22.016 0.325818 33.047273 1.396363a12303.173818 12303.173818 0 0 1-23.505455-297.588363zM472.133818 463.36c-6.656-1.024-13.568 0.651636-20.293818 0.651636 0.954182 19.828364 3.072 39.68 4.165818 59.578182 5.352727-1.163636 11.008-0.256 16.244364-1.931636 2.117818-19.386182 0.256-38.842182 0-58.228364l-0.116364-0.069818z m431.872-0.186182c-6.795636-0.837818-13.707636 0.442182-20.549818 0.628364l4.282182 59.717818 15.941818-1.466182c2.746182-19.456 0.465455-39.237818 0.325818-58.88z m-412.811636-0.651636h-11.264c1.28 19.595636 0.395636 39.424 2.048 59.136 6.795636 0.768 13.568 1.536 20.363636 1.024a1934.266182 1934.266182 0 0 1 0-58.88 101.562182 101.562182 0 0 0-22.411636-1.396364l11.264 0.116364z m420.352-0.116364c1.349818 19.828364 0.325818 39.796364 2.327273 59.578182 6.702545 0.186182 13.428364 1.28 20.084363 0.651636a2257.757091 2257.757091 0 0 1 0.116364-58.88 104.331636 104.331636 0 0 0-22.528-1.28v-0.069818z m-579.723637-2.56c-6.632727 0.116364-13.288727 1.652364-19.944727 2.676364 3.072 19.781818 7.284364 39.493818 10.752 59.275636 5.492364-1.093818 10.868364-2.629818 16.314182-3.584 0-19.595636-3.909818-39.051636-7.028364-58.368h-0.069818z m431.755637 0c-6.842182 0.116364-13.428364 1.652364-19.968 2.676364 3.072 19.781818 7.237818 39.493818 10.635636 59.275636 5.492364-1.093818 10.752-2.56 16.244364-3.584a365.056 365.056 0 0 0-6.912-58.368z m-401.594182-2.629818a44.032 44.032 0 0 0-22.085818-0.186182c2.443636 20.224 4.887273 40.378182 7.68 60.532364 6.795636-0.884364 13.637818-1.024 20.48-1.396364-1.396364-19.595636-3.956364-39.237818-6.004364-58.949818h-0.069818z m429.451636-0.837818c-6.539636-0.512-13.498182-1.28-19.851636 0.768 2.373818 20.107636 4.864 40.261818 7.68 60.416 6.842182-0.884364 13.637818-1.024 20.48-1.396364-1.210182-17.989818-3.909818-35.909818-5.376-53.899636-0.465455-2.164364 0.186182-5.888-3.025455-5.818182v-0.069818h0.093091z" fill="#FFFFFF"></path></svg>],
    ['github', <svg viewBox="0 0 1024 1024"><path d="M1021.72444445 512a495.16088889 495.16088889 0 0 1-97.57582223 299.64515555 500.62222222 500.62222222 0 0 1-250.85724444 184.22897778 30.58346667 30.58346667 0 0 1-26.2144-4.73315555 25.85031111 25.85031111 0 0 1-8.00995556-20.02488889v-139.81013334a119.05706667 119.05706667 0 0 0-34.58844444-94.29902222 473.31555555 473.31555555 0 0 0 67.72053333-11.65084444 248.30862222 248.30862222 0 0 0 62.2592-26.2144 187.50577778 187.50577778 0 0 0 53.52106667-43.69066667 209.35111111 209.35111111 0 0 0 36.40888889-69.90506667 334.2336 334.2336 0 0 0 13.83537778-100.12444444 191.87484445 191.87484445 0 0 0-52.7928889-136.53333333 176.21902222 176.21902222 0 0 0-5.09724444-135.44106667 87.01724445 87.01724445 0 0 0-53.52106666 7.28177778 341.87946667 341.87946667 0 0 0-61.16693334 29.12711111l-25.12213333 15.65582222a473.31555555 473.31555555 0 0 0-254.86222223 0c-7.28177778-5.09724445-16.384-10.55857778-28.03484444-17.84035555A371.00657778 371.00657778 0 0 0 300.82844445 220.72888889a94.29902222 94.29902222 0 0 0-57.16195556-9.10222222 178.40355555 178.40355555 0 0 0-4.73315556 136.53333333 197.70026667 197.70026667 0 0 0-52.4288 137.26151111A327.68 327.68 0 0 0 200.33991111 584.81777778a223.55057778 223.55057778 0 0 0 36.40888889 69.90506667 172.94222222 172.94222222 0 0 0 53.52106667 44.41884444 304.7424 304.7424 0 0 0 62.2592 26.2144 471.13102222 471.13102222 0 0 0 68.08462222 11.65084444 105.22168889 105.22168889 0 0 0-32.768 68.44871112 112.86755555 112.86755555 0 0 1-30.21937778 9.4663111 190.41848889 190.41848889 0 0 1-36.40888889 3.2768A78.6432 78.6432 0 0 1 274.61404445 803.27111111a124.5184 124.5184 0 0 1-36.4088889-41.50613333 109.22666667 109.22666667 0 0 0-32.03982222-34.58844445 91.7504 91.7504 0 0 0-32.768-16.01991111h-13.1072a47.33155555 47.33155555 0 0 0-19.29671111 2.91271111q-5.46133333 3.2768-3.2768 7.64586667a50.24426667 50.24426667 0 0 0 6.18951111 9.10222222 62.98737778 62.98737778 0 0 0 8.73813334 8.37404445l4.73315555 2.91271111a88.83768889 88.83768889 0 0 1 29.12711111 25.12213333 179.49582222 179.49582222 0 0 1 20.75306667 33.49617778l6.5536 15.29173333a82.28408889 82.28408889 0 0 0 29.12711111 41.14204445 109.22666667 109.22666667 0 0 0 44.05475556 18.93262222 223.18648889 223.18648889 0 0 0 45.8752 4.73315556 207.16657778 207.16657778 0 0 0 36.40888888-2.54862223l15.29173334-2.54862222v95.39128889a26.2144 26.2144 0 0 1-8.73813334 20.02488889 31.67573333 31.67573333 0 0 1-26.57848888 4.73315555 498.43768889 498.43768889 0 0 1-249.40088889-185.32124444A486.78684445 486.78684445 0 0 1 2.27555555 512a497.70951111 497.70951111 0 0 1 68.44871112-254.86222222A504.6272 504.6272 0 0 1 257.13777778 70.72426667 497.70951111 497.70951111 0 0 1 512 2.27555555a497.70951111 497.70951111 0 0 1 254.86222222 68.44871112A504.6272 504.6272 0 0 1 953.27573333 257.13777778 496.98133333 496.98133333 0 0 1 1021.72444445 512z" p-id="4462"></path></svg>],
    ['npm', <svg viewBox="0 0 2303 1024"><path d="M767.586 128.207v767.586H0V128.207h767.586z m-639.38 127.38v512h255.587V383.792H512v383.793h128.207v-512h-512z" p-id="11549" fill="#CB3837"></path><path d="M1406.966 128.207v767.586H1151.38V1024h-512V128.207h767.586z m-639.38 127.38v639.38h255.587v-127.38h255.586v-512H767.586z m255.587 128.206h128.207V639.38h-128.207V383.793z" p-id="11550" fill="#CB3837"></path><path d="M1278.76 894.966v-766.76h1023.172v767.587H1278.76z m128.206-639.38v512h255.587V383.793h128.206v383.793h128.207V383.793h128.207v383.793h128.207v-512h-768.414z" p-id="11551" fill="#CB3837"></path></svg>]
])

const Logo_Map = new Map([
    ['google', googleLogo],
    ['baidu', baiduLogo],
    ['bing', bingLogo],
    ['develop', developLogo]
])

const cacheSort: string = localStorage.cacheSort
const egl: UEngineItem[] = cacheSort ? JSON.parse(cacheSort).map((x: any) => defaultEgl.find(y => y.id === x)) : defaultEgl

function Search() {

    const [messList, setMessList] = useState(msl)
    const [engineList, setEngineList] = useState(egl)

    useEffect(() => {
        setTimeout(() => {
            message.success('欢迎甜甜')
        }, 2000)
    }, [])

    const messItemOnChange = (v: string, idx: number) => {
        const nv = messList.map((x, index) => idx === index ? ({ ...x, value: v }) : x)
        setMessList(nv)
    }

    const engineItemOnChange = (v: string, idx: number) => {
        const nv = engineList.map((x, index) => idx === index ? ({ ...x, value: v }) : x)
        setEngineList(nv)
    }

    const messSearch = (value: string, idx: number, evt: Event) => {
        if ((evt.target as HTMLElement).nodeName === 'INPUT') return  // 清空输入框时不跳转
        const { link, home } = messList[idx]
        const url = value ? link + value : home
        openUrl(url)
    }
    const engineSearch = (value: string, idx: number) => {
        const { link } = engineList[idx]
        value && openUrl(link + value)
    }

    let sourceIdx = 0
    const onDragstart = (idx: number) => {
        sourceIdx = idx
    }

    const onDrop = (dropIdx: number) => {
        const nv = engineList.slice(0)
        const sourceItem = nv[sourceIdx]
        const dropItem = nv[dropIdx]
        nv.splice(dropIdx, 1, sourceItem)
        nv.splice(sourceIdx, 1, dropItem)
        setEngineList(nv)
        localStorage.cacheSort = JSON.stringify(nv.map(x => x.id))
    }

    const handleOnContextMenu = (evt: MouseEvent, item: UEngineItem | UMessItem, idx: number, type: 'mess' | 'engine') => {
        evt.preventDefault()
        showContextMenu(
            evt,
            [
                { key: 'copy', title: '复制' },
                { key: 'paste', title: '粘贴' },
                { key: 'paste-search', title: '粘贴并搜索' },
            ],
            async key => {
                const pasteToInput = async () => {
                    const value = await window.navigator.clipboard.readText()
                    const nv = (type === 'engine' ? engineList : messList).slice()
                    nv[idx].value = value
                    type === 'engine' ? setEngineList(nv as UEngineItem[]) : setMessList(nv as UMessItem[])
                }
                if (key === 'copy') copy(item.value)
                else if (key === 'paste') pasteToInput()
                else if (key === 'paste-search') pasteToInput().then(() => openUrl(item.link + item.value))

            }
        )
    }

    return (
        <div className="search-container">
            <section className="mess-container"
                style={{ gridTemplateColumns: `repeat(${messList.length}, 1fr)` }}
            >
                {messList.map((item, idx) =>
                    <div className="mess-item" key={idx}
                        onContextMenu={evt => handleOnContextMenu(evt, item, idx, 'mess')}
                    >
                        <Input.Search
                            value={item.value}
                            tabIndex={engineList.length + idx + 1}
                            spellCheck={false}
                            onChange={evt => messItemOnChange(evt.target.value, idx)}
                            onSearch={(value, evt) => messSearch(value, idx, evt as any)}
                            placeholder={item.mark}
                            enterButton={<Icon style={{ width: 20 }} component={() => Icon_Map.get(item.id) as any} />}
                            allowClear
                            size="large"
                        />
                    </div>
                )}
            </section>

            <section className="engine-container">
                {engineList.map((item, idx) =>
                    <div className="engine-item" key={idx}>
                        <img className="logo" src={Logo_Map.get(item.id)} draggable
                            onDragOver={evt => evt.preventDefault()}
                            onDragStart={() => onDragstart(idx)}
                            onDrop={() => onDrop(idx)}
                        />
                        <div onContextMenu={evt => handleOnContextMenu(evt, item, idx, 'engine')}>
                            <Input.Search
                                autoFocus={idx === 0}
                                tabIndex={idx + 1}
                                spellCheck={false}
                                value={item.value}
                                onChange={evt => engineItemOnChange(evt.target.value, idx)}
                                onSearch={value => engineSearch(value, idx)}
                                placeholder={item.mark}
                                enterButton={item.mark}
                                allowClear
                                size="large"
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* {menuJsx} */}
        </div>
    )
}

export default Search