import React from "react";
import Action from "@Components/Actions/Action/Action";
import "./Actions.css";
export default class Actions extends React.PureComponent {
  render() {
    const { actions } = this.props;
    console.log(actions);
    return (
      <div className="actionContainer">
        <h2 className="actionsHeading">Actions</h2>
        {actions.map(action => {
          return (
            <Action
              key={action.name}
              actionName={action.name}
              onActionClick={action.onClick}
            />
          );
        })}
      </div>
    );
  }
}
