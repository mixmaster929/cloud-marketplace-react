// const api = {
//     baseUrl: 'http://localhost:1337',
//     nfts: '/api/nfts',
//     nftShowcases: '/api/nft_showcases',
//     authors: '/api/authors',
//     authorsSales: '/api/author_ranks',
//     hotCollections: '/api/hot-collections',
//     contactUs: '/api/contact-forms',
//     blogs: '/api/blog-posts',
//     recent: '/api/blog-posts/posts/recents',
//     comments: '/api/blog-posts/comments',
//     tags: '/api/blog-posts/tags',
// }
// file location: src/core/api.js
const api = {
    // baseUrl: '/mock_data', // mock data base folder
    localbaseUrl: 'http://localhost:8000/api',
    publicUrl: 'http://localhost:8000',
}
// export const openseaApi = {
//     base: 'https://testnets.opensea.io',
//     api: 'https://testnets-api.opensea.io',
// }

export default api;