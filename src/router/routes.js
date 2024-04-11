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
                props: true,
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
                        redirect: {
                            name: 'LatestSongs'
                        },
                        component: () => import('@/views/home/latest/LatestPage.vue'),
                        meta: {title: '最新音乐'},
                        children: [
                            {
                                path: 'songs',
                                name: 'LatestSongs',
                                component: () => import('@/views/home/latest/LatestSongs.vue'),
                                meta: {title: '新歌速递'}
                            },
                            {
                                path: 'albums',
                                name: 'LatestAlbums',
                                component: () => import('@/views/home/latest/LatestAlbums.vue'),
                                meta: {title: '新碟上架'}
                            },
                        ]
                    },
                ]
            },
            // 搜索页
            {
                name: 'SearchPage',
                path: 'search',
                props: true,
                component: () => import('@/views/search/SearchPage.vue'),
                redirect: {name: 'SearchSongs'},
                children: [
                    {
                        name: 'SearchSongs',
                        path: 'songs',
                        props: true,
                        component: () => import('@/views/search/SearchSongs.vue')
                    },
                    {
                        name: 'SearchAlbums',
                        path: 'albums',
                        props: true,
                        component: () => import('@/views/search/SearchAlbums.vue')
                    },
                    {
                        name: 'SearchArtists',
                        path: 'artists',
                        props: true,
                        component: () => import('@/views/search/SearchArtists.vue')
                    },
                    {
                        name: 'SearchPlaylist',
                        path: 'playlist',
                        props: true,
                        component: () => import('@/views/search/SearchPlaylist.vue')
                    },
                    {
                        name: 'SearchUsers',
                        path: 'users',
                        props: true,
                        component: () => import('@/views/search/SearchUsers.vue')
                    },
                    {
                        name: 'SearchMvs',
                        path: 'mvs',
                        props: true,
                        component: () => import('@/views/search/SearchMvs.vue')
                    }
                ]
            },
            // 详情页
            {
                name: 'Detail',
                path: 'detail',
                props: true,
                component: () => import('@/views/detail/DetailPage.vue'),
                children: [
                    {
                        name: 'ArtistDetail',
                        path: 'artist',
                        props: true,
                        component: () => import('@/views/detail/artist/ArtistDetail.vue'),
                        redirect: {name: 'ArtistAlbum'},
                        children: [
                            {
                                name: 'ArtistAlbum',
                                path: 'album',
                                component: () => import('@/views/detail/artist/ArtistAlbum.vue'),
                            },
                            {
                                name: 'ArtistMV',
                                path: 'mv',
                                component: () => import('@/views/detail/artist/ArtistMV.vue'),
                            },
                            {
                                name: 'ArtistInfo',
                                path: 'info',
                                component: () => import('@/views/detail/artist/ArtistInfo.vue'),
                            },
                            {
                                name: 'SimilarArtist',
                                path: 'similar',
                                component: () => import('@/views/detail/artist/SimilarArtist.vue'),
                            }
                        ]
                    },
                    {
                        name: 'AlbumDetail',
                        path: 'album',
                        props: true,
                        component: () => import('@/views/detail/album/AlbumDetail.vue'),
                        redirect: {name: 'AlbumSongs'},
                        children: [
                            {
                                name: 'AlbumSongs',
                                path: 'songs',
                                component: () => import('@/views/detail/album/AlbumSongs.vue')
                            },
                            {
                                name: 'AlbumComments',
                                path: 'comments',
                                component: () => import('@/views/detail/album/AlbumComments.vue')
                            },
                            {
                                name: 'AlbumInfo',
                                path: 'info',
                                component: () => import('@/views/detail/album/AlbumInfo.vue')
                            }
                        ]
                    },
                    {
                        name: 'PlaylistDetail',
                        path: 'playlist',
                        props: true,
                        component: () => import('@/views/detail/playlist/PlaylistDetail.vue'),
                        redirect: {name: 'PlaylistSongs'},
                        children: [
                            {
                                name: 'PlaylistSongs',
                                path: 'songs',
                                component: () => import("@/views/detail/playlist/PlaylistSongs.vue")
                            },
                            {
                                name: 'PlaylistComments',
                                path: 'comments',
                                component: () => import('@/views/detail/playlist/PlaylistComments.vue')
                            },
                            {
                                name: 'PlaylistSubscribers',
                                path: 'subscribers',
                                component: () => import('@/views/detail/playlist/PlaylistSubscribers.vue')
                            }
                        ]
                    }
                ]
            }
        ]
    }
]