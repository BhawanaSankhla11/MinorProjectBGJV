import useAPIAuth from '@/lib/useAPIAuth';
import useAPIData from '@/lib/useAPIData';
import { useEffect, useState } from 'react';

// export async function getStaticProps() {

//   return {
//     props: {
//       profileData
//     }
//   };
// }

function ProfilePage() {
  const {setUser,loginStatus,logoutUser} = useAPIAuth();
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const {getItem} = useAPIData();
  const [profileData,setProfileData] = useState(undefined);
  //const { name, phoneNumber, email, branch, profileImage,regestrationno,year,semester } = profileData;

  useEffect(()=>{
    if(!loginStatus){
      setUser({email:'comadmin@mbm.ac.in',password:'com@123'}).then((success)=>{
        setIsLoggedIn(success);
      });
    }else setIsLoggedIn(true);
  },[isLoggedIn,loginStatus]);

  useEffect(()=>{
    if(!profileData){
      getItem('Com_userdetails',1,'*,branch.BranchName',true).then((data)=>{
        setProfileData(data);
      });
    }
  },[profileData]);

  function logout(){
    logoutUser().then(()=>{
      console.log("User logged out..");
      setIsLoggedIn(false);
    });
  };

//<img src={profileImage} alt="Profile Image" width={150} height={150} />
          
  if(isLoggedIn){
  return (
    <>
      {profileData ? 
        <div>
          <h1>{profileData.name}</h1>
          <p>Phone Number: {profileData.mobile}</p>
          <p>Email: {profileData.email}</p>
          <p>Branch: {profileData.branch.BranchName}</p>
          <p>Year: {profileData.year}</p>
          <p>Semester: {profileData.semester}</p>
          <button onClick={logout}>Logout</button>
        </div> 
      :  <>User data not recieved yet!</>
      }
    </>
  );
  }else{
    return <>
    <h3>User not logged in..</h3>
    </>;
  }
}

export default ProfilePage;
