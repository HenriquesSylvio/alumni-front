import React from "react";

export default React.createContext({
    isOpenDiscussion: false,
    idActivePost: 0,
    setIsOpenDiscussion: value => {}
});