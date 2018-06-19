import React, { Component } from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  display: block;
  overflow: hidden;
  padding-top: 0.5rem;
  padding-left: 0;
  padding-bottom: 0.5rem;
  border-top: 1px solid #ccc;
  color: #282828;
  text-align: center;

  &:after{
    width: 100%;
    height: 0;
    top: 50%;
    left: 50%;
    background: red;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  &:hover,&:active {
   	background: #bc3e3f; 
    color: #fff;
  }

  &:hover:after {
    height: 260%;
	  opacity: 1;
  }

  &:active:after {
	  height: 400%;
	  opacity: 1;
  }
`;

export default class DatapointLink extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = event => {
    event.preventDefault();
    this.props.onDatapointChange(
      this.props.datapointId,
      this.props.datapointLabel
    );
  };

  render() {
    return (
      <StyledLink onClick={this.handleClick}>
        {this.props.datapointLabel}
      </StyledLink>
    );
  }
}
