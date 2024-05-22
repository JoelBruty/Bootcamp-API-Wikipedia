function DisplayArticleContent(props) {
    const WikipediaContent=props.WikipediaContent

    return (
        <div>
            <div>
                {WikipediaContent.map(content => (
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                ))}
            </div>
        </div>
    )
}

export default DisplayArticleContent