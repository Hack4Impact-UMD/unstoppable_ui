import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import './index.scss';
import colors from '../../assets/colors'
import { useDataStore } from "../../UserContext";
import {Link} from 'react-router-dom';
import Button from '../Styled/Button';
import Paper from '../Styled/Paper';
import LikedProfile from '../Users/LikedProfile'

// icon imports
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import NotesIcon from '@material-ui/icons/Notes';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WorkIcon from '@material-ui/icons/Work';
import ExploreIcon from '@material-ui/icons/Explore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarIcon from '@material-ui/icons/Star';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import LocalHospitalTwoToneIcon from '@material-ui/icons/LocalHospitalTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import HealingTwoToneIcon from '@material-ui/icons/HealingTwoTone';



// other imports
import Tooltip from '@material-ui/core/Tooltip';
import TimeAgo from 'timeago-react';  
import { Grid } from '@material-ui/core';


const UserSection: React.FC<{user: any, me: boolean }> = ({ user, me}) => {
  const store = useDataStore()

  const ProfileIconRow = ({ icon, field, answer, chips }) => {
    if (!answer || answer === "") {
      return null
    }

    return (
      <span className="full-profile-icon-row">
        <span className="field-question-profile">
          {icon} <span><b>{field}</b></span>:&nbsp;
        </span>
        <span className="field-answer muted-text">{answer} &nbsp;</span>  &nbsp;
      </span>
    )
  }

  const ChipList = () => {
    const Chip = ({ activityId }) => {
      const getMatch = () => {
        const matched = store.activities.find(({ id }) => id === activityId )
        if (matched) return matched.name
        return null
      }      

      return (
        <span className="profile-single-chip">{getMatch() ? getMatch() : null}</span>
      )
    }

    return (
      <span className="profile-chip-list">
        {user.activity_ids.map((activity: any, i: number) => 
          <Chip key={i} activityId={activity} />
        )}
      </span>
    )
  }

  return (
    <div>
      <Paper margin="2em 0em">
        
        <img className="user-section-image" src={ROOTURL + user.photo} />

        <div className="user-general-info">
          <h1 className="user-header">{user.name}</h1>
          <div className="full-profile-location muted-text">{user.city}, {user.state}, {user.country}</div>
            <div
              style={{
                backgroundColor: user.active ? '#4DED30' : 'white'
              }}
            >
              <p style={{ fontSize: "20px" }}>
                <span> Last login at:&nbsp;&nbsp; 
                    <TimeAgo
                      datetime={user.last_seen_at}
                      locale='en.US'
                    />
                </span>
              </p>
          </div>
        </div>
      </Paper>

      <div className="user-section-wrapper">
        <div className="user-section-data">
        <Grid container spacing={3}>
            <Grid item xs> 
            <Paper margin="2em 0em" className="about-me">
              <div className="profile-section-header">About me </div>
              <ProfileIconRow field={"Age"} chips={false} answer={user.age} icon={<EmojiPeopleIcon className="full-profile-icon" />}/>
              <ProfileIconRow field={"Personality"} chips={false} answer={user.personality} icon={<EmojiPeopleIcon className="full-profile-icon" />}/><br/>

              <ProfileIconRow field={"Work Status"} chips={false} answer={user.work_status} icon={<WorkIcon className="full-profile-icon" />}/><br/>

              <ProfileIconRow field={"Details"} chips={false} answer={user.details_about_self}
                icon={<NotesIcon className="full-profile-icon" />}/>

            </Paper>
            </Grid>

            <Grid item xs>
            <Paper margin="2em 0em" className="cancer-type">
              <div className="profile-section-header">Cancer Type</div>
              
              <ProfileIconRow field={"Infected"} chips={false} answer={user.cancer_location + " Cancer"} icon={null}/>
              <ProfileIconRow field={"Treatment description"} chips={false} answer={user.treatment_description} icon={<LocalHospitalTwoToneIcon className="full-profile-icon" />}/><br/>

              <ProfileIconRow field={"Treatment status"} chips={false} answer={user.treatment_status} icon={<LocalHospitalTwoToneIcon className="full-profile-icon" />}/><br/>
              
              <ProfileIconRow field={"Part of wellness program?"} chips={false} answer={user.part_of_wellness_program ? "✅" : "No"} icon={<FavoriteTwoToneIcon className="full-profile-icon" />}/>

              {user.part_of_wellness_program ? <ProfileIconRow field={"Which wellness program?"} chips={false} answer={user.which_wellness_program} icon={<FavoriteTwoToneIcon className="full-profile-icon" />}/> : null}
            </Paper>
            </Grid>
        </Grid>
          
          <Paper margin="2em 0em">
            <div className="profile-section-header">Activity/Fitness</div>

            <ProfileIconRow field={"Reasons for Match"} chips={false} answer={user.reason_for_match} icon={null}/>

            <ProfileIconRow field={"Fitness Level"} chips={false} answer={user.fitness_level} icon={<FitnessCenterIcon className="full-profile-icon" />}/>

            <ProfileIconRow field={"Preferred exercise time"} chips={true} answer={user.prefered_exercise_time} icon={<ScheduleIcon className={"full-profile-icon"} />} /> <br/>

            <ProfileIconRow field={"Activities"} chips={true} answer={<ChipList />} icon={<SportsTennisIcon className={"full-profile-icon"} />} />

            <ProfileIconRow field={"Preferred exercise location"} chips={true} answer={user.preferred_excercise_location} icon={<ExploreIcon className={"full-profile-icon"} />} />

            
          </Paper>
      </div>
      {/* <div className="user-metadata">
        <img className="user-section-image" src={ROOTURL + user.photo} />
        {me ?  null : (
          <div style={{ display: "flex" }}>
            <Link style={{ textDecoration: "underline" }} to="/messages">
              <Button margin="0em 0.3em 0em 0em" padding="4px 12px" fontSize="14px" borderRadius="20px" >Message {user.name}</Button>
            </Link>
            <Button margin="0em 0em" background="white" padding="4px 12px" fontSize="14px" borderRadius="20px" color={colors.primary} border={"1px solid" + colors.primary}>Save as Favorite</Button>
          </div>
        )}
        {me ? (
          <div>
            <h6>Liked Profiles</h6>
            {store.profile.liked_profiles.map((id: number) => (
              <LikedProfile id={id} />
            ))}
          </div>
        ) : null}
      </div> */}
    </div>
    </div>
  )
}

export default UserSection
