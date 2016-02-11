const numberOfRows = 3;
const numberOfCols = 3;
var cells = [];

var initialize = function() {
	for (var i = 0; i < numberOfRows; i++) {
				cells[i] = [];
				for (var j = 0; j < numberOfCols; j++) {
					cells[i][j] = 0;
				}
	}
};

var showPopup = function(popup, header, body) {
	header = header || 'Соединение установлено';
	body = body || 'Пожалуйста, ожидайте партнера.';
	document.getElementById('popupTitle').innerHTML = header;
	document.getElementById('popupBody').innerHTML = body;
	popup.style.visibility = 'visible';
	popup.style.opacity = 1;
};
var hidePopup = function(popup) {
	popup.style.visibility = 'hidden';
	popup.style.opacity = 0;
};

window.onload = function() {
	var coeffWidth = 0,
		coeffHeight = 0,
		game = document.getElementById('game'),
		context = game.getContext('2d'),
		close = document.getElementById('close'),
		overlay = document.getElementById('popup1');
  initialize();

	function drawGame() {
		game.width  = window.innerWidth;
		game.height = window.innerHeight;
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;

		coeffWidth = game.offsetWidth / numberOfRows;
		coeffHeight = game.offsetHeight / numberOfCols;
		var circleSize = coeffHeight > coeffWidth ? coeffWidth : coeffHeight;

		for (var i = 0; i < numberOfRows; i++) {
		    	for (var j = 0; j < numberOfCols; j++) {
						context.strokeStyle = "#000000";
						context.lineWidth = 1;
						context.beginPath();
						context.rect(i * coeffWidth, j * coeffHeight, coeffWidth, coeffHeight);
						context.stroke();
						context.closePath();
						if (cells[i][j] == 1) {
							context.strokeStyle = "#FF0000";
							context.lineWidth = 10;
							context.beginPath();
							context.moveTo(i * coeffWidth, j * coeffHeight);
							context.lineTo((i + 1) * coeffWidth, (j + 1) * coeffHeight);
							context.stroke();
							context.closePath();

							context.beginPath();
							context.moveTo((i + 1) * coeffWidth, j * coeffHeight);
							context.lineTo(i * coeffWidth, (j + 1) * coeffHeight);
							context.stroke();
							context.closePath();
						}
						else if (cells[i][j] == 2) {
							context.strokeStyle = "#00FF00";
							context.lineWidth = 5;
							context.beginPath();
							context.ellipse(i * coeffWidth + coeffWidth / 2, j * coeffHeight + coeffHeight / 2, circleSize / 2, circleSize / 2, 0, 0, 2 * Math.PI);
							context.stroke();
							context.closePath();
						}
		    	}
		}
	}

	function clickHandler(event) {
		var x = Math.floor(event.pageX / coeffWidth),
			y = Math.floor(event.pageY / coeffHeight);
	 	socket.send(x + ' ' + y);
	}

	function closeHandler(event) {
		event.preventDefault();
		hidePopup(overlay);
	}

	drawGame();

	// Add an event listener for 'click' events.
	game.addEventListener('click', clickHandler, false);

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', drawGame, false);

	// Add an event listener for 'click' events.
	close.addEventListener('click', closeHandler, false);

	var socket = new WebSocket("ws://localhost:8080/ws");
	socket.onopen = function() {
		showPopup(overlay);
	};

	socket.onclose = function(event) {
	  if (event.wasClean) {
			showPopup(overlay, 'Соединение закрыто чисто', 'Спасибо за игру');
	  } else {
			showPopup(overlay, 'Обрыв соединения', 'Приносим свои извенения за временные неудобства');
	  }
	};

	socket.onmessage = function(event) {
		var data = JSON.parse(event.data);
		if (data.message) {
			showPopup(overlay, 'Системное сообщение', data.message);
		}
		else if (data.coor) {
			var coor = data.coor.split(" ");
			cells[coor[0]][coor[1]] = data.id;
			drawGame();
		}
	};

	socket.onerror = function(error) {
		showPopup(overlay, 'Ошибка', error.message);
	};
};
