import ReactLoading from "react-loading";
import "../Loader/Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <h3 className="loader__loading">Loading...</h3>
      <ReactLoading type="cylon" width={150} height={150} color="#151715" />
    </div>
  );
}
