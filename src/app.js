class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    };

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header
                    title={title}
                    subtitle={subtitle}
                />
                <Action />
                <Options options={this.state.options}/>
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
    handlePick() {
        alert('yoshino');
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        );
    };
};

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }
    handleRemoveAll() {
        console.log(this.props.options);
    };
    
    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
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
                {this.props.optionText}
            </div>
        );
    };
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));