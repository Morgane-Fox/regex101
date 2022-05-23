import { Clipboard, getSelectedText } from "@raycast/api";
import { runAppleScript } from "run-applescript";
import axios from "axios";


//my name is Morgane

export default async function callRegex101Api() {

  const selected = await getSelectedText()
  const lastCopied = await Clipboard.readText();

  const input = selected.length > 1 ? selected : lastCopied


  const body = {
    regex: "[^<>]+",
    flags: "ims",
    testString: input,
    delimiter: '/',
    flavor: 'javascript',
  };

  
  try {
    const response = await axios.post('https://regex101.com/api/regex', body)

    const url = `https://regex101.com/r/${response.data.permalinkFragment}/latest`

    const script =
    `
    tell application "Google Chrome"
      activate
      tell window 1
          set newTab to make new tab ` + ('with properties {URL:"' + url + '"}') + ` 
      end tell
    end tell
    `;

    return await runAppleScript(script);


  } catch (error) {
    console.error(error);
  }
  
}
