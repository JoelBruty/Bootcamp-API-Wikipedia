// import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [WikipediaContent, setWikipediaContent] = useState(null)
  const [error, setError] = useState(null)

  let titleQuery = "Wii%20U"

  const fetchHandler = async () => {
    setWikipediaContent(null)
    try{
      let response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${titleQuery}`)
      if(!response.ok){
       throw new Error(response.statusText)
      }
      let data = await response.json()
      console.log(data.query)

      const { pages } = await data.query;
      setWikipediaContent(Object.keys(pages).map(id => pages[id].extract))

    } catch(err) {
      setError("Could not fetch data")
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
      <br/>
      {WikipediaContent ? <div>{WikipediaContent.map(content => (
        <div dangerouslySetInnerHTML={{ __html: content}}></div>
      ))}</div>:<h2>Loading...</h2>}
    </div>
  );
}

export default App;
