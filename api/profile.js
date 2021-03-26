
import { request } from '@/plugins/request';

/* 获取用户信息 */
export const getProfile = username => {
  return request({
    url: `api/profiles/${username}`,
    method: 'GET'
  })
}

/* Follow User */
export const followUser = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'POST'
  })
}

/* Unfollow User */
export const unfollowUser = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'DELETE'
  })
}