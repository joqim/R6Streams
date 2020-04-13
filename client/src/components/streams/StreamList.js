import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import { Button, Icon, Divider } from 'semantic-ui-react';

class StreamList extends React.Component {
  componentDidMount() {
    //console.log("inside component did mount")
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if(stream.userId === this.props.currentUserId) {
      return (
        <div style={{ marginRight: '8px'}}>
          <div className="right floated content" style={{ marginTop: '10px'}}>
            <Link to={`/streams/edit/${stream._id}`} style={{ marginRight: '5px'}}>
              <Icon name = "cloud upload" size="large" color="teal"/>
            </Link>
            <Link to={`/streams/delete/${stream._id}`} >
              <Icon name = "trash alternate outline" size="large" color="grey"/>
            </Link>
          </div>
        </div>
      );
    }
  }

  renderList() {
    console.log("streams", this.props)
    if(this.props.streams.streams) {
      return this.props.streams.streams.map(stream => {
        if(stream._id) {
          return(
            <div className="item" key={stream._id} style={{ marginTop: '5px'}}>
              {this.renderAdmin(stream)}
              <i className="large middle aligned icon camera" />
              <div className="content" style={{ marginTop: '10px', marginLeft: '5px'}}>
                <Link to={`/streams/${stream._id}`} className="header">
                  {stream.title}
                </Link>
                <div className="description">
                  {stream.description}
                </div>
              </div>
            </div>
          );
        }
      })
    }
  }

  renderCreate() {
    if(this.props.isSignedIn) {
      return(
        <div style={{ textAlign: 'right', marginRight: '10px'}}>
          <Link to="/streams/new">
          <Button primary>
            Create
          </Button>
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{marginTop: '15px', marginLeft: '20px'}}>
        <div style={{ fontSize: '15px', marginBottom: '-5px'}}>
          <Icon.Group size='large' style={{ marginTop: '3px', marginLeft: '8px'}}>
            <Icon name='list ul' size='small'/>
          </Icon.Group>
          &nbsp;
          Video List
        </div>
        {/* <Divider /> */}
        <div className="ui divided middle aligned list" style={{ marginTop: '20px', marginLeft: '8px'}}>
          {this.renderList()}
        </div>
        <Divider style={{ marginTop: '-10px'}}/>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: state.streams,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);