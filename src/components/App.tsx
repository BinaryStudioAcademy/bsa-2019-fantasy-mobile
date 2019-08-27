import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';

import {createRootNavigator} from '../containers/Routing/router';
import {isSignedIn} from '../auth';

const App = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [checkedSignIn, setcheckedSignIn] = useState<boolean>(false);

  useEffect(() => {
    isSignedIn().then((res: any) => {
      setcheckedSignIn(true);
    });
  }, []);

  if (!checkedSignIn) {
    return null;
  }

  const Navigartor = createRootNavigator(signedIn);
  const Asa = createAppContainer(Navigartor);

  return <Asa />;
};

export default App;
