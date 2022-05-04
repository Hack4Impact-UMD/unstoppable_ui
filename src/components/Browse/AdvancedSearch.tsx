import "./Browse.scss";

import { CANCERLOCATIONLIST } from "../../constants/ProfileConstants";
import React, { useState } from "react";

// accordian imports
import Accordion from "@material-ui/core/Accordion";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import Select from "../Styled/Select";
import { Typography } from "antd";
import { useDataStore } from "../../UserContext";
 
 
export const AdvancedSearch = () => {
    const store = useDataStore();
    const [cancerTypeKeyword, setCancerTypeKeyword] = useState(
    store.savedSearchParams.cancerTypeKeyword
  );
   const [zipcodeKeyword, setZipcodeKeyword] = useState(
    store.savedSearchParams.zipcodeKeyword
  );
    const [personality, setPersonality] = useState(
    store.savedSearchParams.personality
  );
 
 return (
     <>
  {/* <h5 className="boldedSubheader">Advanced Search</h5> */}
            <Accordion
              className="no-border-accordian"
              style={{ boxShadow: "none", padding: "0px !important" }}
            >
              <AccordionSummary
                // className="MuiAccordionSummary-root"
                expandIcon={<KeyboardArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="boldedSubheader">
                  Advanced Search
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="accordian-inside">
                <div style={{display: "inline-flex"}}>
                  {/* cancer type*/}
                  <label style={{justifyContent: "center",
 
    display: "grid"}}>
                  <span className="filter-label"> Cancer Type </span>
                   <div className="search-widget">
                  <Select
                    style={{width: '20em'}}
                    onChange={(e) => setCancerTypeKeyword(e.target.value)}
                    // margin="0em 2em"
                    value={cancerTypeKeyword}
                    className="search-widget"
                  >
                    <option
                      className="selector"
                      value=""
                      label="Breast cancer"
                      disabled
                      selected
                    />
                    {CANCERLOCATIONLIST.map((cancerLoc: any) => (
                      <option
                        className="selector"
                        value={cancerLoc}
                        label={cancerLoc}
                      />
                    ))}
                  </Select>
                
                  </div>
                  </label>
                  {/* zipcode */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Keyword </span>
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="Tamoxifen"
                            disabled
                            selected
                          />
                          {store.uniqueLists.unique_zipcodes.map((z: any) => (
                            <option className="selector" value={z} label={z} />
                          ))}
                        </Select>
                      </div>
                      </label>
                    )}
                  {/* Which of the following best describes you? */}
                   <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Which of the following best describes you? </span>
                <div className="search-widget">
                  <Select
                  style={{width: '20em'}}
                    onChange={(e) => setPersonality(e.target.value)}
                    // margin="0em 2em"
                    value={cancerTypeKeyword}
                    className="search-widget"
                  >
                    <option
                      className="selector"
                      value=""
                      label="Select One"
                      disabled
                      selected
                    />
                    {/* {store.uniqueLists.unique_personalities.map((personality: any) => (
              <option className="selector" value={personality} label={personality} />
            ))} */}
                  </Select>
                  </div>
                  </label>
                  {/* Favorite activities */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                       <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Favorite activities </span>
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="Select activities"
                            disabled
                            selected
                          />
                          {/* {store.uniqueLists.unique_zipcodes.map((z: any) => (
                <option className="selector" value={z} label={z} />
              ))} */}
                        </Select>
                      </div>
                      </label>
                    )}
                  </div>
                  {/* Preferred exercise location */}
                  <div>
 <label style={{
    display: "grid"}}>
    <span className="filter-label"> Preferred exercise location </span>
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="Select location"
                            disabled
                            selected
                          />
                          {/* {store.uniqueLists.unique_zipcodes.map((z: any) => (
                <option className="selector" value={z} label={z} />
              ))} */}
                        </Select>
                      </div>
                    )}
                        </label>
                    </div>
                </div>

                {/* <div className="range-slider">
                <Tooltip title="Sort Users">
                  <SortIcon />
                </Tooltip > 
                {!reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={distanceOrder} ageOrder={ageOrder} lastOnineOrder={lastOnlineOrder} newestMemberOrder={newestMemberOrder} resetFunction={handleResetCompletion} reset={reset} />}
                {reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={"asc"} resetFunction={handleResetCompletion} reset={reset} />}
              </div> */}
              </AccordionDetails>
            </Accordion>
            </>
    )

}