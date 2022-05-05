import Default from '../layouts/Default';
import Inbox from '../components/Inbox/Inbox';
import React from 'react';
import CompleteProfile from '../components/Browse/CompleteProfile'


const storedData = localStorage.getItem("userStore");

const messages = () => {
  // if (JSON.parse(storedData!).completed_profile == true) {
  if (true) {
    return (
      <Inbox></Inbox>
    )
    } else {
      return (
        <Default>
          <CompleteProfile/>
        </Default>
      )
    }
}

export default messages
