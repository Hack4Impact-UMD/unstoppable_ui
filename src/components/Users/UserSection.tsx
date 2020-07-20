import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import './index.scss';
import colors from '../../assets/colors'
import { useDataStore } from "../../UserContext";

import Button from '../Button/Button';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import NotesIcon from '@material-ui/icons/Notes';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WorkIcon from '@material-ui/icons/Work';
import ExploreIcon from '@material-ui/icons/Explore';
import ScheduleIcon from '@material-ui/icons/Schedule';

const UserSection: React.FC<{id: string}> = ({ id }) => {
  const store = useDataStore()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`${PROFILEURL}/${id}.json`, { withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
        }})
        setUser(data.profile)
        setLoading(false)
      } catch (e) {
        throw new Error(e)
      }
    }
    getProfile();
  }, [])

  const ProfileIconRow = ({ icon, field, answer, chips }) => {
    return (
      <div style={chips ? { alignItems: "flex-start" } : { alignItems: "center" }} className="full-profile-icon-row">
        {icon}
        <span style={chips ? { alignItems: "flex-start" } : { alignItems: "center" }} className="field-answer-profile muted-text">{field}: {answer} </span>
      </div>
    )
  }

  const ChipList = () => {
    const Chip = ({ activityId }) => {
      const getMatch = () => {
        console.log(activityId)
        const matched = store.activities.find(({ id }) => id === activityId )
        console.log(matched)
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

  if (!user || loading ) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 style={{ fontSize: "26px", marginTop: "1em" }}>{user.name}  · <span className="full-profile-location muted-text">city, state</span></h1>

      <div className="user-section-wrapper">
        <div className="user-metadata">
            <img className="user-section-image" src={ROOTURL + user.photo} />
            <Button margin="0.8em 0em 0em 0em">Message {user.name}</Button>
            <Button margin="0.8em 0em" background="white" color={colors.primary} border={"1px solid" + colors.primary}>Save as Favorite</Button>
        </div>
        <div className="user-section-data">
          <div className="profile-section-header">About me 😀</div>
          <p className="muted-text">{user.age} years old</p>
          <ProfileIconRow field={"Personality"} chips={false} answer={user.personality} icon={<EmojiPeopleIcon className="full-profile-icon" />}/>

          <div className="full-profile-icon-row">
            <NotesIcon className="full-profile-icon" />
            <div className="full-profile-das">
              <p>{user.details_about_self}</p>
            </div>
          </div>

          <ProfileIconRow field={"Work Status"} chips={false} answer={user.work_status} icon={<WorkIcon className="full-profile-icon" />}/>
          

          <hr></hr>
          <div className="profile-section-header">Details about Diagnosis</div>
          
          <p>{user.cancer_location} cancer</p>
          <ProfileIconRow field={"Treatment description"} chips={false} answer={user.treatment_description} icon={null}/>
          <ProfileIconRow field={"Treatment status"} chips={false} answer={user.treatment_status} icon={null}/>

          <hr></hr>
          <div className="profile-section-header">Activity/Fitness</div>

          <ProfileIconRow field={"Fitness Level"} chips={false} answer={user.fitness_level} icon={<FitnessCenterIcon className="full-profile-icon" />}/>

          <ProfileIconRow field={"Activities"} chips={true} answer={<ChipList />} icon={<SportsTennisIcon className={"full-profile-icon"} />} />

          <ProfileIconRow field={"Prefered exercise location"} chips={true} answer={user.preferred_excercise_location} icon={<ExploreIcon className={"full-profile-icon"} />} />

          <ProfileIconRow field={"Prefered exercise time"} chips={true} answer={user.prefered_exercise_time} icon={<ScheduleIcon className={"full-profile-icon"} />} />
          
        </div>
      </div>
    </div>
  )
}

export default UserSection
