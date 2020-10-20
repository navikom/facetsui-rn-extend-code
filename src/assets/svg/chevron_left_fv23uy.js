import React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
</svg>
`;
export default ({stroke, fill, width, height, style}) => 
  <SvgXml style={style} xml={xml} fill={fill || stroke} stroke={stroke} width={width} height={height}/>;