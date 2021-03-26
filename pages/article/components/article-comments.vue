<template>
  <div class="col-xs-12 col-md-8 offset-md-2">

    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="inputComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button @click.prevent="addComment()" class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="comment.author.username === $store.state.user.username">
          <i class="ion-trash-a" @click="delComment(comment.id)"></i>
        </span>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getComments, addComment, delComment } from '@/api/article';

export default {
  name: 'article-comments',
  props: {
    article: Object
  },
  data() {
    return {
      comments: [],
      inputComment: '',
    }
  },
  methods: {
    async getComments() {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    async addComment() {
      await addComment(this.article.slug, this.inputComment)
      this.inputComment = ''
      this.getComments()
    },
    async delComment(id) {
      await delComment(this.article.slug, id)
      this.getComments()
    }
  },
  mounted() {
    this.getComments()
  }
}
</script>

<style>

</style>