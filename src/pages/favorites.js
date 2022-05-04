import Default from '../layouts/Default'
import React from 'react'
import ViewFavoritesPage from '../components/Favorites/FavoritesPage'
import CompleteProfile from '../components/Browse/CompleteProfile'

export default function Profile() {
  
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