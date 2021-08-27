import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="primary"
      onClick={loginWithRedirect}
    >
      Log In
    </Button>
  );
};

export default LoginButton;