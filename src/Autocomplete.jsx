import React from 'react';
import debounce from 'lodash.debounce';

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredSuggestions: null,
            selectedSuggestion: null,
            value: props.value
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSuggestionClicked = this.onSuggestionClicked.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.callPropsChangeMehod = this.callPropsChangeMehod.bind(this);
        this.callPropsChangeMehod = debounce(this.callPropsChangeMehod, props.debounceTime);
    }

    callPropsChangeMehod(value) {
        this.props.onChange && this.props.onChange(value);
    }

    onInputChange(e) {
        let filteredSuggestions = null;
        const inputValue = e.target.value || '';

        filteredSuggestions = inputValue && this.props.suggestions.filter(suggestion => (
            suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        ))

        this.setState({
            filteredSuggestions,
            value: inputValue
        });

        this.callPropsChangeMehod(inputValue);
        
    }

    onKeyDown(e) {
        const keyCode = e.keyCode;
        const { selectedSuggestion , filteredSuggestions } = this.state;

        //arrow down key
        if(keyCode === 40 && selectedSuggestion < filteredSuggestions.length - 1) {
            this.setState((state) => ({
                value: state.filteredSuggestions[state.selectedSuggestion + 1],
                selectedSuggestion: state.selectedSuggestion + 1,
            }))
        }
        
        //arrow up key 
        if(keyCode === 38 && selectedSuggestion !== 0 ) {
            this.setState((state) => ({
                value: state.filteredSuggestions[state.selectedSuggestion - 1],
                selectedSuggestion: state.selectedSuggestion - 1,
            }))
        }

        //enter key
        if(keyCode === 13) {
            this.setState({
                filteredSuggestions: null,
                selectedSuggestion: 0,
            });
            this.callPropsChangeMehod(this.state.filteredSuggestions[this.state.selectedSuggestion]);
            e.preventDefault();
        }

    } 

    onSuggestionClicked(e) {
        this.setState({
            filteredSuggestions: [],
            value: e.target.innerText
        });
        this.callPropsChangeMehod(e.target.innerText);
    }

    onSuggestionMouseEnter(index) {
        this.setState({
            selectedSuggestion: index
        })
    }

    render() {
        const { containerStyle, inputStyle, autocompleteStyle } = this.props;
        return (
            <div style={containerStyle}>
                <input type="text" value={this.state.value}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                    style={inputStyle}
                />
                {this.state.filteredSuggestions &&
                    <div style={autocompleteStyle}>
                        {this.renderAutocomplete()}
                    </div>
                }
            </div>
        );
    }

    renderAutocomplete() {
        const { filteredSuggestions, selectedSuggestion } = this.state;
        const { selectedSuggestionStyle } = this.props;

        return (
            filteredSuggestions ?
                filteredSuggestions.map((suggestion, index) => {
                    const selectedStyle = selectedSuggestion === index ? selectedSuggestionStyle : null;

                    return(
                        <div key={index}
                            onClick={this.onSuggestionClicked}
                            onMouseEnter={() => this.setState({ selectedSuggestion: index })}
                            onMouseLeave={() => this.setState({ selectedSuggestion: null })}
                            style={selectedStyle}
                        >
                            {suggestion}
                        </div>
                    )
                })
                :
                null
        );
    }
}