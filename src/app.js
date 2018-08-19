class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options: props.options
        };
    };

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header
                    subtitle={subtitle}
                />
                <Action
                    hasOptions={this.state.options.length}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption= {this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    };

    handlePick() {
        alert(this.state.options[Math.floor(Math.random()* this.state.options.length)]);
    };

    handleDeleteOptions() {
        this.setState(() => (
            { options:[] }
        ));
    };

    handleDeleteOption(toRemove) {
        this.setState((outdated) => (
            {options: outdated.options.filter((option) => toRemove !== option)}
        ));
    };

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((outdated) => (
            { options: outdated.options.concat(option) }
        ));
    };
};

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button
                disabled={!props.hasOptions}
                onClick={props.handlePick}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>
                Remove All
            </button>
            {
                props.options.map(option =>
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                )
            }
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            <p>
                {props.optionText}
                <button onClick={(event) =>
                    props.handleDeleteOption(props.optionText)}
                >
                    remove
                </button>
            </p>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    };    

    handleAddOption(event) {
        event.preventDefault();
        const option = event.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option);

        this.setState(() => (
            { error }
        ));
    };
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    };
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));