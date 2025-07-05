import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const config: BotConfig = {
    token: 'MTM5MDU4NjY5NTYxMDY2NzA3OA.GhGU1x.gFGKx21g6XHjFsMP1nNc98RkT2A3jkAI4ctdM0',                   // token
    clientId: '1390586695610667078',                  // client id
    mongoUri: 'mongodb+srv://alshbanysami:Sami22@ha@cluster0.za3cwuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',           // mongo uri
    defaultPrefix: '!',
    mainGuildId: '1390362494438084798',             // main guild id
    defaultLanguage: 'ar',        // default language
    dashboard: {
        port: 3000,             // port for dashboard
        secret: 'wickstudio',  // secret key
        callbackUrl: 'http://localhost:3000/auth/callback' // callback url
    }
};


export interface BotConfig {
    token: string;
    clientId: string;
    mongoUri: string;
    defaultPrefix: string;
    mainGuildId: string;
    defaultLanguage: string;
    dashboard: {
        port: number;
        secret: string;
        callbackUrl: string;
    };
}

function loadSettingsFile(): any {
    let settingsPath = join(__dirname, 'settings.json');
    
    if (!existsSync(settingsPath)) {
        settingsPath = join(__dirname, '../settings.json');
        
        if (!existsSync(settingsPath)) {
            settingsPath = join(process.cwd(), 'settings.json');
            
            if (!existsSync(settingsPath)) {
                const defaultSettings = {
                    defaultLanguage: "en",
                    logs: {},
                    protection: {
                        enabled: true,
                        modules: {}
                    }
                };
                
                writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 4), 'utf8');
                console.log(`Created default settings file at ${settingsPath}`);
                return defaultSettings;
            }
        }
    }
    
    try {
        console.log(`Loading settings from: ${settingsPath}`);
        const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
        return settings;
    } catch (error) {
        console.error(`Error reading settings file: ${error}`);
        throw new Error('Failed to load settings.json file');
    }
}
const settings = loadSettingsFile();

export default {
    ...config,
    ...settings,
    token: config.token,
    clientId: config.clientId,
    mongoUri: config.mongoUri,
    defaultPrefix: config.defaultPrefix,
    mainGuildId: config.mainGuildId,
    dashboard: config.dashboard
}; 
