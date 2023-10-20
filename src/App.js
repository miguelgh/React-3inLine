//importo la función de react "useState" para guardar un estado
import { useState } from "react";

//se crea el componente cuadrado para utilizarlo en el board
//se crea la propiedad "value" para poder pasar un valor desde el board (props)
function Square({value, onSquareClick}){
  /*
  'value' almacena el valor y 
  'setValue' es una función que se puede usar para cambiar el valor. 
  El 'null' pasado a useState se usa como valor inicial para esta variable de estado, por lo que value aquí comienza igual a null.s
  */
  // const [value, setValue] = useState(null);

  // function handleClick(){
  //   //con setValue modifico el valor de 'value' (setters)
  //   setValue('X');
  // }
  return ( 
    //se agrega el onClick al button para llamar a una función
    <button className="square" onClick={onSquareClick}>{ value }</button>
  );
  /*con las {} puedo utilizar JS dentro de JSX*/
}


//crea la función "Board", export le dice a js que esta función se va 
//a utilizar fuera es este archivo
export default function Board() {
  //se configura xIsNext en un valor booleano
  const [xIsNext,setXIsNext] = useState(true);
  //crea un array de 9 casilleros con un valor null
  const [squares, setSquares] = useState(Array(9).fill(null));

  //por ser una función dentro de otra, la función hijo puede leer las variables declaradas fuera
  function handleClick(i){
    //si square[i] tiene un dato entonces sal de la función (return)
    //con esto se evita pisar un dato si ya está ocupado
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    //si el valor de xIsNext es true pone X si no O
    if (xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    //configura el xIsNext en el valor contrario al que venia (switch)
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status= "Ganador: "+ winner;
  }else {
    status= "siguiente jugador" + (xIsNext ? 'X' : 'O');
  }

  //los componentes tiene que devolver 1 solo elemento
  //encerrado en una etiqueta, como por ejemplo un <div> o utilizar
  //fragmentos <> ... </>
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}