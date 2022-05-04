import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { ROOTURL } from "../../constants/matcher";
import '../manageProfile/EditProfile.scss'


const AddChatroom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const errorMessage = "";
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const history = useHistory();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setInputSubmitted(true);
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      
 
      try {
        if (inputSubmitted) {
          let data = { chatroom: {"name": name, "description": description}};
          //const result = await axios.post(ROOTURL+"/events", data, { withCredentials: true });

          const result = await axios.post(ROOTURL+ "/chatrooms",
            data,
            { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
          });

          //console.log(JSON.stringify(result));
          //console.log(result.data);
          history.push("chatrooms");
        }
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        setIsError(true);
      }
      
    };
    fetchData();

  }, [inputSubmitted, name, description]);


  return (
<div>
      <form onSubmit={handleSubmit}>
      { errorMessage && <h3 className="error"> { errorMessage } </h3> }
        <div className="form-group">
          <input
            type="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            />
        </div>
        <div className="form-group">
            <input 
            type="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
            />
         </div>
         
         {!isError &&  <button type="submit">Save</button>}
      </form>
      </div>
  )
}
export default AddChatroom;