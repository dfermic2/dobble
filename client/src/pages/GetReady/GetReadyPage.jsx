import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import useFetch from "../../hooks/useFetch";
import usePreloadImages from "../../hooks/usePreloadImages";
import socket from "../../utils/Socket";
import "./GetReadyPage.css";

function GetReadyPage() {
  socket.connect();
  const { data, loadingFetch, error } = useFetch("/api/icon/get-all");

  const imageUrls = data.map((icon) => icon.url);
  const loadingImages = usePreloadImages(imageUrls);

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/gameplay");
  }, 2000);

  return (
    <div className="get-ready-page-container">
      <ClipLoader color="#e94b3f" size={375} speedMultiplier={0.5} />
    </div>
  );
}

export default GetReadyPage;
