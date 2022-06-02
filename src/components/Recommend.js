import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = () => {
  // ME returns null after using logout causing the page to crash. Probably caused by client.resetStore() method
  const me = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (books.loading || me.loading) {
    return <div>loading...</div>
  }

  const favouriteGenre = me.data.me.favouriteGenre

  const recommendations = books.data.allBooks.filter((b) =>
    b.genres.includes(favouriteGenre)
  )
  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendations.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Recommend
