import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Autocomplete from '../src';

const stories = storiesOf('Autocomplete', module);

stories.addDecorator(withKnobs);
stories.add('simple autocomplete', () => {
        const containerStyle = {
            width: "200px",
            display: "flex",
            flexDirection: "column"
        };
        const selectedSuggestionStyle = {
            backgroundColor: "#cce6ff"
        };
        const autocompleteStyle = {
            width: "inherit",
            border: "1px solid #ccc",
            cursor: "pointer"
        };

        const onChange = (value) => {
            console.log('onChange ', value)
        }

        return (<Autocomplete suggestions={['1', '2', '3', '33', '22', '234', '233']}
                              debounceTime={500}
                              onChange={onChange}
                              containerStyle={containerStyle}
                              autocompleteStyle={autocompleteStyle}
                              selectedSuggestionStyle={selectedSuggestionStyle}/>
                )
});