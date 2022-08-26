import { Component, KnitClient as Knit } from "@rbxts/knit";
import Logger from "shared/Logger";

const modules = (script.Parent!.FindFirstChild('Controllers') as Folder).GetDescendants();
for (const module of modules)
    if (module.IsA('ModuleScript'))
        require(module);

if (modules.size() !== 0)
    Knit.Start()
        .then(() => Component.Auto(script.Parent!.FindFirstChild('Components') as Folder))
        .catch(e => Logger.KnitError(e));