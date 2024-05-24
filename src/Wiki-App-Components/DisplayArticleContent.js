function DisplayArticleContent(props) {
    // const Data = props.WikipediaData

    const Title = props.WikipediaTitle
    const Article = props.WikipediaContent
    const ID = props.WikipediaID

    // console.log(Data)

    // console.log(Title)
    // console.log(Article)
    // console.log(ID[0])

    return (
        <div>
            {/* <div className="wiki">
                <h2>{Title}</h2>
                {Article.map(content => (
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                ))}
            </div> */}

            {ID[0] != undefined ? (
                <div className="wiki">
                    <h2>{Title}</h2>
                    {Article.map(content => (
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ))}
                </div>
            ) : (
                <div className="error">
                    <h2>{Title}</h2>
                    <p>Article does not exist</p>
                </div>
            )}
        </div>
    )
}

export default DisplayArticleContent