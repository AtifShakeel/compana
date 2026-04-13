
import { collectionPageSchema, HomePageSchema, UniversalAnalyticsSchema, UniversalSchema, productSchema } from "./schema.js";
import puppeteer from "puppeteer";
import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
import * as cheerio from "cheerio";
import axios from "axios";

dotenv.config();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 *
 *
 * @export
 * @param {*} client
 * @param {*} url
 * @return {*}
 */
export async function pageClassifier(client, url) {
    try {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `You are a page classifier. Classify the following page into a category and confident score. Output should be in JSON format. {page_category: string, page_type: string(single keyword), page_description: string, confidence_score: number}. Input URL is ${url},. Output should be in JSON with no additional text.'`,
        });
        return response.output_text;
    } catch (error) {
        console.error("Error classifying page:", error);
    }
}

/**
 *
 *
 * @export
 * @param {*} client
 * @param {*} htmlContent
 * @return {*}
 */
export async function HTMLPageClassifer(client, htmlContent) {
    try {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `You are a page classifier. Classify the following HTML content into a category and confident score. Output should be in JSON format. {page_category: string, page_type: string(single keyword), page_description: string, confidence_score: number}. Input HTML content is ${htmlContent.toString().substring(0, 10000)}, Output should be in JSON with no additional text.'`,
        });
        return response.output_text;
    } catch (error) {
        console.error("Error classifying page:", error);
    }
}

/**
 * Crawls a web page and retrieves its HTML content.
 * @export
 * @param {*} axios Instance of axios to make HTTP requests
 * @param {*} url URL of the web page to crawl
 * @return {*} HTML content of the crawled web page
 */
export async function crawlWebPage(axios, url) {
    const response = await axios.get(url);
    return response.data;
}

/**
 *
 *
 * @export
 * @param {*} $ Cheerio Handler
 * @return {*} Cleaned HTML, Removes Tags/Classes like [ header, footer, .header, .footer, nav, .navbar, link, script, noscript, .banner, .hero, svg, .icon]
 */
export async function cleanWebPage($) {
    const text = await $(
        "header, footer, .header, .footer, nav, .navbar, link, script, noscript, .banner, .hero, svg, .icon, style",
    ).remove();
    // fs.writeFileSync("output/cleaned_page.html", $.html());
    // console.log('Cleaned HTML content saved to output/cleaned_page.html', cleaned_Text.toString().substring(0, 500));
    return $.html();
}

/**
 *
 *
 * @export
 * @param {*} client
 * @param {*} htmlContent
 * @param {*} pageType
 * @return {*}
 */
export async function AnalyzeCollectionPage(client, htmlContent, pageType, fileName, folderName) {
    try {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `You are a ${pageType} page analyzer. Analyze the following HTML content based on the page type and extract relevant information. Output should be in JSON format according to the schema provided. Input HTML content is ${htmlContent}, Page Type is ${pageType}. Output should be in JSON with no additional text. Schema: ${JSON.stringify(collectionPageSchema)} the content in schema is only for example and you should follow the structure of the schema but extract information based on the input HTML content. If certain fields are not available in the HTML content, you can leave them as null or empty arrays as appropriate. Focus on extracting accurate and relevant information based on the page type and the provided HTML content.'`,
        });
        fs.writeFileSync(`output/${folderName}/${fileName}`, response.output_text);
        return response.output_text;
    } catch (error) {
        console.error("Error analyzing page:", error);
        return null;
    }
}

export async function AnalyzePageWithURL(client, url, pageType) {
    try {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `You are a ${pageType} page analyzer. Analyze the following URL and make sure the output response should match this schema ${JSON.stringify(collectionPageSchema)} the content in schema is only for example and you should follow the structure of the schema but extract information based on the input URL. If certain fields are not available based on the URL content, you can leave them as null or empty arrays as appropriate. Focus on extracting accurate and relevant information based on the page type and the provided URL.' Input URL is ${url}. Output should be in JSON with no additional text.'`,
        });
        fs.writeFileSync(
            "output/analyzed_data_with_url.json",
            response.output_text,
        );
        return response.output_text;
    } catch (error) {
        console.error("Error analyzing page with URL:", error);
        return null;
    }
}

export async function productCheerioAnalyzer(client, htmlContent) {
    try {
        const schemaBlueprint = JSON.stringify(productSchema, null, 2);
        console.time("Cheerio Analysis Time");

        // 6️⃣ Send to GPT
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `
You are a product page analyzer.

Analyze the given HTML content and extract detailed information about the products listed on the page.

IMPORTANT:
- Some product information may be located inside tab sections such as Security, Safety, Instructions, Specifications, etc.
- These sections may be hidden using CSS or loaded dynamically.
- You must extract content from ALL sections of the HTML, including hidden/tabbed sections.

Output must be in JSON format following this structure:
${schemaBlueprint}

If any information is missing, use:
- null for strings/numbers
- empty arrays for lists

Do not include any additional explanation.

HTML Content:
${htmlContent}
`,
        });
        console.timeEnd("Cheerio Analysis Time");
        fs.writeFileSync("./output/cheerio.json", response.output_text);
        return response.output_text;
    } catch (error) {
        console.error("Error analyzing products:", error);
    }
}

