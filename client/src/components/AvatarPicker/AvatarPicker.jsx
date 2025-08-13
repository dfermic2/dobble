import "./AvatarPicker.css";

function AvatarPicker({ avatars, changeAvatar }) {
  const handleAvatarClick = (id) => {
    const chosenAvatar = avatars.find((avatar) => avatar._id === id);
    sessionStorage.setItem("avatar", JSON.stringify(chosenAvatar));
    changeAvatar();
  };
  return (
    <div className="avatar-picker-container">
      <div className="avatar-list">
        {avatars.map((avatar) => (
          <div
            className="avatar-container"
            id={avatar._id}
            key={avatar._id}
            onClick={() => handleAvatarClick(avatar._id)}
          >
            <img src={avatar.circle} alt="avatar" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarPicker;
