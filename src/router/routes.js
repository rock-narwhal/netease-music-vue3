export default [
    {
        name: 'root',
        path: '/',
        component: () => import('@/views/LayoutPage.vue'),
        redirect: {
            name: 'HomePage'
        },
        children: [
            //首页
            {
                name: 'HomePage',
                path: 'homePage',
                component: () => import('@/views/home/HomePage.vue'),
                redirect: {
                    name: 'PersonalRecom'
                },
                children: [
                    {
                        path: 'personalrecom',
                        name: 'PersonalRecom',
                        component: () => import('@/views/home/PersonalRecom.vue'),
                        meta: {title: '个性推荐'}
                    },
                    {
                        path: 'playlist',
                        name: 'PlayList',
                        component: () => import('@/views/home/PlayList.vue'),
                        meta: {title: '首页歌单'}
                    },
                    {
                        path: 'toplist',
                        name: 'TopList',
                        component: () => import('@/views/home/TopList.vue'),
                        meta: {title: '排行榜页面'}
                    },
                    {
                        path: 'artistlist',
                        name: 'ArtistList',
                        component: () => import('@/views/home/ArtistsList.vue'),
                        meta: {title: '歌手页'}
                    },
                    {
                        path: 'latest',
                        name: 'LatestPage',
                        redirect: '/homePage/latest/songs',
                        component: () => import('@/views/home/latest/LatestPage.vue'),
                        meta: {title: '最新音乐'},
                        children: [
                            {
                                path: 'songs',
                                name: 'LatestSongPage',
                                component: () => import('@/views/home/latest/LatestSongs.vue'),
                                meta: {title: '新歌速递'}
                            },
                            {
                                path: 'albums',
                                name: 'LatestAlbumPage',
                                component: () => import('@/views/home/latest/LatestAlbums.vue'),
                                meta: {title: '新碟上架'}
                            },
                        ]
                    },
                ]
            }
        ]
    }
]