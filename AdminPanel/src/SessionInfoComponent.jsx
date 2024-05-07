import { useState, useEffect } from "react";
import axios from "axios";

const SessionInfoComponent = () => {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8084/api/session");
        setSessionInfo(response.data);
      } catch (error) {
        setError("Error fetching session info: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {sessionInfo ? (
        <div>
          <p>User ID: {sessionInfo.userId}</p>
          <p>Username: {sessionInfo.username}</p>
        </div>
      ) : (
        <p>Session info not available</p>
      )}
    </div>
  );
};

export default SessionInfoComponent;
