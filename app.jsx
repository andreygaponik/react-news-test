var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];


// var News = React.createClass({
//   render: function() {
//     return (
//       <div className="news">
//         К сожалению, новостей нет.
//       </div>
//     );
//   }
// });

var Article = React.createClass({
	propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function() {
    return {
      visible: false
    };
  },

  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },

  hideClick: function(e) {
  	e.preventDefault();
  	this.setState({visible: false});
  },

	render: function() {
		var author = this.props.data.author,
				text = this.props.data.text,
				bigText = this.props.data.bigText,
				visible = this.state.visible;

		return (
			<div className="article">
				<p className="news__author">
					{author}
				</p>
				<p className="news__text">
					{text}
				</p>
				<a href="#" 
					onClick={this.readmoreClick}
					className={'news__readmore ' + (visible ? 'none': '')}>
					Подробнее
				</a>
				<p className={'news__big-text ' + (visible ? '': 'none')}>
				 {bigText}
				</p>
				<a href="#"
					onClick={this.hideClick}
					className={'news__big-text ' + (visible ? '': 'none')}>
					Спрятать
				</a>

			</div>
		)
	}
});

var News = React.createClass({
	propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
    	var newsTemplate = data.map(function(item, index) {
	      return (
	        <div key={index}>
	          <Article data={item} />
	        </div>
	      )
	    });

    } else {
    	newsTemplate = <strong> К сожалению новостей нет </strong>
    }

    return (
      <div className="news">
        {newsTemplate}
        <strong className={'news__count ' + (data.length > 0 ? '': 'none')}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var Comments = React.createClass({
  render: function() {
    return (
      <div className="comments">
        Нет новостей - комментировать нечего
      </div>
    );
  }
});

var Add = React.createClass({
  getInitialState: function() { // state
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },

  onAuthorChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({authorIsEmpty: false})
    } else {
      this.setState({authorIsEmpty: true})
    }
  },
  onTextChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({textIsEmpty: false})
    } else {
      this.setState({textIsEmpty: true})
    }
  },

  // componentDidMount - Make focus in input
  componentDidMount: function() { 
    ReactDOM.findDOMNode(this.refs.author).focus();
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();
    // Uncontrolled Components
    // console.log(this.refs);

    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;

    console.log(author + '\n' + text);
  },

  onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
  },

  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;

    return (

      <form className='add cf'>
        <p> Name </p>
        <input
          type='text'
          className='add__author'
          onChange={this.onAuthorChange}
          placeholder='Ваше имя'
          ref='author'
        />

        <p> Message </p>
        <textarea className='add__text'
          defaultValue=''
          placeholder='Type text'
          ref='text'
          onChange={this.onTextChange}
        ></textarea>

        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='add_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          >
          Add news
        </button>

      </form>
      
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>News</h3>
        <Add />
        <News data={my_news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);