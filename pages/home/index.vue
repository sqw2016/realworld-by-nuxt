<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <!-- tab切换 -->
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your'
                    }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global'
                    }
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag
                    }
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <article-list :articles="articles" />         
          <div v-if="!articles.length" class="article-preview" >
            No articles are here... yet.
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
                <nuxt-link
                  class="page-link ng-binding"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tab,
                      tag
                    }
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                class="tag-pill tag-default" 
                v-for="tag in tags" 
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag
                  }
                }"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles, favoriteArticle, unfavoriteArticle } from '@/api/article'
import { getTags } from '@/api/tag'
import articleList from '@/components/article-list';
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  middleware: 'authenticated',
  data() {
  },
  components: {
    articleList
  },
  methods: {
    async changeFavoriteArticle(article) {
      article.favoriteDisable = true
      if (article.favorited) {
        // 取消点赞
        await unfavoriteArticle(article.slug)
        article.favorited = false
        article.favoritesCount--
      } else {
        // 点赞文章
        await favoriteArticle(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      article.favoriteDisable = false
    }
  },
  /* 监听参数变化，触发 asyncData */
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil( this.articlesCount / this.limit )
    }
  },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tag = query.tag
    const tab = query.tab || 'global'
    const loadArticles = tab === 'your' ? getFeedArticles : getArticles
    const [articlesRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagRes.data

    // 为articles的每一项添加 favoriteDisable 属性 
    articles.forEach(item => {
      item.favoriteDisable = false
    })
    
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tag,
      tab
    }
  }
}
</script>

<style>

</style>