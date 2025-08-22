"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTranslation } from "@refinedev/core";

export interface I18nContextValue {
    translate: (key: string, options?: any) => string;
    changeLocale: (locale: string, options?: any) => Promise<any>;
    getLocale: () => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export interface I18nProviderProps {
    children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
    const { translate, changeLocale, getLocale } = useTranslation();

    const value: I18nContextValue = {
        translate,
        changeLocale,
        getLocale: () => getLocale() || "en",
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n(): I18nContextValue {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}