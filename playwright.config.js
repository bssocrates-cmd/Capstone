const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel:true,
    workers:4,
    retries:1,

    use: {
        baseURL: process.env.PROJECT_URL,
        headless: true,
        screenshot: 'on',
        trace: 'on'
    },

    reporter: 'html',

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});