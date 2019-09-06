import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import WebEncoder from '@livelyvideo/react-web-encoder';

import WebEncoderControls from '@livelyvideo/react-web-encoder-controls';
import {attachToCallWithStore} from '@livelyvideo/pvc/lib/call/packages/setup-call';
import Remote from '@livelyvideo/pvc/lib/ui/containers/remote';
import RemoteMenu from '@livelyvideo/pvc/lib/ui/containers/remote/menu';
import RemoteDemote from '@livelyvideo/pvc/lib/ui/containers/remote/demote-menu-item';
import RemoteVolume from '@livelyvideo/pvc/lib/ui/containers/remote/volume-menu-item';
import AspectContainer from '@livelyvideo/pvc/lib/ui/components/aspect-container';
import {connect, Provider} from '@livelyvideo/pvc/lib/call/packages/react-redux';
import ErrorSnackbar from '@livelyvideo/react-web-encoder-controls/lib/Controls/Error';
import {defaultProfile, Profile} from '@livelyvideo/react-web-encoder-controls/lib/profiles';
import storage from '@livelyvideo/react-web-encoder-controls/lib/profiles/storage';
import StreamDock from './StreamDock';

const savedProfile = storage.get('webencoder:profile');

const ROOM_STATE = {
  STATE_FREE: 'free',
  STATE_ONE_ON_ONE: 'one-on-one',
  STATE_PAID: 'paid',
  STATE_SUB: 'sub',
}

// helper function to translate strings into appropriate language
const translate = (m) => {
  return m.replace(/_/g, ' ');
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00aaff',
      contrastText: '#fff'
    }
  },
  overrides: {
    PVCStream: { // Used by both ui/containers/local/index.js and ui/containers/remote/index.js
      videoTag: {
        // the video element itself
      },
      videoTagPaused: {
        // styles applied to a paused video element
      },
      mirror: {
        // styles applied if `mirror` is passed a a prop
      },
      avatar: {
        // the avatar displayed if no video is playing
      },
    },
    PVCRemoteMenu: { // Used by ui/containers/remote/menu.js
      root: {
        // root div
      },
      docked: {
        // if the menu is docked
      },
      dockedRight: {
        // if the menu is docked right
      },
      dockedLeft: {
        // if the menu is docked left
      },
      icon: {
        // material ui Icon to expand the menu
      },
      iconButton: {
        // material ui IconButton
      },
      iconButtonIcon: {
        // material ui Icon
      },
      label: {
        // material ui IconButton label class
      },
    },
    PVCRemoteVolumeMenuItem: { // Used by ui/containers/remote/volume-menu-item
      root: {
        // root div
      },
      slider: {
        // slider
      },
      sliderContainer: {
        // slider container
      },
      listItemIcon: {
        // material ui ListItemIcon
      },
    },
    PVCAspectContainer: { // Used by ui/components/aspect-container.js
      containAspectContainer: {
        // used if container prop is passed
        // container style
      },
      containAspectContainerFill: {
        // used if container prop is passed
        // sub-container style
      },
      ratioAspectContainer: {
        // container style
      },
      ratioAspectContainerFill: {
        // sub-container style
      },
    },
  },
});

export class Peer extends Component {
  render() {
    const { peers } = this.props;

    if (!peers.length) {
       return null;
    }

    let peer;

    for (let i = peers.length - 1; i >= 0; i--) {
      if (peers[i]) {
        peer = peers[i];
        break;
      }
    }

    if (!peer) {
      return null;
    }

    return (
      <StreamDock docked='top-right'>
        <Remote peerId={peer} streamName="default"/>
        <RemoteMenu peerId={peer} streamName='default' docked='left'>
          <RemoteVolume/>
          <RemoteDemote/>
        </RemoteMenu>
      </StreamDock>
    );
  }
}

const mapStateToProps = state => {
  const ids = (state.call.peers && state.call.peers.ids) ? state.call.peers.ids.filter(id => !!id) : [];
  return {
    peers: ids,
  }
};

const PeerStream = connect(mapStateToProps)(Peer);

class App extends Component {
  state = {
    supported: true,
    broadcasting: false,
    errorMessage: null,
    call: null,
    keyError: '',
    resetControls: null,
    profile: savedProfile ? new Profile(savedProfile) : defaultProfile,
    preference: 'webrtc',
    stream: null,
    testAudio: false,
  };

  componentDidUpdate(prevProps) {
    if (this.state.call && (
        this.props.roomState !== prevProps.roomState ||
        this.props.canProduce !== prevProps.canProduce
      )) {
      this.state.call.call.setMaxProducingViewers((this.props.roomState === ROOM_STATE.STATE_ONE_ON_ONE || this.props.canProduce) ? 1 : 0)
    }
  }

