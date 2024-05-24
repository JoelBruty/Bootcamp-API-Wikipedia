function DisplayArticleContent(props) {
    // const Data = props.WikipediaData

    const Title = props.WikipediaTitle
    const Article = props.WikipediaContent
    const Missing = props.WikipediaMissing

    // console.log(Data)

    // console.log(Title)
    // console.log(Article)
    // console.log(Missing)

    return (
        <div>
            <div className="wiki">
                <h2>{Title}</h2>
                {Article.map(content => (
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                ))}
            </div>

            {/* {Missing === undefined ? (
                <div className="wiki">
                    <h2>{Title}</h2>
                    {Article.map(content => (
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ))}
                </div>
            ) : (
                <div className="error">
                    <h2>{Title}</h2>
                    <p>Article content is undefined</p>
                </div>
            )} */}
        </div>
    )
}

export default DisplayArticleContent