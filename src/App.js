import React from 'react'

import Navigation from './Navigation';
import { Request } from './request';

Request.baseURL = 'https://5fc9346b2af77700165ae514.mockapi.io';

const App = () => {
  return (
    <Navigation />
  )
}

export default App
