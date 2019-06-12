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

	
	return {
		gameStart: gameStart
	}
})();


Module.gameStart();