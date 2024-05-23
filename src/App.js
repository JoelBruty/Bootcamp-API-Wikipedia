import './App.css';

import DisplayArticleContent from './Wiki-App-Components/DisplayArticleContent';

import { useEffect, useState } from 'react';

function App() {

  const [WikipediaData, setWikipediaData] = useState(null)

  const [WikipediaTitle, setWikipediaTitle] = useState(null)
  const [WikipediaContent, setWikipediaContent] = useState(null)
  const [error, setError] = useState(null)

  let titleQuery = "Wii U" //This will be the title/article that is searched for in the query

  const fetchHandler = async () => {
    //Clear content in state (makes loading text appear again and if an error occured stops displaying the message)
    setWikipediaData(null)

    setWikipediaTitle(null)
    setWikipediaContent(null)
    setError(null)

    try {
      let response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${titleQuery}`) //API query
      if (!response.ok) { //If response is not OK
        throw new Error(response.statusText) //Throw error with status
      }
      let data = await response.json() //Set data
      console.log(data.query) //Log response query

      const { pages } = await data.query;

      setWikipediaData(Object.keys(pages).map(id => [pages[id].title, pages[id].extract]))

      setWikipediaTitle(Object.keys(pages).map(id => pages[id].title))
      setWikipediaContent(Object.keys(pages).map(id => pages[id].extract)) //Gets extract from response query

    } catch (err) { //Catch error
      setError(`Error: ${err.message}`) //Set error message
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchHandler()

  }, [])

  return (
    <div>
      <div className="form">
        <h1>Fetch Wikipedia Data</h1>
        <button onClick={fetchHandler}>Fetch</button>
      </div>
      <br />
      <div>
        {WikipediaContent ? <DisplayArticleContent WikipediaData={WikipediaData} WikipediaTitle={WikipediaTitle} WikipediaContent={WikipediaContent} /> : error ? (<div className="error"><h2>{error}</h2></div>) : (<div className="loading"><h2>Loading...</h2></div>)}
      </div>
    </div>
  );
}

export default App;