export async function productAnalyzer(client, url, fileName, folderName) {
    let browser;

    const domain = new URL(url).hostname.split(".")[0];
    try {
        console.time("Puppeteer Analysis Time");
        // 1️⃣ Launch browser
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            timeout: 60000, // 60 seconds timeout for launching
        });

        const page = await browser.newPage();

        // 2️⃣ Load page and wait for network to be idle
        await page.goto(url, { waitUntil: "networkidle2" });

        // 3️⃣ Click all possible tabs/buttons to load hidden content
        const tabSelectors = [
            '[role="tab"]',
            ".tab",
            ".tabs button",
            ".nav-tabs button",
            'button[data-toggle="tab"]',
        ];

        for (const selector of tabSelectors) {
            const tabs = await page.$$(selector);

            for (const tab of tabs) {
                try {
                    await tab.click();
                    await page.waitForTimeout(500); // allow dynamic content to load
                } catch (err) {
                    // ignore click errors
                }
            }
        }

        // 4️⃣ Get fully rendered HTML
        const fullHTML = await page.content();

        await browser.close();

        // 5️⃣ Prepare schema
        const schemaBlueprint = JSON.stringify(productSchema, null, 2);

        // 6️⃣ Send to GPT
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `
        You are a product page analyzer.

        Analyze the given HTML content and extract detailed information about the products listed on the page.

        IMPORTANT:
        - Some product information may be located inside tab sections such as Security, Safety, Instructions, Specifications, etc.
        - These sections may be hidden using CSS or loaded dynamically.
        - You must extract content from ALL sections of the HTML, including hidden/tabbed sections.

        Output must be in JSON format following this structure:
        ${schemaBlueprint}

        If any information is missing, use:
        - null for strings/numbers
        - empty arrays for lists

        Do not include any additional explanation.

        HTML Content:
        ${fullHTML}
      `,
        });
        console.timeEnd("Puppeteer Analysis Time");

        fs.writeFileSync(`./output/${folderName}/${fileName}_analysis.json`, response.output_text);

        return response.output_text;
    } catch (error) {
        console.error("Error analyzing products:", error);
    } finally {
        if (browser) await browser.close();
    }
}

export async function AnalyzeHomePage(client, htmlContent, pageType) {
    try {
        const prompt = `
            You are an HomePage Analyzer. Analyze the given HTML content and extract only the store information. 
            Output must strictly follow the JSON schema provided. If certain fields are not available, return null. 
            Output only JSON, no extra text. Here is the JSON schema you must follow:
            ${JSON.stringify(HomePageSchema, null, 2)} and here is the HTML content you need to analyze:
            ${htmlContent}
        `;

        const response = await client.responses.create({
            model: "gpt-5.2",
            input: prompt,
        });

        fs.writeFileSync("output/homepage_analysis.json", response.output_text);
        return response.output_text;
    } catch (error) {
        console.error("Error analyzing home page:", error);
        return null;
    }
}

export async function AnalyzeUniversalPage(client, htmlContent, fileName, folderName) {
    console.log(`folder name is ${folderName} and file name is ${fileName}`);
    try {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `You are an Homepage Analyzer. Analyze the given web page and extract all the information in the JSON format.
            Give me all the content not UI elements nor UI content. If certain fields are not available, return null.
            HTML Content:
            ${htmlContent}

            Return only JSON with no additional text.
            `,
        });

        fs.writeFileSync(`./output/${folderName}/${fileName}`, response.output_text);
        return response.output_text;
    } catch (error) {
        console.error("Error analyzing home page with URL:", error);
        return null;
    }
}

