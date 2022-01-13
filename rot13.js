let textBox = document.getElementById("textBox");
let button = document.getElementById("execute");

function rot13(str) {
  const message = str.toUpperCase();
  let encriptedMessage = "";
  let limitRange = 0; // The number of position from the current letter to Z
  const LAST_CHARACTER_ASCII_CODE = 90; // Letter Z
  const FIRST_CHARACTER_ASCII_CODE = 65; // Letter A
  let encriptedCharacter = "";
  let characterAsciiCode = 0;
  let rot = 13;
  let restRange = 0; // The resting positions to arrive to the target letter
  let limit = 0;

  // Read the message letter by letter
  for (let characterIndex = 0; characterIndex < message.length; characterIndex += 1) {
    characterAsciiCode = message.charCodeAt(characterIndex);
    limitRange = LAST_CHARACTER_ASCII_CODE - characterAsciiCode;
    limit = characterAsciiCode + rot;

    // Decide if the ROT will move continuously or will jump to A
    if (limitRange < rot) {
      restRange = rot - limitRange;
    }

    // The limit will vary if the ROT have to jump to A
    for (let rotCode = characterAsciiCode; rotCode <= limit; rotCode += 1) {
      // Bypass non letters
      if (characterAsciiCode < FIRST_CHARACTER_ASCII_CODE || characterAsciiCode > LAST_CHARACTER_ASCII_CODE) {
        encriptedMessage += message[characterIndex];
        break;    
      }
      // Jumps to A and prevents to ignore Z if ROT goes from M
      if (rotCode === LAST_CHARACTER_ASCII_CODE && characterAsciiCode !== 77) {
        rotCode = FIRST_CHARACTER_ASCII_CODE - 1; // -1 because FOR rest the actual loop
        limit = restRange + FIRST_CHARACTER_ASCII_CODE - 1;
      }
      else if (rotCode === limit) {
        encriptedCharacter = String.fromCharCode(rotCode);
        encriptedMessage += encriptedCharacter;
      }
    }
  }
  return encriptedMessage;
}

function crypt_decrypt() {
  let message = textBox.value;
  let rotMessage = rot13(message);

  textBox.value = rotMessage;
}

button.addEventListener("click", crypt_decrypt);