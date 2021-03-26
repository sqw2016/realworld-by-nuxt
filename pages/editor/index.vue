<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input :disabled="publishing" v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input :disabled="publishing" v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset :disabled="publishing" class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset :disabled="publishing" class="form-group">
                  <input :disabled="publishing" v-model="tagInput" @keyup.enter="addTag()" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
                  <div class="tag-list">
                    <span v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill ng-binding ng-scope">
                      <i class="ion-close-round" @click="delTag(tag)"></i>
                      {{ tag }}
                    </span>
                </div>
              </fieldset>
              <button :disabled="publishing" @click.prevent="publishArticle()" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, publishArticle } from '@/api/article';

export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  data() {
    return {
      tagInput: '',
      publishing: false // 正在发布文章
    }
  },
  methods: {
    addTag() {
      if (this.publishing) return
      if (this.article.tagList.indexOf(this.tagInput) === -1) {
        this.article.tagList.push(this.tagInput)
        this.tagInput = ''
      }
    },
    delTag(tag) {
      const index = this.article.tagList.indexOf(tag)
      if (index > -1) {
        this.article.tagList.splice(index, 1)
      }
    },
    async publishArticle() {
      this.publishing = true
      const { data } = await publishArticle({ article: this.article })
      const { article } = data
      this.$router.push({
        name: 'article',
        params: {
          slug: article.slug
        }
      })
      this.publishing = false
    }
  },
  async asyncData({params}) {
    if (params.slug) {
      const { data } = await getArticle(params.slug)
      const { article } = data
      return {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      }
    }
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  }
}
</script>

<style>

</style>