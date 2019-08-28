import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {createAppContainer} from 'react-navigation';

import {createRootNavigator} from '../containers/Routing/router';
import {isSignedIn} from '../auth';

const App = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [checkedSignIn, setcheckedSignIn] = useState<boolean>(false);
  const {isLoading, user, isAuthorized} = useSelector(
    (state: any) => state.profile,
  );
  console.log(isLoading, user, isAuthorized);

  console.log('hello');
  useEffect(() => {
    isSignedIn().then((res: any) => {
      setcheckedSignIn(true);
    });
  }, []);

  if (!checkedSignIn) {
    return null;
  }

  const Navigartor = createRootNavigator(isAuthorized);
  const Routing = createAppContainer(Navigartor);

  return <Routing />;
};

export default App;
