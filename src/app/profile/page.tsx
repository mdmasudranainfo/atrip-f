import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import ProfilePage from "@/components/profile/userInfo/page";

const Profile = async () => {
  return (
    <div>
      <TransparentNavbar isBgWhite={false} />

      <section>
        <ProfilePage />
      </section>
      {/* <section>
                <ProfileTabs />
            </section> */}
      <section>{/* <DataTable /> */}</section>
    </div>
  );
};

export default Profile;
