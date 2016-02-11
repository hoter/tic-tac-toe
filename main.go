package main

import (
	"fmt"
	"strings"
	"strconv"
	"net/http"
	"math/rand"
	"html/template"
	"golang.org/x/net/websocket"
)

const numberOfPlayers = 2;
const numberOfRows = 3;
const numberOfCols = 3;

type Player struct {
	ws *websocket.Conn
	is_active bool
	id int
}

func (p Player) sendMessage(message string) {
	mes := make(map[string]string)
	mes["message"] = message
	if err := websocket.JSON.Send(p.ws, mes); err != nil {
		// we could not send the message to a peer
		fmt.Println("Сервер не может отправить сообщение. Ошибка: ", err.Error())
	}
}

func (p Player) sendCoor(message string, pId int) {
	mes := make(map[string]string)
	mes["coor"] = message
	mes["id"] = strconv.Itoa(pId)
	if err := websocket.JSON.Send(p.ws, mes); err != nil {
		// we could not send the message to a peer
		fmt.Println("Сервер не может отправить координаты. Ошибка: ", err.Error())
	}
}

func (p *Player) active(flag bool) {
	p.is_active = true
	if flag {
		p.sendMessage("Ваш ход.")
	}
}

func (p *Player) disactive(flag bool) {
	p.is_active = false
	if flag {
		p.sendMessage("Ход соперника.")
	}
}

type Game struct {
	players []*Player
	cells [numberOfRows][numberOfCols]int
}

func (g *Game) addPlayer(p *Player) int {
	p.id = len(g.players)
	g.players = append(g.players, p)
	return len(g.players) - 1
}

func (g *Game) removePlayer(pId int) {
	// Delete without preserving order
	g.players[pId] = g.players[len(g.players)-1]
	g.players = g.players[:len(g.players)-1]
}

func (g Game) sendAll(message string) {
	for _, player := range(g.players) {
		player.sendMessage(message)
	}
}

func (g *Game) start() {
	id := rand.Intn(len(g.players))
	for pId, player := range(g.players) {
		if pId == id {
			player.active(true);
		} else {
			player.disactive(true);
		}
	}
}

func (g Game) sendStep(row, col int) {
	mes := []string{strconv.Itoa(row), strconv.Itoa(col)}
	for _, player := range(g.players) {
		player.sendCoor(strings.Join(mes, " "), g.cells[row][col])
	}
}

func (g *Game) step(p Player, message string) {
	s := strings.Split(message, " ")
	row, _ := strconv.Atoi(s[0])
	col, _ := strconv.Atoi(s[1])
	if g.cells[row][col] != 0 {
		p.sendMessage("Это поле уже занято.")
	} else {
		g.cells[row][col] = p.id + 1
		g.sendStep(row, col)
		for _, player := range(g.players) {
			player.is_active = !player.is_active
		}
		fmt.Println(g.cells)
	}
}

type Server struct {
	games []Game
}

func (s *Server) createGame() Game {
	game := Game{
		players: make([]*Player, 0, numberOfPlayers),
	}
	s.games = append(s.games, game)
	return game
}

func (s *Server) searchAvailableGame() int {
	if (len(s.games) != 0) {
		for id, game := range(s.games) {
			if (len(game.players) < numberOfPlayers) {
				return id
			}
		}
	} else {
		s.createGame()
		return s.searchAvailableGame()
	}
	return -1
}

var s Server

/**
 * Generate the homepage html file
 */
func homeHandler(c http.ResponseWriter, r *http.Request) {
	templateFile := template.Must(template.ParseFiles("web/game.html"))
	templateFile.Execute(c, nil)
}

/**
 * WebSocket handler callback
 */
func wsHandler(ws *websocket.Conn) {
	var err error
	var clientMessage string
	p := &Player{
		ws: ws,
	}
	defer ws.Close()

	id := s.searchAvailableGame()
	if id != -1 {
		pId := s.games[id].addPlayer(p)
		if pId == numberOfPlayers - 1 {
			s.games[id].sendAll("Соединение установлено. Вы можете начать игру.")
			s.games[id].start()
		} else {
			p.sendMessage("Пожалуйста, ожидайте партнера.")
		}
		// for loop so the websocket stays open otherwise it'll close after one Receieve and Send
		for {
			if err = websocket.Message.Receive(ws, &clientMessage); err != nil {
				fmt.Println("Соединение с websocket оборвано. Клиент удален.")
				s.games[id].removePlayer(pId)
				return
			} else {
				if s.games[id].players[pId].is_active {
					s.games[id].step(*p, clientMessage)
					fmt.Println(clientMessage)
				} else {
					s.games[id].players[pId].sendMessage("Пожалуйста подождите. Сейчас ходит ваш соперник.")
				}
			}
		}
	}
}

func main() {
	http.HandleFunc("/", homeHandler)

	http.Handle("/ws", websocket.Handler(wsHandler))

	http.HandleFunc("/web/", func (c http.ResponseWriter, r *http.Request) {
		http.ServeFile(c, r, r.URL.Path[1:])
	})

	err := http.ListenAndServe(":8080", nil)
	checkErr(err)
}

/**
 * Panic if the error is existed
 */
func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
