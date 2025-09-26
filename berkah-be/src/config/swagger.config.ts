import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

// Determine if we're in production
const isProduction = process.env.NODE_ENV === "production";

// Check both potential documentation locations
const prodDocsPath = path.join(process.cwd(), "dist/docs");
const devDocsPath = path.join(process.cwd(), "src/docs");

// Determine which path exists and should be used
let docsBasePath;
if (isProduction && fs.existsSync(prodDocsPath)) {
	docsBasePath = "dist";
} else {
	docsBasePath = "src";
}

console.log(`Using docs from ${docsBasePath}/docs directory`);

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Broderie Backend API",
			version: "1.0.0",
			description: "API Documentation of Broderie Backend API",
		},
		servers: [
			{
				url: process.env.BE_URL_HOST || "http://localhost:5000",
			},
		],
	},
	apis: [
		path.join(docsBasePath, "docs/*.yaml"),
		path.join(docsBasePath, "docs/*/*.yaml"),
		path.join(docsBasePath, "docs/**/*.yaml"),
	],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
