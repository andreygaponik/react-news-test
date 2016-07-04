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

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <News data={my_news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);