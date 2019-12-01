import React from "react";
// import styles from "./styles";
// import ShareForm from "../../components/ShareItemForm/ShareItemForm";
// import ShareItemPreview from "../../components/ShareItemPreview/index";
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from "../../components/ShareItemForm";
import { ShareItemPreview } from "../../components/ShareItemPreview/ShareItemPreview";
import "../../components/ShareItemPreview/CardPreview/share.css";
import NavBar from "../../components/NavBar/NavBar";
// import { ViewerProvider } from "../../context/ViewerProvider";

const Share = ({ classes, viewer }) => {
  return (
    <>
      <NavBar />
      {/* <ViewerProvider.Consumer> */}
      <div className="share-container">
        <ShareItemPreview />
        <ShareItemForm />
      </div>
      {/* </ViewerProvider.Consumer> */}
    </>
  );
};

export default Share;
