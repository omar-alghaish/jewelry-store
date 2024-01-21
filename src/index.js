/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from "react";
import { createRoot } from "react-dom/client";
import Main from './EntryFile/Main';

createRoot(document.getElementById('app')).render(
  // <SQLiteProvider databaseName={databaseName} schema={schema}>
  <Main />
  // </SQLiteProvider>
);

if (module.hot) {
  module.hot.accept();
}
