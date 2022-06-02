import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { BOOKS_BY_GENRE, BOOK_ADDED } from './queries'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const loginData = localStorage.getItem('library-user-token')
    setToken(loginData)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)

      // Add subscription data to cache
      client.cache.updateQuery(
        { query: BOOKS_BY_GENRE, variables: { genre: null } },
        ({ allBooks }) => ({
          allBooks: allBooks.concat(addedBook),
        })
      )
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <Navbar token={token} logout={logout} />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/authors' element={<Authors token={token} />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/create' element={<NewBook />} />
        <Route path='/recommend' element={<Recommend />} />
      </Routes>
    </>
  )
}

export default App
