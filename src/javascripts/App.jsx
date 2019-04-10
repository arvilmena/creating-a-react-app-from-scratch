import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HashRouter } from 'react-router-dom';

// Custom.
import Navigation from './fn_Navigation';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tabs: {
        "UPDATE_TITLE": { name: 'Update title', path: '/update/title' },
        "UPDATE_CONTENT": { name: 'Update content', path: '/update/content' },
      },
      entities: {
        1: {
          title: "Title 1",
          content: 'Content 1',
        },
        2: {
          title: "Title 1",
          content: 'Content 1',
        },
        3: {
          title: "Title 1",
          content: 'Content 1',
        },
      }
    }
  }

  render() {
    return (
      <HashRouter>
        <Container>
          <Row>
            <Col md="4">
              <Navigation {...this.state.tabs} />
            </Col>
            <Col md="8">
            </Col>
          </Row>
        </Container>
      </HashRouter>
    );
  }
}

export default App;
