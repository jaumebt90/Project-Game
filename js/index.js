window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    const canvas = document.querySelector("#canvas");
    theGame.init(canvas);
    document.getElementById("game-intro").remove();
    //document.getElementById("start-button").onclick = () => {
      //location.reload();
  //};
  };
};









