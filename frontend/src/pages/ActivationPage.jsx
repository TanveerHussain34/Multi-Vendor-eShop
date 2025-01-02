import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

function ActivationPage() {
  const { activation_token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const response = await axios.post(`${server}/activation`, {
            activation_token,
          });
          console.log("Activation successful:", response.data);
          setError(false);
        } catch (err) {
          console.error(
            "Error activating account:",
            err.response?.data || err.message
          );
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      sendRequest();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Your token is expired or invalid!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}

export default ActivationPage;
