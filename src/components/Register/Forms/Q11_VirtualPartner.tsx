import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL} from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION } from "../../../constants/ProfileConstants"
import Button from '../../Styled/Button';  
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../../constants/ProfileConstants";

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const PromptIfDirty = () => {
  const formik = useFormikContext();
  return (
    <Prompt
      when={formik.dirty && formik.submitCount === 0}
      message="Are you sure you want to leave? You have with unsaved changes."
    />
  );
};

const Q11_VirtualPartner = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/9");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/12");
  }
  return (
    <div>
      <Formik
        initialValues={{
          // About Me
          personality: profile.personality,
          work_status: profile.work_status,
          details_about_self: profile.details_about_self,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 500);
          
          const fetchData = async () => {
            try {
              let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";
              //About Me
              profile.personality = values.personality;
              profile.work_status = values.work_status;
              profile.details_about_self = values.details_about_self;
              // Saving data on server
              const res = await axios.patch(url,
                              { profile: profile },
                              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"} }
                            )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted){
                history.push("/complete-profile/9");
              } else {
                  history.push("/complete-profile/12");
              }

            } catch (err) {
              displayToast("Failed to update profile", "error", 3000, "top-right")
              if (err.response) {
                // client received an error response (5xx, 4xx)
              } else if (err.request) {
                // client never received a response, or request never left
              } else {
                // anything else
              }
            }
          };
          fetchData();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
            <Form>
              <div className="form-container">
                  <div className="question-header">Would you like a virtual partner?</div>
                  <div className="question-number">11/16 Questions</div>
                  <div className="form-question-wrapper">
                    <div className="question-answers">
                      
                      <div>
                        <Field id={"yes"} type="radio" name="personality" value={"Yes"}></Field>
                        <label htmlFor={"Yes"}>{"Yes"}</label>
                        <Field id={"no"} type="radio" name="personality" value={"No"}></Field>
                        <label htmlFor={"no"}>{"No"}</label>
                      </div>

                    </div>
                  </div>
                
                  <PromptIfDirty />
                  <Button id="prev" margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}  
                  onClick={(e)=>{setPrevSubmitted(true)}}>
                    Prev
                  </Button>
                  
                  <Button margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}>
                      Next
                  </Button>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
}
export default Q11_VirtualPartner;