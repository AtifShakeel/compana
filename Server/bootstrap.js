import Logger from "./utils/logger.js";

const logger = new Logger({ logToFile: false, filePath: 'app.log' });
global.Log = logger;