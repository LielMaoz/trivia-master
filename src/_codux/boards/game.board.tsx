import "./game.board.css";
import React from "react";
import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Game",
  Board: () => (
    <div className="GameBoard_div2">
      <img
        src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
        alt=""
      />
    </div>
  ),
  isSnippet: true,
});
