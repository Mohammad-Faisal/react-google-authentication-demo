import { useState } from "react";
import GoogleLogin, {
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const CLIENT_ID = "YOUR_CLIENT_ID";

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
