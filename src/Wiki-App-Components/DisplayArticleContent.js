function DisplayArticleContent(props) {
    // const Data = props.WikipediaData

    const Title = props.WikipediaTitle
    const Image = props.WikipediaImage
    const Article = props.WikipediaContent
    const ID = props.WikipediaID

    // if (Image.source != undefined){
    //     let source = Image.source
    // }

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
                    <p>Article not found - make sure you've typed the article name properly</p>
                    <p>If the article exists and it is typed correctly, you may need to type the article name with correct capitalisation</p>
                </div>
            )}
        </div>
    )
}

export default DisplayArticleContent