function smartMerge(target, source) {
    // If both are arrays → merge
    if (Array.isArray(target) && Array.isArray(source)) {
        return [...target, ...source];
    }

    // If both are objects → merge recursively
    if (
        typeof target === "object" &&
        typeof source === "object" &&
        target !== null &&
        source !== null &&
        !Array.isArray(target) &&
        !Array.isArray(source)
    ) {
        const result = { ...target };

        for (const key of Object.keys(source)) {
            if (key in result) {
                result[key] = smartMerge(result[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }

    // If different types OR primitive → convert to array (preserve both)
    if (target !== source) {
        return [target, source];
    }

    return target;
}

export async function mergeJsonFiles(folder, files, outputFile) {
    try {
        let count = 1;
        let mergedData = {};

        // console.log("Merging files:", files);
        for (const file of files) {
            // console.log(`Processing file: ${file}`);
            const filePath = `${folder}/${file}`;
            if (fs.existsSync(filePath)) {
                // console.log(`Reading file: ${filePath}`);
                const data = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
                // console.log(`🔴 File Data `, data)
                console.log(`🔴 Merging ${folder} file ${count}: ${file}`);
                mergedData = smartMerge(mergedData, data);
                // Object.assign(mergedData, data);
                count++;
            }
        }

        fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));

        // console.log("✅ Files merged successfully into:", outputFile);
        return mergedData;
    } catch (error) {
        console.error("Error merging files:", error);
    }
}

export async function compareAnalysis(client) {
    try {
        const data = {}
        const competitors = fs.readdirSync("./output")

        for (const competitor of competitors) {
            const competitorPath = `./output/${competitor}`;
            if (fs.lstatSync(competitorPath).isDirectory()) {
                const files = fs.readdirSync(competitorPath).filter(file => file.endsWith("_final_merged_analysis.json"));
                if (files.length > 0) {
                    const analysisData = JSON.parse(fs.readFileSync(`${competitorPath}/${files[0]}`, "utf-8"));
                    data[competitor] = analysisData;
                }
                // await mergeJsonFiles(competitorPath, files, `./output/${competitor}/final_Analysis_${competitor}.json`);
            }
        }

        const displayTypes = ["summary", "detailed", "table", "list", "comparison", "insights", "recommendations", "visualization", "trends", "highlights", "key_metrics", "side_by_side", "swot_analysis", "competitive_matrix", "heatmap", "timeline", "infographic", "dashboard", "bar_chart", "pie_chart", "line_graph", "scatter_plot", "word_cloud", "network_graph", "geographical_map", "sentiment_analysis", "customer_journey_map", "funnel_analysis", "cohort_analysis", "correlation_matrix", "regression_analysis", "cluster_analysis", "anomaly_detection", "forecasting", "scenario_analysis", "what_if_analysis", "data_storytelling", "interactive_report", "custom_visualization"];

        const response = await client.responses.create({
            model: "gpt-5.2",
            input: `
        Compare the following ecommerce store analysis JSON files.
        ${JSON.stringify(data)}

        Return JSON only with no explanation. follow yhis schema for the output: 
        ${JSON.stringify(UniversalSchema, null, 2)}`
        });

        fs.writeFileSync("./output/Comparisons/comparison.json", response.output_text);

        return response.output_text;
    } catch (error) {
        console.error("Error comparing analyses:", error);
    }
}

export async function AnalyzePage(pageType, client, cleanedContent, Url, fileName, domain) {


    if (pageType === "collection" || pageType === "category") {
        return await AnalyzeCollectionPage(client, cleanedContent, pageType, fileName, domain);
    } else if (pageType === "product" || pageType === "product_detail") {
        return await productAnalyzer(client, Url, fileName, domain);
    } else {
        console.log(`No specific analyzer for page type "${pageType}". Using universal analyzer.`);
        return await AnalyzeUniversalPage(client, cleanedContent, fileName, domain);
    }
}

export async function AnalyzeURL(url) {

    const domain = new URL(url).hostname.split(".")[0];
    const lastSegment = url.split("/").filter(Boolean).slice(-1)[0];
    const fileName = `${domain}_${lastSegment}_analysis.json`;
    fs.mkdirSync(`./output/${domain}`, { recursive: true });

    console.log(`Folder name: ${domain}, File name: ${fileName}`);

    const crawledContent = await crawlWebPage(axios, url);
    const $ = cheerio.load(crawledContent);
    const cleanedContent = await cleanWebPage($);
    const htmlPageCategory = await HTMLPageClassifer(client, cleanedContent);
    const { page_type } = JSON.parse(htmlPageCategory);
    console.log(`Page Type for ${url} is ${page_type}`);
    const analyzedData = await AnalyzePage(page_type, client, cleanedContent, url, fileName, domain);
    // console.log('Analyzed Data => ', analyzedData);

}

export async function Analyze(urls) {
    // for (let url of urls) {
    //   if(url.includes("www.")){
    //     url = url.replace("www.", "");
    //   }
    //   console.log(`Analyzing URL: ${url}`);
    //   await AnalyzeURL(url);
    // }

    let competitors = fs.readdirSync("./output")
    competitors = competitors.filter(competitors => competitors !== "Comparisons");
    console.log("Competitors found for merging:", competitors);
    for (const competitor of competitors) {
        const competitorPath = `./output/${competitor}`;
        if (fs.lstatSync(competitorPath).isDirectory()) {
            const files = fs.readdirSync(competitorPath).filter(file => file.endsWith("_analysis.json"));
            await mergeJsonFiles(competitorPath, files, `./output/${competitor}/${competitor}_final_merged_analysis.json`);
        }
    }

    await compareAnalysis(client);
}
