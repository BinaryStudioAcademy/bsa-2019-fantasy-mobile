import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {createAppContainer} from 'react-navigation';

import {createRootNavigator} from '../containers/Routing/router';
import {isSignedIn} from '../helpers/storageHelper';

const App = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
 
  const {isLoading, user, isAuthorized} = useSelector(
    (state: any) => state.profile,
  );

  useEffect(() => {
    isSignedIn().then((res: any) => setSignedIn(res));
  });

  useEffect(() => {
    if (isAuthorized) {
      setSignedIn(isAuthorized);
    }
  }, [isAuthorized]);

  const Navigartor = createRootNavigator(signedIn);
  const Routing = createAppContainer(Navigartor);

  return <Routing />;
};

export default App;
