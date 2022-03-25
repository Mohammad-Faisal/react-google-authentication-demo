import { useState } from "react";
import GoogleLogin, {
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const CLIENT_ID =
  "453936919472-efu89ef221p6icp18ivtro5lnui0hv9d.apps.googleusercontent.com";

const SCOPE = "https://www.googleapis.com/auth/drive";

export const GoogleAuthentication = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signOutHandler = () => {
    console.log("logged out!");
    setIsSignedIn(false);
  };

  const signInHandler = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    setIsSignedIn(true);
    // if (response.accessToken !== undefined) {
    //   console.log(response.accessToken);
    // }
  };

  return (
    <>
      {isSignedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={signOutHandler}
        />
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={signInHandler}
          onFailure={signInHandler}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          scope={SCOPE}
        />
      )}
    </>
  );
};
