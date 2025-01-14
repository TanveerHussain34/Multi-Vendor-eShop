import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSidebar from "../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";
import { useState } from "react";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} bg-[#f5f5f5] flex py-10`}>
        <div className="w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
}

export default ProfilePage;
