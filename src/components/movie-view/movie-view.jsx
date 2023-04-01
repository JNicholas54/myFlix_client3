import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    const { Name, Bio, dob } = movie.Director;
    const { Name: genreName, Description } = movie.Genre;

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImgURL} alt="" />
            </div>

            <div>
                <span>Title: <strong>{movie.Title}</strong></span>
            </div>
            <br></br>

            <div>
                <span>Director: <strong>{Name}</strong></span>
                <div>
                    <p>{Bio}</p>
                    <p>{dob}</p>
                </div>
            </div>

            <div>
                <span>Genre: <strong>{genreName}</strong></span>
                <div>
                    <p>{Description}</p>
                </div>
            </div>
            
            <button onClick={onBackClick} className="back-button" style={{ cursor: pointer }}>Back</button>
        </div>
    );
};