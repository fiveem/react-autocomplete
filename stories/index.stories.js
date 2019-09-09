import React from 'react';

import { storiesOf } from '@storybook/react';

import Autocomplete from '../src';



storiesOf('Autocomplete', module)
    .add('simple autocomplete', () => {
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

        return (<Autocomplete suggestions={['1', '2', '3', '33', '22', 'roxana', 'romana']}
                              value={4}
                              debounceTime={2000}
                              containerStyle={containerStyle}
                              autocompleteStyle={autocompleteStyle}
                              selectedSuggestionStyle={selectedSuggestionStyle}/>)
});