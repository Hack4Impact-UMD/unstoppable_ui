import Default from '../layouts/Default'
import React from 'react'
import ViewFavoritesPage from '../components/Favorites/FavoritesPage'
import CompleteProfile from '../components/Browse/CompleteProfile'

export default function Profile() {
  const storedData = localStorage.getItem("userStore");
  
  // if (JSON.parse(storedData).completed_profile == true) {
  if (true) {
    return (
      <Default>
        <ViewFavoritesPage/>
      </Default>
    )
    } else {
      return (
        <Default>
          <CompleteProfile/>
        </Default>
      )
    }
  }