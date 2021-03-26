import { request } from '@/plugins/request';

/* 获取公共文章列表 */
export const getArticles = params => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params,
  })
}

/* 获取用户喜欢的文章列表 */
export const getFeedArticles = params => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    params,
  })
}

// 点赞文章
export const favoriteArticle = slug => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST',
  })
}

// 取消点赞文章
export const unfavoriteArticle = slug => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE',
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET',
  })
}

// 发布文章
export const publishArticle = data => {
  return request({
    url: '/api/articles',
    method: 'POST',
    data
  })
}

// 删除文章
export const delArticle = slug => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'DELETE',
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET',
  })
}

// 添加评论
export const addComment = (slug, comment) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'POST',
    data: {
      comment: {
        body: comment
      }
    }
  }) 
}

// 删除文章评论
export const delComment = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'DELETE',
  })
}