import './App.css';

import DisplayArticleContent from './Wiki-App-Components/DisplayArticleContent';
import SearchForm from './Wiki-App-Components/SearchForm';

import { useEffect, useState } from 'react';

function App() {

  // const [WikipediaData, setWikipediaData] = useState(null)

  const [WikipediaTitle, setWikipediaTitle] = useState(null)
  const [WikipediaImage, setWikipediaImage] = useState(null)
  const [WikipediaContent, setWikipediaContent] = useState(null)
  const [WikipediaID, setWikipediaID] = useState(null)
  const [error, setError] = useState(null)

  const [titleQuery, setTitleQuery] = useState("Wikipedia") //This will be the title/article that is searched for in the query

  const fetchHandler = async () => {
    //Clear content in state (makes loading text appear again and if an error occured stops displaying the message)

    // setWikipediaData(null)

    setWikipediaTitle(null)
    setWikipediaImage(null)
    setWikipediaContent(null)
    setWikipediaID(null)

    setError(null)

    try {
      let response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts|pageimages&redirects=true&titles=${titleQuery}`) //API query
      if (!response.ok) { //If response is not OK
        throw new Error(response.statusText) //Throw error with status
      }
      let data = await response.json() //Set data
      console.log(data) //Log response query

      const { pages } = await data.query;

      //Gets specific data from response query

      // setWikipediaData(Object.keys(pages).map(id => [pages[id].title, pages[id].extract]))

      setWikipediaTitle(Object.keys(pages).map(id => pages[id].title))
      try{
      setWikipediaImage(Object.keys(pages).map(id => pages[id].thumbnail.source))
      }
      catch{
      setWikipediaImage(null)
      }
      setWikipediaContent(Object.keys(pages).map(id => pages[id].extract))
      setWikipediaID(Object.keys(pages).map(id => pages[id].pageid))

    } catch (err) { //Catch error
      setError(`Error: ${err.message}`) //Set error message
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchHandler()

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (titleQuery) //Only add if the article title has been entered
    {
      fetchHandler()
    }
    else {
      alert("Please enter the name of the article") //Give an alert to the user if a task hasn't been given
    }
  }

  return (
    <div>
      <div className="form">
        <h1>Fetch Wikipedia Article Data</h1>
        <SearchForm
          currentArticle={WikipediaTitle}
          WikipediaID={WikipediaID}
          setTitleQuery={setTitleQuery}
          handleSubmit={handleSubmit} />
      </div>
      <br />
      <div>
        {WikipediaContent ? <DisplayArticleContent
          // WikipediaData={WikipediaData}
          WikipediaTitle={WikipediaTitle}
          WikipediaImage={WikipediaImage}
          WikipediaContent={WikipediaContent}
          WikipediaID={WikipediaID} /> : error ? (<div className="error"><h2>{error}</h2></div>) : (<div className="loading"><h2>Loading...</h2></div>)}
      </div>
    </div>
  );
}

export default App;
