import React from 'react';
import {AutoComplete, IconButton, FontIcon} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];
const SearchBox = ({isOpen, onClick}) => {
    const baseStyles = {
        open: {
            width:'inherit',
            minWidth:'30vw',
            maxWidth:'50vw'
        },
        closed: {
            width: 0,
        },
        smallIcon: {
            width: 30,
            height: 30
        },
        icon: {
            width: 40,
            height: 40,
            padding: 5,
            top: 7,
            float:'right'
        },
        frame: {
            float:'left',
            width:'inherit',
            display:'inline-flex'
        }
    };
const textStyle = isOpen ? baseStyles.open : baseStyles.closed;
const divStyle = Object.assign({}, textStyle, baseStyles.frame);
    divStyle.width += baseStyles.icon.width + 5;
return (
        <div id="searchBox" style={divStyle}>
          <AutoComplete
            id={'searchField'}
            dataSource={fruit}
            filter={AutoComplete.fuzzyFilter}
            fullWidth={true}
            style={textStyle}
            menuProps={{maxHeight:'75vh'}}/>
            <IconButton onClick={() => onClick()}>
                <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
        </div>
    );
};
export default SearchBox;
