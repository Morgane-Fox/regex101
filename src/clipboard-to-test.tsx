import { Clipboard } from "@raycast/api";
import { runAppleScript } from "run-applescript";
import axios from "axios";


async function getCopiedHTML() {
  const lastCopied = await Clipboard.readText();
  return lastCopied
}


export default async function callRegex101Api() {
  const body = {
    regex: "[^<>]+",
    flags: "ims",
    testString: await getCopiedHTML(),
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
