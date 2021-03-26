<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              v-if="$store.state.user.username === profile.username" 
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{
                name: 'settings',
              }"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="doFollowing"
              @click="onFollowUser()"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow Eric Simons' :  'Follow Eric Simons'}}
            </button>
            
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: curTab === 'author'
                  }"
                  @click.prevent="changeTab('author')"
                  href=""
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: curTab === 'favorited'
                  }"
                  @click.prevent="changeTab('favorited')"
                  href=""
                >Favorited Articles</a>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <article-list :articles="articles"></article-list>
          <div v-if="!loading && !articles.length" class="article-preview" >
            No articles are here... yet.
          </div>
          <div v-show="loading" class="article-preview" >
            Loading articles...
          </div>
          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li 
                class="page-item ng-scope"
                :class="{
                  active: item === page
                }" 
                v-for="item in totalPage" 
                :key="item"
              >
                <a
                  class="page-link ng-binding"
                  href=""
                  :disabled="item === page"
                  @click.prevent="clickPage(item)"
                >
                  {{ item }}
                </a>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile, followUser, unfollowUser } from '@/api/profile'
import { getArticles } from '@/api/article'
import articleList from '@/components/article-list';

export default {
  name: 'profileIndex',
  middleware: 'authenticated',
  components: {
    articleList
  },
  data() {
    return {
      articles: [],
      loading: false,
      curTab: 'author',
      page: 1,
      limit: 10,
      totalPage: 0,
      doFollowing: false
    }
  },
  watch: {
    profile() {
      this.getArticles()
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    changeTab(val) {
      this.curTab = val
      this.page = 1
      this.totalPage = 0
      this.articles = []
      this.getArticles()
    },
    clickPage(val) {
      if (this.page === val) return 
      this.page = Number.parseInt(val)
      this.getArticles()
    },
    async getArticles() {
      this.loading = true
      const tabParams = {}
      tabParams[this.curTab] = this.profile.username
      const { data } = await getArticles({
        page: this.page,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
        ...tabParams
      })
      this.articles = data.articles
      this.totalPage = Math.ceil(data.articlesCount / this.limit)
      this.loading = false
    },
    async onFollowUser() {
      this.doFollowing = true
      const fn = this.profile.following ? unfollowUser : followUser
      await fn(this.profile.username)
      this.profile.following = !this.profile.following
      this.doFollowing = false
    }
  },
  async asyncData({ params }) {
    const { data } = await getProfile(params.username)
    return {
      profile: data.profile
    }
  }
}
</script>

<style>

</style>