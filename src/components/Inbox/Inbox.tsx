import React, {useState,  useEffect} from 'react'
import { useParams,  useHistory } from "react-router-dom";
import { SENDMESSAGEURL, ALLCONVERSATIONSURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";
import messages from '../../pages/messages';
import './index.scss';
import axios from "axios";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Textarea from '../Styled/Textarea';
import { Formik, Field, Form } from 'formik';

// TODO need to move up
// Format nested params correctly

{/*const exampleList = [
  {
    image: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f14010b9eb432b4af4cccebc17bbccb5cf16ec7/DSC00071.JPG",
    name: "sparky",
    recent: {
      subject: "Hi",
      content: "Hello, I am looking for a workout partner!",
      timestamp: "2020-07-22T21:33:18.125Z"
    }
  },
  {
    image: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z"
    }
  }
]

const exampleMessages = {
  "sparky": [
    {
      to: "Cynthia",
      from: "me",
      content: "Hello!"  
    },
    {
      to: "Sparky",
      from: "me",
      content: "Just reaching out to see if you would want to play tennis together! I am usually free after 5 on weekdays."  
    },
    {
      to: "me",
      from: "Sparky",
      content: "Yes I would love to play tennis with you!"  
    },
  ]
}*/}


const Inbox = () => {
//const Inbox: React.FC<UserProp> = (props) => {  
  const store = useDataStore();
  const [currChat, setCurrChat] = useState("");
  let { user_id } = useParams();
  const [currConversation, setCurrConversation] = useState({
    messages: [],
    id: "",
    image: "",
    name: "",
    participant_id: "",
    recent: {
      subject: "",
      content: "",
      timestamp: ""
    }
  });
  //console.log("user id");
  //console.log(user_id);
  const [msgText, setMsgText] = useState("");
  const [isError, setIsError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [conversationList, setConversationList] = React.useState<any>([]);

  const history = useHistory();
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      event.preventDefault();
      setMessageSent(true);
      //resetForm();
    }
  }
  useEffect(() => {
    setIsError(false);
    const fetchData = async () => {
 
      try {
        if (messageSent) {
          if (currConversation.messages.length == 0){
            let data =  {"user_id": user_id, "subject": "cba", "body": msgText}
            let url = SENDMESSAGEURL;
            const result = await axios.post(url, data, { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}});
            console.log("new conversation");
            console.log(JSON.stringify(result));
            setCurrConversation(result.data);
            setMsgText("");
          }
          else {
            let data =  {"recipients": currConversation.participant_id, "subject": currConversation.recent.subject, "body": msgText}
            let url = SENDMESSAGEURL + "/" + currConversation.id +  "/messages/createwithjson";
            const result = await axios.post(url, data, { withCredentials: true, headers: {
              contentType: "application/json; charset=utf-8", "Accept": "application/json"
            } });
            //console.log("existing conversation");
            //console.log(JSON.stringify(currConversation));
            //console.log(JSON.stringify(result));
            setCurrConversation(result.data);
           // console.log("AFTER");
            //console.log(JSON.stringify(currConversation));
            //setCurrChat(currConversation.name);
            setMsgText("");
          }
        }
        history.push("/messages");
        setMessageSent(false);
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        setMessageSent(false);
        setIsError(true);
      }
      
    };
    fetchData();

  }, [messageSent]);

  useEffect(() => {
    setIsError(false);
    const fetchData = async () => {
 
      try {
          const result = await axios.get(ALLCONVERSATIONSURL
            ,{
              params: {
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          }
            );
          console.log(JSON.stringify(result));
          setConversationList(result.data.conversations);
          console.log(JSON.stringify(conversationList))
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        setIsError(true);
      }
      
    };
    fetchData();

  }, []);

  useEffect(() => {
    console.log("in useEffect settting currChat");
    setCurrChat(currConversation.name);
    console.log(currChat);
  }, [currConversation]);

  const Conversation = ({ message }) => {
    {/*alert(JSON.stringify(message));*/}
    return (
      <div onClick={() => setCurrConversation(message)} className={"single-conversation-wrapper " + (message.name === currChat ? "active-conversation" : "" )}>
        <div className="single-conversation-avatar">
         {/** <Avatar src={ROOTURL + message.image}  size= "large" />  */}
          <div className="conversation-from-title">{message.name}</div>
        </div>
        <div className="single-conversation-recent">
          <div className="conversation-subject">
            {message.recent.subject}
          </div>
          <div>
            {message.recent.content}
          </div>
        </div>
        <ArrowForwardIcon />
      </div>
    )
  }
  
  const Message = ({ content, from, to }) => {
    const isMe = (from: string, me: string) => from === me

    return (
      <div className={
        "flex-row " +
        (isMe(from, store.username) ? "from-me-row" : "from-them-row")
        }>
        <span className={
          "single-message-wrapper " +
          (isMe(from, store.username) ? "from-me-message" : "from-them-message")
          }>
          {content}
        </span>
      </div>
    )
  }

  return (
    <div className="messages-wrapper">
      <div className="inbox-wrapper">
        <nav className="pink-nav conversation-nav-wrapper">
          <div className="conv-nav-text">
          My Inbox
          </div>
        </nav>
        {conversationList.map((conversation: any) => (
          <>
            <Conversation message={conversation} />
            <hr></hr>
          </>
        ))}
      </div>
      <div className="conversation-wrapper">
        <nav className="purple-nav conversation-nav-wrapper">
          <div className="conv-nav-text">
           {currChat === "" ? "Select or start conversation" : "Chat with " +  currChat}
          </div>
        </nav>
        {/* {currChat === "" ? "Select or start conversation" : "Chat with " +  currChat} */}
        {currConversation.messages.map((message: any) => (
          <>
            <Message content={message.content} from={message.from} to={message.to} />
            {/* <hr></hr> */}
          </>
        ))}
       <form>
        <Textarea value={msgText} onChange={event => setMsgText(event.target.value)} margin="1em 0em" height="40px" width="100%"  padding="10px" fontSize="12px"  placeholder={"Send a message to " + currChat + " 👋"} onKeyDown={handleKeyDown}></Textarea>
       </form>
      </div>
    </div>
  )
}

export default Inbox
