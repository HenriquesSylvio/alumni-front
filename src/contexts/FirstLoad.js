import React from 'react';

export default React.createContext({
    firstLoad: true,
    setFirstLoad: value => {}
});