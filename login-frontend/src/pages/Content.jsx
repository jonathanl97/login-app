import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  /*
  const navigate = useNavigate();

  useEffect(() => {
    redirectUser();
  }, []);

  async function redirectUser() {
    const response = await checkAuthenticated();
    if (!response) navigate("/signin");
  }
  */

  return (
    <div>
      <h1 style={{ marginTop: 60, marginBottom: 40 }}></h1>
    </div>
  );
}
