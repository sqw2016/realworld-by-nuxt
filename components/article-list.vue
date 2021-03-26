<template>
  <div>
    <!-- 文章列表 -->
    <div class="article-preview" v-for="article in articles" :key="article.slug">
      <div class="article-meta">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }">
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link 
            class="author" 
            :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }"
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{
            active: article.favorited
          }"
          :disabled="article.favoriteDisable"
          @click="changeFavoriteArticle(article)"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{
          name: 'article',
          params: {
            slug: article.slug
          }
        }"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li
            class="tag-default tag-pill tag-outline ng-binding ng-scope"
            v-for="item in article.tagList"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  props: {
    articles: Array
  }
}
</script>

<style>

</style>