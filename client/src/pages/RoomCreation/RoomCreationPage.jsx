import "./RoomCreationPage.css";
import useFetch from "../../hooks/useFetch";
import usePreloadImages from "../../hooks/usePreloadImages";
import RoomCreationForm from "../../components/RoomCreationForm/RoomCreationForm";
import { useEffect, useState } from "react";

function RoomCreationPage() {
  const { data, isLoading, error } = useFetch("/api/avatar/get-all");
  const [avatarData, setAvatarData] = useState([]);
  const [avatar, setAvatar] = useState([]);

  const circleUrls = data.map((avatar) => avatar.circle);
  usePreloadImages(circleUrls);

  const fullUrls = data.map((avatar) => avatar.full);
  usePreloadImages(fullUrls);

  useEffect(() => {
    const defaultAvatar = {
      _id: "",
      circle: "../../../images/avatars/avatars_default_circle.webp",
      full: "../../../images/avatars/avatars_default_full.webp",
    };
    setAvatar(defaultAvatar);
    if (!isLoading) {
      setAvatarData(data);
      setAvatar(data.at(0));
      sessionStorage.setItem("avatar", JSON.stringify(data.at(0)));
    }
  }, [data]);

  const handleChangeAvatar = () => {
    const chosenAvatar = JSON.parse(sessionStorage.getItem("avatar"));
    setAvatar(chosenAvatar);
  };

  return (
    <div className="room-creation-page-container">
      <div className="avatar-full-container">
        <div className="avatar-full">
          <img src={avatar.full} alt="avatar" />
        </div>
      </div>
      <div className="room-creation-form-component-container">
        <div className="room-creation-form-component">
          <RoomCreationForm
            avatar={avatar}
            avatarData={avatarData}
            changeAvatar={handleChangeAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomCreationPage;
