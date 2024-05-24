function SearchForm({
    handleSubmit,
    input,
    currentArticle,
    WikipediaID,
    setTitleQuery }) {


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Search for article:
                <br />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setTitleQuery(e.target.value)}
                />
            </label>
            <button>Fetch</button>
            <br />
            <br />
            <label>Current article: {currentArticle}</label>
            <br />
            <label>Article ID: {WikipediaID}</label>
        </form>
    )
}

export default SearchForm