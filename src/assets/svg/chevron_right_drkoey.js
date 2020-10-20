import React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
</svg>
`;
export default ({stroke, fill, width, height, style}) => 
  <SvgXml style={style} xml={xml} fill={fill || stroke} stroke={stroke} width={width} height={height}/>;