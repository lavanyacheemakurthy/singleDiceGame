export function getModelTitle(text) {
  switch (text) {
    case "RULES":
      return "Rules";
    case "SETTINGS":
      return "Settings";
    default:
      return "title";
  }
}
export function getModelContent(text) {
  switch (text) {
    case "RULES":
      return (
        <div>
          <p>
            You can click on each face dice to increase bet amount for
            respective face in limited time. Click multiple times to keep adding
            bet by $1.
          </p>
          <ul>
            <li> Once your are ready, click set bets button.</li>
            <li> You see timer gets started for 10 sec.</li>
            <li>
              {" "}
              Make sure you click on dice faces to add bet amount for the face
            </li>
            <li>Once timer stops, you can not click dice faces</li>
            <li>
              Once a big dice appears on screen, click on it to see winner.
            </li>
          </ul>
        </div>
      );
    case "SETTINGS":
      return <div>Comming soon...!
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi in fuga explicabo quod, sapiente tenetur assumenda nostrum. Unde amet beatae, veritatis similique nobis eligendi velit, perspiciatis quo vitae pariatur minima.</div>
      </div>;
    default:
      return "title";
  }
}
