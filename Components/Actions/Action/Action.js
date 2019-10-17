import React from "react";
import './Action.css';

export default function Action(props) {
  const { actionName, onActionClick } = props;
  return (
    <button className="action" onClick={onActionClick}>
      {actionName}
    </button>
  );
}
