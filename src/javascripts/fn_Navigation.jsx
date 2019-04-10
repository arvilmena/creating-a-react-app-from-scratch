import React from 'react';
import { Link } from 'react-router-dom'

export default (tabs) => {
  console.log(tabs);
  return (
    <ul>
      {
        Object.keys(tabs).map(v => {
          return (
            <li key={v}>
              <Link to={tabs[v].path}>{tabs[v].name}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}
