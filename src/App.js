import "./App.css";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, signOut } from "./features/userSlice";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";

function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            id: userAuth.uid,
            displayName: userAuth.displayName,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(signOut());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
