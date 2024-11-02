import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export interface AddonManifest {
  name: string;
  version: string;
  description: string;
  routes: {
    path: string;
    component: string;
    layout?: string;
  }[];
  models: string[];
  dependencies?: string[];
}

export class AddonLoader {
  private static instance: AddonLoader;
  private addons: Map<string, AddonManifest> = new Map();
  private loadedAddons: Set<string> = new Set();

  private constructor() {
    this.loadAddons();
  }

  static getInstance(): AddonLoader {
    if (!AddonLoader.instance) {
      AddonLoader.instance = new AddonLoader();
    }
    return AddonLoader.instance;
  }

  private loadAddons() {
    const addonsPath = join(process.cwd(), 'addons');
    const addonFolders = readdirSync(addonsPath);

    for (const folder of addonFolders) {
      const manifestPath = join(addonsPath, folder, 'manifest.json');
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      this.addons.set(folder, manifest);
    }

    // Load addons in dependency order
    for (const [name] of this.addons) {
      this.loadAddon(name);
    }
  }

  private loadAddon(name: string) {
    if (this.loadedAddons.has(name)) return;

    const manifest = this.addons.get(name);
    if (!manifest) throw new Error(`Addon ${name} not found`);

    // Load dependencies first
    manifest.dependencies?.forEach(dep => {
      this.loadAddon(dep);
    });

    this.loadedAddons.add(name);
  }

  getRoutes() {
    const routes: AddonManifest['routes'] = [];
    for (const [, manifest] of this.addons) {
      routes.push(...manifest.routes);
    }
    return routes;
  }

  getModels() {
    const models: string[] = [];
    for (const [, manifest] of this.addons) {
      models.push(...manifest.models);
    }
    return models;
  }
}