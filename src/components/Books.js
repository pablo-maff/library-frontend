import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const [genresFilter, setGenresFilter] = useState(null)

  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre },
  })

  if (booksByGenre.loading) {
    return <div>loading...</div>
  }

  const books = booksByGenre.data.allBooks

  // Use a set to only have unique values
  const uniqueGenres = new Set()
  books.map((b) => uniqueGenres.add(...b.genres))
  // To transform set into a suitable array use the spread operator
  let options = [...uniqueGenres].map((g) => ({ value: g, label: g }))

  const allBooksOption = [{ value: null, label: 'All Books' }]
  options = allBooksOption.concat(options)

  if (genresFilter === null) setGenresFilter(options)
  else if (options.length > genresFilter.length) setGenresFilter(options)

  return (
    <div>
      <h2>books</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>filter by genre</h3>
        <Select
          defaultValue={null}
          onChange={(genresFilter) => setGenre(genresFilter.value)}
          options={genresFilter}
        />
      </div>
    </div>
  )
}

export default Books