  handleControlsError(code) {
    switch (code) {
      case 'not_found':
        this.setState({
          errorMessage: 'Camera could not be found, check to make sure it is plugged in.'
        });
        break;
      case 'not_usable':
        this.setState({
          errorMessage: 'Camera could not be accessed, some other application may be using it.'
        });
        break;
      case 'device_specification':
        this.setState({
          errorMessage: 'Camera does not meet required specification.'
        });
        break;
      case 'device_permission':
        this.setState({
          errorMessage: 'Could not access camera and microphone, please grant permissions in your browser.'
        });
        break;
      case 'not_supported':
        this.setState({
          supported: false,
          errorMessage: 'This browser is not supported.'
        });
        break;
      default:
        this.setState({
          errorMessage: 'An unknown error has occurred accessing camera and mic'
        });
        break;
    }
    this.props.on('error', code);
  }

  handleEncoderError(code) {
    switch (code) {
      case 'no-support':
        this.setState({
          supported: false,
          errorMessage: 'This browser is not supported.'
        });
        break;
      default:
        this.setState({
          errorMessage: 'An unknown error occurred.'
        });
        break;
    }
  }

  handleSelect = () => event => {
    this.setState({
      preference: event.target.value
    });
  };

  get streamKey() {
    if (!this.props.streamKey) {
      return null;
    }

    return `${this.props.streamKey}?clientReferrer=${this.props.clientReferrer}`;
  }

  toggleBroadcasting() {
    if (!this.state.stream) {
      this.setState({
        errorMessage: 'Device could not be found, check to make sure it is plugged in.'
      });
      return;
    }

    if (!this.streamKey) {
      this.setState({
        keyError: 'A key is required'
      });
      return;
    }

    this.setState({
      keyError: '',
      broadcasting: !this.state.broadcasting
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ErrorSnackbar
          handleClose={() => {
            this.setState({
              errorMessage: null
            });
          }}
          message={this.state.errorMessage}
        />

        {this.state.call &&
          <Provider store={this.state.call.store}>
            <PeerStream />
          </Provider>
        }

        <AspectContainer>
          {this.state.supported && <WebEncoderControls
            logContext={{
              userId: this.props.username,
              displayName: this.props.displayName,
            }}
            preview={true}
            mirrorPreview={true}
            disableFilters={true}
            disableResolutions={true}
            broadcasting={this.state.broadcasting}
            onError={(errorType, data) => {
              if (errorType === 'deviceError') {
                this.handleControlsError(data.code);
              }
            }}
            testAudio={this.state.testAudio}
            onTestAudio={(v) => {
              this.setState({
                testAudio: v
              });
            }}
            reset={this.state.resetControls}
            stream={this.state.stream}
            translate={translate}
            variant='overlay'
            onProfile={(profile) => {
              this.setState({
                profile
              }, () => {
                storage.set('webencoder:profile', profile.dump());
              });
            }}
            onBroadcast={this.toggleBroadcasting.bind(this)}
            onStream={(stream) => {
              const s = {
                stream,
                resetControls: null
              };

              // force immediate broadcasting
              if (stream) {
                this.broadcasting = true;
              }

              this.setState(s);
            }}
            profile={this.state.profile}
          />}
        </AspectContainer>

      <WebEncoder
        broadcasting={this.state.broadcasting}
        on={(e, ...args) => {
          switch(e) {
            case 'call': {
              const call = args[0];
              if (call) {
                const attachedCall = attachToCallWithStore(call, null);
                this.setState({
                  call: {
                    call,
                    store: attachedCall.store,
                  },
                });
              } else {
                this.setState({
                  call: null,
                });
              }
              console.log('call', args[0]);
              break;
            }
            case 'error':
              this.handleEncoderError(args[0]);
              console.error(args);
              break;
            case 'log':
              console.info(args);
              break;
            case 'start':
              console.log('start');
              break;
            case 'stop':
              console.log('stop');
              break;
            default:
              console.error('unhandled event', { e, args });
          }
          this.props.on(e, ...args);
        }}
        stream={this.state.stream}
        webrtc={{
          authOptions: {
            timeout: 60000
          },
          integrationAuth: this.props.authUrl,
          integerationCall: this.props.callUrl,
          loadbalancer: this.props.lbUrl,
          callOptions: {
            maxProducingViewers: (this.props.roomState === ROOM_STATE.STATE_ONE_ON_ONE || this.props.canProduce) ? 1 : 0,
          },
          getToken: async () => {
            if (!this.streamKey) {
              throw new Error('stream key is required to start stream');
            }

            const reqBody = {
              scope: 'broadcaster',
              username: this.props.username,
              displayName: this.props.displayName,
              streamKey: this.streamKey,
            };

            const response = await window.fetch(`${this.props.authUrl}`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqBody),
            });

            let body;
            try {
              body = await response.json();
            } catch (err) {
              throw new Error('auth response was not valid json');
            }

            if (response.status !== 200) {
              throw new Error(`invalid status for auth token: ${response.status}`);
            };

            if (!body || !body.token) {
              throw new Error(`token response was not valid ${body}`);
            }

            this._token = body.token;
            return body.token;
          }
        }}
      />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  on: PropTypes.func.isRequired
};

export default App;
