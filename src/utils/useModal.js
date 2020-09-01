import { useState } from 'react';
const UseModal = () => {
  const [isShowing, setisShowing] = useState(false);
  const [profile, setprofile] = useState(false);
  function toggle() {
    setisShowing(!isShowing);
  }
  function toggleProfile() {
    setprofile(!profile);
  }
  return {
    isShowing,
    profile,
    toggle,
    toggleProfile

  }
};
export default UseModal;