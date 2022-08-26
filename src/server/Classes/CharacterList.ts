import { Character } from "shared/Classes/Character";
const CharacterList: Character[] = [];

const moduleFolder = script.Parent?.WaitForChild("CharacterModules")!
for (const charModule of moduleFolder.GetChildren())
    if (charModule.IsA("ModuleScript"))
        CharacterList.push(<Character>require(charModule));

export = CharacterList;