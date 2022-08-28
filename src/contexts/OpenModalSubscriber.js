import React from "react";

export default React.createContext({
    isOpenSubscriber: false,
    setIsOpenSubscriber: value => {}
});