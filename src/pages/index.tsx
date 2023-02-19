import Head from 'next/head';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Chess } from 'chess.js';
import { Move, Piece, ShortMove, Square } from '@/types/chess';

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false });

export default function Home() {
  const [game] = useState(new Chess());

  const [fen, setFen] = useState(game.fen());

  const handleMove = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
  }) => {
    const possibleMoves = game.moves({ verbose: true });
    const move = possibleMoves.find((move) => {
      return move.from === sourceSquare && move.to === targetSquare;
    });
    if (!move) return;
    game.move(move.san);
    setFen(game.fen());
  };

  return (
    <>
      <Head>
        <title>blitz</title>
        <meta name="description" content="Reimagining chess" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>blitz</h1>
        <Chessboard width={400} position={fen} onDrop={handleMove} />
      </div>
    </>
  );
}
