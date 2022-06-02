import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = ({ token }) => {
  const [name, setName] = useState(null)
  const [setBornTo, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result?.data?.allAuthors

  const options = authors?.map((a) => ({ value: a.name, label: a.name }))

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({
      variables: { name, setBornTo: parseInt(setBornTo) },
    })

    setName(null)
    setBorn('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors?.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!token ? null : (
        <div>
          <h2>Set Birth Year</h2>
          <form onSubmit={submit}>
            <div>
              name
              <Select
                defaultValue={name}
                onChange={(options) => setName(options.value)}
                options={options}
              />
            </div>
            <div>
              born
              <input
                value={setBornTo}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type='submit'>submit</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Authors
