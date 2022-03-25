### React Google Login Demo

If we need to interact with any google services or just to authenticate a user using google we have to implement the authentication mechanism with google. Some use cases can be

- Uploading files to google drive using ReactJS
- Interacting with Youtube API from ReactJS
- Interaction with Google sheets from ReactJS

To implement this there is already a nice library called [login with google](https://www.npmjs.com/package/react-google-login) for us. Let's see how we can use that

First install the dependency

```sh
yarn add react-google-login
```

### Pre-requisites

You will need to have a account on [Google cloud](https://console.cloud.google.com/). If you don't already have that first create a free account and then continue.

You will also need a google cloud project and get the **CLIENT_ID** from the credentials dashboard. I am assuming you already have that.

### Use the google login

Then import the GoogleLogin and use it inside the code.

```js
import React from "react";
import { GoogleLogin } from "react-google-login";

const CLIENT_ID = "YOUR_CLIENT_ID_HERE";

function Login() {
  const responseGoogle = (response: any) => {
    console.log(response.accessToken);
  };
  return (
    <div className="App">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
```

If login is successful you will get an **accessToken** and a **tokenId** inside the response object. Save that token inside a state variable or something. You can use this **accessToken** to make further calls to other services.

### Logout

We can also implement the logout functionality using this same library.

```js
import { GoogleLogout } from "react-google-login";

function Logout() {
  const logoutHandler = () => {
    console.log('successfully logged out!);
  };
  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={logoutHandler}
    />
  );
}

export default Logout;
```

In real life applications we want to use both of this features based on the authentication state. We can combine these 2 features to track the signed in state and show the appropriate component.

The final code will look something like this.

```js
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
```

You will notice that we have introduced a new variable named **scope** here. In order to make calls to services like Youtube API or Google Drive API we have to define the scopes here.

You can get the scopes from [OAuth2 playground](https://developers.google.com/oauthplayground/)

Example

```js
GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive";
YOUTUBE_DATA_API_V3 = "https://www.googleapis.com/auth/youtube";
```

That's it today!

Article Link:
https://www.mohammadfaisal.dev/blog/react-google-authentication
