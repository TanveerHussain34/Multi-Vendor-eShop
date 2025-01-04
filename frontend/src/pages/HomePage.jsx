import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/user/userThunks";

function HomePage() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome, {user?.name}!</h1>
      ) : (
        error && <p>Error: {error}</p>
      )}
    </div>
  );
}

export default HomePage;
