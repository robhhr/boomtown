import React, { Component, createContext } from "react";

export const ItemPreviewContext = createContext();

const initialState = {
  title: "Name your Item",
  description: "Describe item",
  tags: [],
  imageURL: "http://placecorgi.com/500/500",
  itemowner: {},
  created: new Date()
};

class ItemPreviewProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { item: initialState };
  }

  updatePreview = item => {
    const itemUpdate = { ...this.state.item, ...item };
    this.setState({ item: itemUpdate });
  };

  resetPreview = () => {
    this.setState({ item: initialState });
  };

  render() {
    return (
      <ItemPreviewContext.Provider
        value={{
          state: this.state,
          updatePreview: this.updatePreview,
          resetPreview: this.resetPreview
        }}
      >
        {this.props.children}
      </ItemPreviewContext.Provider>
    );
  }
}

export default ItemPreviewProvider;
