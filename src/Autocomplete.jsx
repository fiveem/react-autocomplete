import React from 'react';

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredSuggestions: [],
            selectedSuggestion: 0
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSuggestionClicked = this.onSuggestionClicked.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onInputChange(e) {
        let filteredSuggestions = [];
        const inputValue = e.target.value || '';

        filteredSuggestions = this.props.suggestions.filter(suggestion => (
            suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        ))

        this.setState({
            filteredSuggestions
        });

        this.props.onChange(inputValue);
    }

    onKeyDown(e) {
        const keyCode = e.keyCode;
        const { selectedSuggestion , filteredSuggestions } = this.state;

        //arrow down key
        if(keyCode === 40 && selectedSuggestion < filteredSuggestions.length - 1) {
            this.setState((state) => ({
                selectedSuggestion: state.selectedSuggestion + 1
            }))
        }
        
        //arrow up key 
        if(keyCode === 38 && selectedSuggestion !== 0 ) {
            this.setState((state) => ({
                selectedSuggestion: state.selectedSuggestion - 1
            }))
        }

        //enter key
        if(keyCode === 13) {
            this.setState({
                filteredSuggestions: [],
                selectedSuggestion: 0
            });
            this.props.onChange(this.state.filteredSuggestions[this.state.selectedSuggestion]);
            e.preventDefault();
        }
    } 

    onSuggestionClicked(e) {
        this.setState({
            filteredSuggestions: []
        });
        this.props.onChange(e.target.innerText);
    }

    render() {
        const { wrapperClassName, inputClassName, autocompleteClassName } = this.props;
        return (
            <div className={wrapperClassName}>
                <input type="text" value={this.props.value}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                    className={inputClassName}
                />
                <div className={autocompleteClassName}>
                    {this.renderAutocomplete()}
                </div>
            </div>
        );
    }

    renderAutocomplete() {
        const { filteredSuggestions } = this.state;

        return (
            filteredSuggestions ?
                filteredSuggestions.map((suggestion, index) => (
                    <div key={index}
                        onClick={this.onSuggestionClicked}
                        className={`${this.state.selectedSuggestion === index ? 'selected' : ''} suggestion`}
                    >
                        {suggestion}
                    </div>
                ))
                :
                null
        );
    }
}