var Module = (function(){
	// Все необходимые переменные 
	var inputName = document.querySelector('.name-input'),// Инпут ввода Имени
		infoBar = document.querySelector('.infobar-text'), // Информационная строка сверху
		restartButton = document.querySelector('.restart'); // Кнопка для рестарта игры 
		startButton = document.getElementById('start'), // Кнопка старта игры
		cheatButton = document.getElementById('cheater') // Кнопка для отображения кораблей компа
		compFieldId = '#compField', // Айди обертки поля боя компьютера и игрока
		playerFieldId = '#playerField', // нужно для удобной работы с селекторами jQuery
		fields = document.querySelectorAll('.battlefield-grid'); // Массив из оберток двух полей  

	// Главная функция которая будет возвращена в объекте
	var gameStart = () => {
		_createFields()// Функция создает поле боя игрока и компьютера
		_createAroundText(); //Вызвает функцию для вывода букв и цифр по краям поля боя
		_eventListeners(); //Вызывает прослушку событий
		

	}
	// Функция отвечает за прослушку всех событий которые происходят на странице
	var _eventListeners = () => {
		inputName.addEventListener('keyup', _changePlayerName); // Добавляет события по вводу имени
		startButton.addEventListener('click', _battleBegins); // Начинает игру
		restartButton.addEventListener('click', _battleBegins); // Начинает заново
		cheatButton.addEventListener('click', function(){
			_fillTheOneField('cheater');
		}); // Показывает корабли компа
	}

	//Функция отвечает за начало игры
	var _battleBegins = function(){
		_createFields(); // Создает/пересоздает 2 поля боя
		_createShips(); // Создает и размещает корабли
		_fillTheFields(); // Проверяет ячейки на пустоту и заполняет
	}
	
	return {
		gameStart: gameStart
	}
})();


Module.gameStart();