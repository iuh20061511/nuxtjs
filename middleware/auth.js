export default function ({ store, route, redirect }) {
    if (!store.state.auth.loggedIn && route.name !== 'login') {
      return redirect('/login')
    }
  }
  