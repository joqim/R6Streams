import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchStream } from '../../actions';
import { Grid, Segment, Divider } from "semantic-ui-react";
import { Dimmer, Loader, List, Image } from 'semantic-ui-react';
import Chat from './Chat'
import ReactPlayer from 'react-player';

class StreamShow extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  render() {
    if(this.props.stream.stream) {
      const {title, description, stream_url, createdAt} = this.props.stream.stream[0]
      return (
        <div>
          <Segment placeholder>
        <Grid columns={2} stackable textAlign='left'>
          <Grid.Row stretched>
            <Grid.Column computer={11} textAlign='left'>
              {!!stream_url && (
                <div>
                <ReactPlayer
                  controls
                  url={stream_url}
                  className='react-player'
                  playing = { false }
                  width='100%'
                  height='99%'
                />
              </div>
              )}
              {!stream_url && (
                <Dimmer active inverted>
                  <Loader inverted>Stream Loading</Loader>
                </Dimmer>
              )}
            </Grid.Column>
            <Divider vertical/>
            <Grid.Column computer={3}>
              <Chat />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          <List>
            <List.Item>
              <Image avatar src='https://pbs.twimg.com/profile_images/1075817928732241920/IBlGn3cT_400x400.jpg' />
              <List.Content>
                <List.Header as='a'>{title}</List.Header>
                <List.Description>
                  {description}
                </List.Description>
                <div style={{ fontSize: '10px'}}>
                  {moment(createdAt).format("MM-DD-YYYY")}
                </div>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        </div>
      )
    }
    else {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Fetching stream details</Loader>
          </Dimmer>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams, user: state.auth }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);