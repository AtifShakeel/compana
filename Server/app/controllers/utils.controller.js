import getAllAllowedPages from "../../utils/pageExtractor.js"
import buildUrlTree from "../../utils/urlTree.js";

const buildTree = async (req, res) => {
    const { url } = req.body;
    const allowedPages = await getAllAllowedPages(url);
    const tree = await buildUrlTree(allowedPages);
    res.json(tree);
}

export {
    buildTree
}