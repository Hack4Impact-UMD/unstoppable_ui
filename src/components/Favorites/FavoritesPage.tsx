import "./FavoritesPage.scss";

import { ALLPROFILESURL } from "../../constants/matcher";
import React, { useEffect, useMemo, useState } from "react";

import Button from "../Styled/Button";
import LikedProfile from "../Users/LikedProfile";
import {MenuPopupState} from "../Browse/SortByMenu";
import Pagination from './Pagination';
import axios from "axios";
import { useDataStore } from "../../UserContext";

function ProfileGrid(props) {
  const [currentPage, setCurrentPage] = useState(1)

  let pageSize = 8

  let totalPageCount = Math.ceil(props.profiles.length/8)

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return props.profiles.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


    return <>
    <div className="profile-browse-grid">
  {currentPageData.map((id: number) => (
    <LikedProfile id={id} />
  ))}
   </div>
    <div className="page-footer">
      <Button className="button" disabled={currentPage === totalPageCount} onClick={() => { 
      
        if(currentPage - 1 < totalPageCount) {
          setCurrentPage(currentPage + 1)
        }else{
          return null
        }}}
        color="#FFFFFF"
        background="#F1658C"
        borderRadius="6px"
        margin="2em 1.5em"
        padding="10px 40px">
        Next
      </Button>
      <div>
        <Pagination 
         className="pagination-bar"
         currentPage={currentPage}
         totalCount={props.profiles.length}
         pageSize={8}
         onPageChange={page => setCurrentPage(page)} />
      </div>
    </div>
  </>

}

const ViewFavoritesPage: React.FC = () => {
  const store = useDataStore();
  const [userCollection, setUserCollection] = React.useState<any>([]);

  useEffect(() => {
    // gets all the profiles to populate the browse profile cards
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL, {
          withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
          },
        });
        setUserCollection(data.profiles);
        var temp = [] as any;
        for(var i = 0; i < store.profile.liked_profiles.length; i++){
          for(var j = 0; j < userCollection.length; j++){
            if(store.profile.liked_profiles[i] == userCollection[j].profileId){
              temp.push(userCollection[j].profile);
            }
          }
        }
        setUserCollection(temp);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    };
    getProfiles();

  }, [userCollection]);

  return (
    <div>
      <div>
        <h3 className="pageHeader">Favorites Profiles</h3>
        <p>You can find all your favorite profiles here</p>
        <div id="headerFilter">
          {/* <div className="favorites-search-box">
            <FontAwesomeIcon icon={faSearch} />
            <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
              <input
                className="browse-search global-input"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search by name, state, city, or zip code"
                style={{ width: 700 }}
              />
            </Tooltip>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={activeUsers}
                onChange={(e) => handleActiveUsers(e)}
                name="activeUsers"
                color="primary"
              />
            }
            label="Active Users"
          /> */}
          {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item >Action</Dropdown.Item>
          <Dropdown.Item >Another action</Dropdown.Item>
          <Dropdown.Item >Something else</Dropdown.Item>
          </DropdownButton> */}
          <MenuPopupState className="irbfsN" userCollection={userCollection} setUserCollection={setUserCollection}/>
        </div>
      </div>

      <ProfileGrid profiles={store.profile.liked_profiles} />

    </div>
  );
};
export default ViewFavoritesPage;
