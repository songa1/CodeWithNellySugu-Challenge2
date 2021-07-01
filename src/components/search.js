import React, {useState} from 'react';

const Search = () => {
    const [albumId, setAlbumId] = useState('')
    const [albums, setAlbums] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleSearch = (e) => {
        e.preventDefault();
        albumId === '' ?  window.alert("Id can't be empty") : search()
        
    }
    const search = () => {
        setLoading(true)
        setAlbums(null)
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then(response => response.json())
        .then(data => {
            if(!data){
                console.log("No albums found!")
            }else {
                setAlbums(data)
                setLoading(false)
            }
        })
    }

    return (
        <div className="container">
            <div></div>
            <div>
                <div className="search-bar">
                    <input type="text" placeholder="Enter Id here to get albums" value={albumId} onChange={(e) => setAlbumId(e.target.value)}></input>
                    <button onClick={handleSearch}>Get Album Photos By Id</button>
                </div>
                {albums && <center><button style={{color: "#fff", padding: "10px", backgroundColor: "red", borderRadius: "5px", border: "none", outline: "none"}} onClick={()=>{
                    setAlbums(null)
                    setAlbumId('')
                }}>Reset</button></center>}
                <div>
                    {loading && <h4 style={{textAlign: 'center', color: 'rgb(15, 63, 126)'}}>Getting albums ... Please wait...</h4>}
                    {albums && <div className="gallery-list">
                        {albums.map((album) => (
                            <div className="gallery-item" key={album.id}>
                                <img src={album.thumbnailUrl} alt={album.title}></img>
                                <h4>{album.title}</h4>
                            </div>
                        ))}
                    </div>}
                    {!albums || !loading && <h4 style={{textAlign: 'center', color: 'rgb(15, 63, 126)'}}>No albums, enter a valid Id to get a list of Albums.</h4>}
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Search;