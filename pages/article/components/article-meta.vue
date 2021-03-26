<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img src="http://i.imgur.com/Qr71crq.jpg" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="article.author.username === $store.state.user.username">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'dynamic-editor',
          params: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button 
        class="btn btn-outline-danger btn-sm" 
        :disabled="article.isDeleting"
        @click="delArticle()"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button 
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button 
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited
        }"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { delArticle } from '@/api/article';
export default {
  name: 'articleMeta',
  props: {
    article: Object
  },
  mounted() {
    this.$set(this.article, 'isDeleting', false)
  },
  methods: {
    async delArticle() {
      this.article.isDeleting = true
      try {
        await delArticle(this.article.slug)
      } catch(e) {
      }
      this.$router.push('/')
      this.article.isDeleting = false
    }
  }
}
</script>

<style>

</style>