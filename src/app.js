class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options: ['yoshino', 'hiromi', 'yuka']
        };
    };

    // handlePick
    handlePick() {
        alert(this.state.options[Math.floor(Math.random()* this.state.options.length)]);
    };

    // handleDeleteOptions
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    };

    handleAddOption() {
        console.log(option);
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header
                    title={title}
                    subtitle={subtitle}
                />
                <Action
                    hasOptions={this.state.options.length}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}    
                />
                <AddOption />
            </div>
        );
    };
};

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    };
};

class Action extends React.Component {
    render() {
        return (
            <div>
                <button
                    disabled={!this.props.hasOptions}
                    onClick={this.props.handlePick}
                >
                    What should I do?
                </button>
            </div>
        );
    };
};

class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>
                    Remove All
                </button>
                {
                    this.props.options.map(option =>
                        <Option key={option} optionText={option}/>
                    )
                }
            </div>
        );
    };
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
    };    

    handleAddOption(event) {
        event.preventDefault();
        const option = event.target.elements.option.value.trim();

        if(option) {
            alert('Yoshino kiss');
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    };
};

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.optionText}</p>
            </div>
        );
    };
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));