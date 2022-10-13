import { Navigate, Route, Routes } from 'react-router-dom';
import Links from '../Design/Links/Links';
import AuthContainer from './AuthContainer';
import MainHeader from './Tinder/Header';
import Likes from './Tinder/Likes';
import Swipe from './Tinder/Swipe';

const handleSwipeLink = (e) => {
  e.target.className = 'swipe active';
}

const handleLikeLink = (e) => {
e.target.className = 'likes active';
}

const App = () => {
  return (
  <AuthContainer>
    <MainHeader/>
    <Links onActivateSwipe={handleSwipeLink} onActivateLikes={handleLikeLink}></Links>
   <Routes>
     <Route path="swipe" element={<Swipe/>} />
     <Route path="likes" element={<Likes/>} />
    <Route path="/" element={<Navigate to="/swipe" />} />
   </Routes>
  </AuthContainer>
  );
}

export default App;
