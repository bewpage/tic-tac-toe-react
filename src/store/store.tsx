import { createContext, useContext, useReducer, ReactNode } from 'react';

export type SquareValue = 'X' | 'O' | null;
type StateTypes = {
  squares: SquareValue[][]; // 2D array of SquareValue
  xIsNext: boolean;
  winner: string;
  isPlaying: boolean;
};

type StoreTypes = {
  state: StateTypes;
  dispatch?: any;
};

export enum GameActionEnum {
  SET_SQUARES = 'SET_SQUARES',
  SET_X_IS_NEXT = 'SET_X_IS_NEXT',
  SET_WINNER = 'SET_WINNER',
  SET_IS_PLAYING = 'SET_IS_PLAYING',
  RESET = 'RESET',
}

type GameActionType = {
  type: GameActionEnum;
  payload?: any;
};

const emptyBoard = Array(3).fill(Array(3).fill(null));

const initialState: StoreTypes = {
  state: {
    squares: emptyBoard,
    xIsNext: true,
    winner: '',
    isPlaying: true,
  },
};

const GameContext = createContext<StoreTypes>(initialState);

export const reducer = (state: StateTypes, action: GameActionType) => {
  switch (action.type) {
    case GameActionEnum.SET_SQUARES:
      return {
        ...state,
        squares: action.payload,
      };
    case GameActionEnum.SET_X_IS_NEXT:
      return {
        ...state,
        xIsNext: action.payload,
      };
    case GameActionEnum.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    case GameActionEnum.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case GameActionEnum.RESET:
      return {
        ...state,
        squares: emptyBoard,
        xIsNext: true,
        winner: '',
        isPlaying: true,
      };
    default:
      return state;
  }
};

export const useStore = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state);
  const value = { state, dispatch };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};

export { GameContextProvider, useGameContext };
