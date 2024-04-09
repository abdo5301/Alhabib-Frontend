export function useBlog() {
  async function getAllData() {
    if (process.client) {
      try {
        const blog = await useNuxtApp().$apiFetch('/blog/get')
        if (blog.data) {
          return blog.data
        }
      } catch (error) {
        console.log(error.data)
        return error.data
      }
    }
  }
  async function getArticles(data_url) {
    if (process.client) {
      try {
        const blog_articles = await useNuxtApp().$apiFetch(data_url)
        if (blog_articles.data) {
          return blog_articles
        }
      } catch (error) {
        console.log(error.data)
        return error.data
      }
    }
  }

  async function getArticle(article_id) {
    if (process.client) {
      try {
        const article = await useNuxtApp().$apiFetch(
          '/blog/blog-articles/get?blog_article_id=' + article_id
        )
        if (article.data && article.status) {
          return article.data
        }
      } catch (error) {
        console.log(error.data)
        return error.data
      }
    }
  }

  return { getAllData, getArticles, getArticle }
}
