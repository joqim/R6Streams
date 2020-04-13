import React from 'react';
import { Label, List } from 'semantic-ui-react';


export default ({ avatar, message }) => {
 return(
  <div>
    <List>
    <List.Item>
      <Label circular size='large' style={{ marginLeft: '-12px', marginRight: '10px'}}>
        {avatar}
      </Label>
      {message}
    </List.Item>
   </List>
  </div>
 )
}
