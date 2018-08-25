import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header
                    subtitle={subtitle}
                />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption= {this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleDeselectOption={this.handleDeselectOption}
                />
            </div>
        );
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if(options) {
                this.setState(() => ({ options }));
            }
        } catch (error) {

        }
    };
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };

    handlePick = () => {
        const randomIndex = Math.floor(Math.random()* this.state.options.length);
        this.setState(() => ({
            selectedOption: this.state.options[randomIndex]
        }));
    };

    handleDeleteOptions = () => {
        this.setState(() => (
            { options:[] }
        ));
    };

    handleDeleteOption = (toRemove) => {
        this.setState((outdated) => (
            {options: outdated.options.filter((option) => toRemove !== option)}
        ));
    };

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((outdated) => (
            { options: outdated.options.concat(option) }
        ));
    };

    handleDeselectOption = () => {
        this.setState(() =>({ selectedOption: undefined }))
    }
};