import "./NotificationItem.scss";

import { ROOTURL } from "../../constants/matcher";
import React from "react";

import { useObserver } from "mobx-react";
import { Avatar } from "antd";

const NotificationItem = ({ notification }) => {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };

  const NotificationItem = ({ notification }) => useObserver(() => (
    <div className="notification-item" style={notification.read ? {opacity: 0.5} : {}}>
      <div className="colored-rectangle" style={{backgroundColor: notification.color}}></div>
      <Avatar src={ROOTURL + notification.image} size={40} />
      <div className="notification-text">
        <h6 className="notification-header">
          {notification.header}
        </h6>
        <p className="notification-description">
          {notification.description}
        </p>
        <p className="notification-date">
          {notification.date.toLocaleDateString("en-US", options)}
        </p>
      </div>
    </div>
  ))

  return <NotificationItem notification={notification} />
};

export default NotificationItem;
