import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [WikipediaContent, setWikipediaContent] = useState(null)
  const [error, setError] = useState(null)

  let titleQuery = "Wii%20U" //This will be the title that is searched for in the query

  const fetchHandler = async () => {
    setWikipediaContent(null) //Clear content in state (makes loading text appear again)
    setError(null)
    try {
      let response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${titleQuery}`) //API query
      if (!response.ok) { //If response is not OK
        throw new Error(response.statusText) //Throw error with status
      }
      let data = await response.json() //Set data
      console.log(data.query) //Log response query

      const { pages } = await data.query;
      setWikipediaContent(Object.keys(pages).map(id => pages[id].extract)) //Gets extract from response query

    } catch (err) { //Catch error
      setError(`Could not fetch data: ${err.message}`) //Set error message
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchHandler()

  }, [])

  return (
    <div>
      <h1>Fetch Wikipedia Data</h1>
      <button onClick={fetchHandler}>Fetch</button>
      <br />
      {WikipediaContent ? <div>{WikipediaContent.map(content => (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ))}</div> : error ? (<h2>{error}</h2>):(<h2>Loading...</h2>)}
    </div>
  );
}

export default App;
