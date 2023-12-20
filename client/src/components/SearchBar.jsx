import React, { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import { getApi } from "./ApiUrl";
import ArticlePreview from "../models/ArticlePreview";

const SearchBar = () => {

    const [articles, setArticles] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchInitiated, setSearchInitiated] = useState(false);

    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchInitiated(true);

        fetch(`${getApi()}/search?q=${encodeURIComponent(searchInput)}`)
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }


    return (
        <div className="SearchBar" id="SearchBar">
            <form className="searchContainer" onSubmit={handleSearchInput}>
                <p><ion-icon name="options-outline"></ion-icon></p>
                <input 
                    placeholder="Search 3d Model..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
            </form>
            <div className="foundContainer">
                {searchInitiated && articles.length === 0 ? (
                    <div className="notFoundContainer">
                        <h2>No Articles found :/</h2>
                    </div>
                ) : (
                    <div className="foundArticlesContainer">
                        {articles.map((article) => (
                            <ArticlePreview
                                navigation={article._id}
                                key={article._id}
                                previewImage={getApi() + "/articles/" + article.previewImage} 
                                tag={article.tags[0]}
                                description={article.description}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default SearchBar;