import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { EssentialContext } from "../../Assets/EssentialContext";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "./Form.scss";

const letterSpecificier = {
  f: {
    text: "you are just friends",
    image: "/images/friends.svg",
  },
  l: {
    text: "you are lovers",
    image: "/images/lovers.svg",
  },
  a: {
    text: "Its just an affection between you",
    image: "/images/affection.svg",
  },
  m: {
    text: "You will get married",
    image: "/images/marry.svg",
  },
  e: {
    text: "you are enemies",
    image: "/images/enemies.svg",
  },
};

export default function Form() {
  const [name, setName] = useState(null);
  const [essentials, setEssentials] = useContext(EssentialContext);
  const history = useHistory();

  //Import environmental varialbles
  const {
    REACT_APP_PRIVATE_KEY,
    REACT_APP_CLIENT_EMAIL,
    REACT_APP_SPREADSHEET_ID,
    REACT_APP_SHEET_ID
  } = process.env

  //creating new object of google spreadsheet
  const doc = new GoogleSpreadsheet(REACT_APP_SPREADSHEET_ID);

  //Function append spreadsheet to add row into google sheet

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: REACT_APP_CLIENT_EMAIL,
        private_key: REACT_APP_PRIVATE_KEY,
      });
      await doc.loadInfo();
      const sheet = doc.sheetsById[REACT_APP_SHEET_ID];
      const result = await sheet.addRow(row);
      return result;
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  // *Function for make regex that match all characters exclude the string value of name
  const regexMaker = (name) => {
    var regexForName = new RegExp("[^" + name + "]", "gi");
    return regexForName;
  };

  // *Function for store input data into the object name with the input field name
  const handleInput = (event) => {
    var inputValue = event.target.value.replace(/\s/g, "");
    setName({
      ...name,
      [event.target.name]: inputValue,
    });
  };

  // *Function for handle submission of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    appendSpreadsheet(name)

    if (name !== null) {
      let flame = "flame";

      // *Remaining characters after removing the commom characters in both user and crush name
      let userCharacter = name.user.match(regexMaker(name.crush));
      let crushCharacter = name.crush.match(regexMaker(name.user));
      let totalCharacterLength = userCharacter.length + crushCharacter.length;

      // *loop that select a letter from flame based on totalCharacterLength
      while (flame.length > 1) {
        var compressedLength = lengthCompressor(
          totalCharacterLength,
          flame.length
        );

        if (flame.length === 2) {
          flame = flame[compressedLength === 2 ? 0 : 1];
        } else {
          flame =
            flame.slice(0, compressedLength - 1) +
            flame.slice(compressedLength);
        }
      }
      letterSpecificier[flame].user = name.user
      letterSpecificier[flame].crush = name.crush
      setEssentials(letterSpecificier[flame]);
      history.push("/scanning");
    }
  };

  // *Function for compress the given value of variable length less than max NB: this is recursion
  const lengthCompressor = (length, max) => {
    if (length > max) {
      return lengthCompressor(length - max, max);
    } else {
      return length;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name..."
        name="user"
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="Enter your crush's name..."
        name="crush"
        onChange={handleInput}
      />
      <button type="submit">Check your status</button>
    </form>
  );
}
