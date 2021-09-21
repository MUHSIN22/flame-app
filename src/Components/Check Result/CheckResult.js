import React, { useContext } from "react";
import { EssentialContext } from "../../Assets/EssentialContext";
import "./checkResult.scss";

export default function CheckResult() {
  const [essentials, setEssentials] = useContext(EssentialContext)

  const shareMobile = async () =>{
    const shareData = {
        title: 'Flame app result',
        text: `I checked the relationship status of ${essentials.user} and ${essentials.crush} through flame app.Flame app said that ${essentials.text}`,
        url: 'https://flame-app-135d4.web.app',
      }
    try{
        await navigator.share(shareData)
    }catch(err){
      console.log(err);
        //no code
    }
}
  return (
    <div className="check-result-wrapper">
      {essentials && (
        <div className="check-result">
          <img src={essentials.image} alt="" />
          <p>{essentials.text}</p>
        </div>
      )}
      <div className="button-wrapper">
        <button onClick={shareMobile}>Share with friends</button>
      </div>
    </div>
  );
}
