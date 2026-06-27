import "server-only";
import type { Locale } from "./i18n-config";
const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    ru: () => import("./dictionaries/ru.json").then((module) => module.default),
    tk: () => import("./dictionaries/tk.json").then((module) => module.default),
    oz: () => import("./dictionaries/oz.json").then((module) => module.default),
};
export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();
