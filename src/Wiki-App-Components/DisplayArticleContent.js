function DisplayArticleContent(props) {
    // const Data = props.WikipediaData

    const Title = props.WikipediaTitle
    const Image = props.WikipediaImage
    const Article = props.WikipediaContent
    const ID = props.WikipediaID

    if (Image.source != undefined){
        let source = Image.source
    }

    // console.log(Data)

    // console.log(Title)
    // console.log(Image)
    // console.log(Article)
    // console.log(ID[0])

    return (
        <div>
            {ID[0] != undefined ? (
                <div className="wiki">
                    <h2>{Title}</h2>
                    <img src = {Image}></img>
                    {Article.map(content => (
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ))}
                </div>
            ) : (
                <div className="error">
                    <h2>{Title}</h2>
                    <p>Article does not exist - make sure you've typed the article name properly</p>
                </div>
            )}
        </div>
    )
}

export default DisplayArticleContent