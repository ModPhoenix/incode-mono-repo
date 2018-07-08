import React from 'react';

import Typography from '@material-ui/core/Typography';

const NotFoundPage = () => (
  <div className="not-found-page">
    <Typography variant="display1">
      404 Not Found
    </Typography>
    <Typography noWrap>
      We are sorry but the page you are looking for does not exist.
    </Typography>
  </div>
);

export default NotFoundPage;
