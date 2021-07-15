import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

export default class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelInput: "",
    modal: false,
    channelsRef: firebase.database().ref('channels')
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormValid(this.state)){
        this.addChannel();
    }
  }

  isFormValid = ({ channelName, channelDetails}) => (
      channelName && channelDetails
  )
  
    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state
        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName, 
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL,
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: '', channelDetails: '' })
                this.closeModal();
                console.log('channel added')
            })
            .catch((err)=>{
                console.error(err)
            })
    }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openModal = () => { this.setState({ modal:true })}

  closeModal = () => { this.setState({ modal: false})}

  render() {
    const { channels, modal } = this.state;
    // this.state.modal = modal because of the line above

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              Channels
            </span>
            ({channels.length}) <Icon name="add" onClick={this.openModal}/>
          </Menu.Item>
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of the channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button color="red" inverted>
              <Icon name="remove" onClick={this.closeModal}/>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}