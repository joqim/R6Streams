import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class StreamEdit extends React.Component {

  render() {
    return (
      <div>
        <FilePond name="stream-file" server={`/upload/${this.props.match.params.id}`} />
      </div> 
    );
  }
}

export default StreamEdit;