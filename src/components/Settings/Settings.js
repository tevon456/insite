import React, { Component } from "react";
import { Grid, Flex, Box } from "grid-styled";
import styled from "styled-components";

import NavBar from "Components/Navbar/Navbar.js";
import Footer from "Components/Dashboard/Footer/Footer.js";

const Container = styled(Box)`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 3px 3px 5px 3px #ccc;
`;

const SubmitButton = styled.button`
  display: inline-block;
  text-align: center;
	border-radius: 3px;
	padding: 0.5rem 0;
	margin: 0.5rem 1rem;
	width: 11rem;
  margin-top: 20px;
	background: transparent;
	color: #3ebc7b;
	border: 2px solid #3ebc7b;
  &:hover {
    background:#3ebc7b;
    color: white;
  }
`;

const PaddedBox = styled(Box)`
    padding:10px;
`;

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logFile: "",
      logDirectory: "",
      listenAddress: "",
      port: "",
      infosetAddress: "",
      infosetPort: ""
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Flex align="center" direction="column">
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Log File</label>
              </Grid>
              <Grid width={1 / 2}>
                <input
                  type="text"
                  id="log-file"
                  placeholder="/path/to/log/file"
                />
              </Grid>
            </PaddedBox>
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Log Directory</label>

              </Grid>
              <Grid width={1 / 2}>
                <input type="text" id="log-directory" placeholder="/log" />

              </Grid>
            </PaddedBox>
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Listen Address</label>
              </Grid>
              <Grid>
                <input type="text" placeholder="127.0.0.1" />
              </Grid>
            </PaddedBox>
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Port</label>
              </Grid>
              <Grid width={1 / 2}>
                <input type="text" placeholder="5000" />

              </Grid>
            </PaddedBox>
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Infoset Address</label>
              </Grid>
              <Grid width={1 / 2}>
                <input type="text" placeholder="0.0.0.0" />
              </Grid>
            </PaddedBox>
            <PaddedBox width={1 / 2}>
              <Grid width={1 / 2}>
                <label>Infoset Port</label>
              </Grid>
              <Grid width={1 / 2}>
                <input type="text" placeholder="6000" />
              </Grid>
            </PaddedBox>
            <SubmitButton>Save</SubmitButton>
          </Flex>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Settings;
