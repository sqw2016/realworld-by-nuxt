import { request } from '@/plugins/request';

/* 获取文章标签 */
export const getTags = () => {
  return request({
    url: '/api/tags',
    method: 'get'
  })
}