<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li 
              class="tag-default tag-pill tag-outline ng-binding ng-scope"
              v-for="tag in article.tagList"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">

        <article-comments :article="article" />

      </div>

    </div>

  </div>
</template>

<script>
import { getArticle } from '@/api/article';
import MarkdownIt from 'markdown-it';
import articleMeta from './components/article-meta';
import articleComments from './components/article-comments';

export default {
  name: 'ArticleIndex',
  middleware: 'authenticated',
  async asyncData({ params }) {
    const { data: {article} } = await getArticle(params.slug)
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: article
    }
  },
  components: {
    articleMeta,
    articleComments
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
       meta: [
          // hid是为了避免meta标签不能正确覆盖父组件中相同的标签而产生重复,
          //一般设置为name
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
    }
  }
}
</script>

<style>

</style>