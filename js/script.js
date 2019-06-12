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

	// Функция проверяет ячейки и если они пустые(не имеют ни одного класса кроме .Cell) то заполняет их 
	// классом wather
	var _fillTheFields = function(){
		var fieldsIdArray = []; // Массив в который добавятся айдишники полей 
		fieldsIdArray = [playerField, compFieldId]; // с помощью реструктуризации массив получает айдишники
		 //Запускается цикл который перебирает элементы массива с айдишниками и для каждого вызывает функцию
		 //проверки/наполнения одного поля
		 for(var i = 0; i < fieldsIdArray.length; i++){ 
		 	_fillTheOneField(fieldsIdArray[i]); // вызывается функция с аргументом айди поля
		 }
	}

	//Функция которая отвечает за проверку и наполнение водой одного поля боя а так же за кнопку Чит
	// в аргумент получает айди поля боя которое надо проверить
	var _fillTheOneField = function(fieldId){
		// Запускается цикл для каждой ячеейки в поле боя, айди которого было передано
		for(var i= 0; i < 100; i++){
			// Условие проверяет, является ли переданное значение fieldId - cheater
			//т.е проверяет, была ли передана переменная при нажатии на кнопку Чит
			// что бы отобразить все корабли компьютера
			if(fieldId === 'cheater'){ // если является
				// Условие проверяет, имеет ли итерируемая ячейка класс корабля
				// и класс который скрывает корабль на поле боя компьютера водой
				if($('#compField #cell' +i).hasClass('ship') && $('#compField #cell'+i).hasClass('waterColor')){
					// Если условие верно то убрать все лишние классы и добавить класс отображение корабля
					// т.е показать корабль на поле боя компьютера
					$('#compField #cell'+i).removeClass('shipColor waterColor cellColor fireColor').addClass('shipColor');
				//второе условие проверяет, имеет ли ячейка класс который отображает попадание по кораблю
				}else if($('#compField #cell'+i).hasClass('fireColor')){
					//если да, то ничего не делать и перенестись к финальному выражению цикла
					continue;
				//третье условие проверяет, имеет ли ячейка класс который показывает промах на поле боя
				}else if($('#compField #cell'+i).hasClass('cellColor')){
					//если да, то ничего не делать и перенестись к финальному выражению цикла
					continue;
				// Во всех остальных случаях просто наполняем ячейки водой 
				}else{
					// Удаление всех классов перед присвоением делается для того что бы ячейки перезаписывались
					// при каждом клике на кнопку и не было конфликтов между классами 
					$('#compField #cell'+i).removeClass('shipColor waterColor cellColor fireColor').addClass('waterColor');
				}
			// Если же в аргументы был передан один из айдишников полей боя
			}else{
				// Проверяем, имеет ли данная ячейка на поле боя компьютера класс корабля
				//т.е находится ли палуба корабля внутри ячейки
				if($('#compField #cell'+i).hasClass('ship')){
					//Если да, то удаляем все классы отвечающие за визуализацию, оставляя "ship"
					// и закрашиваем эту ячейку водой(делаем невидимой)
					$('#compField #cell'+i).removeClass('shipColor waterColor cellColor fireColor').addClass('waterColor');
					// так же вешаем на данную ячейку обработчик кликов
					// если игрок нажмет на эту ячейку, то вызовет функцию выстрела, которая в аргументы
					// получит айди поля данной ячейки и hit(обозначающую попадание)
					$('#compField #cell'+i).click(function(){
						_playerShot(this, 'hit'); // вызываем функцию которой передаем информацию о попадании
					});
				//если нет, то все так же вешаем на ячейку обработчик кликов
				}else{
					$('#compField #cell'+i).click(function(){
						_playerShot(this, 'miss'); // Но в этот раз передаем информацию о промахе
					});
				}
			}
		}
	}

	return {
		gameStart: gameStart
	}
})();


Module.gameStart();