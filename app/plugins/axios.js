export default function({ store, $axios, redirect }) {
  // リクエスト時にトークンを付与する
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.common['Authorization'] =
        'Bearer ' + store.state.user.token
    }
  })

  // 認証エラー時の処理
  $axios.onError(error => {
    if (error.response.status === 401) {
      redirect('/login')
    }
  })
}
