const router = require('koa-router')()
const News = require('../models/news')
// const moment = require('moment')
const recommend = []
const clickRank = []
router.get('/', async (ctx, next) => {
  // console.log(ctx)
  // console.log(typeof News.getNewsList())
  // News.getNewsList().then(function(news) {
  //   console.log(news)
  // })
  const newsList = await News.getNewsList()
  const recommend = await News.getNewsList({query: {"isRecommend": true}, pageSize: 7})
  const clickRank = await News.getNewsList({sortWay: 2, pageSize: 12})
  await ctx.render('index', {
    newsList: newsList,
    recommend: recommend,
    clickRank: clickRank
  })
})

router.get('/signOut', async (ctx, next) => {
  ctx.session.username = null
  ctx.redirect('/')
})

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
