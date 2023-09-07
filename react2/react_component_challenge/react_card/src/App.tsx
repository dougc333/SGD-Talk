import { useState } from 'react'
import './App.css'
import {Simpson} from './Simpson'
import {FlexOneLevel} from './FlexOneLevel'
/*

    <Badge
      user={{
        name: "Lynn Fisher",
        img: "https://avatars.githubusercontent.com/u/871315",
        handle: "lynnandtonic"
      }}
      style={{
        width: 300,
        margin: "0 auto",
        border: "1px solid var(--beige-10)",
        borderRadius: 8,
        backgroundColor: "var(--charcoal)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        textAlign: "center"
      }}
      addFriend={() => alert("Added!")}
    />

*/



export default function App() {
  return (
    // <Simpson>simpson</Simpson>
    <FlexOneLevel></FlexOneLevel>
  );
}

