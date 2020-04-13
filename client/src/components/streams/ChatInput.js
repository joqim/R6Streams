import React, { Component } from 'react';
import { Form,TextArea, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }

  render() {
    return (
      <Form
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >
        <Form.Field
          style={{ marginLeft: '-8px', fontSize: '12px', fontFamily: 'verdana'}}
          control={TextArea}
          placeholder='Type a message'
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <Button animated size='small' type="submit" value={'Send'} style={{ marginLeft: '3px'}}>
          <Button.Content visible>Send</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
      </Form>
    )
  }
}

export default ChatInput
