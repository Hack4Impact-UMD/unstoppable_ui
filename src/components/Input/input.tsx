import React from 'react';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface InputProps {
  color?: string,
  background?: string,
  hoverBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  fontSize?: string,
  borderRadius?: string
}

const Input = styled.input<InputProps>`
  color: ${props => props.color ? props.color : "black"};
  background: ${props => props.background ? props.background : "#f0f0f0"};
  padding: ${props => props.padding ? props.padding : "4px 6px"};
  min-width: 20px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-weight: 700;
  font-size: ${props => props.fontSize ? props.fontSize : "16px"};
  outline:none;
  border: ${props => props.border ? props.border : "none"};
  margin: ${props => props.margin ? props.margin : "0"};
  display: flex,
  align-items: center,
  &:hover {
    cursor: pointer;
`

export default Input;