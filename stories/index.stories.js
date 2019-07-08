import React from 'react';

import { storiesOf } from '@storybook/react';

import Autocomplete from '../src';


storiesOf('Autocomplete', module)
    .add('simple autocomplete', () => (
        <Autocomplete suggestions={['1', '2', '3']} value={4} />
));
