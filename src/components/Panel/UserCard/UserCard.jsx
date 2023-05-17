// import other component 
import UserProfile from '../UserProfile/UserProfile'
import SideBarLinks from '../SideBarLinks/SideBarLinks'


const UserCard = ({ sidebarLinks, username, userBirthday, userEmail, onChangeToggle }) => {
    return (
        <>
            <UserProfile username={username} userBirthday={userBirthday} userEmail={userEmail} />
            <SideBarLinks sidebarLinks={sidebarLinks} onChangeToggle={onChangeToggle} />
        </>
    )
}

export default UserCard