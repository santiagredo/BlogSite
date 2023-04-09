import "./Error.css";

export function Error () {
    const error_image = new URL("./assets/error-404.png", import.meta.url).href;

    return (
        <div className="error_container">
            <img alt="Error, not found image" src={error_image}/>
            <p>
                It seems you are looking for something that doesn't exist, please try again.
            </p>
        </div>
    );
};