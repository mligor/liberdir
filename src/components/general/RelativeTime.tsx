import React from 'react';
var luxon = require('luxon');

const RelativeTime = ({ time }: any) => {
  const dt = luxon.DateTime.fromISO(time);
  const relTime = dt.toRelative();
  return <>{relTime}</>;
};

export default RelativeTime;
