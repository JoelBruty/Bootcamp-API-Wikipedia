// import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [WikipediaData, setWikipediaData] = useState(null)
  const [error, setError] = useState(null)

  const fetchHandler = async () => {
    setWikipediaData(null)
    try{
      let response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=info&titles=Wii%20U`)
      if(!response.ok){
       throw new Error(response.statusText)
      }
      let data = await response.json()
      console.log(data)
      setWikipediaData(data)
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
      {WikipediaData ? <div>{WikipediaData.query.pages.map(pages => pages.name)}</div>:<h2>Loading...</h2>}
    </div>
  );
}

export default App;
